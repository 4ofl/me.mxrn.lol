const lines = [
	"[system booting...]",
	"loading core modules...",
	"establishing connection...",
	"authentication handshake accepted.",
	"",
	"press anywhere to enter",
];

const bootText = document.getElementById("boot-text");
const splash = document.getElementById("splash");
const main = document.getElementById("main");

let i = 0;

function typeLine() {
	if (i < lines.length) {
		const line = lines[i];
		let j = 0;
		const interval = setInterval(() => {
			if (j <= line.length) {
				bootText.innerHTML += line[j] || "";
				j++;
			} else {
				bootText.innerHTML += "\n";
				clearInterval(interval);
				i++;
				setTimeout(typeLine, 300);
			}
		}, 30);
	}
}

typeLine();

splash.addEventListener("click", () => {
	splash.style.display = "none";
	main.style.opacity = 1;
});

// title typewriter
type((str) => (document.title = `@${str}`), 500, 250);

function type(fn, delay = 1000, speed = 250) {
	const titles = ["b4_", "4ofl", "scab"];
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
