const {ipcRenderer} = require('electron')

ipcRenderer.send('data', "anydata");

ipcRenderer.on('data2', function (event, args) {
    console.log(JSON.parse(args.headers))
    const server = document.getElementById('server')
    const serverTime = document.getElementById('serverTime')
    const headers = document.getElementById('headers')
    const status = document.getElementById('status')
    server.innerText = JSON.stringify(args.data.server)
    serverTime.innerText = JSON.stringify(args.data.serverTime)
    headers.innerText = JSON.stringify(JSON.parse(args.headers))
    status.innerText = JSON.stringify(args.status)
});