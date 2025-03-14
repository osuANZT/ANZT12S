// Amplifiers
let amplifiers
async function getAmplifiers() {
    const response = await fetch("../_data/amplifiers.json")
    const responseJson = await response.json()
    amplifiers = responseJson
}

// Prevent default actions
const main = document.getElementById("main")
main.addEventListener("mousedown", function(event) {event.preventDefault()})
main.addEventListener("contextmenu", function(event) {event.preventDefault()})

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
        const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=` + encodeURIComponent(`https://osu.ppy.sh/api/get_beatmaps?k=${osuApi}&b=${allBeatmaps[i].beatmapId}&mods=${modNumber}`))
        await delay(1000)
        let responseJson = await response.json()
        allBeatmapsJson.push(responseJson[0])

        createBeatmapPanel(allBeatmaps[i], responseJson[0])
        createSidebarButton(allBeatmaps[i])
    }
}

// Initisalise
async function initialise() {
    await getAmplifiers()
    await getTeams()
    await getApi()

    while (!osuApi) {
        await delay(1000)
    }
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
const findMapInMappool = beatmapId => allBeatmapsJson.find(beatmap => beatmap.beatmapId === beatmapId)

// Map Click Event
let currentPickTile
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
            currentPickTile = this
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

// Create Sidebar Button for Map
const sidebarSelectListContainer = document.getElementById("sidebar-select-list-container")
function createSidebarButton(beatmap) {
    const sidebarButton = document.createElement("div")
    sidebarButton.innerText = `${beatmap.mod}${beatmap.order}`
    sidebarButton.addEventListener("click", setSidebarMap)
    sidebarButton.dataset.sidebarMapId = beatmap.beatmapId
    console.log(sidebarButton)
    sidebarSelectListContainer.append(sidebarButton)
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

// Beatmap information
let mapId, mapMd5

// IPC State
let currentIPCState
let checkedForWinner = true

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

    // Beatmap 
    if (mapId !== data.menu.bm.id || mapMd5 !== data.menu.bm.md5) {
        mapId = data.menu.bm.id
        mapMd5 = data.menu.bm.md5

        if (autoPickerOn) {
            // Find button to click on
            let element = document.querySelector(`[data-id="${mapId}"]`)

            // Check if autopicked already
            if (!element.hasAttribute("data-is-autopicked") || element.getAttribute("data-is-autopicked") !== "true") {
                const event = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    button: (nextAutoPicker === "Red")? 0 : 2
                })
                element.dispatchEvent(event)
                element.setAttribute("data-is-autopicked", "true")

                if (nextAutoPicker === "Red") {
                    setNextAutoPicker("Blue")
                } else if (nextAutoPicker === "Blue") {
                    setNextAutoPicker("Red")
                }
            }
        }
    }

    // IPC State
    if (currentIPCState !== data.tourney.manager.ipcState) {
        currentIPCState = data.tourney.manager.ipcState
        if (currentIPCState === 4) {
            checkedForWinner = false
        } else {
            checkedForWinner = true
        }
    }
}

