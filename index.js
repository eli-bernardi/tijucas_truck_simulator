// ============ CANVAS ============
const desEl = document.getElementById('des')
const des2El = document.getElementById('des2')
const des = desEl.getContext('2d')
const des2 = des2El.getContext('2d')


// ============ ÁUDIO ============
const sons = {
      batida: new Audio('../assets/sounds/crash-car.mp3'),
      coleta: new Audio('../assets/sounds/collect-item.mp3'),
      entrega: new Audio('../assets/sounds/mission-completed.mp3'),
      gameOver: new Audio('../assets/sounds/game-over.mp3'),
      mouseClique: new Audio('../assets/sounds/mouse-click.mp3'),
}
 
const musica = new Audio('../assets/music/sonho_caminhoneiro_karaoke.mp3')
musica.loop = true
musica.volume = 0.3

const musicaVitoria = new Audio()
musicaVitoria.src = '../assets/sounds/mission-completed.mp3'
musicaVitoria.volume = 0.8
musicaVitoria.loop = false
musicaVitoria.onerror = () => {
      console.warn('Música de vitória não encontrada. Continuando sem ela.')
}


// ============ DADOS DE FASES ============
const cargas = {
      1: { nome: 'Levando Madeira', valor: 1000 },
      2: { nome: 'Contêiner Refrigerado', valor: 2500 },
      3: { nome: 'Carga de Areia', valor: 2000 },
}

const velocidadesBase = [3.0, 3.5, 2.8, 3.2, 2.6]
const velocidadesBase2 = [3.2, 3.3, 3.0, 3.4, 2.9]


// ============ OBJETOS ============
let cenario = new Cenario()
let cenario2 = new Cenario()

const imagemFundoVitoria = new Image()
imagemFundoVitoria.src = '../assets/images/game/final.png'

function criarInimigos() {
      return [
            new VeiculoInimigo(750, 130, 155, 52, '../assets/images/veiculo/f250.png'),
            new VeiculoInimigo(950, 260, 140, 50, '../assets/images/veiculo/fusca.png'),
            new VeiculoInimigo(1150, 380, 145, 52, '../assets/images/veiculo/chevette.png'),
            new VeiculoInimigo(1350, 210, 155, 52, '../assets/images/veiculo/saveiro.png'),
            new VeiculoInimigo(1550, 340, 120, 60, '../assets/images/veiculo/uno_mille.png'),
      ]
}

let caminhao = new Caminhao(80, 210, 400, 120, '../assets/images/veiculo/scania-madeira.png')

const imagensFaseJ2 = {
      1: { src: '../assets/images/veiculo/bob-na-madeira.png', w: 260, h: 80 },
      2: { src: '../assets/images/veiculo/atego-thermoking.png', w: 250, h: 80 },
      3: { src: '../assets/images/veiculo/atego-chapeu-virado.png', w: 250, h: 80 },
}

let caminhao2 = new Caminhao(80, 210, 260, 80, '../assets/images/veiculo/bob-na-madeira.png', imagensFaseJ2)



let inimigos = criarInimigos()
let inimigos2 = criarInimigos()

let coletaveis = []
let coletaveis2 = []


// ============ ESTADO DO JOGO ============
let fase = 1, cargaNome = cargas[1].nome, cargaValor = cargas[1].valor
let fase2 = 1, cargaNome2 = cargas[1].nome, cargaValor2 = cargas[1].valor

let jogar = true
let jogar2 = true
let modoMultiplayer = false
let telaFinal = false
let telaFinal2 = false
let vencedor = null  // 'j1' | 'j2' | 'empate'


// ============ MODAL DE SELEÇÃO ============
document.getElementById('btn-solo').addEventListener('click', () => {
      modoMultiplayer = false
      document.getElementById('modal-modo').classList.add('hidden')
      musica.play()
      main()
})

document.getElementById('btn-multi').addEventListener('click', () => {
      modoMultiplayer = true
      document.getElementById('hud-j2').style.display = 'flex'
      document.getElementById('des2').style.display = 'block'
      document.getElementById('info-j2').style.display = 'inline'
      document.getElementById('modal-modo').classList.add('hidden')
      musica.play()
      main()
})

document.addEventListener('click', () => sons.mouseClique.play())


