import path from 'path';
import os from 'os';
import { app, BrowserWindow, Tray, Menu, shell } from 'electron';

import store from './store';

let tray: Tray | null = null;

function createWindow() {
    // 创建浏览器窗口
    const bounds = store.bounds.get();
    const options = {
        width: bounds?.width || 1280,
        minWidth: 1280,
        height: bounds?.height || 830,
        minHeight: 830,
        x: bounds?.x,
        y: bounds?.y,
        frame: false,
        icon: path.join(__dirname, '../images/wolai_icon_1024.png'),
        show: false,
        skipTaskbar: false,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'inject.js')
        }
    };
    const win = new BrowserWindow(options);

    // 取消windows菜单
    win.setMenu(null);
    win.loadURL('https://www.wolai.com/');

    win.once('ready-to-show', () => {
        win.show();
        console.log('userData: ', app.getPath('userData'));
    });

    win.on('close', () => {
        store.bounds.set(win.getBounds());
    });

    win.on('hide', () => {
        store.bounds.set(win.getBounds());
    });

    win.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        if (url.includes('wolai.com')) {
            win.loadURL(url);
        } else {
            shell.openExternal(url);
        }
    });

    // #region Tray 系统托盘图标目录
    tray = new Tray(path.join(__dirname, os.platform() === 'darwin' ? '../images/wolai_icon_24.png' : '../images/wolai_icon_1024.png'));

    //图标的上下文菜单
    const submenu = [
        {
            label: '关于',
            click: () => shell.openExternal('https://github.com/lake2/wolai_desktop')
        },
        {
            label: '退出',
            click: () => app.quit()
        }
    ];
    const winMenu = Menu.buildFromTemplate(submenu);

    //设置此托盘图标的悬停提示内容
    tray.setToolTip('wolai-desktop');

    //设置此图标的上下文菜单
    tray.setContextMenu(winMenu);

    //单击右下角小图标显示应用
    tray.on('click', () => win.show());
    // #endregion

    // #region mac menu
    const macMenu = [{ label: '我来', submenu }];
    Menu.setApplicationMenu(Menu.buildFromTemplate(macMenu));
    // #endregion
}

app.whenReady().then(createWindow);

app.on('activate', () => {
    BrowserWindow.getAllWindows().forEach(w => w.show());
});
