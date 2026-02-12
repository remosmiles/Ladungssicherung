const inputs = ['vl', 'vr', 'hl', 'hr'];
inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', updateStats);
});

function updateStats() {
    const vl = parseFloat(document.getElementById('vl').value) || 0;
    const vr = parseFloat(document.getElementById('vr').value) || 0;
    const hl = parseFloat(document.getElementById('hl').value) || 0;
    const hr = parseFloat(document.getElementById('hr').value) || 0;

    const axle1 = vl + vr;
    const axle2 = hl + hr;
    const total = axle1 + axle2;
    const left = vl + hl;
    const right = vr + hr;
    const diff = Math.abs(left - right);

    // Anzeigen Update
    document.getElementById('sum-v').innerText = axle1;
    document.getElementById('sum-h').innerText = axle2;
    document.getElementById('total-weight').innerText = total + " kg";
    document.getElementById('lr-diff').innerText = diff + " kg";

    // Schwerpunkt-Punkt bewegen
    if (total > 0) {
        const xPerc = (right / total) * 100;
        const yPerc = (axle2 / total) * 100;
        const cog = document.getElementById('target-point');
        cog.style.left = `${xPerc}%`;
        cog.style.top = `${yPerc}%`;

        // Status Check
        const status = document.getElementById('status-text');
        const tile = document.getElementById('balance-tile');
        
        if (diff > (total * 0.1)) { // Mehr als 10% Schieflage
            status.innerText = "UNBALANCED";
            tile.style.color = "var(--danger)";
        } else {
            status.innerText = "STABLE";
            tile.style.color = "var(--success)";
        }
    }
}
