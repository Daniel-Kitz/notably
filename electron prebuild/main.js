const electron = require('electron');
const url = require('url');
const path = require('path');

const { createAuthWindow } = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');

const { app, Menu } = electron;

let loginWindow;
let signupWindow;

async function mainWindow() {
    try {
        await authService.refreshTokens();

        const mainMenu = Menu.buildFromTemplate(mainMenuTempalte);
        Menu.setApplicationMenu(mainMenu);

        return createAppWindow();

    } catch (err) {

        createAuthWindow();

    }
}

// Listen for app to be ready
app.on('ready', mainWindow);


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

app.on('window-all-closed', () => {
    app.quit();
});

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