// Amplifeirs
const amplifierSets = [
    [1,2,3],
    [4,5,6],
    [7],
    [8,9],
    [10],
    [11,12,13],
    [14],
    [15],
    [16],
    [17],
    [18],
    [19,20,21],
    [22,23],
    [24],
    [25,26],
    [27],
    [31],
    [32],
    [33,34,35],
    [37],
    [38,39],
    [40],
    [41]
]
const amplifiers = {
    1: 'The Carry I',
    2: 'The Carry II',
    3: 'The Carry III',
    4: 'Poison I',
    5: 'Poison II',
    6: 'Poison III',
    7: 'Limit Break',
    8: 'The King I',
    9: 'The King II',
    10: 'Dude That Fingerlock',
    11: 'Cold Clear Eyes I',
    12: 'Cold Clear Eyes II',
    13: 'Cold Clear Eyes III',
    14: 'Turn It Up',
    15: 'Gambler',
    16: 'Chance Time',
    17: 'Easy Peasy',
    18: 'Make It Rock',
    19: 'Yin And Yang I',
    20: 'Yin And Yang II',
    21: 'Yin And Yang III',
    22: 'Trickster',
    23: 'Trickster II',
    24: 'AccDance',
    25: 'Synchronised I',
    26: 'Synchronised II',
    27: 'Go With The Flow',
    28: 'Loadbearer I',
    29: 'Loadbearer II',
    30: 'Loadbearer III',
    31: 'LightBearer',
    32: 'Cheating Death',
    33: 'The Dragon Consumes I',
    34: 'The Dragon Consumes II',
    35: 'The Dragon Consumes III',
    36: 'The Missing Piece',
    37: 'JTBFREAKS',
    38: 'Desperation I',
    39: 'Desperation II',
    40: 'Soft Rock',
    41: 'Roulette'
}
const silverAmplifiers = [1, 4, 11, 19, 28, 14, 22, 24]
const goldAmplifiers = [2, 5, 12, 20, 29, 27, 31, 40, 23]
const prismaticAmplifiers = [3, 6, 13, 21, 30, 41]

// Get Google Sheets URL
let googleSheetsUrl = ""
async function getGoogleSheetsUrl() {
    const response = await fetch("static/script.json")
    const responseJson = await response.json()
    googleSheetsUrl = responseJson.url
}
getGoogleSheetsUrl()

// Load Teams
let allTeams = []
async function loadAmplifierRollData() {
    const response = await fetch("../_data/amplifier-rolls-teams.json")
    allTeams = await response.json()
    allTeams = allTeams.reverse()
    displayTeams()
}
loadAmplifierRollData()

