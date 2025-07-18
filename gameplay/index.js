// Amplifiers
let amplifiers
async function getAmplifiers() {
    const response = await fetch("../_data/amplifiers.json")
    const responseJson = await response.json()
    amplifiers = responseJson
}
const silverAmplifiers = [1, 4, 7, 11, 14, 19, 22, 24, 25, 28, 33, 38]
const goldAmplifiers = [8, 2, 5, 10, 12, 15, 20, 23, 26, 27, 29, 31, 34, 36, 37, 39, 40]
const prismaticAmplifiers = [9, 3, 6, 13, 16, 17, 18, 21, 30, 32, 35, 41]
const ampsThatUseApi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 35, 37,38, 39, 41]

// Get API Address
let address
async function getAddress() {
    const response = await fetch("../_data/api-address.json")
    const responseJson = await response.json()
    address = responseJson.address
}

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
let allBeatmaps
let allBeatmapsJson = []
async function getBeatmaps() {
    const response = await fetch("../_data/beatmaps.json")
    const responseJson = await response.json()
    allBeatmaps = responseJson.beatmaps
    roundName.innerText = `${responseJson.roundName} Match`
    document.cookie = `round=${responseJson.roundName}; path=/`

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

    generatePoints()

    for (let i = 0; i < allBeatmaps.length; i++) {
        // Set mod number
        let modNumber = 0
        if (allBeatmaps[i].mod === "HR") modNumber = 16
        else if (allBeatmaps[i].mod === "DT") modNumber = 64
        
        // Get API response
        const response = await fetch(`https://corsproxy.io/?` + encodeURIComponent(`https://osu.ppy.sh/api/get_beatmaps?k=${osuApi}&b=${allBeatmaps[i].beatmapId}&mods=${modNumber}`))
        await delay(1000)
        let responseJson = await response.json()
        allBeatmapsJson.push(responseJson[0])
    }
}
const findMapInMappool = beatmapId => allBeatmaps.find(beatmap => beatmap.beatmapId == beatmapId)
const findMapInMappoolJson = beatmapId => allBeatmapsJson.find(beatmap => beatmap.beatmap_id == beatmapId)

