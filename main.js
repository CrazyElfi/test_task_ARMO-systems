const { app, BrowserWindow, ipcMain, net } = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'test_task_ARMO-systems',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            // enableRemoteModule: true
        }
    })


    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools()
}

const mainProcessVars = {
    data: null,
}

app.whenReady().then(() => {
    createWindow();
    // https://www.electronjs.org/docs/api/net
    // The net API can be used only after the application emits the ready event. Trying to use the module before the ready event will throw an error.
    const request = net.request('http://localhost:8888')
    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`)
            mainProcessVars.data = JSON.parse(chunk)
            mainProcessVars.status = response.statusCode
            mainProcessVars.headers = JSON.stringify(response.headers)
        })
        response.on('end', () => {
            console.log('No more data in response.')
        })
    })
    request.end()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('data', (event, args) => {
    console.log(`data request ${args}` )
    console.log('mainProcessVars ', mainProcessVars.data )
    event.sender.send('data2', mainProcessVars)
})
