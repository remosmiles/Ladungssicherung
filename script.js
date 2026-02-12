function calculateTruck() {
    // Werte holen
    const vl = parseFloat(document.getElementById('v-links').value) || 0;
    const vr = parseFloat(document.getElementById('v-rechts').value) || 0;
    const hl = parseFloat(document.getElementById('h-links').value) || 0;
    const hr = parseFloat(document.getElementById('h-rechts').value) || 0;

    // Berechnungen
    const axle1 = vl + vr;
    const axle2 = hl + hr;
    const total = axle1 + axle2;
    const leftSide = vl + hl;
    const rightSide = vr + hr;

    // Anzeige aktualisieren
    document.getElementById('axle-1-total').innerText = axle1;
    document.getElementById('axle-2-total').innerText = axle2;
    document.getElementById('total-weight').innerText = total + " kg";
    
    // Differenz L/R
    const diff = Math.abs(leftSide - rightSide);
    document.getElementById('lr-diff').innerText = diff + " kg";

    if (total > 0) {
        // Prozente berechnen
        const pLeft = Math.round((leftSide / total) * 100);
        const pRight = 100 - pLeft;
        document.getElementById('lr-distribution').innerText = `${pLeft}% / ${pRight}%`;

        // Schwerpunkt-Punkt (Visual) verschieben
        const cog = document.getElementById('cog');
        const xOffset = (pRight - 50) * 1.5; // Seitliche Verschiebung
        const yOffset = ((axle2 / total) - 0.5) * 100; // Vorne/Hinten Verschiebung
        
        cog.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;

        // Warn-Logik (wenn Differenz > 10% vom Gesamtgewicht)
        const status = document.getElementById('global-status');
        if (diff > (total * 0.1)) {
            status.innerText = "⚠️ SCHIEFLAST";
            status.style.background = "#ef4444";
            document.getElementById('diff-warning').style.color = "#ef4444";
        } else {
            status.innerText = "✅ STABIL";
            status.style.background = "#22c55e";
            document.getElementById('diff-warning').style.color = "#1e293b";
        }
    }
}
