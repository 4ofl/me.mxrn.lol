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

type((str) => (document.title = `@${str}`), 500, 250);
