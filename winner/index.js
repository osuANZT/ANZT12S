// Load all teams
let teams
async function getTeams() {
    const response = await fetch("../_data/amplifier-rolls-teams.json")
    const responseJson = await response.json()
    teams = responseJson
}
const findTeam = teamName => teams.find(team => team.team_name === teamName)
getTeams()


// Teams
const leftTeamEl = document.getElementById("left-team")
const rightTeamEl = document.getElementById("right-team")
const roundNameEl = document.getElementById("round-name")
let leftTeamName, rightTeamName, winnerTeamName, round
setTimeout(() => {
    leftTeamName = getCookie("leftTeamName")
    rightTeamName = getCookie("rightTeamName")
    winnerTeamName = getCookie("winnerTeamName")
    round = getCookie("round")

    leftTeamEl.children[0].innerText = leftTeamName
    rightTeamEl.children[0].innerText = rightTeamName

    const leftTeam = findTeam(leftTeamName)
    const rightTeam = findTeam(rightTeamName)

    leftTeamEl.children[1].children[0].innerText = leftTeam.player1Name
    leftTeamEl.children[1].children[1].innerText = leftTeam.player2Name

    leftTeamEl.children[1].children[0].innerText = rightTeam.player1Name
    rightTeamEl.children[1].children[1].innerText = rightTeam.player2Name

    if (winnerTeamName === leftTeamName) {
        leftTeamEl.classList.add("winning-team")
        leftTeamEl.classList.remove("losing-team")
        rightTeamEl.classList.rmeove("winning-team")
        rightTeamEl.classList.add("losing-team")
    } else if (winnerTeamName === rightTeamName) {
        leftTeamEl.classList.remove("winning-team")
        leftTeamEl.classList.add("losing-team")
        rightTeamEl.classList.add("winning-team")
        rightTeamEl.classList.remove("losing-team")
    } else {
        leftTeamEl.classList.remove("winning-team")
        leftTeamEl.classList.remove("losing-team")
        rightTeamEl.classList.remove("winning-team")
        rightTeamEl.classList.remove("losing-team")
    }

    roundNameEl.innerText = `${round.toUpperCase()} Match`
}, 200)