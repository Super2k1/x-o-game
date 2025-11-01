
const { app, BrowserWindow } = require('electron');

const path = require('path');


function createWindow() {

    const win = new BrowserWindow({

        width: 800,      
        height: 600,    
        
        webPreferences: {
            nodeIntegration: false,
            
            contextIsolation: true,
            

            preload: path.join(__dirname, 'preload.js')
        },
    
        resizable: true,  
        
        icon: path.join(__dirname, 'icon.png'),
        
       
        title: 'Tic-Tac-Toe Game' 
    });
    win.loadURL('http://127.0.0.1:5500/');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});