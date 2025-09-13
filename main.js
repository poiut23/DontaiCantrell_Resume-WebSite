function documentReady() {

	var btn = document.getElementById('readMoreBtn');
	var hidden = document.getElementById('hiddenSkills');
	if (btn && hidden) {
		btn.addEventListener('click', function() {
			hidden.style.display = 'block';
			btn.style.display = 'none';
		});
	}

}
document.addEventListener('DOMContentLoaded', documentReady);