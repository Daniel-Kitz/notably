const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function() {
    
    // Creating Window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true //due to a common bug, when nodeIntegration is false Javascript functions simply don't seem to work: https://www.electronjs.org/docs/faq#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron
        }
    });

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Close app on Quit
    mainWindow.on('closed', function() {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTempalte);

    // Insert menu
    Menu.setApplicationMenu(mainMenu)
});

// Handle create add Window
function createAddWindow() {
    // Creating Window
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true //due to a common bug, when nodeIntegration is false Javascript functions simply don't seem to work: https://www.electronjs.org/docs/faq#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron
        },
        width: 300,
        height: 200,
        title: 'Add Shoping List Item',
    });

    //Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Garbage Collection Handle
    addWindow.on('close', function() {
        addWindow = null;
    })
}

// Catch Item Adding
ipcMain.on('item:add', function (e, item){
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});


// Create menu template
const mainMenuTempalte = [
    {
        label: 'File',
        submenu: [
        {
            label: 'Add Item',
            click(){
                createAddWindow();
            }
        },
        {
            label: 'Clear Items'
        },
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit();
            }
        }
        ]
    }
];

//Fix 'electron' in mainMenu Bug on Mac
if (process.platform == 'darwin') {
    mainMenuTempalte.unshift({});
}

//Add Developer Tools if not in production
if (process.env.NODE_ENV !== 'production') {
    mainMenuTempalte.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle Devtools',
            accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: 'reload'
        }]
    });
}