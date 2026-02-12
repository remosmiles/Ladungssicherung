function updateTruckAnalysis() {
    const vl = parseFloat(document.getElementById('val-vl').value) || 0;
    const vr = parseFloat(document.getElementById('val-vr').value) || 0;
    const hl = parseFloat(document.getElementById('val-hl').value) || 0;
    const hr = parseFloat(document.getElementById('val-hr').value) || 0;

    const total = vl + vr + hl + hr;
    document.getElementById('total-weight').innerText = total;

    // Schwerpunkt-Verschiebung berechnen
    if (total > 0) {
        const xShift = ((vr + hr) - (vl + hl)) / total * 100; // Seitlich
        const yShift = ((hl + hr) - (vl + vr)) / total * 100; // Vorne/Hinten

        const cg = document.getElementById('cg-point');
        cg.style.left = `calc(50% + ${xShift * 0.4}px)`;
        cg.style.top = `calc(50% + ${yShift * 0.4}px)`;

        // Warnung bei Schieflage (über 10% Differenz)
        const diff = Math.abs(((vl + hl) - (vr + hr)) / total * 100);
        document.getElementById('lr-diff').innerText = diff.toFixed(1);

        const wheels = {
            'wheel-vl': vl, 'wheel-vr': vr, 
            'wheel-hl': hl, 'wheel-hr': hr
        };

        // Durchschnitt berechnen um Ausreisser zu finden
        const avg = total / 4;
        for (let id in wheels) {
            const el = document.getElementById(id);
            if (wheels[id] > avg * 1.3) { // 30% über Durchschnitt = Rot
                el.classList.add('danger');
            } else {
                el.classList.remove('danger');
            }
        }
    }
}
