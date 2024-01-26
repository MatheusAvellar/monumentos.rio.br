(function() {
	const button = document.getElementById("copy-pix-key");
	const key = document.getElementById("pix-key");
	const feedback = document.getElementById("copy-feedback");
	let timeout = -1;

	// Se não tem botão / chave, vai embora
	if(!button) return;
	// Se não tem chave ou como copiar, vai embora
	if(!key || !key.value) {
		console.log("[pix] No key!");
		button.style.display = "none";
		return;
	}
	if(!("clipboard" in navigator)) {
		console.log("[pix] Clipboard not available!");
		button.style.display = "none";
		return;
	}
	button.addEventListener("click", () => {
		clearTimeout(timeout);
		// Tenta copiar por navigator.clipboard
		writeClipboardText(key);
	});
	async function writeClipboardText(text) {
		try {
			await navigator.clipboard.writeText(text);
			console.log(`[pix] Copied "${key}" via "navigator.clipboard.writeText"`);
			copySuccess();
		} catch (error) {
			console.error(error.message);
		}
	}
	// Se copiou com sucesso, feedback
	function copySuccess() {
		if(!feedback) return;
		feedback.classList.add("open");
		timeout = setTimeout(() => {
			feedback.classList.remove("open");
		}, 2000);
	}
})();