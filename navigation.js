function documentReady() {
	const header = document.getElementById('header');
	const toggle = document.querySelector('.nav-toggle');
	const navList = document.getElementById('primary-nav');

	if (!header || !toggle || !navList) return;

	toggle.addEventListener('click', () => {
		const isOpen = header.classList.toggle('nav-open');
		toggle.setAttribute('aria-expanded', String(isOpen));
	});

	navList.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.matches('a')) {
			header.classList.remove('nav-open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	});
}

document.addEventListener('DOMContentLoaded', documentReady);