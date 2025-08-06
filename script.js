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
const bgVideo = document.getElementById("bg-video");

splash.addEventListener("click", () => {
	splash.style.opacity = 0;

	setTimeout(() => {
		splash.style.display = "none";
		main.style.opacity = 1;

		bgVideo.play().catch((e) => {
			console.warn("video play failed:", e);
		});

		startTyping(
			(str) =>
				(document.querySelector(".username").textContent = `@${str}`),
			2000,
			200,
			["aby", "b4_", "4ofl", "scab"]
		);
	}, 1000);
});

// flex? effect
const card = document.querySelector(".card");

card.addEventListener("mousemove", (e) => {
	const rect = card.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	const centerX = rect.width / 2;
	const centerY = rect.height / 2;

	const rotateX = ((y - centerY) / centerY) * -10;
	const rotateY = ((x - centerX) / centerX) * 10;

	card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
	card.style.transform = "rotateX(0deg) rotateY(0deg)";
});

// typewriter title

startTyping((str) => (document.title = `${str} - mxrn.lol`), 1250, 250, [
	"scab",
]);

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
