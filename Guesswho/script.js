/**
 * Guess Whoo - Complete Game Logic
 * 30 predetermined rounds, 6x5 grid, local images
 */

// Game State
let currentGameMode = null; // 'player' or 'word'
let currentRound = 1;
let secretPlayer = null;
let isPickMode = false;

// Word game state
let currentWord = null;
let currentWordDisplay = [];
let guessedLetters = [];
let remainingAttempts = 6;

// DOM Elements
const modeSelection = document.getElementById('mode-selection');
const gameContent = document.getElementById('game-content');
const modeButtons = document.querySelectorAll('.mode-btn');
const backBtn = document.getElementById('back-btn');
const gameTitle = document.getElementById('game-title');
const gameInstruction = document.getElementById('game-instruction');
const roundButtonsContainer = document.getElementById('round-buttons');
const playersGrid = document.getElementById('players-grid');
const playerBoard = document.getElementById('player-board');
const wordBoard = document.getElementById('word-board');
const secretInfo = document.getElementById('secret-info');
const revealBtn = document.getElementById('reveal-btn');
const newGameBtn = document.getElementById('new-game-btn');
const hideAllBtn = document.getElementById('hide-all-btn');
const showAllBtn = document.getElementById('show-all-btn');
const pickSecretBtn = document.getElementById('pick-secret-btn');

// Word game elements
const wordDisplay = document.getElementById('word-display');
const wordCategory = document.getElementById('word-category');
const attemptsLeft = document.getElementById('attempts-left');
const usedLetters = document.getElementById('used-letters');
const letterInput = document.getElementById('letter-input');
const guessBtn = document.getElementById('guess-btn');

// ====================
// Initialization
// ====================
document.addEventListener('DOMContentLoaded', () => {
    createRoundButtons();
    setupEventListeners();
    console.log('Guess Whoo initialized');
});

// ====================
// Event Listeners
// ====================
function setupEventListeners() {
    // Mode selection
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            selectGameMode(mode);
        });
    });

    // Back button
    backBtn.addEventListener('click', showModeSelection);

    // Control buttons
    newGameBtn.addEventListener('click', startNewGame);
    hideAllBtn.addEventListener('click', hideAllCards);
    showAllBtn.addEventListener('click', showAllCards);
    revealBtn.addEventListener('click', revealSecretPlayer);
    pickSecretBtn.addEventListener('click', togglePickMode);

    // Word game
    guessBtn.addEventListener('click', guessLetter);
    letterInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') guessLetter();
    });
}

// ====================
// Game Mode Selection
// ====================
function selectGameMode(mode) {
    currentGameMode = mode;
    modeSelection.classList.add('hidden');
    gameContent.classList.remove('hidden');

    if (mode === 'player') {
        setupPlayerMode();
    } else if (mode === 'word') {
        setupWordMode();
    }

    loadRound(1);
}

function showModeSelection() {
    currentGameMode = null;
    modeSelection.classList.remove('hidden');
    gameContent.classList.add('hidden');
    resetPickMode();
}

function setupPlayerMode() {
    gameTitle.textContent = 'Guess The Football Player';
    gameInstruction.textContent = 'Click cards to flip them and find the secret player!';
    playerBoard.classList.remove('hidden');
    wordBoard.classList.add('hidden');
    revealBtn.classList.remove('hidden');
    secretInfo.innerHTML = '<span class="hidden-text">???</span>';
}

function setupWordMode() {
    gameTitle.textContent = 'Guess The Word';
    gameInstruction.textContent = 'Guess letters to reveal the hidden football word!';
    playerBoard.classList.add('hidden');
    wordBoard.classList.remove('hidden');
    revealBtn.classList.add('hidden');
}

// ====================
// Round Management
// ====================
function createRoundButtons() {
    roundButtonsContainer.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
        const btn = document.createElement('button');
        btn.className = 'round-btn';
        btn.textContent = i;
        btn.dataset.round = i;
        btn.addEventListener('click', () => loadRound(i));
        roundButtonsContainer.appendChild(btn);
    }
}

function loadRound(roundNum) {
    currentRound = roundNum;
    updateActiveRoundButton();

    if (currentGameMode === 'player') {
        loadPlayerRound(roundNum);
    } else if (currentGameMode === 'word') {
        loadWordRound(roundNum);
    }
}

function updateActiveRoundButton() {
    document.querySelectorAll('.round-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.round) === currentRound);
    });
}

