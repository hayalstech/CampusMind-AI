// Football players data with verified Wikimedia Commons image URLs
const players = [
    {
        name: "Lionel Messi",
        nationality: "Argentina",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Messi_vs_Nigeria_2018.jpg"
    },
    {
        name: "Cristiano Ronaldo",
        nationality: "Portugal",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
    },
    {
        name: "Kylian Mbappé",
        nationality: "France",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Kylian_Mbapp%C3%A9_2018.jpg"
    },
    {
        name: "Erling Haaland",
        nationality: "Norway",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Erling_Haaland_2023.jpg"
    },
    {
        name: "Neymar",
        nationality: "Brazil",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_2023_%28cropped%29.jpg"
    },
    {
        name: "Kevin De Bruyne",
        nationality: "Belgium",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Kevin_De_Bruyne_2018.jpg"
    },
    {
        name: "Mohamed Salah",
        nationality: "Egypt",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Mohamed_Salah_2018.jpg"
    },
    {
        name: "Robert Lewandowski",
        nationality: "Poland",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Robert_Lewandowski_2018.jpg"
    },
    {
        name: "Karim Benzema",
        nationality: "France",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Karim_Benzema_2018.jpg"
    },
    {
        name: "Jude Bellingham",
        nationality: "England",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Jude_Bellingham_2023.jpg"
    },
    {
        name: "Vinicius Jr",
        nationality: "Brazil",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Vinicius_Junior_2023.jpg"
    },
    {
        name: "Harry Kane",
        nationality: "England",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Harry_Kane_2018.jpg"
    },
    {
        name: "Sadio Mané",
        nationality: "Senegal",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Sadio_Man%C3%A9_2019.jpg"
    },
    {
        name: "Antoine Griezmann",
        nationality: "France",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Antoine_Griezmann_2018.jpg"
    },
    {
        name: "Pedri",
        nationality: "Spain",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Pedri_2023.jpg"
    },
    {
        name: "Rodri",
        nationality: "Spain",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Rodri_2023.jpg"
    },
    {
        name: "Phil Foden",
        nationality: "England",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Phil_Foden_2023.jpg"
    },
    {
        name: "Bukayo Saka",
        nationality: "England",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bukayo_Saka_2023.jpg"
    },
    {
        name: "Son Heung-min",
        nationality: "South Korea",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Son_Heung-min_2018.jpg"
    },
    {
        name: "Marcus Rashford",
        nationality: "England",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Marcus_Rashford_2018.jpg"
    },
    {
        name: "Luka Modrić",
        nationality: "Croatia",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Luka_Modri%C4%87_2018.jpg"
    },
    {
        name: "Toni Kroos",
        nationality: "Germany",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Toni_Kroos_2018.jpg"
    },
    {
        name: "Sergio Ramos",
        nationality: "Spain",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Sergio_Ramos_2019.jpg"
    },
    {
        name: "Virgil van Dijk",
        nationality: "Netherlands",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Virgil_van_Dijk_2018.jpg"
    },
    {
        name: "Gianluigi Donnarumma",
        nationality: "Italy",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Gianluigi_Donnarumma_2021.jpg"
    },
    {
        name: "Thibaut Courtois",
        nationality: "Belgium",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Thibaut_Courtois_2018.jpg"
    },
    {
        name: "Joshua Kimmich",
        nationality: "Germany",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Joshua_Kimmich_2019.jpg"
    },
    {
        name: "Bernardo Silva",
        nationality: "Portugal",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bernardo_Silva_2019.jpg"
    },
    {
        name: "Declan Rice",
        nationality: "England",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Declan_Rice_2023.jpg"
    },
    {
        name: "Victor Osimhen",
        nationality: "Nigeria",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Victor_Osimhen_2023.jpg"
    }
];

// DOM Elements
const grid = document.getElementById('players-grid');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-btn');

// Create player card HTML
function createPlayerCard(player, index) {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.dataset.index = index;
    card.dataset.name = player.name.toLowerCase();
    card.dataset.nationality = player.nationality.toLowerCase();

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${player.image}" 
                     alt="${player.name}" 
                     class="player-image"
                     loading="lazy"
                     onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'">
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-nationality">${player.nationality}</div>
                </div>
            </div>
            <div class="card-back">
                <div class="card-back-content">
                    <div class="question-mark">?</div>
                    <div class="hidden-card-text">Guess Who?</div>
                </div>
            </div>
        </div>
    `;

    // Add click event for flipping
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    return card;
}

// Render all players
function renderPlayers() {
    grid.innerHTML = '';
    players.forEach((player, index) => {
        const card = createPlayerCard(player, index);
        grid.appendChild(card);
    });
}

// Filter players based on search input
function filterPlayers(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const cards = document.querySelectorAll('.player-card');

    cards.forEach(card => {
        const name = card.dataset.name;
        const nationality = card.dataset.nationality;

        if (name.includes(term) || nationality.includes(term)) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
}

// Reset all flipped cards
function resetAllCards() {
    const cards = document.querySelectorAll('.player-card');
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    searchInput.value = '';
    filterPlayers('');
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    filterPlayers(e.target.value);
});

resetBtn.addEventListener('click', resetAllCards);

// Initialize the app
renderPlayers();