// Generate points
const leftPointsContainer = document.getElementById("left-points-container")
const rightPointsContainer = document.getElementById("right-points-container")
let leftPoints = 0, rightPoints = 0, firstToPoints = 0, bestOfPoints = 0
async function generatePoints() {
    leftPointsContainer.innerHTML = ""
    rightPointsContainer.innerHTML = ""

    let i = 0
    for (i; i < leftPoints; i++) createPoint(leftPointsContainer, true)
    for (i; i < firstToPoints; i++) createPoint(leftPointsContainer, false)

    i = 0
    for (i; i < rightPoints; i++) createPoint(rightPointsContainer, true)
    for (i; i < firstToPoints; i++) createPoint(rightPointsContainer, false)

    document.cookie = `currentLeftPoints=${leftPoints}; path=/`
    document.cookie = `currentRightPoints=${rightPoints}; path=/`
    document.cookie = `currentFirstToPoints=${firstToPoints}; path=/`
    document.cookie = `currentBestOfPoints=${bestOfPoints}; path=/`
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

// Adjust points count
function updatePointCount(team, action) {
    if (!toggleStarsCurrent) return
    
    if (team === "red" && action === "plus") leftPoints++
    if (team === "blue" && action === "plus") rightPoints++
    if (team === "red" && action === "minus") leftPoints--
    if (team === "blue" && action === "minus") rightPoints--

    if (leftPoints < 0) leftPoints = 0
    if (rightPoints < 0) rightPoints = 0
    if (leftPoints > firstToPoints) leftPoints = firstToPoints
    if (rightPoints > firstToPoints) rightPoints = firstToPoints

    generatePoints()
}

// Initisalise
async function initialise() {
    await getAmplifiers()
    await getAddress()
    await getTeams()
    await getApi()

    while (!osuApi) {
        await delay(1000)
    }
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

// Song Details
const modImage = document.getElementById("mod-image")
const mapSr = document.getElementById("map-sr")
const mapBpm = document.getElementById("map-bpm")
const mapCs = document.getElementById("map-cs")
const mapAr = document.getElementById("map-ar")
const mapOd = document.getElementById("map-od")
const mapBanner = document.getElementById("map-banner")
const mapSongName = document.getElementById("map-song-name")
const mapArtist = document.getElementById("map-artist")
const mapDifficulty = document.getElementById("map-difficulty")
const mapMapper = document.getElementById("map-mapper")
let mapId, mapMd5, foundMapInMappool = false, mapMaxCombo = 0

// Score visibility
const bottomSection = document.getElementById("bottom-section")
let scoreVisible

// Score
// Score V2
const scorev2Scores = document.getElementById("scorev2-scores")
// Score difference
const leftScoreDifference = document.getElementById("left-score-difference")
const rightScoreDifference = document.getElementById("right-score-difference")
// Score number
const leftScoreNumber = document.getElementById("left-score-number")
const rightScoreNumber = document.getElementById("right-score-number")

// Combos
const comboScores = document.getElementById("combo-scores")
// Combo difference
const leftComboDifference = document.getElementById("left-combo-difference")
const rightComboDifference = document.getElementById("right-combo-difference")
// Combo number
const leftComboNumber = document.getElementById("left-combo-number")
const rightComboNumber = document.getElementById("right-combo-number")

// Accuracy
const accuracyScores = document.getElementById("accuracy-scores")
// Accuracy difference
const leftAccuracyDifference = document.getElementById("left-accuracy-difference")
const rightAccuracyDifference = document.getElementById("right-accuracy-difference")
// Accuracy number
const leftAccuracyNumber = document.getElementById("left-accuracy-number")
const rightAccuracyNumber = document.getElementById("right-accuracy-number")

// Score bar
const leftScoreBar = document.getElementById("left-score-bar")
const rightScoreBar = document.getElementById("right-score-bar")
// Variables
let leftScore = 0, rightScore = 0, scoreDelta = 0

// CountUp
const animation = {
    leftScoreNumber: new CountUp(leftScoreNumber, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    rightScoreNumber: new CountUp(rightScoreNumber, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    leftScoreDifference: new CountUp(leftScoreDifference, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    rightScoreDifference: new CountUp(rightScoreDifference, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    leftComboNumber: new CountUp(leftComboNumber, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "x"}),
    rightComboNumber: new CountUp(rightComboNumber, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "x"}),
    leftComboDifference: new CountUp(leftComboDifference, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "x"}),
    rightComboDifference: new CountUp(rightComboDifference, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "x"}),
    leftAccuracyNumber: new CountUp(leftAccuracyNumber, 0, 0, 2, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "%"}),
    rightAccuracyNumber: new CountUp(rightAccuracyNumber, 0, 0, 2, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "%"}),
    leftAccuracyDifference: new CountUp(leftAccuracyDifference, 0, 0, 2, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "%"}),
    rightAccuracyDifference: new CountUp(rightAccuracyDifference, 0, 0, 2, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." , suffix: "%"})
}

// Chat Display
const chatDisplayOutside = document.getElementById("chat-display-outside")
const chatDisplay = document.getElementById("chat-display")
let chatLen = 0

// IPC State
let ipcState
let chosenWinner = false

// Sidebar Amplifier Selection Control Button Containers
const leftAmplifierSelectionButtonContainer = document.getElementById("left-amplifier-selection-button-container")
const rightAmplifierSelectionButtonContainer = document.getElementById("right-amplifier-selection-button-container")

