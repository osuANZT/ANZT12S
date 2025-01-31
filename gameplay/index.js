// Prevent default actions
document.addEventListener("mousedown", function(event) {event.preventDefault()})
document.addEventListener("contextmenu", function(event) {event.preventDefault()})

// Load all teams
let teams
async function getTeams() {
    const response = await fetch("../_data/teams.json")
    const responseJson = await response.json()
    teams = responseJson
}
const findTeam = teamName => teams.find(team => team.team_name === teamName)

// Load osu! api
let osuApi
async function getApi() {
    const response = await fetch("../_data/osu-api.json")
    const responseJson = await response.json()
    osuApi = responseJson.api
}

// Load beatmaps
const roundName = document.getElementById("round-name")
const mappoolBackgroundLarge = document.getElementById("mappool-background-large")
const mappoolBackgroundSmall = document.getElementById("mappool-background-small")
let allBeatmaps
let allBeatmapsJson = []
async function getBeatmaps() {
    const response = await fetch("../_data/beatmaps.json")
    const responseJson = await response.json()
    allBeatmaps = responseJson.beatmaps
    roundName.innerText = `${responseJson.roundName} Match`

    switch (responseJson.roundName) {
        case "RO32": case "RO16":
            bestOfPoints = 9
            break
        case "QF": case "SF": 
            bestOfPoints = 11
            break
        case "F": case "GF":
            bestOfPoints = 13
            break
    }
    firstToPoints = Math.ceil(bestOfPoints / 2)

    generateStars()

    // Set correct background
    if (allBeatmaps.length < 17) {
        mappoolBackgroundLarge.style.display = "none"
        mappoolBackgroundSmall.style.display = "block"
    }

    for (let i = 0; i < allBeatmaps.length; i++) {
        // Set mod number
        let modNumber = 0
        if (allBeatmaps[i].mod === "HR") modNumber = 16
        else if (allBeatmaps[i].mod === "DT") modNumber = 64
        
        // Get API response
        const response = await fetch("https://corsproxy.io/?" + encodeURIComponent(`https://osu.ppy.sh/api/get_beatmaps?k=${osuApi}&b=${allBeatmaps[i].beatmapId}&mods=${modNumber}`))
        await delay(1000)
        let responseJson = await response.json()
        allBeatmapsJson.push(responseJson[0])
    }
}

// Generate stars
const leftPointsContainer = document.getElementById("left-points-container")
const rightPointsContainer = document.getElementById("right-points-container")
let leftPoints = 0, rightPoints = 0, firstToPoints = 0, bestOfPoints = 0
async function generateStars() {
    leftPointsContainer.innerHTML = ""
    rightPointsContainer.innerHTML = ""

    let i = 0
    for (i; i < leftPoints; i++) createStar(leftPointsContainer, true)
    for (i; i < firstToPoints; i++) createStar(leftPointsContainer, false)

    i = 0
    for (i; i < rightPoints; i++) createStar(rightPointsContainer, true)
    for (i; i < firstToPoints; i++) createStar(rightPointsContainer, false)
}

// Create Star
{/* <div class="individual-point-container"><img class="position-absolute-exact-middle" src="static/points/full.png"></div> */}
function createStar(parent, full) {
    // Individual Point Container
    const individualPointContainer = document.createElement("div")
    individualPointContainer.classList.add("individual-point-container")

    // Star
    const point = document.createElement("img")
    point.classList.add("position-absolute-exact-middle")
    point.setAttribute("src", `static/points/${full? "full": "empty"}.png`)

    individualPointContainer.append(point)
    parent.append(individualPointContainer)
}

// Initisalise
async function initialise() {
    await getTeams()
    await getApi()
    await getBeatmaps()
}
initialise()

// Socket
const socket = createTosuWsSocket()

// Team Names 
const leftTeamNameEl = document.getElementById("left-team-name")
const rightTeamNameEl = document.getElementById("right-team-name")
let leftTeamName, rightTeamName

