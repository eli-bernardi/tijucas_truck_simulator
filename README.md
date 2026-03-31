# 🚛 Tijucas Truck Simulator

> Jogo de corrida side-scroller desenvolvido com HTML5 Canvas e JavaScript puro, ambientado nas estradas de Tijucas - SC.

---

## 📋 Sobre o Projeto

O **Tijucas Truck Simulator** é um jogo 2D de direção onde o jogador assume o papel de um caminhoneiro que precisa entregar cargas valiosas atravessando 3 fases com cenários diferentes. Desvie dos veículos inimigos, colete itens na pista e chegue ao ponto de entrega antes de perder toda a carga ou o dinheiro.

Suporta **modo solo** e **modo multiplayer local** (dois jogadores no mesmo teclado).

Desenvolvido como projeto escolar no **SENAI**, utilizando apenas tecnologias web nativas — sem frameworks ou bibliotecas externas.

---

## 🎮 Como Jogar

| Tecla | Jogador 1 | Jogador 2 |
|-------|-----------|-----------|
| Cima | `W` | `↑` |
| Baixo | `S` | `↓` |
| Esquerda | `A` | `←` |
| Direita | `D` | `→` |

### Modos de jogo
- **Solo** — um jogador completa as 3 fases e tenta maximizar o saldo final
- **Multiplayer** — dois jogadores disputam em telas separadas; vence quem terminar as 3 fases com mais dinheiro

### Regras
- Chegue ao ponto **🚩 ENTREGA** no lado direito da tela para concluir a fase
- Cada colisão com um inimigo reduz sua **carga** e seu **dinheiro**
- Ao passar de fase, a carga é totalmente restaurada
- Se a carga ou o dinheiro **zerar**, é Game Over
- Colete **💰 moedas** (+R$ 50) e **📦 carga extra** (+20% de carga) espalhadas pela pista

### Fases

| Fase | Cenário | Carga | Valor |
|------|---------|-------|-------|
| 1 | Cidade Noturna | Madeira | R$ 1.000 |
| 2 | Floresta | Contêiner Refrigerado | R$ 2.500 |
| 3 | Serra | Areia | R$ 2.000 |

---

## 🚀 Instalação e Execução

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Edge)
- Extensão **Live Server** no VS Code (recomendado) **ou** qualquer servidor HTTP local

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/eli-bernardi/tijucas-truck-simulator.git
```

2. **Acesse a pasta do projeto**
```bash
cd tijucas-truck-simulator
```

3. **Inicie com Live Server**
   - Abra a pasta no VS Code
   - Clique com o botão direito em `index.html`
   - Selecione **"Open with Live Server"**

4. **Ou use o Python HTTP Server**
```bash
# Python 3
python -m http.server 5500
# Acesse: http://localhost:5500
```

> ⚠️ **Importante:** O jogo não funciona abrindo o `index.html` diretamente pelo navegador (`file://`) devido às políticas de CORS para carregamento de imagens e áudio. Use sempre um servidor local.

---

## 🗂️ Estrutura de Pastas

```
tijucas-truck-simulator/
│
├── index.html                  # Página inicial (menu)
├── index.js                    # Loop principal do jogo
│
├── html/
│   ├── jogoRodando.html        # Página do jogo (solo e multiplayer)
│   ├── sobreGame.html          # Sobre o projeto e equipe
│   └── manual.html             # Manual com controles, fases e inimigos
│
├── models/                     # Classes JavaScript
│   ├── Obj.js                  # Classe base de todos os objetos
│   ├── Caminhao.js             # Jogador — movimento, dano, troca de fase
│   ├── VeiculoInimigo.js       # Inimigos — colisão e reposicionamento
│   ├── Coletavel.js            # Itens coletáveis — dinheiro e carga extra
│   └── Cenario.js              # Fundo parallax e linha de entrega
│
└── assets/
    ├── css/
    │   ├── style.css           # Estilo da página inicial
    │   ├── jogoRodando.css     # Estilo do jogo (HUD, modal, canvas)
    │   ├── sobreGame.css       # Estilo da página Sobre
    │   └── manual.css          # Estilo do manual
    │
    ├── images/
    │   ├── game/               # Fundos das fases, itens e logo
    │   └── veiculo/            # Sprites dos veículos
    │
    ├── sounds/                 # Efeitos sonoros (.mp3/.wav)
    ├── music/                  # Música de fundo (.mp3)
    └── font/                   # Fontes customizadas (BlackWidow, OverPass)
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura das páginas e elemento `<canvas>` |
| **CSS3** | Estilização, animações e layout responsivo |
| **JavaScript ES6+** | Lógica do jogo, classes, game loop |
| **Canvas API** | Renderização dos gráficos |
| **Web Audio API** | Efeitos sonoros e música de fundo |

### Padrões e técnicas
- **POO** com herança — `Caminhao`, `VeiculoInimigo` e `Coletavel` estendem `Obj`
- **Game loop** com `requestAnimationFrame`
- **Detecção de colisão AABB** (Axis-Aligned Bounding Box)
- **Parallax scrolling** para o fundo em movimento
- **Multiplayer local** — dois canvas independentes com estados separados
- **Vanilla JS** — sem frameworks ou dependências externas

---

## 👥 Créditos

| Nome | Função |
|------|--------|
| **Eliel Bernardi** | Scrum Master — desenvolvimento, código, mecânicas e assets |
| **Carlos Roberto** | Product Owner — requisitos, testes e validação |

---

## 📄 Licença

Desenvolvido para fins **educacionais** no âmbito do curso técnico do **SENAI**.

Uso livre para estudo e aprendizado. Para outros usos, entre em contato com os autores.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/eli-bernardi">Eliel Bernardi</a> © 2026
</p>