socket.onmessage = async event => {
    const data = JSON.parse(event.data)
    
    // Team names
    if (leftTeamName !== data.tourney.manager.teamName.left && teams) {
        leftTeamName = data.tourney.manager.teamName.left
        leftTeamNameEl.innerText = leftTeamName

        leftTeamAmpsContainer.innerHTML = ""
        leftAmplifierSelectionButtonContainer.innerHTML = ""
        const team = findTeam(leftTeamName)
        if (team) {
            ["silver_amp", "gold_amp", "pris_amp"].forEach(amplifier => {
                const amplifierImage = document.createElement("img")
                amplifierImage.classList.add("team-amps")
                amplifierImage.setAttribute("src", `../_shared/assets/amplifier-icons/${team[amplifier]}.png`)
                leftTeamAmpsContainer.append(amplifierImage)

                const amplifierButton = document.createElement("button")
                amplifierButton.classList.add("amplifier-selection-button")
                amplifierButton.innerText = amplifiers[team[amplifier]].name
                amplifierButton.setAttribute("onclick", `updateAmplifier('red',${team[amplifier]})`)
                leftAmplifierSelectionButtonContainer.append(amplifierButton)
            })
        }
    }
    if (rightTeamName !== data.tourney.manager.teamName.right && teams) {
        rightTeamName = data.tourney.manager.teamName.right
        rightTeamNameEl.innerText = rightTeamName

        rightTeamAmpsContainer.innerHTML = ""
        rightAmplifierSelectionButtonContainer.innerHTML = ""
        const team = findTeam(rightTeamName)
        if (team) {
            ["silver_amp", "gold_amp", "pris_amp"].forEach(amplifier => {
                const amplifierImage = document.createElement("img")
                amplifierImage.classList.add("team-amps")
                amplifierImage.setAttribute("src", `../_shared/assets/amplifier-icons/${team[amplifier]}.png`)
                rightTeamAmpsContainer.append(amplifierImage)

                const amplifierButton = document.createElement("button")
                amplifierButton.classList.add("amplifier-selection-button")
                amplifierButton.innerText = amplifiers[team[amplifier]].name
                amplifierButton.setAttribute("onclick", `updateAmplifier('blue',${team[amplifier]})`)
                rightAmplifierSelectionButtonContainer.append(amplifierButton)
            })
        }
    }

    // Map details
    if (mapId !== data.menu.bm.id || mapMd5 !== data.menu.bm.md5 && allBeatmapsJson.length === allBeatmaps.length && allBeatmaps.length !== 0) {
        mapId = data.menu.bm.id
        mapMd5 = data.menu.bm.md5
        foundMapInMappool = false

        mapBanner.style.backgroundImage = `url("https://assets.ppy.sh/beatmaps/${data.menu.bm.set}/covers/cover.jpg")`
        mapSongName.innerText = data.menu.bm.metadata.title
        mapArtist.innerText = data.menu.bm.metadata.artist
        mapDifficulty.innerText = data.menu.bm.metadata.difficulty
        mapMapper.innerText = data.menu.bm.metadata.mapper

        const map = findMapInMappoolJson(mapId)
        const mapNonJson = findMapInMappool(mapId)
        if (map) {
            mapSr.innerText = `${Math.round(Number(map.difficultyrating) * 100) / 100}*`
            mapBpm.innerText = `${map.bpm}bpm`
            mapCs.innerText = `cs${map.diff_size}`
            mapAr.innerText = `ar${map.diff_approach}`
            mapOd.innerText = `od${map.diff_overall}`
            modImage.setAttribute('src', `static/mod-backgrounds/${mapNonJson.mod}.png`)
            mapMaxCombo = Number(map.max_combo)
            foundMapInMappool = true
        } else {
            modImage.setAttribute('src', `static/mod-backgrounds/NM.png`)
            delay(250)
        }
    }

    if (!foundMapInMappool) {
        mapSr.innerText = `${Math.round(Number(data.menu.bm.stats.fullSR) * 100) / 100}*`
        mapBpm.innerText = `${data.menu.bm.stats.BPM.common}bpm`

        mapCs.innerText = `cs${data.menu.bm.stats.memoryCS}`
        mapAr.innerText = `ar${data.menu.bm.stats.memoryAR}`
        mapOd.innerText = `od${data.menu.bm.stats.memoryOD}`
        const response = await fetch("https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(`https://osu.ppy.sh/api/get_beatmaps?k=${osuApi}&b=${mapId}`))
        const responseJson = await response.json()
        mapMaxCombo = Number(responseJson[0].max_combo)
        foundMapInMappool = true
    }

    // // Score visibility
    if (scoreVisible !== data.tourney.manager.bools.scoreVisible) {
        scoreVisible = data.tourney.manager.bools.scoreVisible
    
        if (scoreVisible) {
            bottomSection.style.opacity = 1
            chatDisplayOutside.style.opacity = 0
        } else {
            bottomSection.style.opacity = 0
            chatDisplayOutside.style.opacity = 1
        }
    }

    // Score stuff
    if (scoreVisible) {
        const isSpecialAmplifier = [7, 24, 37].includes(amplifierId)

        // Toggle Score Display Modes
        scorev2Scores.style.display = isSpecialAmplifier ? "none" : "block"
        comboScores.style.display = (amplifierId === 7 || amplifierId === 37) ? "block" : "none"
        accuracyScores.style.display = (amplifierId === 24) ? "block" : "none"

        // If no amplifier or not using API
        if (!amplifierId || !ampsThatUseApi.includes(amplifierId)) {
            leftScore = data.tourney.ipcClients[0].gameplay.score + data.tourney.ipcClients[1].gameplay.score
            rightScore = data.tourney.ipcClients[2].gameplay.score + data.tourney.ipcClients[3].gameplay.score
            updateScoreDisplay(leftScore, rightScore);
        } else {
            fetchAmplifiedScore(data)
        }
    }

    // Chat Stuff
    if (!scoreVisible) {
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
            chatLen = data.tourney.manager.chat.length
            chatDisplay.scrollTop = chatDisplay.scrollHeight
        }
    }

    // IPC State
    if (ipcState !== data.tourney.manager.ipcState) {
        ipcState = data.tourney.manager.ipcState
        const otherRedScore = data.tourney.ipcClients[0].gameplay.score + data.tourney.ipcClients[1].gameplay.score
        const otherBlueScore = data.tourney.ipcClients[2].gameplay.score + data.tourney.ipcClients[3].gameplay.score

        if (ipcState === 4 && !chosenWinner) {
            let winner = ""
            if (leftScore > rightScore) {
                updatePointCount('red', 'plus')
                winner = "red"
            } else if (leftScore < rightScore) {
                updatePointCount('blue', 'plus')
                winner = "blue"
            }
            else if (amplifierId === 7 || amplifierId === 24 || amplifierId === 37) {
                if (otherRedScore > otherBlueScore) {
                    updatePointCount('red', 'plus')
                    winner = "red"
                } else if (otherRedScore < otherBlueScore) {
                    updatePointCount('blue', 'plus')
                    winner = "blue"
                }
            }
            chosenWinner = true

            document.cookie = `currentWinner=${winner}; path=/`
        } else if (ipcState === 1 || ipcState === 3) {
            chosenWinner = false
        }

        if (ipcState === 1) updateAmplifier("none", "reset")
    }

    // Set cookies
    document.cookie = `leftTeamName=${leftTeamName}; path=/`
    document.cookie = `rightTeamName=${rightTeamName}; path=/`

    if (leftPoints === firstToPoints) document.cookie = `winnerTeamName=${leftTeamName}; path=/`
    else if (rightPoints === firstToPoints) document.cookie = `winnerTeamName=${rightTeamName}; path=/`
    else document.cookie = `winnerTeamName=none; path=/`
}