// Team Amplifier Container
const leftTeamAmpsContainer = document.getElementById("left-team-amps-container")
const rightTeamAmpsContainer = document.getElementById("right-team-amps-container")

// Chat Display
const chatDisplay = document.getElementById("chat-display")
let chatLen = 0

socket.onmessage = event => {
    const data = JSON.parse(event.data)
    
    // Team names
    if (leftTeamName !== data.tourney.manager.teamName.left && teams) {
        leftTeamName = data.tourney.manager.teamName.left
        leftTeamNameEl.innerText = leftTeamName

        leftTeamAmpsContainer.innerHTML = ""
        const team = findTeam(leftTeamName)
        if (team) {
            ["silver_amp", "gold_amp", "pris_amp"].forEach(amplifier => {
                const amplifierImage = document.createElement("img")
                amplifierImage.classList.add("team-amps")
                amplifierImage.setAttribute("src", `../_shared/assets/amplifier-icons/${team[amplifier]}.png`)
                leftTeamAmpsContainer.append(amplifierImage)
            })
        }
    }
    if (rightTeamName !== data.tourney.manager.teamName.right && teams) {
        rightTeamName = data.tourney.manager.teamName.right
        rightTeamNameEl.innerText = rightTeamName

        rightTeamAmpsContainer.innerHTML = ""
        const team = findTeam(rightTeamName)
        if (team) {
            ["silver_amp", "gold_amp", "pris_amp"].forEach(amplifier => {
                const amplifierImage = document.createElement("img")
                amplifierImage.classList.add("team-amps")
                amplifierImage.setAttribute("src", `../_shared/assets/amplifier-icons/${team[amplifier]}.png`)
                rightTeamAmpsContainer.append(amplifierImage)
            })
        }
    }

    // // Chat Stuff
    // // This is also mostly taken from Victim Crasher: https://github.com/VictimCrasher/static/tree/master/WaveTournament
    // if (chatLen !== data.tourney.manager.chat.length) {
    //     (chatLen === 0 || chatLen > data.tourney.manager.chat.length) ? (chatDisplay.innerHTML = "", chatLen = 0) : null
    //     const fragment = document.createDocumentFragment()

    //     for (let i = chatLen; i < data.tourney.manager.chat.length; i++) {
    //         const chatColour = data.tourney.manager.chat[i].team

    //         // Chat message container
    //         const chatMessageContainer = document.createElement("div")
    //         chatMessageContainer.classList.add("chatMessageContainer")

    //         // Time
    //         const chatDisplayTime = document.createElement("div")
    //         chatDisplayTime.classList.add("chatDisplayTime")
    //         chatDisplayTime.innerText = data.tourney.manager.chat[i].time

    //         // Whole Message
    //         const chatDisplayWholeMessage = document.createElement("div")
    //         chatDisplayWholeMessage.classList.add("chatDisplayWholeMessage")  
            
    //         // Name
    //         const chatDisplayName = document.createElement("span")
    //         chatDisplayName.classList.add("chatDisplayName")
    //         chatDisplayName.classList.add(chatColour)
    //         chatDisplayName.innerText = data.tourney.manager.chat[i].name + ": ";

    //         // Message
    //         const chatDisplayMessage = document.createElement("span")
    //         chatDisplayMessage.classList.add("chatDisplayMessage")
    //         chatDisplayMessage.innerText = data.tourney.manager.chat[i].messageBody

    //         chatDisplayWholeMessage.append(chatDisplayName, chatDisplayMessage)
    //         chatMessageContainer.append(chatDisplayTime, chatDisplayWholeMessage)
    //         fragment.append(chatMessageContainer)
    //     }

    //     chatDisplay.append(fragment)
    //     chatLen = data.tourney.manager.chat.length;
    //     chatDisplay.scrollTop = chatDisplay.scrollHeight;
    // }
}