// ============ CONTROLES ============
document.addEventListener('keydown', (e) => {
      if (jogar) {
            if (e.key === 'w') caminhao.pos = -5
            if (e.key === 's') caminhao.pos = 5
            if (e.key === 'a') caminhao.dir = -5
            if (e.key === 'd') caminhao.dir = 5
      }
      if (modoMultiplayer && jogar2) {
            if (e.key === 'ArrowUp') caminhao2.pos = -5
            if (e.key === 'ArrowDown') caminhao2.pos = 5
            if (e.key === 'ArrowLeft') caminhao2.dir = -5
            if (e.key === 'ArrowRight') caminhao2.dir = 5
      }
})

document.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 's') caminhao.pos = 0
      if (e.key === 'a' || e.key === 'd') caminhao.dir = 0
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') caminhao2.pos = 0
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') caminhao2.dir = 0
})


// ============ FUNÇÕES GENÉRICAS ============
function spawnarColetavel(ativo, lista) {
      if (!ativo || Math.random() >= 0.005) return
      const tipo = Math.random() < 0.7 ? 'dinheiro' : 'cargaExtra'
      const imagem = tipo === 'dinheiro'
            ? '../assets/images/game/dinheiro.png'
            : '../assets/images/game/carga-extra.png'
      lista.push(new Coletavel(1300, Math.random() * 300 + 100, 60, 60, imagem, tipo))
}

function colisao(cam, listaInimigos, listaColetaveis) {
      listaInimigos.forEach(inimigo => {
            if (cam.x < inimigo.x + inimigo.w &&
                  cam.x + cam.w > inimigo.x &&
                  cam.y < inimigo.y + inimigo.h &&
                  cam.y + cam.h > inimigo.y) {
                  cam.sofrerDano(inimigo.getDano(), inimigo.getMulta())
                  inimigo.x = 1500
                  sons.batida.currentTime = 0
                  sons.batida.play()
            }
      })
      listaColetaveis.forEach((c, i) => {
            if (cam.x < c.x + c.w &&
                  cam.x + cam.w > c.x &&
                  cam.y < c.y + c.h &&
                  cam.y + cam.h > c.y) {
                  if (c.tipo === 'dinheiro') cam.coletarDinheiro(50)
                  else cam.recuperarCarga(20)
                  listaColetaveis.splice(i, 1)
                  sons.coleta.currentTime = 0
                  sons.coleta.play()
            }
      })
}

function pontuacao(cam, listaInimigos) {
      listaInimigos.forEach(inimigo => {
            if (inimigo.x + inimigo.w < 0) {
                  cam.dinheiro += 50
                  inimigo.x = 1500
            }
      })
}

function verificarGameOver(cam, pararJogo) {
      if (cam.carga <= 0 || cam.dinheiro <= 0) {
            pararJogo()
            sons.gameOver.play()
      }
}


// ============ VERIFICAR ENTREGA ============
function verificarEntrega() {
      if (!jogar || telaFinal || caminhao.x + caminhao.w <= 1150) return
      caminhao.dinheiro += cargaValor
      caminhao.entregas++
      sons.entrega.play()

      if (fase < 3) {
            fase++
            caminhao.fase = fase
            cenario.fase = fase
            caminhao.trocarImagemFase(fase)
            caminhao.x = 80
            caminhao.carga = 100
            cargaNome = cargas[fase].nome
            cargaValor = cargas[fase].valor
            inimigos.forEach(i => i.velocidade += 1)
      } else {
            jogar = false
            if (modoMultiplayer) {
                  if (!jogar2) resolverVencedor()
                  else telaFinal = true
            } else {
                  telaFinal = true
                  musica.pause()
                  musica.currentTime = 0
                  musicaVitoria.currentTime = 0
                  musicaVitoria.play()
            }
      }
}

