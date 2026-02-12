const adrData = {
    "1203": { name: "BENZIN", class: "3", cat: 2, tunnel: "D/E", desc: "Leichtentzündlich" },
    "1202": { name: "DIESEL / HEIZÖL", class: "3", cat: 3, tunnel: "E", desc: "Umweltgefährdend" },
    "1965": { name: "FLÜSSIGGAS", class: "2.1", cat: 2, tunnel: "B/D", desc: "Explosionsgefahr" },
    "3082": { name: "UMWELTGEF. STOFFE", class: "9", cat: 3, tunnel: "E", desc: "Geringes Risiko" }
};

document.getElementById('check-btn').addEventListener('click', () => {
    const un = document.getElementById('un-num').value;
    const weight = parseFloat(document.getElementById('un-weight').value) || 0;
    const resArea = document.getElementById('adr-results');

    if (adrData[un]) {
        resArea.classList.remove('hidden');
        const data = adrData[un];
        
        // 1000-Punkte Berechnung
        const factor = data.cat === 2 ? 3 : 1;
        const pts = weight * factor;

        document.getElementById('res-name').innerText = `UN ${un} ${data.name}`;
        document.getElementById('res-class').innerText = `Klasse ${data.class}`;
        document.getElementById('pts-val').innerText = pts;
        
        const bar = document.getElementById('pts-bar');
        bar.style.width = Math.min(pts/10, 100) + "%";
        bar.style.backgroundColor = pts > 1000 ? "#cf1322" : "#0071e3";

        // Tunnel Logik Schweiz (Beispielhaft)
        let tunnelHTML = "";
        if (pts > 1000) {
            tunnelHTML += `<span class="tunnel-tag tunnel-no">Gotthard (E): Verboten</span>`;
            tunnelHTML += `<span class="tunnel-tag tunnel-no">San Bernardino (E): Verboten</span>`;
            tunnelHTML += `<span class="tunnel-tag tunnel-ok">Kirchenwald (A): Erlaubt</span>`;
        } else {
            tunnelHTML += `<span class="tunnel-tag tunnel-ok">Alle Schweizer Tunnel erlaubt (Freigrenze)</span>`;
        }
        document.getElementById('tunnel-info').innerHTML = tunnelHTML;

        // SDR Bestimmungen
        let rules = `<li>Ausrüstung gemäss SDR Kap. 8.1</li>`;
        if (pts > 1000) {
            rules += `<li><strong>Orangene Tafeln öffnen</strong></li>`;
            rules += `<li>ADR-Schulungsbescheinigung Pflicht</li>`;
            rules += `<li>Schutzausrüstung (Gefahrgutkoffer) komplett</li>`;
        } else {
            rules += `<li>Freigestellt nach 1.1.3.6 (Punkte < 1000)</li>`;
            rules += `<li>Feuerlöscher (mind. 2kg)</li>`;
        }
        document.getElementById('rules-list').innerHTML = rules;

    } else {
        alert("UN-Nummer nicht in Datenbank gefunden.");
    }
});