// Update score display
function updateScoreDisplay(leftScore, rightScore) {
    const scoreDelta = Math.abs(leftScore - rightScore)
    animation.leftScoreNumber.update(leftScore)
    animation.rightScoreNumber.update(rightScore)

    const barWidth = Math.min(Math.pow(scoreDelta / 500000, 0.5) * 600, 600)
    updateScoreBar(leftScore, rightScore, barWidth)
}

// Update scorebar
function updateScoreBar(leftScore, rightScore, barWidth) {
    if (leftScore > rightScore) {
        setScoreBarState("none", "block", rightScore - leftScore, barWidth, 0, true)
    } else if (leftScore < rightScore) {
        setScoreBarState("block", "none", leftScore - rightScore, 0, barWidth, false)
    } else {
        setScoreBarState("none", "none", 0, 0, 0, null)
    }
}

// Set scorebar state
function setScoreBarState(leftDisplay, rightDisplay, scoreDiff, leftBarWidth, rightBarWidth, isLeftLeading) {
    const isSpecialAmplifier = [7, 24, 37].includes(amplifierId)
    // Toggle Score Display Modes
    let leftDifference = !isSpecialAmplifier? leftScoreDifference : (amplifierId === 7 || amplifierId === 37)? leftComboDifference : leftAccuracyDifference
    let rightDifference = !isSpecialAmplifier? rightScoreDifference : (amplifierId === 7 || amplifierId === 37)? rightComboDifference : rightAccuracyDifference

    leftDifference.style.display = leftDisplay
    rightDifference.style.display = rightDisplay

    // Update score difference number
    if ([7, 37].includes(amplifierId)) {
        animation.leftComboDifference.update(scoreDiff)
        animation.rightComboDifference.update(scoreDiff)
    } else if (amplifierId === 24) {
        animation.leftAccuracyDifference.update(scoreDiff)
        animation.rightAccuracyDifference.update(scoreDiff)
    } else {
        animation.leftScoreDifference.update(scoreDiff)
        animation.rightScoreDifference.update(scoreDiff)
    }

    // Update score bar
    leftScoreBar.style.width = `${leftBarWidth}px`
    rightScoreBar.style.width = `${rightBarWidth}px`
    
    // Set score number classes
    let leftNumber = !isSpecialAmplifier? leftScoreNumber : (amplifierId === 7 || amplifierId === 37)? leftComboNumber : leftAccuracyNumber
    let rightNumber = !isSpecialAmplifier? rightScoreNumber : (amplifierId === 7 || amplifierId === 37)? rightComboNumber : rightAccuracyNumber

    leftNumber.classList.toggle("lead-score-number", isLeftLeading === true)
    rightNumber.classList.toggle("lead-score-number", isLeftLeading === false)
}

