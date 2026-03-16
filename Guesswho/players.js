// 65 Football Players Database - May Contain Traces of Footballing Greatness
// ⚽ 21 Forwards, 23 Midfielders, 21 Defenders ⚽
// Warning: These players are dangerously talented
// Last Updated: When the transfer window was closed (we think)

const PLAYERS_DATABASE = [
    // FORWARDS (21)
    {
        id: 1,
        name: "Lionel Messi",
        nationality: "Argentina",
        position: "Forward",
        imageUrl: "images/lionel_messi.jpg",
        imageFile: "Messi.png"
    },
    {
        id: 2,
        name: "Cristiano Ronaldo",
        nationality: "Portugal",
        position: "Forward",
        imageUrl: "images/cristiano_ronaldo.jpg",
        imageFile: "CR7.png"
    },
    {
        id: 3,
        name: "Kylian Mbappé",
        nationality: "France",
        position: "Forward",
        imageUrl: "images/kylian_mbappe.jpg",
        imageFile: "KM10.png"
    },
    {
        id: 4,
        name: "Erling Haaland",
        nationality: "Norway",
        position: "Forward",
        imageUrl: "images/erling_haaland.jpg",
        imageFile: "EH9.png"
    },
    {
        id: 5,
        name: "Neymar",
        nationality: "Brazil",
        position: "Forward",
        imageUrl: "images/neymar.jpg",
        imageFile: "NJ10.png"
    },
    {
        id: 6,
        name: "Mohamed Salah",
        nationality: "Egypt",
        position: "Forward",
        imageUrl: "images/mohamed_salah.jpg",
        imageFile: "MO10.png"
    },
    {
        id: 7,
        name: "Vinícius Júnior",
        nationality: "Brazil",
        position: "Forward",
        imageUrl: "images/vinicius_junior.jpg",
        imageFile: "VJ7.png"
    },
    {
        id: 8,
        name: "Harry Kane",
        nationality: "England",
        position: "Forward",
        imageUrl: "images/harry_kane.jpg",
        imageFile: "HK9.png"
    },
    {
        id: 9,
        name: "Sadio Mané",
        nationality: "Senegal",
        position: "Forward",
        imageUrl: "images/sadio_mane.jpg",
        imageFile: "mane.png"
    },
    {
        id: 10,
        name: "Son Heung-min",
        nationality: "South Korea",
        position: "Forward",
        imageUrl: "images/son_heungmin.jpg",
        imageFile: "son.png"
    },
    {
        id: 11,
        name: "Robert Lewandowski",
        nationality: "Poland",
        position: "Forward",
        imageUrl: "images/robert_lewandowski.jpg",
        imageFile: "RL9.png"
    },
    {
        id: 12,
        name: "Victor Osimhen",
        nationality: "Nigeria",
        position: "Forward",
        imageUrl: "images/victor_osimhen.jpg",
        imageFile: "osimen.png"
    },
    {
        id: 13,
        name: "Antoine Griezmann",
        nationality: "France",
        position: "Forward",
        imageUrl: "images/antoine_griezmann.jpg",
        imageFile: "grizeman.png"
    },
    {
        id: 14,
        name: "Lautaro Martínez",
        nationality: "Argentina",
        position: "Forward",
        imageUrl: "images/lautaro_martinez.jpg",
        imageFile: "lautaro.png"
    },
    {
        id: 15,
        name: "Julián Álvarez",
        nationality: "Argentina",
        position: "Forward",
        imageUrl: "images/julian_alvarez.jpg",
        imageFile: "alvarez.png"
    },
    {
        id: 16,
        name: "Viktor Gyökeres",
        nationality: "Sweden",
        position: "Forward",
        imageUrl: "images/viktor_gyokeres.jpg",
        imageFile: "vg14.png"
    },
    {
        id: 17,
        name: "Bukayo Saka",
        nationality: "England",
        position: "Forward",
        imageUrl: "images/bukayo_saka.jpg",
        imageFile: "bs7.png"
    },
    {
        id: 18,
        name: "Khvicha Kvaratskhelia",
        nationality: "Georgia",
        position: "Forward",
        imageUrl: "images/khvicha_kvaratskhelia.jpg",
        imageFile: "kvara.png"
    },
    {
        id: 19,
        name: "Marcus Rashford",
        nationality: "England",
        position: "Forward",
        imageUrl: "images/marcus_rashford.jpg",
        imageFile: "rashford.png"
    },
    {
        id: 20,
        name: "Rafael Leão",
        nationality: "Portugal",
        position: "Forward",
        imageUrl: "images/rafael_leao.jpg",
        imageFile: "leao.png"
    },

    // MIDFIELDERS (23) - The Engine Room of Dreams
    {
        id: 21,
        name: "Kevin De Bruyne",
        nationality: "Belgium",
        position: "Midfielder",
        imageUrl: "images/kevin_de_bruyne.jpg",
        imageFile: "KDB.png"
    },
    {
        id: 22,
        name: "Jude Bellingham",
        nationality: "England",
        position: "Midfielder",
        imageUrl: "images/jude_bellingham.jpg",
        imageFile: "jude.png"
    },
    {
        id: 23,
        name: "Pedri",
        nationality: "Spain",
        position: "Midfielder",
        imageUrl: "images/pedri.jpg",
        imageFile: "pedri.png"
    },
    {
        id: 24,
        name: "Rodri",
        nationality: "Spain",
        position: "Midfielder",
        imageUrl: "images/rodri.jpg",
        imageFile: "rodri.png"
    },
    {
        id: 25,
        name: "Phil Foden",
        nationality: "England",
        position: "Midfielder",
        imageUrl: "images/phil_foden.jpg",
        imageFile: "foden.png"
    },
    {
        id: 26,
        name: "Bernardo Silva",
        nationality: "Portugal",
        position: "Midfielder",
        imageUrl: "images/bernardo_silva.jpg",
        imageFile: "bernadosilva.png"
    },
    {
        id: 27,
        name: "Luka Modrić",
        nationality: "Croatia",
        position: "Midfielder",
        imageUrl: "images/luka_modric.jpg",
        imageFile: "modric.png"
    },
    {
        id: 28,
        name: "Toni Kroos",
        nationality: "Germany",
        position: "Midfielder",
        imageUrl: "images/toni_kroos.jpg",
        imageFile: "kroos.png"
    },
    {
        id: 29,
        name: "Joshua Kimmich",
        nationality: "Germany",
        position: "Midfielder",
        imageUrl: "images/joshua_kimmich.jpg",
        imageFile: "kimmich.png"
    },
    {
        id: 30,
        name: "Declan Rice",
        nationality: "England",
        position: "Midfielder",
        imageUrl: "images/declan_rice.jpg",
        imageFile: "rice.png"
    },
    {
        id: 31,
        name: "Martin Ødegaard",
        nationality: "Norway",
        position: "Midfielder",
        imageUrl: "images/martin_odegaard.jpg",
        imageFile: "ode.png"
    },
    {
        id: 32,
        name: "Bruno Fernandes",
        nationality: "Portugal",
        position: "Midfielder",
        imageUrl: "images/bruno_fernandes.jpg",
        imageFile: "burno.png"
    },
    {
        id: 33,
        name: "Frenkie de Jong",
        nationality: "Netherlands",
        position: "Midfielder",
        imageUrl: "images/frenkie_de_jong.jpg",
        imageFile: "deong.png"
    },
    {
        id: 34,
        name: "Federico Valverde",
        nationality: "Uruguay",
        position: "Midfielder",
        imageUrl: "images/federico_valverde.jpg",
        imageFile: "fede.png"
    },
    {
        id: 35,
        name: "Jamal Musiala",
        nationality: "Germany",
        position: "Midfielder",
        imageUrl: "images/jamal_musiala.jpg",
        imageFile: "jamal.png"
    },
    {
        id: 36,
        name: "Lamine Yamal",
        nationality: "Spain",
        position: "Forward",
        imageUrl: "images/lamine_yamal.jpg",
        imageFile: "yamal.png"
    },
    {
        id: 37,
        name: "Enzo Fernández",
        nationality: "Argentina",
        position: "Midfielder",
        imageUrl: "images/enzo_fernandez.jpg",
        imageFile: "enzo.png"
    },
    {
        id: 38,
        name: "Eduardo Camavinga",
        nationality: "France",
        position: "Midfielder",
        imageUrl: "images/eduardo_camavinga.jpg",
        imageFile: "camavingas.png"
    },
    {
        id: 39,
        name: "Florian Wirtz",
        nationality: "Germany",
        position: "Midfielder",
        imageUrl: "images/florian_wirtz.jpg",
        imageFile: "wirtz.png"
    },
    {
        id: 40,
        name: "James Maddison",
        nationality: "England",
        position: "Midfielder",
        imageUrl: "images/james_maddison.jpg",
        imageFile: "maddison.png"
    },

    // DEFENDERS (21)
    {
        id: 41,
        name: "Virgil van Dijk",
        nationality: "Netherlands",
        position: "Defender",
        imageUrl: "images/virgil_van_dijk.jpg",
        imageFile: "vvd.png"
    },
    {
        id: 42,
        name: "Sergio Ramos",
        nationality: "Spain",
        position: "Defender",
        imageUrl: "images/sergio_ramos.jpg",
        imageFile: "ramos.png"
    },
    {
        id: 43,
        name: "Antonio Rüdiger",
        nationality: "Germany",
        position: "Defender",
        imageUrl: "images/antonio_rudiger.jpg",
        imageFile: "rudiger.png"
    },
    {
        id: 44,
        name: "Rúben Dias",
        nationality: "Portugal",
        position: "Defender",
        imageUrl: "images/ruben_dias.jpg",
        imageFile: "ruben dias.png"
    },
    {
        id: 45,
        name: "Marquinhos",
        nationality: "Brazil",
        position: "Defender",
        imageUrl: "images/marquinhos.jpg",
        imageFile: "marqunious.png"
    },
    {
        id: 46,
        name: "João Cancelo",
        nationality: "Portugal",
        position: "Defender",
        imageUrl: "images/joao_cancelo.jpg",
        imageFile: "kounde.png"
    },
    {
        id: 47,
        name: "Trent Alexander-Arnold",
        nationality: "England",
        position: "Defender",
        imageUrl: "images/trent_alexander_arnold.jpg",
        imageFile: "trent.png"
    },
    {
        id: 48,
        name: "Achraf Hakimi",
        nationality: "Morocco",
        position: "Defender",
        imageUrl: "images/achraf_hakimi.jpg",
        imageFile: "hakimi.png"
    },
    {
        id: 49,
        name: "Theo Hernández",
        nationality: "France",
        position: "Defender",
        imageUrl: "images/theo_hernandez.jpg",
        imageFile: "theo fernadez.png"
    },
    {
        id: 50,
        name: "Jules Koundé",
        nationality: "France",
        position: "Defender",
        imageUrl: "images/jules_kounde.jpg",
        imageFile: "kounde.png"
    },
    {
        id: 51,
        name: "William Saliba",
        nationality: "France",
        position: "Defender",
        imageUrl: "images/william_saliba.jpg",
        imageFile: "saliba.png"
    },
    {
        id: 52,
        name: "Gabriel Magalhães",
        nationality: "Brazil",
        position: "Defender",
        imageUrl: "images/gabriel_magalhaes.jpg",
        imageFile: "mag6.png"
    },
    {
        id: 53,
        name: "Matthijs de Ligt",
        nationality: "Netherlands",
        position: "Defender",
        imageUrl: "images/matthijs_de_ligt.jpg",
        imageFile: "delight.png"
    },
    {
        id: 54,
        name: "Alphonso Davies",
        nationality: "Canada",
        position: "Defender",
        imageUrl: "images/alphonso_davies.jpg",
        imageFile: "alfonso.png"
    },
    {
        id: 55,
        name: "Kyle Walker",
        nationality: "England",
        position: "Defender",
        imageUrl: "images/kyle_walker.jpg",
        imageFile: "walker.png"
    },
    {
        id: 56,
        name: "Dayot Upamecano",
        nationality: "France",
        position: "Defender",
        imageUrl: "images/dayot_upamecano.jpg",
        imageFile: "dayot.png"
    },
    {
        id: 57,
        name: "Éder Militão",
        nationality: "Brazil",
        position: "Defender",
        imageUrl: "images/eder_militao.jpg",
        imageFile: "militao.png"
    },
    {
        id: 58,
        name: "Reece James",
        nationality: "England",
        position: "Defender",
        imageUrl: "images/reece_james.jpg",
        imageFile: "recce.png"
    },
    {
        id: 59,
        name: "Ben White",
        nationality: "England",
        position: "Defender",
        imageUrl: "images/ben_white.jpg",
        imageFile: "white.png"
    },
    {
        id: 60,
        name: "John Stones",
        nationality: "England",
        position: "Defender",
        imageUrl: "images/john_stones.jpg",
        imageFile: "stones.png"
    },
    {
        id: 61,
        name: "Jurrien Timber",
        nationality: "Netherlands",
        position: "Defender",
        imageUrl: "images/jurrien_timber.jpg",
        imageFile: "timber.png"
    },
    {
        id: 62,
        name: "Cole Palmer",
        nationality: "England",
        position: "Midfielder",
        imageUrl: "images/cole_palmer.jpg",
        imageFile: "palmer.png"
    },
    {
        id: 63,
        name: "Bruno Guimarães",
        nationality: "Brazil",
        position: "Midfielder",
        imageUrl: "images/bruno_guimaraes.jpg",
        imageFile: "gumaries.png"
    },
    {
        id: 64,
        name: "Jarrod Bowen",
        nationality: "England",
        position: "Forward",
        imageUrl: "images/jarrod_bowen.jpg",
        imageFile: "bowen.png"
    },
    {
        id: 65,
        name: "Dominik Szoboszlai",
        nationality: "Hungary",
        position: "Midfielder",
        imageUrl: "images/dominik_szoboszlai.jpg",
        imageFile: "sobozli.png"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PLAYERS_DATABASE };
}
