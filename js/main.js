document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contact-form');
	if (!form) return;

	const statusEl = document.createElement('div');
	statusEl.className = 'form-status';
	statusEl.style.margin = '12px 0';
	form.prepend(statusEl);

	function showStatus(message, isError = false) {
		statusEl.textContent = message;
		statusEl.style.color = isError ? '#8B0000' : '#006400';
	}

	function validateEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const data = new FormData(form);
		const payload = {
			name: (data.get('name') || '').toString().trim(),
			email: (data.get('email') || '').toString().trim(),
			company: (data.get('company') || '').toString().trim(),
			phone: (data.get('phone') || '').toString().trim(),
			spaceType: (data.get('space-type') || '').toString().trim(),
			message: (data.get('message') || '').toString().trim(),
		};

		if (!payload.name || !payload.email || !payload.message) {
			showStatus('Please fill in all required fields (name, email, message).', true);
			return;
		}

		if (!validateEmail(payload.email)) {
			showStatus('Please enter a valid email address.', true);
			return;
		}

		// For now we just log the payload and show a success message.
		// Replace this fetch with your real endpoint when available.
		console.log('Contact form submitted:', payload);

		showStatus('Thanks — your request has been sent. We will contact you soon.');
		const submitBtn = form.querySelector('button[type="submit"]');
		if (submitBtn) submitBtn.disabled = true;
		form.reset();
	});
});
