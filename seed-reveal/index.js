// Get seeding information
let allTeams = []
async function getAllTeams() {
    const response = await fetch("../_data/qualifier-results.json")
    allTeams = await response.json()
    allTeams = allTeams.sort((a, b) => b.seed - a.seed)

    // Display first team
    displayTeam()
}
getAllTeams()

// Display Team
const teamName = document.getElementById("team-name")
const playerNames = document.getElementById("player-names")
const seed = document.getElementById("seed")
const nmModScoreContainer = document.getElementById("nm-mod-score-container")
const hdModScoreContainer = document.getElementById("hd-mod-score-container")
const hrModScoreContainer = document.getElementById("hr-mod-score-container")
const dtModScoreContainer = document.getElementById("dt-mod-score-container")
const modResultsContainer = document.getElementById("mod-results-container")
let teamCounter = 0
function displayTeam() {
    const currentTeam = allTeams[teamCounter]
    
    // Team information
    teamName.innerText = currentTeam.teamName
    playerNames.innerText = `${currentTeam.player1} / ${currentTeam.player2}`
    seed.innerText = `#${currentTeam.seed}`

    // NM maps
    displayScore(nmModScoreContainer.children[0], currentTeam.nm1Rank, currentTeam.nm1Score)
    displayScore(nmModScoreContainer.children[1], currentTeam.nm2Rank, currentTeam.nm2Score)
    displayScore(nmModScoreContainer.children[2], currentTeam.nm3Rank, currentTeam.nm3Score)
    displayScore(nmModScoreContainer.children[3], currentTeam.nm4Rank, currentTeam.nm4Score)
    // HD maps
    displayScore(hdModScoreContainer.children[0], currentTeam.hd1Rank, currentTeam.hd1Score)
    displayScore(hdModScoreContainer.children[1], currentTeam.hd2Rank, currentTeam.hd2Score)
    displayScore(hdModScoreContainer.children[2], currentTeam.hd3Rank, currentTeam.hd3Score)
    // HR maps
    displayScore(hrModScoreContainer.children[0], currentTeam.hr1Rank, currentTeam.hr1Score)
    displayScore(hrModScoreContainer.children[1], currentTeam.hr2Rank, currentTeam.hr2Score)
    displayScore(hrModScoreContainer.children[2], currentTeam.hr3Rank, currentTeam.hr3Score)
    // DT maps
    displayScore(dtModScoreContainer.children[0], currentTeam.dt1Rank, currentTeam.dt1Score)
    displayScore(dtModScoreContainer.children[1], currentTeam.dt2Rank, currentTeam.dt2Score)
    displayScore(dtModScoreContainer.children[2], currentTeam.dt3Rank, currentTeam.dt3Score)

    // Display mod results
    displayModResults(modResultsContainer.children[0], currentTeam.nmTotalRank)
    displayModResults(modResultsContainer.children[1], currentTeam.hdTotalRank)
    displayModResults(modResultsContainer.children[2], currentTeam.hrTotalRank)
    displayModResults(modResultsContainer.children[3], currentTeam.dtTotalRank)
}

/* Display Scores */
function displayScore(element, rank, score) {
    element.children[1].innerText = `#${rank}`
    element.children[2].innerText = score.toLocaleString()
}

/* Display Mod Results */
function displayModResults(element, rank) {
    element.children[1].innerText = `#${rank}`
}

/* Show Team */
function showTeam(direction) {
    teamCounter += direction
    if (teamCounter > allTeams.length - 1) teamCounter = allTeams.length - 1
    else if (teamCounter < 0) teamCounter = 0
    displayTeam()
}