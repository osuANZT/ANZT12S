const socket = createTosuWsSocket()

// Song Name and Artist
const songName = document.getElementById("song-name")
const artist = document.getElementById("artist")

socket.onmessage = event => {
    const data = JSON.parse(event.data)
    songName.innerText = data.menu.bm.metadata.title
    artist.innerText = data.menu.bm.metadata.artist
}