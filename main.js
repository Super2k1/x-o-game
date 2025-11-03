// Importer les modules nécessaires d'Electron
// app : gère le cycle de vie de l'application
// BrowserWindow : crée et contrôle les fenêtres de l'application
const { app, BrowserWindow } = require('electron');

// Importer le module path pour gérer les chemins de fichiers
const path = require('path');

// Fonction pour créer la fenêtre principale de l'application
function createWindow() {

    // Créer une nouvelle fenêtre avec des options spécifiques
    const win = new BrowserWindow({

        // Définir la largeur de la fenêtre en pixels
        width: 800,      
        
        // Définir la hauteur de la fenêtre en pixels
        height: 600,    
        
        // Configuration des préférences web pour la sécurité
        webPreferences: {
            // Désactiver l'intégration de Node.js dans le rendu (pour la sécurité)
            nodeIntegration: false,
            
            // Activer l'isolation du contexte (sépare le code Electron du code web)
            contextIsolation: true,
            
            // Chemin vers le script preload qui s'exécute avant le chargement de la page
            preload: path.join(__dirname, 'preload.js')
        },
    
        // Permettre à l'utilisateur de redimensionner la fenêtre
        resizable: true,  
        
        // Définir l'icône de l'application (affichée dans la barre des tâches)
        icon: path.join(__dirname, 'icon.png'),
        
        // Définir le titre de la fenêtre
        title: 'Tic-Tac-Toe Game' 
    });
    
    // Charger l'URL de l'application (ici un serveur local Live Server)
    win.loadURL('http://127.0.0.1:5500/');
}

// Attendre que l'application Electron soit prête, puis créer la fenêtre
app.whenReady().then(() => {
    // Créer la fenêtre principale
    createWindow();
    
    // Sur macOS, recréer la fenêtre si l'application est activée sans fenêtre ouverte
    app.on('activate', () => {
        // Si aucune fenêtre n'est ouverte, en créer une nouvelle
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Gérer la fermeture de l'application quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
    // Sur Windows et Linux, quitter l'application
    // Sur macOS (darwin), les applications restent actives même sans fenêtre
    if (process.platform !== 'darwin') {
        app.quit();
    }
});