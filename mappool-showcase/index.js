const socket = createGosuWsSocket();

// Map metadata details
let mapId, mapMd5
const mapBackground = document.getElementById("map-background")
const songName = document.getElementById("song-name")
const artist = document.getElementById("artist")
const difficulty = document.getElementById("difficulty") 

// Map timing
const songLengthPassed = document.getElementById("song-length-passed")
const songCurrentTime = document.getElementById("song-current-time")
const songTotalTime = document.getElementById("song-total-time")

socket.onmessage = evnet => {
    const data = JSON.parse(evnet.data)

    // Set metadata
    if (mapId !== data.menu.bm.id || mapMd5 !== data.menu.bm.md5) {
        mapId = data.menu.bm.id
        mapMd5 = data.menu.bm.md5

        mapBackground.style.backgroundImage = `url("https://assets.ppy.sh/beatmaps/${data.menu.bm.set}/covers/cover.jpg")`
        const songMetadata = data.menu.bm.metadata
        songName.innerText = songMetadata.title
        artist.innerText = songMetadata.artist
        difficulty.innerText = `[${songMetadata.difficulty}]`
    }
    console.log(data)

    // Set current timing
    songCurrentTime.innerText = displayTime(data.menu.bm.time.current)
    songTotalTime.innerText = displayTime(data.menu.bm.time.mp3)
    songLengthPassed.style.width = `${data.menu.bm.time.current / data.menu.bm.time.mp3 * 364}px`
}

// Display time
function displayTime(ms) {
    return `${Math.floor(ms / 60000)}:${String(Math.round(ms / 1000) % 60).padStart(2, '0')}`
}