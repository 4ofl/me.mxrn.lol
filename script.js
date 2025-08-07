const splash = document.getElementById("splash");
const main = document.getElementById("main");
const animatedText = document.getElementById("animated-text");
const bgVideo = document.getElementById("bg-video");
const card = document.querySelector(".card");

const text = animatedText.textContent;
animatedText.textContent = "";
[...text].forEach((char, i) => {
	const span = document.createElement("span");
	span.textContent = char;
	span.style.animationDelay = `${i * 0.1}s`;
	animatedText.appendChild(span);
});

splash.addEventListener("click", () => {
	splash.style.opacity = 0;

	setTimeout(() => {
		splash.style.display = "none";
		main.style.opacity = 1;
		card.classList.add("reveal");

		bgVideo.play().catch((e) => console.warn("video play failed:", e));

		// startTyping(
		// 	(str) =>
		// 		(document.querySelector(".username").textContent = `@${str}`),
		// 	2000,
		// 	150,
		// 	80,
		// 	["4ofl", "scab", "b4_", "aby"]
		// );

		startTyping(
			(str) => (document.querySelector(".bio").textContent = str),
			1000,
			100,
			100,
			[">_<", "^_^"]
		);
	}, 1000);
});

card.addEventListener("mousemove", (e) => {
	const rect = card.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const centerX = rect.width / 2;
	const centerY = rect.height / 2;

	const rotateX = ((y - centerY) / centerY) * 20;
	const rotateY = ((x - centerX) / centerX) * -20;

	card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
	card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
});

document.querySelector(".username").textContent = `scab`;

startTyping((str) => (document.title = `@${str}`), 800, 300, 300, [
	"scab",
	"4ofl",
	// "b4_",
	// "aby",
]);

function startTyping(
	fn,
	delay = 1000,
	typeSpeed = 250,
	deleteSpeed = 100,
	words = ["default_"]
) {
	let i = 0,
		j = 0,
		isDeleting = false;

	function tick() {
		const word = words[i];
		const current = isDeleting ? word.slice(0, j--) : word.slice(0, j++);

		fn(current);

		if (!isDeleting && j === word.length + 1) {
			isDeleting = true;
			setTimeout(tick, delay);
			return;
		}

		if (isDeleting && j === 0) {
			isDeleting = false;
			i = (i + 1) % words.length;
		}

		setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
	}

	tick();
}

const canvas = document.getElementById("drip-trail");
const ctx = canvas.getContext("2d");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";

let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
});

let blobs = [];
let lastX = 0,
	lastY = 0;

document.addEventListener("mousemove", (e) => {
	const dx = e.clientX - lastX;
	const dy = e.clientY - lastY;
	const dist = Math.sqrt(dx * dx + dy * dy);

	if (dist > 4) {
		lastX = e.clientX;
		lastY = e.clientY;

		const gray = Math.floor(Math.random() * 100 + 155); // 155–255
		blobs.push({
			x: e.clientX,
			y: e.clientY,
			radius: Math.random() * 2 + 1,
			vx: (Math.random() - 0.5) * 1.2, // more horizontal spread
			vy: Math.random() * 1 + 1,
			alpha: 1,
			gray,
		});
	}
});

function draw() {
	ctx.clearRect(0, 0, w, h);

	// draw links
	for (let i = 0; i < blobs.length; i++) {
		for (let j = i + 1; j < blobs.length; j++) {
			const a = blobs[i];
			const b = blobs[j];
			const dx = a.x - b.x;
			const dy = a.y - b.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 40) {
				const alpha = Math.min(a.alpha, b.alpha) * 0.2;
				const gray = Math.floor((a.gray + b.gray) / 2);
				ctx.beginPath();
				ctx.moveTo(a.x, a.y);
				ctx.lineTo(b.x, b.y);
				ctx.strokeStyle = `rgba(${gray},${gray},${gray},${alpha})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}
		}
	}

	// draw blobs
	blobs.forEach((b) => {
		b.vy += 0.05;
		b.x += b.vx;
		b.y += b.vy;
		b.alpha *= 0.96;

		ctx.beginPath();
		ctx.ellipse(
			b.x,
			b.y,
			b.radius * 0.8,
			b.radius * 1.1,
			0,
			0,
			Math.PI * 2
		);
		ctx.fillStyle = `rgba(${b.gray}, ${b.gray}, ${b.gray}, ${b.alpha})`;
		ctx.fill();
	});

	blobs = blobs.filter((b) => b.alpha > 0.05);
	requestAnimationFrame(draw);
}

draw();
