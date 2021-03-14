const { BrowserWindow } = require("electron");

function createAppWindow() {
  let win = new BrowserWindow({
    width: 1450,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("./pages/mainWindow.html");

  win.on("closed", () => {
    win = null;
  });
}

module.exports = createAppWindow;