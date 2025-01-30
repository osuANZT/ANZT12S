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
    roundName.innerText = `${responseJson.roundName} Mappool`

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

        createBeatmapPanel(allBeatmaps[i], responseJson[0])
    }
}

// Initisalise
async function initialise() {
    await getTeams()
    await getApi()
    await getBeatmaps()
}
initialise()

// Create beatmap panel
const mappoolSection = document.getElementById("mappool-section")
function createBeatmapPanel(allBeatmapsInfo, jsonInfo) {
    // Create panel
    const panel = document.createElement("div")
    panel.classList.add("panel")
    panel.addEventListener("mousedown", mapClickEvent)
    panel.addEventListener("contextmenu", function(event) {event.preventDefault()})
    panel.dataset.id = jsonInfo.beatmap_id

    // Create panel background
    const panelBackground = document.createElement("img")
    panelBackground.classList.add("panel-background")
    panelBackground.setAttribute("src", "static/panel-assets/background.png")

    // Create Panel Song Background
    const panelSongBackground = document.createElement("div")
    panelSongBackground.classList.add("panel-song-background")
    panelSongBackground.style.backgroundImage = `url("https://assets.ppy.sh/beatmaps/${jsonInfo.beatmapset_id}/covers/cover.jpg")`

    // Create Panel Gradient
    const panelGradient = document.createElement("img")
    panelGradient.classList.add("panel-gradient")
    panelGradient.setAttribute("src", "static/panel-assets/gradient.png")

    // Create panel metadata
    const panelMetadata = document.createElement("section")
    panelMetadata.classList.add("panel-metadata")
    // Create Song Name
    const panelSongName = document.createElement("div")
    panelSongName.classList.add("panel-song-name")
    panelSongName.innerText = jsonInfo.title
    // Create Panel Artist
    const panelArtist = document.createElement("div")
    panelArtist.classList.add("panel-artist")
    panelArtist.innerText = jsonInfo.artist
    // Create Difficulty
    const panelDifficulty = document.createElement("div")
    panelDifficulty.classList.add("panel-difficulty")
    panelDifficulty.innerText = `[${jsonInfo.version}]`
    // Create Mapper
    const panelMapper = document.createElement("div")
    panelMapper.classList.add("panel-mapper")
    panelMapper.innerText = jsonInfo.creator
    // Panel SR / BPM
    const panelSrBpm = document.createElement("div")
    panelSrBpm.classList.add("panel-sr-bpm")
    // Panel SR
    const panelSr = document.createElement("span")
    panelSr.classList.add("panel-sr")
    panelSr.innerText = `${Math.round(Number(jsonInfo.difficultyrating) * 100) / 100}*`

    // Panel Mod Icon
    const panelModIcon = document.createElement("img")
    panelModIcon.classList.add("panel-mod-icon")
    panelModIcon.setAttribute("src", `../_shared/assets/mod-icons/${allBeatmapsInfo.mod}${allBeatmapsInfo.order}.png`)

    // Panel Picked
    const panelPicked = document.createElement("div")
    panelPicked.classList.add("panel-picked")
    // Panel Picked Amp
    const panelPickedAmp = document.createElement("div")
    panelPickedAmp.classList.add("position-absolute-exact-middle", "panel-picked-amp")
    // White Reflect Image
    const panelWhiteReflect = document.createElement("img")
    panelWhiteReflect.classList.add("panel-white-reflect")
    panelWhiteReflect.setAttribute("src", "static/panel-assets/white reflect.png")
    // Panel Picked Map Image
    const panelPickedMapImage = document.createElement("img")
    panelPickedMapImage.classList.add("position-absolute-exact-middle", "panel-picked-amp-image")
    panelPickedMapImage.setAttribute("src", "../_shared/assets/amplifier-icons/transparent.png")

    // Panel Pick Ban Won
    const panelPickBanWon = document.createElement("div")
    panelPickBanWon.classList.add("panel-pick-ban-won")

    // Append everything together
    panelSrBpm.append(panelSr, ` / ${jsonInfo.bpm}bpm`)
    panelPickedAmp.append(panelWhiteReflect)
    panelPicked.append(panelPickedAmp, panelPickedMapImage)
    panelMetadata.append(panelSongName, panelArtist, panelDifficulty, panelMapper)
    panel.append(panelBackground, panelSongBackground, panelGradient, panelMetadata, panelSrBpm, panelModIcon, panelPicked, panelPickBanWon)
    mappoolSection.append(panel)
}

