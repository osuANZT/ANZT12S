const socket = createGosuWsSocket()

// Overlay elements
const mapperOverlay = document.getElementById("mapper-overlay")
const playerOverlay = document.getElementById("player-overlay")
const mapperName = document.getElementById("mapper-name")
const playerName = document.getElementById("player-name")

socket.onmessage = event => {
    const data = JSON.parse(event.data)
    console.log(data)

    mapperName.innerText = data.menu.bm.metadata.mapper
    playerName.innerText = (data.gameplay.name !== "")? data.gameplay.name : (data.resultsScreen.name !== "")? data.resultsScreen.name : ""

    if (data.menu.state === 2) {
        mapperOverlay.style.display = "block"
        playerOverlay.style.display = "block"
    } else {
        mapperOverlay.style.display = "none"
        playerOverlay.style.display = "none"
    }
}