let currentWinner
let amplifierId
let amplifierTeam
setInterval(() => {
    currentWinner = getCookie('currentWinner')
    amplifierId = Number(getCookie('amplifierId'))
    amplifierTeam = getCookie('amplifierTeam')
    leftPoints = Number(getCookie('currentLeftPoints'))
    rightPoints = Number(getCookie('currentRightPoints'))
    firstToPoints = Number(getCookie('currentFirstToPoints'))
    bestOfPoints = Number(getCookie('currentBestOfPoints'))
    generatePoints()

    const team = getCookie("currentWinner")
    if (!checkedForWinner && currentPickTile) {
        const parent = currentPickTile.children[7]
        const elementsToRemove = []
        
        if (parent.childElementCount > 0) {
            Array.from(parent.children).forEach(element => {
                const src = element.getAttribute("src")
                if (src && src.includes("won")) elementsToRemove.push(element)
            })
            
            // Remove elements after iteration to avoid modification issues
            elementsToRemove.forEach(element => parent.removeChild(element))
        }

        const pickBanImage = document.createElement("img")
        pickBanImage.setAttribute("src", `static/panel-assets/bottom-assets/${team} won.png`)
        currentPickTile.children[7].append(pickBanImage)

        // Set amplifier
        if (amplifierTeam === "red") {
            currentPickTile.children[6].children[0].style.display = "block"
            currentPickTile.children[6].children[0].classList.add("left-panel-picked-amp")
            currentPickTile.children[6].children[0].classList.remove("right-panel-picked-amp")
        } else if (amplifierTeam === "blue") {
            currentPickTile.children[6].children[0].style.display = "block"
            currentPickTile.children[6].children[0].classList.remove("left-panel-picked-amp")
            currentPickTile.children[6].children[0].classList.add("right-panel-picked-amp")
        }
        currentPickTile.children[6].children[0].children[0].style.display = "block"
        currentPickTile.children[6].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${amplifierId}.png`)

        checkedForWinner = true
    }
}, 200)

// Points
const leftPointsContainer = document.getElementById("left-points-container")
const rightPointsContainer = document.getElementById("right-points-container")
let leftPoints, rightPoints, firstToPoints, bestOfPoints

// Generate points
async function generatePoints() {
    leftPointsContainer.innerHTML = ""
    rightPointsContainer.innerHTML = ""

    let i = 0
    for (i; i < leftPoints; i++) createPoint(leftPointsContainer, true)
    for (i; i < firstToPoints; i++) createPoint(leftPointsContainer, false)

    i = 0
    for (i; i < rightPoints; i++) createPoint(rightPointsContainer, true)
    for (i; i < firstToPoints; i++) createPoint(rightPointsContainer, false)
}

// Create point
function createPoint(parent, full) {
    // Individual Point Container
    const individualPointContainer = document.createElement("div")
    individualPointContainer.classList.add("individual-point-container")

    // Point
    const point = document.createElement("img")
    point.classList.add("position-absolute-exact-middle")
    point.setAttribute("src", `static/points/${full? "full": "empty"}.png`)

    individualPointContainer.append(point)
    parent.append(individualPointContainer)
}

// Set next auto picker
const nextAutoPickerEl = document.getElementById("next-auto-picker")
let nextAutoPicker = "Red"
function setNextAutoPicker(colour) {
    nextAutoPickerEl.innerText = colour
    nextAutoPicker = colour
}

// Toggle Auto picker
const toggleAutoPickButtonEl = document.getElementById("toggle-auto-pick-button")
let autoPickerOn = false
function toggleAutoPick() {
    autoPickerOn = !autoPickerOn
    if (!autoPickerOn) {
        toggleAutoPickButtonEl.innerText = "Toggle Auto Pick: OFF"
    } else {
        toggleAutoPickButtonEl.innerText = "Toggle Auto Pick: ON"
    }
}

// Sidebar Set Map
let currentSidebarMapId
function setSidebarMap() {
    currentSidebarMapId = this.dataset.sidebarMapId
    for (let i = 0; i < sidebarSelectListContainer.childElementCount; i++) {
        sidebarSelectListContainer.children[i].style.backgroundColor = "transparent"
        if (sidebarSelectListContainer.children[i].dataset.sidebarMapId == currentSidebarMapId) {
            sidebarSelectListContainer.children[i].style.backgroundColor = "lightgray"
        }
    }
}

// Select Action
const pickBanManagement = document.getElementById("pick-ban-management")
let currentSidebarAction
function updateSidebarSelect(element) {
    while (pickBanManagement.childElementCount > 5) {
        pickBanManagement.removeChild(pickBanManagement.lastElementChild)
    }
    currentSidebarAction = element.value
    currentSidebarTeam = undefined
    currentSidebarAmplifierId = undefined

    if (currentSidebarAction === "addBan" || currentSidebarAction === "addPick" || currentSidebarAction === "addWinner") {
        // Title
        const createTeamTitle = document.createElement("div")
        createTeamTitle.innerText = "Which Team?"
        createTeamTitle.classList.add("sidebar-title")

        // Add teams
        const select = document.createElement("select")
        select.classList.add("sidebar-select-list-container")
        select.setAttribute("id", "sidebar-select-team-container")
        select.setAttribute("size", 2)
        select.setAttribute("onchange", "updateTeam(this)")
        const optionRed = document.createElement("option")
        optionRed.setAttribute("value", "red")
        optionRed.innerText = "Red"
        const optionBlue = document.createElement("option")
        optionBlue.setAttribute("value", "blue")
        optionBlue.innerText = "Blue"

        select.append(optionRed, optionBlue)
        pickBanManagement.append(createTeamTitle, select)
    }

    if (currentSidebarAction === "addAmplifier") {
        // Create something to set the amplifiers for each team involved
        const createTeamTitle = document.createElement("div")
        createTeamTitle.innerText = "Which Team?"
        createTeamTitle.classList.add("sidebar-title")

        // Create Select
        const select = document.createElement("select")
        select.classList.add("sidebar-select-list-container")
        select.setAttribute("id", "sidebar-select-amp-container")
        select.setAttribute("size", 6)
        select.setAttribute("onchange", "updateAmplifier(this)")
        // Set Amplifiers
        const leftTeam = findTeam(leftTeamName)
        const rightTeam = findTeam(rightTeamName)
        const ampTypes = ["silver_amp", "gold_amp", "pris_amp"]
        
        ampTypes.forEach(amp => {
            const amplifierOption = document.createElement("option");
            const ampId = leftTeam[amp];
            amplifierOption.setAttribute("value", `red|${ampId}`);
            amplifierOption.innerText = `${amplifiers[ampId].name} - Red`;
            select.append(amplifierOption);
        });
        ampTypes.forEach(amp => {
            const amplifierOption = document.createElement("option")
            const ampId = rightTeam[amp]
            amplifierOption.setAttribute("value", `blue|${ampId}`)
            amplifierOption.innerText = `${amplifiers[ampId].name} - Blue`
            select.append(amplifierOption)
        })

        pickBanManagement.append(createTeamTitle, select)
    }

    // Apply Changes Button
    const applyButtonContainer = document.createElement("div")
    applyButtonContainer.classList.add("sidebar-button-container")
    const applyButton = document.createElement("button")
    applyButton.classList.add("amplifier-selection-button")
    applyButton.innerText = "Apply Changes"
    applyButtonContainer.append(applyButton)

    switch (currentSidebarAction) {
        case "addBan":
            applyButton.setAttribute("onclick", "addBan()")
            break
        case "removeBan":
            applyButton.setAttribute("onclick", "removeBan()")
            break
        case "addPick":
            applyButton.setAttribute("onclick", "addPick()")
            break
        case "removePick":
            applyButton.setAttribute("onclick", "removePick()")
            break
        case "addWinner":
            applyButton.setAttribute("onclick", "addWinner()")
            break
        case "removeWinner":
            applyButton.setAttribute("onclick", "removeWinner()")
            break
        case "addAmplifier":
            applyButton.setAttribute("onclick", "addAmplifier()")
            break
        case "removeAmplifier":
            applyButton.setAttribute("onclick", "removeAmplifier()")
            break
    }
    pickBanManagement.append(applyButtonContainer)
}

// Get team
let currentSidebarTeam
function updateTeam(element) {
    currentSidebarTeam = element.value
}

// Update amplifier
let currentSidebarAmplifierId
function updateAmplifier(element) {
    currentSidebarTeam = element.value.split("|")[0]
    currentSidebarAmplifierId = Number(element.value.split("|")[1])
}

// Add bans
function addBan() {
    if (!currentSidebarTeam || !currentSidebarMapId) return
    
    // Set the ban
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    element.children[6].style.display = "block"
    element.children[6].children[0].style.display = "none"
    element.children[7].innerText = ""

    // Create ban
    const image = document.createElement("img")
    image.setAttribute("src", `static/panel-assets/bottom-assets/${currentSidebarTeam} ban.png`)
    element.children[7].append(image)
}

// Remove Bans
function removeBan() {
    if (!currentSidebarMapId) return

    // Remove all bans
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    const parent = element.children[7]
    const elementsToRemove = []
    
    if (parent.childElementCount > 0) {
        Array.from(parent.children).forEach(element => {
            const src = element.getAttribute("src")
            if (src && src.includes("ban")) {
                elementsToRemove.push(element)
            }
        })
        
        // Remove elements after iteration to avoid modification issues
        elementsToRemove.forEach(element => parent.removeChild(element))
    }

    // Check if there are any picks
    if (parent.childElementCount === 0) {
        element.children[6].style.display = "none"
    }
}

// Add pick
function addPick() {
    if (!currentSidebarTeam || !currentSidebarMapId) return

    // Set the pick
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    element.children[6].style.display = "block"

    // Remove all bans
    const parent = element.children[7]
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

    // Create pick
    const image = document.createElement("img")
    image.setAttribute("src", `static/panel-assets/bottom-assets/${currentSidebarTeam} pick.png`)
    element.children[7].append(image)
}

// Remove pick
function removePick() {
    if (!currentSidebarMapId) return

    // Remove all bans
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    const parent = element.children[7]
    const elementsToRemove = []
    
    if (parent.childElementCount > 0) {
        Array.from(parent.children).forEach(element => {
            const src = element.getAttribute("src")
            if (src && (src.includes("pick") || src.includes("won"))) {
                elementsToRemove.push(element)
            }
        })
        
        // Remove elements after iteration to avoid modification issues
        elementsToRemove.forEach(element => parent.removeChild(element))
    }

    // Check if there are any picks
    if (parent.childElementCount === 0) {
        element.children[6].style.display = "none"
    }
}

// Add Winner
function addWinner() {
    if (!currentSidebarTeam || !currentSidebarMapId) return

    // Remove other winner elements
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    const parent = element.children[7]
    const elementsToRemove = []
    if (parent.childElementCount > 0) {
        Array.from(parent.children).forEach(element => {
            const src = element.getAttribute("src")
            if (src && src.includes("won")) {
                elementsToRemove.push(element)
            }
        })
        
        // Remove elements after iteration to avoid modification issues
        elementsToRemove.forEach(element => parent.removeChild(element))
    }

    // Create winner
    element.children[6].style.display = "block"
    const image = document.createElement("img")
    image.setAttribute("src", `static/panel-assets/bottom-assets/${currentSidebarTeam} won.png`)
    element.children[7].append(image)
}

// Remove winner
function removeWinner() {
    if (!currentSidebarMapId) return

    // Remove other winner elements
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    const parent = element.children[7]
    const elementsToRemove = []
    if (parent.childElementCount > 0) {
        Array.from(parent.children).forEach(element => {
            const src = element.getAttribute("src")
            if (src && src.includes("won")) {
                elementsToRemove.push(element)
            }
        })
        
        // Remove elements after iteration to avoid modification issues
        elementsToRemove.forEach(element => parent.removeChild(element))
    }
}

// Add Amplifier
function addAmplifier() {
    if (!currentSidebarTeam || !currentSidebarMapId || !currentSidebarAmplifierId) return

    // Need to add pick before adding amplifier
    addPick()

    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    element.children[6].style.display = "block"
    element.children[6].children[0].style.display = "block"
    element.children[6].children[0].classList.add(`${(currentSidebarTeam === "red")? "left" : "right"}-panel-picked-amp`)
    element.children[6].children[0].classList.remove(`${(currentSidebarTeam === "red")? "right" : "left"}-panel-picked-amp`)
    element.children[6].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${currentSidebarAmplifierId}.png`)
}

// Remove Amplifier
function removeAmplifier() {
    if (!currentSidebarMapId) return
    const element = document.querySelector(`[data-id="${currentSidebarMapId}"]`)
    element.children[6].children[0].style.display = "none"
    element.children[6].children[0].classList.remove("left-panel-picked-map", "right-panel-picked-map")
    element.children[6].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/transparent.png`)
}