function documentReady() {
	// Read More button functionality with glow effect
	const btn = document.getElementById('readMoreBtn');
	const hidden = document.getElementById('hiddenSkills');
	if (btn && hidden) {
		btn.addEventListener('click', function () {
			hidden.style.display = 'block';
			btn.style.display = 'none';
		});

		// Glow effect on mousemove
		btn.addEventListener('mousemove', (e) => {
			const rect = btn.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			btn.style.setProperty('--x', `${x}px`);
			btn.style.setProperty('--y', `${y}px`);
		});
	}

	// Magnetic Navigation Feature
	const mapRange = (inputLower, inputUpper, outputLower, outputUpper) => {
		const INPUT_RANGE = inputUpper - inputLower
		const OUTPUT_RANGE = outputUpper - outputLower
		return (value) =>
			outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
	}

	const list = document.querySelector('#header nav div')
	const items = document.querySelectorAll('#header nav div a')

	if (list && items.length > 0) {
		const updateMagnet = event => {
			const item = event.currentTarget
			const xRange = item.magnetMapper.x(item.dataset.centerX - event.x)
			const yRange = item.magnetMapper.y(item.dataset.centerY - event.y)
			item.style.setProperty('--magnet-x', xRange)
			item.style.setProperty('--magnet-y', yRange)
			list.style.setProperty('--list-x', xRange)
			list.style.setProperty('--list-y', yRange)
		}

		const disableMagnet = event => {
			event.target.style.setProperty('--magnet-x', 0)
			event.target.style.setProperty('--magnet-y', 0)
			list.style.setProperty('--list-x', 0)
			list.style.setProperty('--list-y', 0)
			event.target.removeEventListener('pointermove', updateMagnet)
			event.target.removeEventListener('pointerleave', disableMagnet)
		}

		const activateMagnet = (event) => {
			const item = event.target
			const bounds = item.getBoundingClientRect()

			item.dataset.centerX = bounds.x + (item.offsetWidth * 0.5)
			item.dataset.centerY = bounds.y + (item.offsetHeight * 0.5)

			if (!item.magnetMapper) {
				item.magnetMapper = {
					x: mapRange(item.offsetWidth * -0.5, item.offsetWidth * 0.5, 1, -1),
					y: mapRange(item.offsetHeight * -0.5, item.offsetHeight * 0.5, 1, -1)
				}
			}
			list.style.setProperty('--at', bounds.top)
			list.style.setProperty('--aw', bounds.right - bounds.left)
			list.style.setProperty('--ah', bounds.bottom - bounds.top)
			list.style.setProperty('--al', bounds.left)

			if (event.type === 'pointerenter') {
				item.addEventListener('pointermove', updateMagnet)
				item.addEventListener('pointerleave', disableMagnet)
			}
		}

		items.forEach(item => {
			item.addEventListener('pointerenter', activateMagnet)
			item.addEventListener('focus', activateMagnet)
		})
	}
}
document.addEventListener('DOMContentLoaded', documentReady);