// Display Teams
const revealTileContainer = document.getElementById("reveal-tile-container")
const teamrollTeamContainer = document.getElementById("teamroll-team-container")
const title = document.getElementById("title")
let currentTeamIndex = 0
function displayTeams() {
    for (let i = -4; i <= 4; i++) {
        const currentContainer = teamrollTeamContainer.children[i + 4]
        // For previous teams
        if ((currentTeamIndex + i < 0 && i < 0) || (currentTeamIndex + i >= allTeams.length && i > 0)) {
            currentContainer.children[0].innerText = ""
            currentContainer.children[1].innerText = ""
            currentContainer.children[2].innerText = ""
            currentContainer.children[3].style.display = "none"
        } else if (currentTeamIndex + i < allTeams.length) {
            currentContainer.children[0].innerText = allTeams[currentTeamIndex + i].teamName
            currentContainer.children[1].innerText = allTeams[currentTeamIndex + i].player1Name
            currentContainer.children[2].innerText = allTeams[currentTeamIndex + i].player2Name
            if (i !== 0 && allTeams[currentTeamIndex + i].silverAmplifier && allTeams[currentTeamIndex + i].goldAmplifier && allTeams[currentTeamIndex + i].prismaticAmplifier) {
                currentContainer.children[3].style.display = "flex"
                currentContainer.children[3].children[0].setAttribute("src", `../_shared/assets/amplifier-icons/${allTeams[currentTeamIndex + i].silverAmplifier}.png`)
                currentContainer.children[3].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${allTeams[currentTeamIndex + i].goldAmplifier}.png`)
                currentContainer.children[3].children[2].setAttribute("src", `../_shared/assets/amplifier-icons/${allTeams[currentTeamIndex + i].prismaticAmplifier}.png`)
            } else if (i !== 0) {
                currentContainer.children[3].style.display = "none"
            } else if (i === 0) {
                title.innerText = allTeams[currentTeamIndex].teamName
            }
        }
    }

    // Display amps on the big screen
    if (allTeams[currentTeamIndex].silverAmplifier && allTeams[currentTeamIndex].goldAmplifier && allTeams[currentTeamIndex].prismaticAmplifier) {
        revealTileContainer.children[0].setAttribute("src", `../_shared/assets/amplifier-tiles/${allTeams[currentTeamIndex].silverAmplifier}.png`)
        revealTileContainer.children[1].setAttribute("src", `../_shared/assets/amplifier-tiles/${allTeams[currentTeamIndex].goldAmplifier}.png`)
        revealTileContainer.children[2].setAttribute("src", `../_shared/assets/amplifier-tiles/${allTeams[currentTeamIndex].prismaticAmplifier}.png`)
    } else {
        revealTileContainer.children[0].setAttribute("src", `static/mystery-tiles/silver-mystery-tile.png`)
        revealTileContainer.children[1].setAttribute("src", `static/mystery-tiles/gold-mystery-tile.png`)
        revealTileContainer.children[2].setAttribute("src", `static/mystery-tiles/prismatic-mystery-tile.png`)
    }   
}

// Roll Amplifiers
function rollAmplifiers() {
    if (allTeams[currentTeamIndex].silverAmplifier && allTeams[currentTeamIndex].goldAmplifier && allTeams[currentTeamIndex].prismaticAmplifier) return
    // Precompute a map of amplifiers to their respective sets for efficient lookup
    const amplifierToSetMap = new Map();
    amplifierSets.forEach((set, index) => {
        set.forEach(amplifier => amplifierToSetMap.set(amplifier, index))
    })

    // Select a random silver amplifier
    const silverAmplifier = silverAmplifiers[Math.floor(Math.random() * silverAmplifiers.length)]
    const silverSetIndex = amplifierToSetMap.get(silverAmplifier)

    let goldAmplifier, prismaticAmplifier
    let goldSetIndex, prismaticSetIndex

    // Find a gold amplifier that is not in the same set as the silver amplifier
    do {
        goldAmplifier = goldAmplifiers[Math.floor(Math.random() * goldAmplifiers.length)]
        goldSetIndex = amplifierToSetMap.get(goldAmplifier)
    } while (goldSetIndex === silverSetIndex)

    // Find a prismatic amplifier that is not in the same set as the silver or gold amplifiers
    do {
        prismaticAmplifier = prismaticAmplifiers[Math.floor(Math.random() * prismaticAmplifiers.length)];
        prismaticSetIndex = amplifierToSetMap.get(prismaticAmplifier)
        console.log(prismaticSetIndex)
        console.log(prismaticAmplifier)
    } while (prismaticSetIndex === silverSetIndex || prismaticSetIndex === goldSetIndex)
    
    allTeams[currentTeamIndex].silverAmplifier = silverAmplifier
    allTeams[currentTeamIndex].goldAmplifier = goldAmplifier
    allTeams[currentTeamIndex].prismaticAmplifier = prismaticAmplifier

    fetch(googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            teamName: allTeams[currentTeamIndex].teamName,
            silverAmp: allTeams[currentTeamIndex].silverAmplifier,
            goldAmp: allTeams[currentTeamIndex].goldAmplifier,
            prismaticAmp: allTeams[currentTeamIndex].prismaticAmplifier
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));

    console.log("go check the sheet now")

    displayTeams()
}

// Show next team
function showNextTeam() {
    currentTeamIndex++
    if (currentTeamIndex === allTeams.length) currentTeamIndex = allTeams.length - 1
    displayTeams()
}

// Show previous team
function showPreviousTeam() {
    currentTeamIndex--
    if (currentTeamIndex < 0) currentTeamIndex = 0
    displayTeams()
}