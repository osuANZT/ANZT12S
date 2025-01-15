const socket = createGosuWsSocket()

// Overlay elements
const mapperName = document.getElementById("mapper-name")
const playerName = document.getElementById("player-name")

socket.onmessage = event => {
    const data = JSON.parse(event.data)

    mapperName.innerText = data.menu.bm.metadata.mapper
    playerName.innerText = (data.gameplay.name !== "")? data.gameplay.name : (data.resultsScreen.name !== "")? data.resultsScreen.name : ""
}