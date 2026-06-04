// profil.js - Logik für die Nutzerübersicht

function renderProfil() {
    const profilContainer = document.getElementById('profil-content');
    if (!profilContainer) return;

    // Wir holen uns ein paar Daten aus dem Speicher, um sie anzuzeigen
    const communityBeitraegeCount = JSON.parse(localStorage.getItem('userFeedPosts')) || [];
    
    profilContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 100px; height: 100px; background: #673ab7; border-radius: 50%; margin: 0 auto 15px; display: flex; justify-content: center; align-items: center; font-size: 3rem; border: 4px solid #b388ff;">
                👤
            </div>
            <h2 style="font-size: 1.5rem;">Treuer Nachfolger</h2>
            <p style="color: #aaa; font-size: 0.9rem;">Dabei seit: ${new Date().toLocaleDateString('de-DE')}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
            <div style="background: rgba(103, 58, 183, 0.1); padding: 15px; border-radius: 12px; text-align: center; border: 1px solid rgba(103, 58, 183, 0.2);">
                <span style="display: block; font-size: 1.5rem; font-weight: bold; color: #b388ff;">${communityBeitraegeCount.length}</span>
                <span style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">Eigene Beiträge</span>
            </div>
            <div style="background: rgba(103, 58, 183, 0.1); padding: 15px; border-radius: 12px; text-align: center; border: 1px solid rgba(103, 58, 183, 0.2);">
                <span style="display: block; font-size: 1.5rem; font-weight: bold; color: #b388ff;">Aktiv</span>
                <span style="font-size: 0.75rem; color: #aaa; text-transform: uppercase;">Status</span>
            </div>
        </div>

        <h3 style="font-size: 1.1rem; margin-bottom: 15px; color: #b388ff; border-bottom: 1px solid #33254c; padding-bottom: 5px;">Einstellungen</h3>
        
        <div class="list-item" onclick="alert('Benachrichtigungen sind aktiviert!')">
            <span>🔔 Benachrichtigungen</span><span>ON</span>
        </div>
        
        <div class="list-item" onclick="alert('Du nutzt bereits den Dark Mode!')">
            <span>🌙 Dark Mode</span><span>Aktiv</span>
        </div>

        <div class="list-item" onclick="resetApp()" style="margin-top: 30px; border: 1px solid #c62828; background: rgba(198, 40, 40, 0.1);">
            <span style="color: #ef5350;">🗑️ Daten zurücksetzen</span>
        </div>

        <p style="text-align: center; color: #444; font-size: 0.75rem; margin-top: 20px;">Christ Life App v1.0</p>
    `;
}

// Funktion zum kompletten Zurücksetzen der App
function resetApp() {
    if(confirm("Möchtest du wirklich alle deine Beiträge und Einstellungen löschen?")) {
        localStorage.clear();
        location.reload();
    }
}

// Sorge dafür, dass das Profil geladen wird, wenn man den Tab anklickt
// Wir erweitern die bestehende switchScreen Funktion in der index.html gedanklich
const originalSwitchScreen = window.switchScreen;
window.switchScreen = function(screenId, title, navElement) {
    if(screenId === 'profil') {
        renderProfil();
    }
    // Falls die originale Funktion existiert, rufen wir sie auf
    if(typeof originalSwitchScreen === "function") {
        originalSwitchScreen(screenId, title, navElement);
    }
};

// Initial rendern
document.addEventListener('DOMContentLoaded', renderProfil);