// Get amplified scores
function fetchAmplifiedScore(data) {
    const teamName = amplifierTeam === "red" ? leftTeamName : rightTeamName
    const ipcClients = data.tourney.ipcClients
    
    const urlParams = new URLSearchParams({
        team_name: teamName,
        amplifier_id: amplifierId,
        player1_id: ipcClients[0].spectating.userID,
        player1_score: ipcClients[0].gameplay.score,
        player1_combo: ipcClients[0].gameplay.combo.max,
        player1_acc: ipcClients[0].gameplay.accuracy,
        player1_misses: ipcClients[0].gameplay.hits["0"],
        player1_mods: ipcClients[0].gameplay.mods.str,
        player2_id: ipcClients[1].spectating.userID,
        player2_score: ipcClients[1].gameplay.score,
        player2_combo: ipcClients[1].gameplay.combo.max,
        player2_acc: ipcClients[1].gameplay.accuracy,
        player2_misses: ipcClients[1].gameplay.hits["0"],
        player2_mods: ipcClients[1].gameplay.mods.str,
        player3_id: ipcClients[2].spectating.userID,
        player3_score: ipcClients[2].gameplay.score,
        player3_combo: ipcClients[2].gameplay.combo.max,
        player3_acc: ipcClients[2].gameplay.accuracy,
        player3_misses: ipcClients[2].gameplay.hits["0"],
        player3_mods: ipcClients[2].gameplay.mods.str,
        player4_id: ipcClients[3].spectating.userID,
        player4_score: ipcClients[3].gameplay.score,
        player4_combo: ipcClients[3].gameplay.combo.max,
        player4_acc: ipcClients[3].gameplay.accuracy,
        player4_misses: ipcClients[3].gameplay.hits["0"],
        player4_mods: ipcClients[3].gameplay.mods.str
    }).toString()
    
    fetch(`${address}/score?${urlParams}`)
        .then(response => response.json())
        .then(data => processAmplifiedScore(data))
        .catch(error => console.log(error))
}

// Process amplified scores
function processAmplifiedScore(responseData) {
    leftScore = responseData.team1_score
    rightScore = responseData.team2_score
    const scoreDelta = Math.abs(leftScore - rightScore)

    let barWidth = Math.min(Math.pow(scoreDelta / 500000, 0.5) * 600, 600)

    if ([7, 37].includes(amplifierId)) {
        animation.leftComboNumber.update(leftScore)
        animation.rightComboNumber.update(rightScore)
        barWidth = Math.min(Math.pow(scoreDelta / (mapMaxCombo / 2), 0.5) * 600, 600)
    } else if (amplifierId === 24) {
        animation.leftAccuracyNumber.update(leftScore)
        animation.rightAccuracyNumber.update(rightScore)
        barWidth = Math.min(Math.pow(scoreDelta / mapMaxCombo, 0.5) * 600, 600)
    } else {
        animation.leftScoreNumber.update(leftScore)
        animation.rightScoreNumber.update(rightScore)
    }

    updateScoreBar(leftScore, rightScore, barWidth)
}

// Update amplifiers
const leftAmplifierContainer = document.getElementById("left-amplifier-container")
const rightAmplifierContainer = document.getElementById("right-amplifier-container")
const amplifierSelectedText = document.getElementById("amplifier-selected-text")
let amplifierId
let amplifierTeam