// Map Click Event
let lastTeamPick
function mapClickEvent(event) {
    // Team
    let team
    if (event.button === 0) team = "red"
    else if (event.button === 2) team = "blue"
    if (!team) return

    // Action
    let action = "pick"
    if (event.ctrlKey) action = "ban"
    if (event.shiftKey) action = "reset"

    // Resetting
    if (action === "reset") {
        this.children[6].style.display = "none"
        this.children[6].children[1].setAttribute("src", "../_shared/assets/amplifier-icons/transparent.png")
        this.children[7].innerHTML = ""
    }

    // Anything else
    if (action !== "reset") {
        this.children[6].style.display = "block"
        this.children[7].style.display = "block"
        
        if (action === "pick") {
            const parent = this.children[7]
            const elementsToRemove = []
            
            if (parent.childElementCount > 0) {
                Array.from(parent.children).forEach(element => {
                    const src = element.getAttribute("src")
                    if (src && (src.includes("ban") || src.includes("pick"))) {
                        elementsToRemove.push(element)
                    }
                })
                
                // Remove elements after iteration to avoid modification issues
                elementsToRemove.forEach(element => parent.removeChild(element))
            }
        } else {
            this.children[7].innerHTML = ""
        }

        // Create image
        const pickBanImage = document.createElement("img")
        pickBanImage.setAttribute("src", `static/panel-assets/bottom-assets/${team} ${action}.png`)
        this.children[7].append(pickBanImage)
        this.dataset.pickban = action
        this.dataset.team = team
    }
}

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

    // Chat Stuff
    // This is also mostly taken from Victim Crasher: https://github.com/VictimCrasher/static/tree/master/WaveTournament
    if (chatLen !== data.tourney.manager.chat.length) {
        (chatLen === 0 || chatLen > data.tourney.manager.chat.length) ? (chatDisplay.innerHTML = "", chatLen = 0) : null
        const fragment = document.createDocumentFragment()

        for (let i = chatLen; i < data.tourney.manager.chat.length; i++) {
            const chatColour = data.tourney.manager.chat[i].team

            // Chat message container
            const chatMessageContainer = document.createElement("div")
            chatMessageContainer.classList.add("chatMessageContainer")

            // Time
            const chatDisplayTime = document.createElement("div")
            chatDisplayTime.classList.add("chatDisplayTime")
            chatDisplayTime.innerText = data.tourney.manager.chat[i].time

            // Whole Message
            const chatDisplayWholeMessage = document.createElement("div")
            chatDisplayWholeMessage.classList.add("chatDisplayWholeMessage")  
            
            // Name
            const chatDisplayName = document.createElement("span")
            chatDisplayName.classList.add("chatDisplayName")
            chatDisplayName.classList.add(chatColour)
            chatDisplayName.innerText = data.tourney.manager.chat[i].name + ": ";

            // Message
            const chatDisplayMessage = document.createElement("span")
            chatDisplayMessage.classList.add("chatDisplayMessage")
            chatDisplayMessage.innerText = data.tourney.manager.chat[i].messageBody

            chatDisplayWholeMessage.append(chatDisplayName, chatDisplayMessage)
            chatMessageContainer.append(chatDisplayTime, chatDisplayWholeMessage)
            fragment.append(chatMessageContainer)
        }

        chatDisplay.append(fragment)
        chatLen = data.tourney.manager.chat.length;
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
}