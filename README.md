![Status](https://img.shields.io/badge/status-active-blue)
![JS](https://img.shields.io/badge/JavaScript-vanilla-yellow)

# 🎮 Ultra Library

![Preview](assets/preview.png)

Uma biblioteca web de jogos retrô rodando diretamente no navegador, sem necessidade de instalação.

👉 Acesse: https://jak-line.github.io/Ultra-Library/

---

## ✨ Sobre o projeto

O **Ultra Library** é uma aplicação frontend que permite jogar títulos clássicos diretamente no browser utilizando emulação via WebAssembly.

O projeto foi construído com foco em simplicidade, acessibilidade e experimentação com tecnologias web modernas.

---

## ⚙️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript (Vanilla)
* Canvas API
* WebAssembly
* EmulatorJS

---

## 🧩 Sistema de emulação (EmulatorJS)

O Ultra Library integra o **EmulatorJS**, uma solução de emulação baseada em WebAssembly que permite executar múltiplos sistemas diretamente no navegador.

### 🏗️ Arquitetura da integração

A aplicação utiliza uma abordagem modular para carregar e executar os jogos:

* `roms.js` → define um mapa de ROMs via URLs externas (CDN/Dropbox)
* `games.js` → organiza metadados e estrutura dos jogos
* `emulator.js` → inicializa e configura o EmulatorJS dinamicamente

### 🔄 Fluxo de execução

1. O usuário seleciona um jogo na interface
2. O sistema identifica a ROM correspondente
3. A ROM é carregada via URL remota
4. O EmulatorJS é inicializado com a plataforma adequada
5. O jogo é renderizado no navegador via canvas

### 🎮 Recursos suportados

* Múltiplos consoles (NES, SNES, N64, GBA, etc.)
* Input via teclado (e possível suporte a controle)
* Execução em tempo real no browser
* Carregamento dinâmico de jogos

---

## 📁 Estrutura do projeto

```bash
Ultra-Library/
│
├── index.html
│
├── js/
│   ├── changelog.js
│   ├── controls.js
│   ├── emulator.js
│   ├── games.js
│   ├── roms.js
│   └── script.js
│
├── css/
│   └── style.css
│
├── img/
│   └── "all img files"
│
├── covers/
│   └── "all covers"
│
└── audio/
    └── "all audio files"

```

---

## ⚠️ Aviso

Este projeto utiliza ROMs de jogos disponíveis na internet e carregadas via URLs externas.

A distribuição e uso desses arquivos pode envolver questões legais relacionadas a direitos autorais, dependendo da sua jurisdição.

O projeto é disponibilizado para fins de estudo, experimentação e demonstração de tecnologias web.

---

## 🚀 Possíveis melhorias

* Sistema de favoritos
* Upload de ROMs pelo usuário
* Suporte completo a gamepads
* UI/UX aprimorada
* Lazy loading de jogos

---

## 🤝 Contribuição

Sinta-se livre para abrir issues ou enviar pull requests com melhorias.

---

## 📜 Licença

Este projeto não possui uma licença definida no momento.
