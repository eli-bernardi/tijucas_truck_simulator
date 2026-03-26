let des = document.getElementById('des').getContext('2d')

// ============ OBJETOS ============
let cenario = new Cenario()

let caminhao = new Caminhao(80, 210, 240, 60, '../assets/images/veiculo/caminhao_madeira.png')

let inimigos = [
      new VeiculoInimigo(750, 130, 75, 50, '../assets/images/veiculo/f250.png'),
      new VeiculoInimigo(870, 260, 75, 50, '../assets/images/veiculo/fusca.png'),
      new VeiculoInimigo(1000, 380, 90, 55, '../assets/images/veiculo/chevette.png'),
      // new VeiculoInimigo(1130, 210, 80, 50, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(1260, 340, 75, 50, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(1390, 130, 90, 55, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(1520, 260, 80, 50, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(1650, 380, 75, 50, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(1780, 210, 90, 55, '../assets/images/veiculo/.png'),
      // // new VeiculoInimigo(1910, 340, 80, 50, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(2040, 130, 75, 50, '../assets/images/veiculo/.png'),
      // new VeiculoInimigo(2170, 260, 90, 55, '../assets/images/veiculo/.png'),
]

const velocidadesBase = [3.0, 3.5, 2.8, 3.2, 3.6, 2.9, 3.3, 3.7, 2.7, 3.4, 3.8, 2.6]

let coletaveis = []
let fase = 1
let cargaNome = 'Caixas de Madeira'
let cargaValor = 1000
let jogar = true


// ============ TEXTOS ============
class Text {
      des_text(texto, x, y, cor, fonte) {
            des.fillStyle = cor
            des.font = fonte
            des.fillText(texto, x, y)
      }
}

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()


// =============  ÁUDIO  =============
const sons = {
      batida: new Audio('../assets/sounds/crash-car.mp3'),
      coleta: new Audio('../assets/sounds/collect-item.mp3'),
      entrega: new Audio('../assets/sounds/mission-complete.mp3'),
      motor: new Audio('../assets/sounds/motor-engine.mp3'),
      gameOver: new Audio('../assets/sounds/game-over.mp3'),
      mouseClique: new Audio('../assets/sounds/mouse-click.mp3'),
}

const musicaTema = [
      new Audio('../assets/music/sonho_caminhoneiro_karaoke.mp3'),
      new Audio('../assets/music/sublime_renuncia_karaoke.mp3'),
      new Audio('../assets/music/convite_casamento_karaoke.mp3'),
]

const musicaAleatorias = [
      new Audio('../assets/music/flores_vida.mp3'),
      new Audio('../assets/music/nos_braco_teus.mp3'),
      new Audio('../assets/music/por_voce_que_canto.mp3'),
      new Audio('../assets/music/voce_nn_sabe_amar.mp3'),
]

let musicaAtual = null
let musicaTemaIndex = 0

musicaTema.forEach(musica => {
      musica.loop = true
      musica.volume = 0.3
})

musicaAleatorias.forEach(musica => {
      musica.loop = true
      musica.volume = 0.3
})

function tocarMusicaTema() {
      if (musicaAtual) {
            musicaAtual.pause()
            musicaAtual.currentTime = 0
      }
      musicaAtual = musicaTema[musicaTemaIndex]
      musicaAtual.play()

      musicaTemaIndex = (musicaTemaIndex + 1) % musicaTema.length
}

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

function iniciarMusica() {
      const isGamePage = window.location.pathname.includes('jogo') ||
            document.getElementById('gameCanvas') !== null

      if (isGamePage) {
            tocarMusicaAleatorio()
      } else {
            tocarMusicaTema()
      }
}
document.addEventListener('click', () => {
      sons.mouseClique.play()
      if (!musicaAtual) {
            iniciarMusica()
      }
})

document.addEventListener('keydown', () => {
      if (!musicaAtual) {
            iniciarMusica()
      }
}, { once: true })

// ============ CONTROLES ============
document.addEventListener('keydown', (e) => {
      if (!jogar) return
      if (e.key === 'w' || e.key === 'ArrowUp') caminhao.pos = -5
      if (e.key === 's' || e.key === 'ArrowDown') caminhao.pos = 5
      if (e.key === 'a' || e.key === 'ArrowLeft') caminhao.dir = -5
      if (e.key === 'd' || e.key === 'ArrowRight') caminhao.dir = 5
})
document.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === 's' || e.key === 'ArrowDown') caminhao.pos = 0
      if (e.key === 'a' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'ArrowRight') caminhao.dir = 0
})


// ============ FUNÇÕES ============
function spawnarColetavel() {
      if (Math.random() < 0.005 && jogar) {
            let y = Math.random() * 360 + 70
            let tipo = Math.random() < 0.7 ? 'dinheiro' : 'cargaExtra'
            let imagem = tipo === 'dinheiro' ? '../assets/images/game/dinheiro.png' : '../assets/images/game/carga-extra.png'
            coletaveis.push(new Coletavel(730, y, 60, 60, imagem, tipo))
            sons.coleta.play()
      }
}

