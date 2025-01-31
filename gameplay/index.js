// Amplifiers
const amplifiers = {
    1: { name: 'The Carry I', description: 'The highest score on your team gets a 1.2x multiplier' },
    2: { name: 'The Carry II', description: 'The highest score on your team gets a 1.3x multiplier' },
    3: { name: 'The Carry III', description: 'The highest score on your team gets a 1.5x multiplier' },
    4: { name: 'Poison I', description: 'Play as 2v1. Opposing team picks their player and gets a 2x multiplier.' },
    5: { name: 'Poison II', description: 'Play as 2v1. Opposing team picks their player and gets a 1.75x multiplier.' },
    6: { name: 'Poison III', description: 'Play as 2v1. Your team picks their player and gets a 1.75x multiplier.' },
    7: { name: 'Limit Break', description: 'Scored by highest combined combo.' },
    8: { name: 'The King I', description: 'Play as 1v2 and gain a 1.75x multiplier' },
    9: { name: 'The King II', description: 'Play as 1v2 and gain a 2x multiplier' },
    10: { name: 'Dude That Fingerlock', description: 'Each player\'s miss gains 0.5% to their score, up to 20%.' },
    11: { name: 'Cold Clear Eyes I', description: 'Both teams play the next HD/HR/DT map with HD. Your team gets a 1.05x multiplier.' },
    12: { name: 'Cold Clear Eyes II', description: 'Both teams play the next HD/HR/DT map with HD. Your team gets a 1.15x multiplier.' },
    13: { name: 'Cold Clear Eyes III', description: 'Both teams play the next HD/HR/DT map with HD. Your team gets a 1.2x multiplier.' },
    14: { name: 'Turn It Up', description: 'Your NM pick is now FM. 1 mod minimum from each team (HD/HR/EZ/FL). EZ = 1.9x multiplier.' },
    15: { name: 'Gambler', description: 'Wager 1 point (must have at least 1 point). Gain 1.25x multiplier. Forfeit wagered point if you lose.' },
    16: { name: 'Chance Time', description: 'Pick map not banned/protected If ref rolls 1 - 40, opponent gets point. Else, team gets point.' },
    17: { name: 'Easy Peasy', description: 'Your NM1/HD1/HR1 pick will be played with EZ instead.' },
    18: { name: 'Make It Rock', description: 'Opponent plays your NM pick with HR and gains a 1.25x multiplier.' },
    19: { name: 'Yin And Yang I', description: 'Highest score multiplied by accuracy of other player. Gains a 1.05x multiplier.' },
    20: { name: 'Yin And Yang II', description: 'Highest score multiplied by accuracy of other player. Gains a 1.1x multiplier.' },
    21: { name: 'Yin And Yang III', description: 'Highest score multiplied by accuracy of other player. Gains a 1.15x multiplier.' },
    22: { name: 'Trickster', description: 'When there are 2+ NM/HD maps left, opponent picks NM/HD map. You play NM, they HD. This uses your pick.' },
    23: { name: 'Trickster II', description: 'When there are 2+ NM/HD maps left, opponent picks NM/HD map. You play NM, they HD. This uses your pick. Opponent does not get HD multiplier.' },
    24: { name: 'AccDance', description: 'Scored by highest average accuracy.' },
    25: { name: 'Synchronised I', description: 'Start at 1.1x multiplier. Drop 0.0025x for every % of acc difference. Capped at 1x.' },
    26: { name: 'Synchronised II', description: 'Start at 1.2x multiplier. Drop 0.0025x for every % of acc difference. Capped at 1x.' },
    27: { name: 'Go With The Flow', description: 'Opponent picks the map. You gain a 1.15x multiplier.' },
    28: { name: 'Loadbearer I', description: 'Score increased by 20% of score difference between teammates. Score increase is capped at 150k.' },
    29: { name: 'Loadbearer II', description: 'Score increased by 40% of score difference between teammates. Score increase is capped at 250k.' },
    30: { name: 'Loadbearer III', description: 'Score increased by 60% of score difference between teammates. Score increase is capped at 350k.' },
    31: { name: 'LightBearer', description: 'On your next HD pick, one player on your team can play with NM.' },
    32: { name: 'Cheating Death', description: 'When your opponent is at match point, pick a banned map.' },
    33: { name: 'The Dragon Consumes I', description: 'If your team won the previous map, gain a 1.1x multiplier on this map.' },
    34: { name: 'The Dragon Consumes II', description: 'If your team won the previous map, gain a 1.2x multiplier on this map.' },
    35: { name: 'The Dragon Consumes III', description: 'If your team won the previous map, gain a 1.3x multiplier on this map.' },
    36: { name: 'The Missing Piece', description: 'Pick from the previous week\'s pool. Map slot must not be banned / picked already. Map slot will be marked as picked.' },
    37: { name: 'JTBFREAKS', description: 'Play with RX and ScoreV1. Highest combined combo wins. ScoreV1 results used for a draw.' },
    38: { name: 'Desperation I', description: 'Pick a banned map. Get a 0.7x multiplier.' },
    39: { name: 'Desperation II', description: 'Pick a banned map. Get a 0.85x multiplier.' },
    40: { name: 'Soft Rock', description: 'On your next HR pick, one player on your team can play with NM.' },
    41: { name: 'Roulette', description: 'The next map is randomly picked, and your team receives a 1.4x multiplier.' }
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

    generatePoints()

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
const findMapInMappool = beatmapId => allBeatmapsJson.find(beatmap => beatmap.beatmapId == beatmapId)

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
    await getAddress()
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
let mapId, mapMd5, foundMapInMappool = false

// Score visibility
const bottomSection = document.getElementById("bottom-section")
let scoreVisible

// Score
// Score difference
const leftScoreDifference = document.getElementById("left-score-difference")
const rightScoreDifference = document.getElementById("right-score-difference")
// Score bar
const leftScoreBar = document.getElementById("left-score-bar")
const rightScoreBar = document.getElementById("right-score-bar")
// Score number
const leftScoreNumber = document.getElementById("left-score-number")
const rightScoreNumber = document.getElementById("right-score-number")
// Variables
let leftScore = 0, rightScore = 0, scoreDelta = 0

// CountUp
const animation = {
    leftScoreNumber: new CountUp(leftScoreNumber, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    rightScoreNumber: new CountUp(rightScoreNumber, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    leftScoreDifference: new CountUp(leftScoreDifference, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
    rightScoreDifference: new CountUp(rightScoreDifference, 0, 0, 0, 0.2, { useEasing: true, useGrouping: true, separator: ",", decimal: "." }),
}

// Chat Display
const chatDisplay = document.getElementById("chat-display")
let chatLen = 0

// IPC State
let ipcState

// Sidebar Amplifier Selection Control Button Containers
const leftAmplifierSelectionButtonContainer = document.getElementById("left-amplifier-selection-button-container")
const rightAmplifierSelectionButtonContainer = document.getElementById("right-amplifier-selection-button-container")

socket.onmessage = event => {
    const data = JSON.parse(event.data)
    console.log(data)
    
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

        const map = findMapInMappool(mapId)
        if (map) {
            mapSr.innerText = `${Math.round(Number(map.difficultyrating) * 100) / 100}*`
            mapBpm.innerText = `${map.bpm}bpm`
            mapCs.innerText = `cs${map.diff_size}`
            mapAr.innerText = `ar${map.diff_approach}`
            mapOd.innerText = `od${map.diff_overall}`
            modImage.setAttribute(`static/mod-backgrounds/${map.mod}.png`)
            foundMapInMappool = true
        }
    }

    if (!foundMapInMappool) {
        mapSr.innerText = `${Math.round(Number(data.menu.bm.stats.fullSR) * 100) / 100}*`
        mapBpm.innerText = `${data.menu.bm.stats.BPM.common}bpm`
        mapCs.innerText = `cs${data.menu.bm.stats.memoryCS}`
        mapAr.innerText = `ar${data.menu.bm.stats.memoryAR}f`
        mapOd.innerText = `od${data.menu.bm.stats.memoryOD}`
    }

    // // Score visibility
    if (scoreVisible !== data.tourney.manager.bools.scoreVisible) {
        scoreVisible = data.tourney.manager.bools.scoreVisible
    
        if (scoreVisible) {
            bottomSection.style.opacity = 1
            chatDisplay.style.opacity = 0
        } else {
            bottomSection.style.opacity = 0
            chatDisplay.style.opacity = 1
        }
    }

    // Score stuff
    if (scoreVisible) {
        // If there is no amplifiers
        if (!amplifierId || !ampsThatUseApi.includes(amplifierId)) {
            leftScore = data.tourney.ipcClients[0].gameplay.score + data.tourney.ipcClients[1].gameplay.score
            rightScore = data.tourney.ipcClients[2].gameplay.score + data.tourney.ipcClients[3].gameplay.score
            scoreDelta = Math.abs(leftScore - rightScore)

            // Update numbers
            animation.leftScoreNumber.update(data.tourney.ipcClients[0].gameplay.score + data.tourney.ipcClients[1].gameplay.score)
            animation.rightScoreNumber.update(data.tourney.ipcClients[2].gameplay.score + data.tourney.ipcClients[3].gameplay.score)

            // Bar percentage
            let movingScoreBarDifferencePercent = Math.min(scoreDelta / 500000, 1)
            let movingScoreBarRectangleWidth = Math.min(Math.pow(movingScoreBarDifferencePercent, 0.5)* 600, 600)

            // Update score bar and score distance
            if (leftScore > rightScore) {
                leftScoreDifference.style.display = "none"
                rightScoreDifference.style.display = "block"
                animation.rightScoreDifference.update(rightScore - leftScore)

                leftScoreBar.style.width = `${movingScoreBarRectangleWidth}px`
                rightScoreBar.style.width = "0px"

                leftScoreNumber.classList.add("lead-score-number")
                rightScoreNumber.classList.remove("lead-score-number")
            } else if (leftScore === rightScore) {
                leftScoreDifference.style.display = "none"
                rightScoreDifference.style.display = "none"

                leftScoreBar.style.width = "0px"
                rightScoreBar.style.width = "0px"

                leftScoreNumber.classList.remove("lead-score-number")
                rightScoreNumber.classList.remove("lead-score-number")
            } else if (leftScore < rightScore) {
                leftScoreDifference.style.display = "block"
                animation.leftScoreDifference.update(leftScore - rightScore)
                rightScoreDifference.style.display = "none"

                leftScoreBar.style.width = `0px`
                rightScoreBar.style.width = `${movingScoreBarRectangleWidth}px`

                leftScoreNumber.classList.remove("lead-score-number")
                rightScoreNumber.classList.add("lead-score-number")
            }
        } else {
            // Amps that do not only affect score: 7 (Limit Break), 24 (AccDance), 37 (JTBFREAKS)
            // Get team name
            const teamName = (amplifierTeam === "red")? leftTeamName : rightTeamName
            const ipcClients = data.tourney.ipcClients
            let test = new XMLHttpRequest()
            // 
            test.open("GET", `${address}/score?team_name=${encodeURIComponent(teamName)}` + 
                                `&amplifier_id=${amplifierId}` +
                                `&player1_id=${ipcClients[0].spectating.userID}&player1_score=${ipcClients[0].gameplay.score}&player1_combo=${ipcClients[0].gameplay.combo.max}&player1_acc=${ipcClients[0].gameplay.accuracy}&player1_misses=${ipcClients[0].gameplay.hits["0"]}&player1_mods=${ipcClients[0].gameplay.mods.str}` +
                                `&player2_id=${ipcClients[1].spectating.userID}&player2_score=${ipcClients[1].gameplay.score}&player2_combo=${ipcClients[1].gameplay.combo.max}&player2_acc=${ipcClients[1].gameplay.accuracy}&player2_misses=${ipcClients[1].gameplay.hits["0"]}&player2_mods=${ipcClients[1].gameplay.mods.str}` +
                                `&player3_id=${ipcClients[2].spectating.userID}&player3_score=${ipcClients[2].gameplay.score}&player3_combo=${ipcClients[2].gameplay.combo.max}&player3_acc=${ipcClients[2].gameplay.accuracy}&player3_misses=${ipcClients[2].gameplay.hits["0"]}&player3_mods=${ipcClients[2].gameplay.mods.str}` +
                                `&player4_id=${ipcClients[3].spectating.userID}&player4_score=${ipcClients[3].gameplay.score}&player4_combo=${ipcClients[3].gameplay.combo.max}&player4_acc=${ipcClients[3].gameplay.accuracy}&player4_misses=${ipcClients[3].gameplay.hits["0"]}&player4_mods=${ipcClients[3].gameplay.mods.str}`, false)
            test.onreadystatechange = function() {
                if (test.readyState === XMLHttpRequest.DONE) {
                    if (test.status === 200) {
                        var responseData = JSON.parse(test.responseText)
                        leftScore = responseData.team1_score
                        rightScore = responseData.team2_score
                        scoreDelta = Math.abs(leftScore - rightScore)
            
                        // Update numbers
                        animation.leftScoreNumber.update(leftScore)
                        animation.rightScoreNumber.update(rightScore)
            
                        // Bar percentage
                        let movingScoreBarDifferencePercent = Math.min(scoreDelta / 500000, 1)
                        let movingScoreBarRectangleWidth = Math.min(Math.pow(movingScoreBarDifferencePercent, 0.5)* 600, 600)
            
                        // Update score bar and score distance
                        if (leftScore > rightScore) {
                            leftScoreDifference.style.display = "none"
                            rightScoreDifference.style.display = "block"
                            animation.rightScoreDifference.update(rightScore - leftScore)
            
                            leftScoreBar.style.width = `${movingScoreBarRectangleWidth}px`
                            rightScoreBar.style.width = "0px"
            
                            leftScoreNumber.classList.add("lead-score-number")
                            rightScoreNumber.classList.remove("lead-score-number")
                        } else if (leftScore === rightScore) {
                            leftScoreDifference.style.display = "none"
                            rightScoreDifference.style.display = "none"
            
                            leftScoreBar.style.width = "0px"
                            rightScoreBar.style.width = "0px"
            
                            leftScoreNumber.classList.remove("lead-score-number")
                            rightScoreNumber.classList.remove("lead-score-number")
                        } else if (leftScore < rightScore) {
                            leftScoreDifference.style.display = "block"
                            animation.leftScoreDifference.update(leftScore - rightScore)
                            rightScoreDifference.style.display = "none"
            
                            leftScoreBar.style.width = `0px`
                            rightScoreBar.style.width = `${movingScoreBarRectangleWidth}px`
            
                            leftScoreNumber.classList.remove("lead-score-number")
                            rightScoreNumber.classList.add("lead-score-number")
                        }
                    } else console.log(test.status)
                }
            }
            test.send()
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

        if (ipcState === 4) {
            
        }
    }
}

// Update amplifiers
const leftAmplifierContainer = document.getElementById("left-amplifier-container")
const rightAmplifierContainer = document.getElementById("right-amplifier-container")
const amplifierSelectedText = document.getElementById("amplifier-selected-text")
let amplifierId
let amplifierTeam
function updateAmplifier(team, amplifierNumber) {
    if (team === "none") {
        amplifierId = undefined
        amplifierTeam = undefined
        amplifierSelectedText.innerText = `None`
        leftAmplifierContainer.style.display = "none"
        rightAmplifierContainer.style.display = "none"
        return
    }

    amplifierId = amplifierNumber
    amplifierTeam = team
    amplifierSelectedText.innerText = `${amplifiers[amplifierId].name} - ${amplifierTeam.substring(0, 1).toUpperCase()}${amplifierTeam.substring(1)}`

    if (team === "red") {
        leftAmplifierContainer.children[0].children[0].setAttribute("src", `static/amplifier-background/${(silverAmplifiers.includes(amplifierNumber))? "silver" : (goldAmplifiers.includes(amplifierNumber))? "gold" : "prismatic"}.png`)
        leftAmplifierContainer.children[0].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${amplifierNumber}.png`)
        leftAmplifierContainer.children[1].innerText = amplifiers[amplifierId].description
        leftAmplifierContainer.style.display = "flex"
        rightAmplifierContainer.style.display = "none"
    } else if (team === "blue") {
        rightAmplifierContainer.children[0].children[0].setAttribute("src", `static/amplifier-background/${(silverAmplifiers.includes(amplifierNumber))? "silver" : (goldAmplifiers.includes(amplifierNumber))? "gold" : "prismatic"}.png`)
        rightAmplifierContainer.children[0].children[1].setAttribute("src", `../_shared/assets/amplifier-icons/${amplifierNumber}.png`)
        rightAmplifierContainer.children[1].innerText = amplifiers[amplifierId].description
        rightAmplifierContainer.style.display = "flex"
        leftAmplifierContainer.style.display = "none"
    }
}