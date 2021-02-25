const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function() {
    
    // Creating Window
    mainWindow = new BrowserWindow({});

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTempalte);

    // Insert menu
    Menu.setApplicationMenu(mainMenu)
});

// Create menu template
const mainMenuTempalte = [
    {
        label: 'File',
        submenu: [
        {
            label: 'Add Item'
        },
        {
            label: 'Clear Items'
        },
        {
            label: 'Quit',
            click(){
                app.quit();
            }
        }
        ]
    }
];