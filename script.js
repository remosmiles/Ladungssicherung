// Kleine Datenbank für häufige UN-Nummern
const adrDB = {
    "1202": { name: "DIESELKRAFTSTOFF / HEIZÖL", class: "3", cat: 3 }, // Faktor 1
    "1203": { name: "BENZIN / OTTOKRAFTSTOFF", class: "3", cat: 2 },   // Faktor 3
    "1965": { name: "FLÜSSIGGAS (LPG)", class: "2.1", cat: 2 },       // Faktor 3
    "3082": { name: "UMWELTGEFÄHRDEND (FLÜSSIG)", class: "9", cat: 3 },// Faktor 1
    "1072": { name: "SAUERSTOFF, KOMPRIMIERT", class: "2.2", cat: 3 } // Faktor 1
};

document.getElementById('un-input').addEventListener('input', checkADR);
document.getElementById('adr-menge').addEventListener('input', checkADR);

function checkADR() {
    const un = document.getElementById('un-input').value;
    const menge = parseFloat(document.getElementById('adr-menge').value) || 0;
    const display = document.getElementById('adr-result');
    
    if (adrDB[un]) {
        display.style.display = "block";
        const data = adrDB[un];
        
        // Punkte berechnen (ADR 1.1.3.6)
        let faktor = 1;
        if (data.cat === 1) faktor = 50;
        if (data.cat === 2) faktor = 3;
        if (data.cat === 3) faktor = 1;
        
        const punkte = menge * faktor;
        
        document.getElementById('adr-un-name').innerText = `UN ${un} ${data.name}`;
        document.getElementById('adr-class').innerText = `KLASSE ${data.class}`;
        document.getElementById('calc-points').innerText = punkte;
        
        const fill = document.getElementById('points-fill');
        fill.style.width = Math.min((punkte / 1000) * 100, 100) + "%";
        
        // Bestimmungen generieren
        let html = `<div class="adr-item">✅ Feuerlöscher: Mind. 2kg Pulver erforderlich.</div>`;
        html += `<div class="adr-item">✅ Beförderungspapier: UN-Nummer & ADR-Details Pflicht.</div>`;
        
        if (punkte > 1000) {
            html += `<div class="adr-item danger-alert">🚨 ÜBER 1000 PUNKTE: Orangene Warntafeln & ADR-Bescheinigung (Fahrer) Pflicht!</div>`;
            html += `<div class="adr-item danger-alert">🚨 Komplette Schutzausrüstung (S-Ausrüstung) nötig.</div>`;
            fill.style.background = "#ff0000";
        } else {
            html += `<div class="adr-item">ℹ️ Freigestellt ("Handwerkerregelung" möglich). Keine Warntafeln nötig.</div>`;
            fill.style.background = "#ff9800";
        }
        
        document.getElementById('adr-warnings').innerHTML = html;
    } else {
        display.style.display = "none";
    }
}
