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

	const metaThemeColor = document.createElement("meta");
	metaThemeColor.setAttribute("name", "theme-color");
	document.head.appendChild(metaThemeColor);

	function toggleDarkMode(state, element) {
		state = !!state;
		console.log(`[dark-mode] Called 'toggleDarkMode(${state})'`);
		if(element) element.checked = state;
		// Liga o modo escuro
		if(state) {
			document.body.parentElement.classList.add("dark");
			metaThemeColor.setAttribute("content", "#393a47");
		// Desliga o modo escuro
		} else {
			document.body.parentElement.classList.remove("dark");
			metaThemeColor.setAttribute("content", "#fff");
		}
	}
	function setLocalStorage(state) {
		state = !!state;
		console.log(`[dark-mode] Called 'setLocalStorage(${state})'`);
		// Se podemos usar o local storage pra salvar a preferência
		if(canLocalStorage)
			localStorage.setItem("dark-mode", Number(state));
	}

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

	////
	addEventListener("DOMContentLoaded", (event) => {
		// Mostra botão de modo escuro, já que temos JS
		const wrapper = document.getElementById("dark-mode-wrapper");
		wrapper.parentElement.removeAttribute("hidden");
		// Escuta por cliques no checkbox de modo escuro
		const toggle = document.getElementById("dark-mode-toggle");
		toggle.checked = document.body.parentElement.classList.contains("dark");
		toggle.title = toggle.checked ? "Desativar modo escuro" : "Ativar modo escuro";
		toggle.addEventListener("change", function(e) {
			toggle.title = toggle.checked ? "Desativar modo escuro" : "Ativar modo escuro";
			toggleDarkMode(toggle.checked);
			setLocalStorage(toggle.checked);
		});
	});
	////
})();