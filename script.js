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

// splash click event
splash.addEventListener("click", () => {
	splash.style.opacity = 0;
	setTimeout(() => {
		splash.style.display = "none";
		main.style.opacity = 1;

		// start type animations
		startTyping(
			(str) =>
				(document.querySelector(".username").textContent = `${str}`),
			800,
			200,
			["b4_", "4ofl", "scab"]
		);
	}, 1000);
});

startTyping((str) => (document.title = `${str} - mxrn.lol`), 800, 200, [
	"scab",
]);

// typewriter loop
function startTyping(fn, delay = 1000, speed = 250, titles = ["default_"]) {
	let i = 0,
		j = 0,
		isDeleting = false;

	function tick() {
		const title = titles[i];
		const current = isDeleting ? title.slice(0, j--) : title.slice(0, j++);

		fn(current);

		if (!isDeleting && j === title.length + 1) {
			isDeleting = true;
			setTimeout(tick, delay);
			return;
		}

		if (isDeleting && j === 0) {
			isDeleting = false;
			i = (i + 1) % titles.length;
		}

		setTimeout(tick, speed);
	}

	tick();
}
