document.addEventListener("DOMContentLoaded", () => {
    const diceButton = document.getElementById("dice-button");
    const body = document.body;
    const svg = document.getElementById("visual");
    const paths = document.querySelectorAll("#visual path");
    const projectButton = document.querySelector(".portfolio-text-button");
    const textsToAspirate = document.querySelectorAll(".container-portfolio-text, .footer-container");
    const circle = document.querySelector(".circle");
    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor-dot");
    const animatedTextElements = document.querySelectorAll(".animated-text");

    if (!diceButton || !svg || paths.length === 0 || typeof gsap === "undefined") {
        console.error("Un ou plusieurs éléments essentiels sont manquants ou GSAP non chargé.");
        return;
    }

    // ==== 1. Animation SVG ondulante ====
    const pathOptions1 = ["M0 378.6C-23 380.5 -46 382.5 -65.7 372.8C-85.5 363.2 -101.9 341.9 -119 327C-136.1 312.1 -153.8 303.7 -167.5 290.1C-181.2 276.5 -190.8 257.8 -207.6 247.4C-224.4 237 -248.4 235 -270.4 226.9C-292.5 218.8 -312.6 204.7 -319.6 184.5C-326.5 164.3 -320.4 138 -319.5 116.3C-318.6 94.6 -323.1 77.5 -333.8 58.9C-344.6 40.3 -361.6 20.1 -378.6 0L0 0Z",
        "M0 378.6C-23.8 382.1 -47.6 385.6 -65.7 372.8C-83.9 360 -96.4 330.9 -118 324.2C-139.6 317.5 -170.3 333.4 -187.5 324.8C-204.7 316.1 -208.5 283.1 -221.8 264.3C-235 245.5 -257.7 241.1 -270.4 226.9C-283.1 212.8 -285.9 188.9 -292.7 169C-299.5 149.1 -310.4 133.1 -317.6 115.6C-324.8 98.1 -328.2 79.1 -337.8 59.6C-347.3 40 -363 20 -378.6 0L0 0Z",
        "M0 378.6C-17.7 352.8 -35.3 327 -57.5 326C-79.6 325 -106.2 348.7 -127.2 349.6C-148.2 350.4 -163.6 328.4 -180.5 312.6C-197.4 296.9 -215.9 287.5 -228.8 272.7C-241.8 257.9 -249.2 237.8 -268.1 225C-287.1 212.2 -317.5 206.8 -327.9 189.3C-338.2 171.8 -328.3 142.3 -328 119.4C-327.6 96.4 -336.6 79.9 -346.7 61.1C-356.7 42.3 -367.6 21.2 -378.6 0L0 0Z",
        "M0 378.6C-23.2 381.3 -46.5 384 -65.7 372.8C-85 361.7 -100.2 336.8 -117.3 322.3C-134.4 307.9 -153.3 304 -170 294.4C-186.7 284.9 -201 269.9 -214.7 255.9C-228.3 241.9 -241.3 228.9 -258.9 217.3C-276.6 205.6 -299 195.2 -308.3 178C-317.6 160.8 -313.7 136.8 -322.3 117.3C-330.9 97.8 -351.9 82.9 -363.4 64.1C-374.8 45.3 -376.7 22.6 -378.6 0L0 0Z"];
    const pathOptions2 = ["M0 -378.6C16.9 -349.6 33.9 -320.6 56.6 -321C79.4 -321.5 107.9 -351.5 127.6 -350.5C147.2 -349.5 158 -317.7 173 -299.6C188 -281.6 207.4 -277.5 223.7 -266.6C240 -255.7 253.1 -237.9 262 -219.8C270.8 -201.7 275.4 -183.2 293.6 -169.5C311.8 -155.8 343.7 -146.8 355.8 -129.5C367.8 -112.2 359.9 -86.5 360.4 -63.6C360.9 -40.6 369.8 -20.3 378.6 0L0 0Z",
        "M0 -378.6C20.4 -368.5 40.8 -358.4 62.7 -355.5C84.6 -352.7 108.1 -357 126.9 -348.6C145.7 -340.2 159.9 -319.1 174.5 -302.2C189.1 -285.4 204 -273 218.5 -260.5C233.1 -247.9 247.4 -235.3 266.6 -223.7C285.8 -212.1 310 -201.5 316.1 -182.5C322.2 -163.5 310.2 -136.2 319.5 -116.3C328.8 -96.4 359.4 -83.9 372.8 -65.7C386.2 -47.6 382.4 -23.8 378.6 0L0 0Z",
        "M0 -378.6C23.7 -381.4 47.4 -384.2 65.5 -371.3C83.5 -358.3 95.8 -329.6 118 -324.2C140.2 -318.8 172.2 -336.7 189.3 -327.9C206.4 -319 208.6 -283.5 221.8 -264.3C234.9 -245.1 259 -242.3 272.7 -228.8C286.5 -215.3 289.9 -191.1 296.2 -171C302.5 -150.9 311.6 -134.8 324.2 -118C336.8 -101.2 352.8 -83.7 362.4 -63.9C372 -44.1 375.3 -22.1 378.6 0L0 0Z",
        "M0 -378.6C16.8 -348 33.5 -317.3 55.7 -316.1C78 -314.9 105.6 -343.1 124.8 -343C144.1 -342.9 154.9 -314.4 175.5 -304C196.1 -293.6 226.5 -301.2 243.3 -290C260.2 -278.8 263.4 -248.6 269.6 -226.3C275.9 -203.9 285.3 -189.3 303.1 -175C320.9 -160.7 347.2 -146.6 345.8 -125.9C344.4 -105.2 315.3 -77.8 316.1 -55.7C317 -33.7 347.8 -16.8 378.6 0L0 0Z"];

    const getRandomPath = (options) => options[Math.floor(Math.random() * options.length)];

    const animatePathsContinuously = () => {
        paths.forEach((path, index) => {
            const newPath = index === 0 ? getRandomPath(pathOptions1) : getRandomPath(pathOptions2);
            gsap.to(path, {
                duration: 1,
                attr: { d: newPath },
                ease: "power1.inOut",
            });
        });
        setTimeout(animatePathsContinuously, 1500);
    };

    animatePathsContinuously();

    // ==== 2. Transition vers projet.html avec absorption + flou ====
    if (projectButton) {
        projectButton.addEventListener("click", (e) => {
            e.preventDefault();
            const timeline = gsap.timeline({
                onComplete: () => window.location.href = "./pages/project/projet.html"
            });

            textsToAspirate.forEach((text) => {
                const rect = text.getBoundingClientRect();
                const circleRect = circle.getBoundingClientRect();
                const deltaX = circleRect.left + circleRect.width / 2 - (rect.left + rect.width / 2);
                const deltaY = circleRect.top + circleRect.height / 2 - (rect.top + rect.height / 2);

                timeline.to(text, {
                    x: deltaX,
                    y: deltaY,
                    scale: 0.1,
                    opacity: 0,
                    filter: "blur(8px)",
                    duration: 0.8,
                    ease: "power2.inOut"
                }, "<");
            });

            timeline.to("#visual", {
                filter: "blur(20px)",
                duration: 1,
                ease: "power2.inOut"
            }, "<");
        });
    }

    // ==== 3. Mode clair via le cercle ====
    let lightMode = false;
    circle.addEventListener("click", () => {
        lightMode = !lightMode;
        body.classList.toggle("light-mode", lightMode);
        textsToAspirate.forEach(el => el.classList.toggle("light-mode", lightMode));
    });

    // ==== 4. Curseur personnalisé ====
    document.body.classList.add("show-cursor");

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    // ← Capture la position au tout début une seule fois
    document.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorX = mouseX;
        cursorY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
    }, { once: true });

    // ← Puis on suit la souris
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        dotX += (cursorX - dotX) * 0.3;
        dotY += (cursorY - dotY) * 0.3;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.addEventListener("mousedown", () => cursor.classList.add("click"));
    document.addEventListener("mouseup", () => cursor.classList.remove("click"));

    const interactiveElements = document.querySelectorAll("button, a, .portfolio-text-button");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });

    // ==== 5. Animation du texte mot par mot ====
    const animateText = (element, totalDuration) => {
        const words = element.textContent.split(" ");
        element.innerHTML = "";

        const delay = totalDuration / words.length;

        words.forEach((word, i) => {
            const span = document.createElement("span");
            span.textContent = word;
            element.appendChild(span);
            if (i < words.length - 1) element.appendChild(document.createTextNode(" "));
            setTimeout(() => span.classList.add("visible"), i * delay);
        });
    };

    animatedTextElements.forEach(el => animateText(el, 2000));
});
