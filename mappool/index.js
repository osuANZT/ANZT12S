// Load beatmaps
let allBeatmaps
let allBeatmapsJson = []
async function getBeatmaps() {
    const response = await fetch("../_data/beatmaps.json")
    const responseJson = await response.json()
    allBeatmaps = responseJson.beatmaps

    for (let i = 0; i < allBeatmaps.length; i++) {
        const response = await fetch(`https://tryz.vercel.app/api/b/${allBeatmaps[i].beatmapId}`)
        delay(100)
        const responseJson = await response.json()
        allBeatmapsJson.push(responseJson)

        createBeatmapPanel(allBeatmaps[i], responseJson)
    }
}
getBeatmaps()

// Create beatmap panel
const mappoolSection = document.getElementById("mappool-section")
function createBeatmapPanel(allBeatmapsInfo, jsonInfo) {
    // Create panel
    const panel = document.createElement("div")
    panel.classList.add("panel")

    // Create panel background
    const panelBackground = document.createElement("img")
    panelBackground.classList.add("panel-background")
    panelBackground.setAttribute("src", "static/panel-assets/background.png")

    // Create Panel Song Background
    const panelSongBackground = document.createElement("div")
    panelSongBackground.classList.add("panel-song-background")
    panelSongBackground.style.backgroundImage = `url("${jsonInfo.covers['card@2x']}")`

    // Create Panel Gradient
    const panelGradient = document.createElement("img")
    panelGradient.classList.add("panel-gradient")
    panelGradient.setAttribute("src", "static/panel-assets/gradient.png")

    // Find beatmap
    let beatmap
    for (let i = 0; i < jsonInfo.beatmaps.length; i++) {
        if (jsonInfo.beatmaps[i].id !== allBeatmapsInfo.beatmapId) continue
        beatmap = jsonInfo.beatmaps[i]
        break
    }
    if (!beatmap) beatmap = jsonInfo.beatmaps[0]

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
    panelDifficulty.innerText = `[${jsonInfo.beatmaps[0].version}]`
    // Create Mapper
    const panelMapper = document.createElement("div")
    panelMapper.classList.add("panel-mapper")
    panelMapper.innerText = beatmap.owners.map(owner => owner.username).join(" / ")
    // Panel SR / BPM
    const panelSrBpm = document.createElement("div")
    panelSrBpm.classList.add("panel-sr-bpm")
    // Panel SR
    const panelSr = document.createElement("span")
    panelSr.classList.add("panel-sr")
    panelSr.innerText = beatmap.difficulty_rating

    // Append everything together
    panelSrBpm.append(panelSr, ` / ${beatmap.bpm}bpm`)
    panelMetadata.append(panelSongName, panelArtist, panelDifficulty, panelMapper)
    panel.append(panelBackground, panelSongBackground, panelGradient, panelMetadata, panelSrBpm)
    mappoolSection.append(panel)
}

const socket = createTosuWsSocket()

    // <div class="panel-sr-bpm"><span class="panel-sr">6.46*</span> / 184bpm</div>