function colisao() {
      inimigos.forEach(inimigo => {
            if (caminhao.x < inimigo.x + inimigo.w &&
                  caminhao.x + caminhao.w > inimigo.x &&
                  caminhao.y < inimigo.y + inimigo.h &&
                  caminhao.y + caminhao.h > inimigo.y) {
                  caminhao.sofrerDano(inimigo.getDano(), inimigo.getMulta())
                  inimigo.x = 750
                  sons.batida.play()
            }
      })

      coletaveis.forEach((coletavel, i) => {
            if (caminhao.x < coletavel.x + coletavel.w &&
                  caminhao.x + caminhao.w > coletavel.x &&
                  caminhao.y < coletavel.y + coletavel.h &&
                  caminhao.y + caminhao.h > coletavel.y) {
                  if (coletavel.tipo === 'dinheiro') caminhao.coletarDinheiro(50)
                  else caminhao.recuperarCarga(20)
                  coletaveis.splice(i, 1)
                  sons.coleta.play()
            }
      })
}

function pontuacao() {
      inimigos.forEach(inimigo => {
            if (inimigo.x + inimigo.w < 0) {
                  caminhao.dinheiro += 50
                  inimigo.x = 2000
            }
      })
}

function verificarEntrega() {
      if (caminhao.x + caminhao.w > 1550 && jogar) {
            caminhao.dinheiro += cargaValor
            caminhao.entregas++
            sons.entrega.play()
            if (fase < 3) {
                  fase++
                  caminhao.fase = fase
                  cenario.fase = fase
                  caminhao.trocarImagemFase(fase)
                  caminhao.x = 80

                  const cargas = {
                        1: { nome: 'Levando Madeira', valor: 1000 },
                        2: { nome: 'Contêiner Refrigerado', valor: 2500 },
                        3: { nome: 'Carga de Areia', valor: 2000 }
                  }
                  cargaNome = cargas[fase].nome
                  cargaValor = cargas[fase].valor

                  inimigos.forEach(i => i.velocidade += 1)
            } else {
                  alert('🏆 PARABÉNS! Você completou todas as entregas!')
                  reiniciarJogo()
            }
      }
}

function game_over() {
      if (caminhao.carga <= 0 || caminhao.dinheiro <= 0) {
            jogar = false
            if (musicaAtual) {
                  musicaAtual.pause()
                  musicaAtual.currentTime = 0
            }
            sons.gameOver.play()
      }
}

function reiniciarJogo() {
      caminhao = new Caminhao(80, 240, 400, 120, '../assets/images/veiculo/caminhao_madeira.png')
      fase = 1
      cargaNome = 'Caixas de Madeira'
      cargaValor = 1000
      coletaveis = []
      jogar = true
      cenario.resetar()
      tocarMusicaAleatorio()

      inimigos.forEach((inimigo, i) => {
            inimigo.x = 750 + i * 130
            inimigo.velocidade = velocidadesBase[i]
      })
}


// ============ LOOP ============
function desenha() {
      if (jogar) {
            cenario.desenhar()
            inimigos.forEach(i => i.des_ret())
            coletaveis.forEach(c => c.des_ret())
            caminhao.des_ret()

            document.getElementById('dinheiro').textContent = 'R$ ' + caminhao.dinheiro
            document.getElementById('carga').textContent = caminhao.carga + '%'
            document.getElementById('fase').textContent = fase + '/3'
            document.getElementById('cargaNome').textContent = cargaNome
            document.getElementById('cargaValor').textContent = 'R$ ' + cargaValor
      } else {
            // Fundo escuro
            des.fillStyle = 'rgba(0, 0, 0, 0.85)'
            des.fillRect(0, 0, 1200, 500)

            // GAME OVER centralizado
            des.textAlign = 'center'
            des.fillStyle = '#e94560'
            des.font = 'bold 64px Arial'
            des.fillText('GAME OVER', 600, 180)

            des.fillStyle = 'white'
            des.font = '28px Arial'
            des.fillText('Dinheiro Final: R$ ' + caminhao.dinheiro, 600, 260)

            des.fillStyle = '#888'
            des.font = '20px Arial'
            des.fillText('Pressione F5 para jogar novamente', 600, 320)
      }
}

function atualiza() {
      if (!jogar) return
      caminhao.mov_car()
      inimigos.forEach(i => i.mov_car())
      cenario.atualizarLinhas()
      coletaveis.forEach(c => c.mov_car())
      coletaveis = coletaveis.filter(c => c.x > -50)
      spawnarColetavel()
      colisao()
      pontuacao()
      verificarEntrega()
      game_over()
}

function main() {
      des.clearRect(0, 0, 1200, 500)
      desenha()
      atualiza()
      requestAnimationFrame(main)
}