function verificarEntrega2() {
      if (!jogar2 || telaFinal2 || caminhao2.x + caminhao2.w <= 1150) return
      caminhao2.dinheiro += cargaValor2
      caminhao2.entregas++
      sons.entrega.play()

      if (fase2 < 3) {
            fase2++
            caminhao2.fase = fase2
            cenario2.fase = fase2
            caminhao2.trocarImagemFase(fase2)
            caminhao2.x = 80
            caminhao2.carga = 100
            cargaNome2 = cargas[fase2].nome
            cargaValor2 = cargas[fase2].valor
            inimigos2.forEach(i => i.velocidade += 1)
      } else {
            jogar2 = false
            if (!jogar) {
                  resolverVencedor()
                  musica.pause()
                  musica.currentTime = 0
                  musicaVitoria.currentTime = 0
                  musicaVitoria.play()
            } else {
                  telaFinal2 = true
            }
      }
}

function resolverVencedor() {
      if (caminhao.dinheiro > caminhao2.dinheiro) vencedor = 'j1'
      else if (caminhao2.dinheiro > caminhao.dinheiro) vencedor = 'j2'
      else vencedor = 'empate'
      telaFinal = true
      telaFinal2 = true
      musica.pause()
      musica.currentTime = 0
      musicaVitoria.currentTime = 0
      musicaVitoria.play()
}


// ============ REINICIAR ============
function reiniciarJogo() {
      caminhao = new Caminhao(80, 210, 400, 120, '../assets/images/veiculo/scania-madeira.png')
      caminhao2 = new Caminhao(80, 210, 400, 120, '../assets/images/veiculo/bob-na-madeira.png')

      fase = 1; cargaNome = cargas[1].nome; cargaValor = cargas[1].valor
      fase2 = 1; cargaNome2 = cargas[1].nome; cargaValor2 = cargas[1].valor

      coletaveis = []
      coletaveis2 = []
      jogar = true
      jogar2 = true
      telaFinal = false
      telaFinal2 = false
      vencedor = null

      cenario.resetar()
      cenario2.resetar()

      inimigos.forEach((ini, i) => { ini.x = 750 + i * 200; ini.velocidade = velocidadesBase[i] })
      inimigos2.forEach((ini, i) => { ini.x = 750 + i * 200; ini.velocidade = velocidadesBase2[i] })

      // Para a música de vitória se estiver tocando
      musicaVitoria.pause()
      musicaVitoria.currentTime = 0

      // Toca a música de fundo novamente
      musica.currentTime = 0
      musica.play()
}


// ============ DESENHAR TELA FINAL ============
function desenharTelaFinal(ctx, cam, cam2) {
      if (imagemFundoVitoria.complete && imagemFundoVitoria.naturalWidth > 0) {
            ctx.drawImage(imagemFundoVitoria, 0, 0, 1200, 500)
            ctx.fillStyle = 'rgba(0,0,0,0.5)'
            ctx.fillRect(0, 0, 1200, 500)
      } else {
            ctx.fillStyle = 'rgba(0,0,0,0.88)'
            ctx.fillRect(0, 0, 1200, 500)
      }

      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(0,0,0,0.8)'
      ctx.shadowBlur = 5
      ctx.fillStyle = '#f1c40f'
      ctx.font = 'bold 52px Arial'

      if (modoMultiplayer) {
            const titulo = vencedor === 'j1' ? 'JOGADOR 1 VENCEU!'
                  : vencedor === 'j2' ? 'JOGADOR 2 VENCEU!'
                        : 'EMPATE!'
            ctx.fillText(titulo, 600, 130)
      } else {
            ctx.fillText('VITÓRIA!', 600, 130)
      }

      ctx.fillStyle = 'white'
      ctx.font = '26px Arial'

      if (modoMultiplayer) {
            ctx.fillText('Dinheiro J1: R$ ' + cam.dinheiro, 600, 210)
            ctx.fillText('Dinheiro J2: R$ ' + cam2.dinheiro, 600, 260)
            ctx.fillStyle = '#ddd'
            ctx.font = '18px Arial'
            ctx.fillText('Entregas: ' + cam.entregas + '/3 e ' + cam2.entregas + '/3', 600, 310)
      } else {
            ctx.fillText('Parabéns! Você completou todas as entregas!', 600, 210)
            ctx.fillText('Dinheiro total: R$ ' + cam.dinheiro, 600, 270)
            ctx.fillStyle = '#ddd'
            ctx.font = '18px Arial'
            ctx.fillText('Entregas realizadas: ' + cam.entregas + '/3', 600, 320)
      }

      ctx.shadowBlur = 0

      // Botão "Jogar novamente"
      ctx.fillStyle = '#27ae60'
      ctx.beginPath()
      ctx.roundRect(370, 360, 220, 54, 10)
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Arial'
      ctx.fillText('Jogar novamente', 480, 393)

      // Botão "Voltar ao início"
      ctx.fillStyle = '#2980b9'
      ctx.beginPath()
      ctx.roundRect(610, 360, 220, 54, 10)
      ctx.fill()
      ctx.fillStyle = 'white'
      ctx.font = 'bold 20px Arial'
      ctx.fillText('Voltar ao início', 720, 393)
}


