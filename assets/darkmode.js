(function() {
	// [Ref] github.com/Modernizr/Modernizr/blob/f1b57789747767db3eca410a7c7334f1904f4f37/feature-detects/storage/localstorage.js#L37
	function isLocalStorageAvailable() {
		const test = "TW9udW1lbnRvcyBkbyBSaW8h";
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}
	const canLocalStorage = isLocalStorageAvailable();
	function toggleDarkMode(state) {
		state = !!state;
		console.log(`[dark-mode] Called 'toggleDarkMode(${state})'`);
		toggle.checked = state;
		// Liga o modo escuro
		if(state) {
			document.body.parentElement.classList.add("dark");
			text.textContent = "Desativar modo escuro";
		// Desliga o modo escuro
		} else {
			document.body.parentElement.classList.remove("dark");
			text.textContent = "Ativar modo escuro";
		}
	}
	function setLocalStorage(state) {
		state = !!state;
		console.log(`[dark-mode] Called 'setLocalStorage(${state})'`);
		// Se podemos usar o local storage pra salvar a preferência
		if(canLocalStorage)
			localStorage.setItem("dark-mode", Number(state));
	}

	// Mostra botão de modo escuro, já que temos JS
	const wrapper = document.getElementById("dark-mode-wrapper");
	wrapper.parentElement.removeAttribute("hidden");
	const text = document.getElementById("dark-mode-text");
	// Escuta por cliques no checkbox de modo escuro
	const toggle = document.getElementById("dark-mode-toggle");
	toggle.addEventListener("change", function(e) {
		toggleDarkMode(toggle.checked);
		setLocalStorage(toggle.checked);
	});
	////
	matchMedia = "matchMedia" in window ? window.matchMedia : (()=>false);
	const prefersDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
	console.log(`[dark-mode] Browser 'prefers-color-scheme: dark': ${prefersDarkMode}`);
	// Se podemos conferir se há configuração salva
	if(canLocalStorage) {
		const previous = localStorage.getItem("dark-mode");
		// Se não existe configuração salva
		if(previous === null) {
			console.log(`[dark-mode] No localStorage setting found`);
			// Se o navegador possui preferência
			if(prefersDarkMode) toggleDarkMode(true);
			else toggleDarkMode(false);
		// Se existe configuração salva
		} else {
			console.log(`[dark-mode] Found localStorage setting: ${previous} (${!!Number(previous)})`);
			if(!!Number(previous)) toggleDarkMode(true);
			else toggleDarkMode(false);
		}
	// Se não podemos conferir configurações salvas
	} else {
		// Se o navegador possui preferência
		if(prefersDarkMode) toggleDarkMode(true);
		else toggleDarkMode(false);
	}
})();