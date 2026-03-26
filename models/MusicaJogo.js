// musica-jogo.js
const musicaAleatorias = [
    new Audio('../assets/music/flores_vida.mp3'),
    new Audio('../assets/music/nos_braco_teus.mp3'),
    new Audio('../assets/music/por_voce_que_canto.mp3'),
    new Audio('../assets/music/voce_nn_sabe_amar.mp3'),
]

let musicaAtual = null

// Configurar músicas aleatórias
musicaAleatorias.forEach(musica => {
    musica.loop = true
    musica.volume = 0.1
})

function tocarMusicaAleatorio() {
    if (musicaAtual) {
        musicaAtual.pause()
        musicaAtual.currentTime = 0
    }
    const idx = Math.floor(Math.random() * musicaAleatorias.length)
    musicaAtual = musicaAleatorias[idx]
    musicaAtual.play()
}

function pararMusica() {
    if (musicaAtual) {
        musicaAtual.pause()
        musicaAtual.currentTime = 0
        musicaAtual = null
    }
}

// Iniciar música do jogo após interação
function iniciarMusicaJogo() {
    tocarMusicaAleatorio()
}

document.addEventListener('click', iniciarMusicaJogo, { once: true })
document.addEventListener('keydown', iniciarMusicaJogo, { once: true })