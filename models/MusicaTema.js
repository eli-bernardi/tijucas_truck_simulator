// musica-tema.js
const musicaTema = [
    new Audio('../assets/music/sonho_caminhoneiro_karaoke.mp3'),
    new Audio('../assets/music/sublime_renuncia_karaoke.mp3'),
    new Audio('../assets/music/convite_casamento_karaoke.mp3'),
]

let musicaAtual = null
let musicaTemaIndex = 0

// Configurar músicas tema
musicaTema.forEach(musica => {
    musica.loop = true
    musica.volume = 0.1
})

// Função para tocar música tema
function tocarMusicaTema(indice = null) {
    if (musicaAtual) {
          musicaAtual.pause()
          musicaAtual.currentTime = 0
    }
    
    // Se índice específico foi passado, usa ele
    if (indice !== null && indice < musicaTema.length) {
          musicaAtual = musicaTema[indice]
    } else {
          // Senão alterna entre as músicas
          musicaAtual = musicaTema[musicaTemaIndex]
          musicaTemaIndex = (musicaTemaIndex + 1) % musicaTema.length
    }
    
    musicaAtual.play()
}

// Iniciar música após interação do usuário
function iniciarMusicaTema() {
    tocarMusicaTema()
}

document.addEventListener('click', iniciarMusicaTema, { once: true })
document.addEventListener('keydown', iniciarMusicaTema, { once: true })