// ============ EVENTO DE CLIQUE NA TELA FINAL ============
function handleCliqueTela(e, canvasEl) {
      const rect = canvasEl.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (1200 / rect.width)
      const y = (e.clientY - rect.top) * (500 / rect.height)

      if (x >= 370 && x <= 590 && y >= 360 && y <= 414) reiniciarJogo()
      if (x >= 610 && x <= 830 && y >= 360 && y <= 414) window.location.href = '../index.html'
}

desEl.addEventListener('click', (e) => { if (telaFinal) handleCliqueTela(e, desEl) })
des2El.addEventListener('click', (e) => { if (telaFinal2) handleCliqueTela(e, des2El) })


// ============ LOOP — DESENHA ============
function desenha() {
      // J1
      if (jogar && !telaFinal) {
            cenario.desenhar(des)
            inimigos.forEach(i => i.des_ret(des))
            coletaveis.forEach(c => c.des_ret(des))
            caminhao.des_ret(des)

            document.getElementById('dinheiro').textContent = 'R$ ' + caminhao.dinheiro
            document.getElementById('carga').textContent = caminhao.carga + '%'
            document.getElementById('fase').textContent = fase + '/3'
            document.getElementById('cargaNome').textContent = cargaNome
            document.getElementById('cargaValor').textContent = 'R$ ' + cargaValor
      } else if (telaFinal) {
            desenharTelaFinal(des, caminhao, caminhao2)
      }

      if (!modoMultiplayer) return

      // J2
      if (jogar2 && !telaFinal2) {
            cenario2.desenhar(des2)
            inimigos2.forEach(i => i.des_ret(des2))
            coletaveis2.forEach(c => c.des_ret(des2))
            caminhao2.des_ret(des2)

            document.getElementById('dinheiro2').textContent = 'R$ ' + caminhao2.dinheiro
            document.getElementById('carga2').textContent = caminhao2.carga + '%'
            document.getElementById('fase2').textContent = fase2 + '/3'
            document.getElementById('cargaNome2').textContent = cargaNome2
            document.getElementById('cargaValor2').textContent = 'R$ ' + cargaValor2
      } else if (telaFinal2) {
            desenharTelaFinal(des2, caminhao, caminhao2)
      }
}


// ============ LOOP — ATUALIZA ============
function atualiza() {
      if (jogar) {
            caminhao.mov_car()
            inimigos.forEach(i => i.mov_car())
            cenario.atualizarLinhas()
            coletaveis.forEach(c => c.mov_car())
            coletaveis = coletaveis.filter(c => c.x > -100)
            spawnarColetavel(jogar, coletaveis)
            colisao(caminhao, inimigos, coletaveis)
            pontuacao(caminhao, inimigos)
            verificarEntrega()
            verificarGameOver(caminhao, () => { jogar = false; musica.pause(); musica.currentTime = 0 })
      }

      if (modoMultiplayer && jogar2) {
            caminhao2.mov_car()
            inimigos2.forEach(i => i.mov_car())
            cenario2.atualizarLinhas()
            coletaveis2.forEach(c => c.mov_car())
            coletaveis2 = coletaveis2.filter(c => c.x > -100)
            spawnarColetavel(jogar2, coletaveis2)
            colisao(caminhao2, inimigos2, coletaveis2)
            pontuacao(caminhao2, inimigos2)
            verificarEntrega2()
            verificarGameOver(caminhao2, () => { jogar2 = false })
      }
}


// ============ MAIN ============
function main() {
      des.clearRect(0, 0, 1200, 500)
      if (modoMultiplayer) des2.clearRect(0, 0, 1200, 500)
      desenha()
      atualiza()
      requestAnimationFrame(main)
}