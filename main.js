// main.js (or main.mjs)
import * as electron from 'electron';

const { app, BrowserWindow, Tray, Menu } = electron;
//const app = electronApp;

import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname & __filename in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

let mainWin, splash, tray;

function createWindow() {
  // Splash window
  splash = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });
  splash.loadFile(path.join(__dirname, 'assets', '250gioitykheo.png'));

  // Main window
  mainWin = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    icon: path.join(__dirname, 'assets', '250gioitykheo.ico'),
    webPreferences: { nodeIntegration: false }
  });
  mainWin.loadFile(path.join(__dirname, 'src', 'TuTap4500.html'));

  mainWin.once('ready-to-show', () => {
    setTimeout(() => {
      splash.destroy();
      mainWin.show();
    }, 1500);
  });

  // Tray icon
  tray = new Tray(path.join(__dirname, 'assets', '250gioitykheo.ico'));
  const trayMenu = Menu.buildFromTemplate([
    { label: 'Show TuTap4500 App', click: () => mainWin.show() },
    { label: 'Quit',     click: () => app.quit() }
  ]);
  tray.setToolTip('TuTap4500 App');
  tray.setContextMenu(trayMenu);

  mainWin.on('close', e => {
    if (!app.isQuiting) {
      e.preventDefault();
      mainWin.hide();
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => { /* keep app alive in tray */ });
app.on('activate', () => { if (mainWin) mainWin.show(); });
