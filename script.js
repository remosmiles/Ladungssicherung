const fields = ['vl', 'vr', 'al', 'ar', 'sl', 'sr'];
fields.forEach(id => {
    document.getElementById(id).addEventListener('input', calculate);
});

function calculate() {
    const data = {};
    fields.forEach(id => data[id] = parseFloat(document.getElementById(id).value) || 0);

    const a1 = data.vl + data.vr;
    const a2 = data.al + data.ar;
    const a3 = data.sl + data.sr;
    const total = a1 + a2 + a3;

    document.getElementById('total').innerText = total.toLocaleString();
    document.getElementById('ax1').innerText = a1.toLocaleString() + ' kg';
    document.getElementById('ax2').innerText = a2.toLocaleString() + ' kg';
    document.getElementById('ax3').innerText = a3.toLocaleString() + ' kg';

    if (total > 0) {
        const cog = document.getElementById('cog');
        // Y-Position des Schwerpunktes basierend auf Lastverteilung
        const yPos = ((a2 * 0.35 + a3 * 0.85) / total) * 100;
        cog.style.top = `${yPos}%`;
    }
}