// Animations
const amplifierAnimationEl = document.getElementById("amplifier-animation")
const amplifierTeamNameEl = document.getElementById("amplifier-team-name")
const amplifierTileEl = document.getElementById("amplifier-tile")

function updateAmplifier(team, amplifierNumber) {
    if (team === "none") {
        amplifierId = undefined
        amplifierTeam = undefined
        document.cookie = `amplifierId=${amplifierId}; path=/`
        document.cookie = `amplifierTeam=${amplifierTeam}; path=/`
        amplifierSelectedText.innerText = `None`
        leftAmplifierContainer.style.display = "none"
        rightAmplifierContainer.style.display = "none"
        return
    }

    amplifierId = amplifierNumber
    amplifierTeam = team
    document.cookie = `amplifierId=${amplifierId}; path=/`
    document.cookie = `amplifierTeam=${amplifierTeam}; path=/`
    amplifierSelectedText.innerText = `${amplifiers[amplifierId].name} - ${amplifierTeam.substring(0, 1).toUpperCase()}${amplifierTeam.substring(1)}`

    if (team === "red") {
        leftAmplifierContainer.children[0].children[0].setAttribute("src", `static/amplifier-background/${(silverAmplifiers.includes(amplifierNumber))? "silver" : (goldAmplifiers.includes(amplifierNumber))? "gold" : "prismatic"}.png`)
        leftAmplifierContainer.children[0].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${amplifierNumber}.png`)
        leftAmplifierContainer.children[1].innerText = amplifiers[amplifierId].description
        leftAmplifierContainer.style.display = "flex"
        rightAmplifierContainer.style.display = "none"

        amplifierTeamNameEl.innerText = leftTeamName
        amplifierTeamNameEl.style.backgroundColor = "#FF2B2B"
        amplifierTeamNameEl.style.boxShadow = "0 0 10px #FF2B2B"
    } else if (team === "blue") {
        rightAmplifierContainer.children[0].children[0].setAttribute("src", `static/amplifier-background/${(silverAmplifiers.includes(amplifierNumber))? "silver" : (goldAmplifiers.includes(amplifierNumber))? "gold" : "prismatic"}.png`)
        rightAmplifierContainer.children[0].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${amplifierNumber}.png`)
        rightAmplifierContainer.children[1].innerText = amplifiers[amplifierId].description
        rightAmplifierContainer.style.display = "flex"
        leftAmplifierContainer.style.display = "none"

        amplifierTeamNameEl.innerText = rightTeamName
        amplifierTeamNameEl.style.backgroundColor = "#2B61FF"
        amplifierTeamNameEl.style.boxShadow = "0 0 10px #2B61FF"
    }

    amplifierTileEl.setAttribute("src", `../_shared/assets/amplifier-tiles/${amplifierNumber}.png`)

    if (ipcState !== 3 && ipcState !== 4 && toggleAnimationCurrent) {
        amplifierAnimationEl.classList.remove("amplifier-animation-keyframes")
        void amplifierAnimationEl.offsetHeight
        amplifierAnimationEl.classList.add("amplifier-animation-keyframes")
    }
}

// Toggle stars
const toggleStarsEl = document.getElementById("toggle-stars")
let toggleStarsCurrent = true
function toggleStar() {
    toggleStarsCurrent = !toggleStarsCurrent
    if (toggleStarsCurrent) {
        leftPointsContainer.style.display = "flex"
        rightPointsContainer.style.display = "flex"
        toggleStarsEl.innerText = "Toggle Stars: ON"
    } else {
        leftPointsContainer.style.display = "none"
        rightPointsContainer.style.display = "none"
        toggleStarsEl.innerText = "Toggle Stars: OFF"
    }
}
toggleStar()

// Toggle animation
const toggleAnimationEl = document.getElementById("toggle-animation")
let toggleAnimationCurrent = false
function toggleAnimation() {
    toggleAnimationCurrent = !toggleAnimationCurrent
    if (toggleAnimationCurrent) {
        toggleAnimationEl.innerText = "Toggle Animation: ON"
    } else {
        toggleAnimationEl.innerText = "Toggle Animation: OFF"
        amplifierAnimationEl.classList.remove("amplifier-animation-keyframes")
    }
}