// ====================
// Player Game Logic
// ====================
function loadPlayerRound(roundNum) {
    const roundData = PREDETERMINED_ROUNDS[roundNum];
    if (!roundData) {
        console.error('Round not found:', roundNum);
        return;
    }

    // Clear and render grid
    playersGrid.innerHTML = '';
    
    // Get 30 players for this round based on predetermined data
    const roundPlayers = roundData.map(slot => {
        const player = PLAYERS_DATABASE.find(p => p.id === slot.id);
        return { ...player, position: slot.position };
    });

    // Sort by position
    roundPlayers.sort((a, b) => a.position - b.position);

    // Render 30 cards in 6x5 grid
    roundPlayers.forEach((player, index) => {
        const card = createPlayerCard(player, index);
        playersGrid.appendChild(card);
    });

    // Select secret player (first player in round as default, or random)
    selectSecretPlayer(roundPlayers);

    console.log(`Loaded Round ${roundNum} with ${roundPlayers.length} players`);
}

function createPlayerCard(player, index) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.index = index;
    card.dataset.playerId = player.id;

    const initials = player.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <div class="player-image-container">
                    <img src="${player.imageUrl}" 
                         alt="${player.name}" 
                         class="player-image"
                         loading="lazy"
                         onerror="this.style.display='none'; this.parentElement.classList.add('image-failed');">
                    <div class="player-initials">${initials}</div>
                </div>
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-nationality">${player.nationality}</div>
                </div>
            </div>
            <div class="card-back">
                <div class="question-mark">?</div>
                <div class="hidden-text">Guess Who?</div>
            </div>
        </div>
    `;

    card.addEventListener('click', () => handleCardClick(card, player));

    return card;
}

function handleCardClick(card, player) {
    if (isPickMode) {
        // Set this player as secret
        secretPlayer = player;
        updateSecretDisplay();
        togglePickMode();
        
        // Unflip all cards first
        document.querySelectorAll('.player-card').forEach(c => c.classList.remove('flipped'));
        
        // Flip all except new secret
        document.querySelectorAll('.player-card').forEach(c => {
            if (parseInt(c.dataset.playerId) !== player.id) {
                c.classList.add('flipped');
            }
        });
    } else {
        // Normal flip
        card.classList.toggle('flipped');
        
        // Check if secret was revealed
        if (player.id === secretPlayer.id && !card.classList.contains('flipped')) {
            revealSecretPlayer();
        }
    }
}

function selectSecretPlayer(players) {
    // Use round number to deterministically select secret player
    // This ensures same secret player for same round every time
    const secretIndex = (currentRound * 7) % players.length;
    secretPlayer = players[secretIndex];
    updateSecretDisplay();
    console.log('Secret player:', secretPlayer.name);
}

function updateSecretDisplay() {
    if (secretPlayer) {
        secretInfo.innerHTML = `<span class="hidden-text">???</span>`;
        secretInfo.classList.remove('revealed');
    }
}

function revealSecretPlayer() {
    if (secretPlayer) {
        secretInfo.innerHTML = `
            <div>${secretPlayer.name}</div>
            <div style="font-size: 0.9rem; font-weight: 500; margin-top: 5px;">
                ${secretPlayer.nationality} • ${secretPlayer.position}
            </div>
        `;
        secretInfo.classList.add('revealed');
        
        // Highlight secret card
        document.querySelectorAll('.player-card').forEach(card => {
            if (parseInt(card.dataset.playerId) === secretPlayer.id) {
                card.querySelector('.card-front').style.boxShadow = '0 0 20px var(--secondary)';
            }
        });
    }
}

function startNewGame() {
    // Reset all cards
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.card-front').style.boxShadow = '';
    });
    
    // Reselect secret player
    const roundData = PREDETERMINED_ROUNDS[currentRound];
    const roundPlayers = roundData.map(slot => PLAYERS_DATABASE.find(p => p.id === slot.id));
    selectSecretPlayer(roundPlayers);
    
    // Auto-hide all except secret
    document.querySelectorAll('.player-card').forEach(card => {
        if (parseInt(card.dataset.playerId) !== secretPlayer.id) {
            card.classList.add('flipped');
        }
    });
}

function hideAllCards() {
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.add('flipped');
    });
}

function showAllCards() {
    document.querySelectorAll('.player-card').forEach(card => {
        card.classList.remove('flipped');
    });
}

function togglePickMode() {
    isPickMode = !isPickMode;
    pickSecretBtn.classList.toggle('active', isPickMode);
    document.body.style.cursor = isPickMode ? 'crosshair' : 'default';
    
    if (isPickMode) {
        gameInstruction.textContent = 'Click on a player card to set them as the secret player!';
    } else {
        gameInstruction.textContent = 'Click cards to flip them and find the secret player!';
    }
}

function resetPickMode() {
    isPickMode = false;
    pickSecretBtn.classList.remove('active');
    document.body.style.cursor = 'default';
}

// ====================
// Word Game Logic
// ====================
const WORDS_DATABASE = [
    { word: 'MESSI', category: 'Player' },
    { word: 'RONALDO', category: 'Player' },
    { word: 'BARCELONA', category: 'Club' },
    { word: 'MADRID', category: 'Club' },
    { word: 'CHAMPIONS', category: 'Competition' },
    { word: 'WORLDCUP', category: 'Competition' },
    { word: 'PENALTY', category: 'Football Term' },
    { word: 'CORNER', category: 'Football Term' },
    { word: 'OFFSIDE', category: 'Football Term' },
    { word: 'HATTRICK', category: 'Football Term' },
    { word: 'STRIKER', category: 'Position' },
    { word: 'GOALKEEPER', category: 'Position' },
    { word: 'MIDFIELD', category: 'Position' },
    { word: 'DEFENDER', category: 'Position' },
    { word: 'CAPTAIN', category: 'Role' },
    { word: 'REFEREE', category: 'Role' },
    { word: 'VAR', category: 'Football Term' },
    { word: 'TRANSFER', category: 'Football Term' },
    { word: 'LEAGUE', category: 'Competition' },
    { word: 'STADIUM', category: 'Venue' },
    { word: 'TROPHY', category: 'Award' },
    { word: 'GOLDENBOOT', category: 'Award' },
    { word: 'BALLONDOR', category: 'Award' },
    { word: 'SEMIFINAL', category: 'Stage' },
    { word: 'FINAL', category: 'Stage' },
    { word: 'EXTRATIME', category: 'Match Phase' },
    { word: 'PENALTIES', category: 'Match Phase' },
    { word: 'CLEANSHEET', category: 'Goalkeeper Term' },
    { word: 'ASSIST', category: 'Statistic' },
    { word: 'REDCARD', category: 'Discipline' }
];

function loadWordRound(roundNum) {
    // Select word based on round number
    const wordIndex = (roundNum - 1) % WORDS_DATABASE.length;
    currentWord = WORDS_DATABASE[wordIndex];
    
    // Initialize display
    currentWordDisplay = Array(currentWord.word.length).fill('_');
    guessedLetters = [];
    remainingAttempts = 6;
    
    updateWordDisplay();
    updateWordStatus();
    letterInput.value = '';
    letterInput.focus();
}

function updateWordDisplay() {
    wordDisplay.textContent = currentWordDisplay.join(' ');
    wordCategory.textContent = `Category: ${currentWord.category}`;
}

function updateWordStatus() {
    attemptsLeft.textContent = remainingAttempts;
    usedLetters.textContent = guessedLetters.length > 0 ? guessedLetters.join(', ') : '-';
}

function guessLetter() {
    const letter = letterInput.value.toUpperCase();
    if (!letter || letter.length !== 1) return;
    
    // Check if already guessed
    if (guessedLetters.includes(letter)) {
        letterInput.value = '';
        return;
    }
    
    guessedLetters.push(letter);
    
    // Check if letter is in word
    let found = false;
    for (let i = 0; i < currentWord.word.length; i++) {
        if (currentWord.word[i] === letter) {
            currentWordDisplay[i] = letter;
            found = true;
        }
    }
    
    if (!found) {
        remainingAttempts--;
    }
    
    letterInput.value = '';
    updateWordDisplay();
    updateWordStatus();
    
    // Check win/lose conditions
    if (!currentWordDisplay.includes('_')) {
        wordDisplay.style.color = 'var(--accent)';
        setTimeout(() => {
            alert('Congratulations! You guessed the word: ' + currentWord.word);
            loadWordRound(currentRound);
            wordDisplay.style.color = '';
        }, 300);
    } else if (remainingAttempts === 0) {
        wordDisplay.textContent = currentWord.word;
        wordDisplay.style.color = 'var(--danger)';
        setTimeout(() => {
            alert('Game Over! The word was: ' + currentWord.word);
            loadWordRound(currentRound);
            wordDisplay.style.color = '';
        }, 300);
    } else {
        letterInput.focus();
    }
}
