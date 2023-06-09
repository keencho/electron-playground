/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from "path";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import MenuBuilder from "./menu";
import { resolveHtmlPath } from "./util";
import { DefaultChannel } from "./channel";
import * as User32 from "./win32";
import koffi from "koffi";

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on(DefaultChannel, async(event, arg) => {
  if (!mainWindow) throw new Error('"mainWindow" is not defined');
  
  const applicationPath = 'C:\\Program Files\\Naver\\Naver Whale\\Application\\whale_proxy.exe';
  const args = '--profile-directory="Profile 1" --app-id=cinhimbnkkaeohfgghhklpknlkffjgod'
  
  for (let hwnd = null;;) {
    hwnd = User32.FindWindowEx(0, hwnd, 'Chrome_WidgetWin_1', null);
    
    if (!hwnd) {
      break;
    }
    
    // Get window title
    let title;
    {
      let buf = Buffer.allocUnsafe(1024);
      let length = User32.GetWindowText(hwnd, buf, buf.length);
      
      if (!length) {
        // Maybe the process ended in-between?
        continue;
      }
      
      title = koffi.decode(buf, 'char', length);
    }
    
    if (title.toLowerCase().includes('YouTube Music'.toLowerCase())) {
      console.log(hwnd)
      const res = User32.ShowWindow(hwnd[0], 9);
      console.log(res);
      // const params = {
      //   'type': 1,
      //
      //   'wVK': 0x20,
      //   'wScan': 0,
      //   'dwFlags': 0X0000,
      //
      //   'time': 0,
      //   'dwExtraInfo': 0
      // }
      //
      // User32.SendInput(1, params, 40)
      
      break;
    }
    
    // // Get PID
    // let pid;
    // {
    //   let ptr = [null];
    //   let tid = User32.GetWindowThreadProcessId(hwnd, ptr);
    //
    //   if (!tid) {
    //     // Maybe the process ended in-between?
    //     continue;
    //   }
    //
    //   pid = ptr[0];
    // }
  }
})

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];
  
  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  // console.log(`custom: ${screen}`)
  if (isDebug) {
    await installExtensions();
  }
  
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');
  
  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    minWidth: 1024,
    minHeight: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  
  mainWindow.loadURL(resolveHtmlPath('index.html'));
  
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  
  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
  
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
