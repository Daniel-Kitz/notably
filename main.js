const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, screen } = electron;

let mainWindow;
let loginWindow;
let signupWindow;

// Listen for app to be ready
app.on('ready', function() {

    // Creating Window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true 
        },
        width: 1450,
        height: 800
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


function createLoginWindow() {

    loginWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: 'Login'
    });

    loginWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'loginWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    loginWindow.on('close', function() {
        loginWindow = null;
    })
}

function createSignupWindow() {

    signupWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 1300,
        height: 700,
        title: 'SignUp'
    });

    signupWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'signupWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    signupWindow.on('close', function() {
        signupWindow = null;
    })

}

// Create menu template
const mainMenuTempalte = [
    {
        label: 'File',
        submenu: [
        {
            label: 'Login',
            click(){
                createLoginWindow();
            }
        },
        {
            label: 'Sign Up',
            click(){
                createSignupWindow();
            }
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