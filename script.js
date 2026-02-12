function calculateLasi() {
    const gewicht = parseFloat(document.getElementById('lasi-gewicht').value) || 0;
    const mue = parseFloat(document.getElementById('lasi-reib').value);
    const alpha = parseFloat(document.getElementById('lasi-winkel').value);
    const stf = 500; // Standard-Vorspannkraft in daN

    if (gewicht > 0) {
        // Formel: n = (G * (0.8 - mue)) / (k * mue * sin(alpha))
        // Wir nutzen hier eine vereinfachte, sichere Berechnungsmethode
        const winkelRad = alpha * (Math.PI / 180);
        const benötigteGurte = Math.ceil((gewicht * (0.8 - mue)) / (1.5 * mue * Math.sin(winkelRad) * stf));
        
        const resultText = benötigteGurte > 0 ? Math.max(benötigteGurte, 2) : 0;
        document.getElementById('lasi-needed').innerText = resultText;
        
        // Optisches Feedback
        const box = document.getElementById('lasi-result');
        if (resultText > 5) {
            box.style.backgroundColor = "#fee2e2"; // Rot-Warnung
            box.style.color = "#b91c1c";
        } else {
            box.style.backgroundColor = "#f0fdf4"; // Grün-OK
            box.style.color = "#15803d";
        }
    }
}
