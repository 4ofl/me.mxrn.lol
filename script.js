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
