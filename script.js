const inputs = ['vl', 'vr', 'al', 'ar', 'sl', 'sr'];
inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', calculateSattelzug);
});

function calculateSattelzug() {
    const vl = parseFloat(document.getElementById('vl').value) || 0;
    const vr = parseFloat(document.getElementById('vr').value) || 0;
    const al = parseFloat(document.getElementById('al').value) || 0;
    const ar = parseFloat(document.getElementById('ar').value) || 0;
    const sl = parseFloat(document.getElementById('sl').value) || 0;
    const sr = parseFloat(document.getElementById('sr').value) || 0;

    const axle1 = vl + vr;
    const axle2 = al + ar;
    const axle3 = sl + sr;
    
    const total = axle1 + axle2 + axle3;
    const leftSide = vl + al + sl;
    const rightSide = vr + ar + sr;
    const diff = Math.abs(leftSide - rightSide);

    // UI Updates
    document.getElementById('sum-v').innerText = axle1.toLocaleString();
    document.getElementById('sum-a').innerText = axle2.toLocaleString();
    document.getElementById('sum-s').innerText = axle3.toLocaleString();
    document.getElementById('total-weight').innerText = total.toLocaleString() + " kg";
    document.getElementById('lr-diff').innerText = diff.toLocaleString() + " kg";

    // Schwerpunkt-Berechnung (COG)
    if (total > 0) {
        const xPos = (rightSide / total) * 100;
        // Y-Position gewichtet nach Achsabständen (vereinfacht)
        const yPos = ((axle2 * 0.4 + axle3 * 0.9) / total) * 100; 
        
        const cog = document.getElementById('target-point');
        cog.style.left = `${xPos}%`;
        cog.style.top = `${yPos}%`;

        // Warn-System
        const status = document.getElementById('status-text');
        const tile = document.getElementById('status-tile');
        
        if (diff > (total * 0.08)) { // 8% Toleranz beim Sattelzug
            status.innerText = "🚨 SCHIEFLAST";
            tile.style.color = "#ff4b2b";
        } else if (total > 40000) { // Beispiel: 40 Tonnen Limit
            status.innerText = "⚖️ ÜBERLADEN";
            tile.style.color = "#ff4b2b";
        } else {
            status.innerText = "✅ OPTIMAL";
            tile.style.color = "#00ff87";
        }
    }
}
