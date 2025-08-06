const splash = document.getElementById("splash");
const main = document.getElementById("main");
const animatedText = document.getElementById("animated-text");
const text = animatedText.textContent;

animatedText.textContent = "";
[...text].forEach((char, i) => {
	const span = document.createElement("span");
	span.textContent = char;
	span.style.animationDelay = `${i * 0.1}s`;
	animatedText.appendChild(span);
});

const bgVideo = document.getElementById("bg-video");

splash.addEventListener("click", () => {
	splash.style.opacity = 0;

	setTimeout(() => {
		splash.style.display = "none";
		main.style.opacity = 1;

		bgVideo.play().catch((e) => console.warn("video play failed:", e));

		startTyping(
			(str) =>
				(document.querySelector(".username").textContent = `@${str}`),
			2000,
			150,
			80,
			["4ofl", "scab", "b4_", "aby"]
		);

		startTyping(
			(str) => (document.querySelector(".bio").textContent = str),
			1000,
			100,
			10,
			[">_<", "^_^"]
		);
	}, 1000);
});

startTyping((str) => (document.title = `@${str} | mxrn.lol`), 2000, 200, 200, [
	"scab",
]);

// document.title = "scab | mxrn.lol";

// const cursor = document.createElement("div");
// cursor.classList.add("cursor");
// document.body.appendChild(cursor);

// const trailCount = 10;
// const trails = [];

// for (let i = 0; i < trailCount; i++) {
// 	const trailDot = document.createElement("div");
// 	trailDot.classList.add("trail");
// 	document.body.appendChild(trailDot);
// 	trails.push(trailDot);
// }

// let mouseX = 0,
// 	mouseY = 0;

// document.addEventListener("mousemove", (e) => {
// 	mouseX = e.clientX;
// 	mouseY = e.clientY;
// 	cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
// });

// function animateTrail() {
// 	let x = mouseX;
// 	let y = mouseY;

// 	for (let i = 0; i < trails.length; i++) {
// 		const dot = trails[i];
// 		setTimeout(() => {
// 			dot.style.transform = `translate(${x}px, ${y}px)`;
// 		}, i * 20);
// 		x -= (x - mouseX) * 0.1;
// 		y -= (y - mouseY) * 0.1;
// 	}

// 	requestAnimationFrame(animateTrail);
// }

// animateTrail();

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
