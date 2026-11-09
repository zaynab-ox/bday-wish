
/* STARS BACKGROUND */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8,
            opacity: Math.random()
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(drawStars);
}

resizeCanvas();
drawStars();

window.addEventListener("resize", resizeCanvas);


/* REVEAL BIRTHDAY WISH */

const revealBtn = document.getElementById("revealBtn");
const wishBox = document.getElementById("wishBox");
const wishText = document.getElementById("wishText");

const birthdayWish =
    "Happiest Birthdayyy, bhabhi! May Allah bless you with endless happiness, love and all the beautiful things in life. Keep smiling and shining always! Lots and lots of loveee!";

let typingTimer;

revealBtn.addEventListener("click", () => {
    clearInterval(typingTimer);

    wishBox.style.display = "block";
    wishText.textContent = "";
    revealBtn.querySelector("span").textContent = "Your Wish Is Here ♡";

    let index = 0;

    typingTimer = setInterval(() => {
        wishText.textContent += birthdayWish[index];
        index++;

        if (index >= birthdayWish.length) {
            clearInterval(typingTimer);
        }
    }, 35);
});


/* BIRTHDAY MUSIC - FIRST 28 SECONDS */

const musicBtn = document.getElementById("musicBtn");
const birthdayAudio = document.getElementById("birthdayAudio");

let musicTimeout;

musicBtn.addEventListener("click", async () => {
    if (!birthdayAudio.paused) {
        birthdayAudio.pause();
        birthdayAudio.currentTime = 0;
        clearTimeout(musicTimeout);
        musicBtn.textContent = "♫ Hear Your Wish";
        return;
    }

    try {
        birthdayAudio.currentTime = 0;
        await birthdayAudio.play();

        musicBtn.textContent = "♫ Music Playing...";

        clearTimeout(musicTimeout);

        musicTimeout = setTimeout(() => {
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0;
            musicBtn.textContent = "♫ Hear Your Wish";
        }, 28000);

    } catch (error) {
        musicBtn.textContent = "Add your birthday MP3";
    }
});

birthdayAudio.addEventListener("ended", () => {
    clearTimeout(musicTimeout);
    musicBtn.textContent = "♫ Hear Your Wish";
});


/* ORIGINAL MAGIC SOUND */

function playMagicSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50];

    notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        const start = audioContext.currentTime + index * 0.15;

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.15, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.7);

        oscillator.start(start);
        oscillator.stop(start + 0.75);
    });
}


/* OPEN MAGIC CAKE SURPRISE */

const magicBtn = document.getElementById("magicBtn");
const magicPopup = document.getElementById("magicPopup");
const closeMagic = document.getElementById("closeMagic");

magicBtn.addEventListener("click", () => {
    magicPopup.classList.add("active");
    playMagicSound();
});


/* CLOSE MAGIC SURPRISE */

closeMagic.addEventListener("click", () => {
    magicPopup.classList.remove("active");
});


/* BLOW OUT CANDLES */

const candles = document.querySelectorAll(".candle");
const wishMessage = document.getElementById("wishMessage");
const wishSubtext = document.getElementById("wishSubtext");

candles.forEach(candle => {

    candle.addEventListener("click", () => {

        if (candle.classList.contains("blown")) return;

        candle.classList.add("blown");

        const blownCount =
            document.querySelectorAll(".candle.blown").length;

        if (blownCount === 1) {
            wishSubtext.textContent = "One wish down... two to go! ✨";
        }

        if (blownCount === 2) {
            wishSubtext.textContent = "Almost there! One more candle! 💗";
        }

        if (blownCount === 3) {
            wishMessage.textContent = "Happiest Birthday, Bhabhi! 💗";

            wishSubtext.textContent =
                "May Allah bless you with endless happiness. May all your wishes come true! ✨";

            createMagicSparkles();
            playMagicSound();
        }

    });

});


/* RESET CANDLES */

const relightBtn = document.getElementById("relightBtn");

relightBtn.addEventListener("click", () => {

    candles.forEach(candle => {
        candle.classList.remove("blown");
    });

    wishMessage.textContent = "Your wish is waiting... 💗";

    wishSubtext.textContent =
        "Three candles, three wishes. Let's go!";

});


/* SPARKLE EFFECT */

function createMagicSparkles() {

    const container = document.getElementById("magicConfetti");

    const symbols = ["✨", "💗", "⭐", "🌸", "💫"];

    for (let i = 0; i < 45; i++) {

        const sparkle = document.createElement("span");

        sparkle.className = "magic-sparkle";

        sparkle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = (45 + Math.random() * 45) + "%";

        sparkle.style.setProperty(
            "--x",
            (Math.random() * 250 - 125) + "px"
        );

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1800);

    }

}
