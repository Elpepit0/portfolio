document.getElementById('waveButton').addEventListener('click', function() {
    const topWave = document.querySelector('g:nth-of-type(1) path');
    const bottomWave = document.querySelector('g:nth-of-type(2) path');

    function animateWave(wave) {
        let d = wave.getAttribute("d");

        // On ne modifie que certaines courbes pour éviter trop d'ondulations
        d = d.replace(/C(-?\d+\.?\d*) (-?\d+\.?\d*) (-?\d+\.?\d*) (-?\d+\.?\d*) (-?\d+\.?\d*) (-?\d+\.?\d*)/g, 
            (match, x1, y1, x2, y2, x, y, offset) => {
                // On modifie seulement certains points pour garder la structure principale
                if (Math.random() > 0.5) {
                    const amplitude = (Math.random() - 0.5) * 100; // Limite l'amplitude des vagues
                    return `C${x1} ${parseFloat(y1) + amplitude} ${x2} ${parseFloat(y2) + amplitude} ${x} ${y}`;
                } else {
                    return match;
                }
            }
        );

        gsap.to(wave, {
            attr: { d: d },
            duration: 1.5,
            ease: "power2.inOut"
        });
    }

    animateWave(topWave);
    animateWave(bottomWave);
});
