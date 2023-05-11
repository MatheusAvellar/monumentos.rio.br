module.exports = function(eleventyConfig) {
	eleventyConfig.addGlobalData("IMRJ_URL",
		"http://www.inventariodosmonumentosrj.com.br/index.asp?iMENU=catalogo&iiCOD=");
	eleventyConfig.addGlobalData("HPIP_URL",
		"https://hpip.org/pt/heritage/details/");
	eleventyConfig.addGlobalData("WIKIDATA_URL",
		"https://www.wikidata.org/wiki/");
	eleventyConfig.addGlobalData("IPHAN_URL",
		"http://portal.iphan.gov.br/uploads/ckfinder/arquivos/Lista_bens_tombados_processos_andamento_2018");

	eleventyConfig.addPassthroughCopy("assets");

	fallback = (val, if_false="") =>
		(typeof val === "undefined" || val === null || (typeof val === "number" && isNaN(val)))
			? if_false
			: (typeof val === "string" ? val.trim() : val);


	const titleCase = (str) => {
		str = `${str}`;
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
	};
	const dateify = (date) => {
		if(date instanceof Date)
			return date;
		return new Date(`${date}T00:00Z`);
	};

	formatDate = (date) => {
		const d = dateify(date);
		const count = (date instanceof Date) ? 2 : (typeof date === "number" ? 0 : 1);

		const ye = new Intl.DateTimeFormat("pt-br", { year: "numeric", timeZone: "UTC" }).format(d);
		const mo = new Intl.DateTimeFormat("pt-br", { month: "long", timeZone: "UTC" }).format(d);
		const da = new Intl.DateTimeFormat("pt-br", { day: "numeric", timeZone: "UTC" }).format(d);

		if(count >= 2)
			return `${da} de ${mo} de ${ye}`;
		if(count === 1)
			return `${titleCase(mo)} de ${ye}`;
		return `${ye}`;
	};
	getYearsSince = (date) => {
		const start_year = dateify(date).getUTCFullYear();
		const current_year = (new Date()).getUTCFullYear();
		const delta_years = current_year - start_year;
		return `${delta_years} ano${delta_years >= 2 ? "s" : ""} atrás`;
	};

	/* Conversão de categorias (e.g. "estátua")
		 em URL de sua lista (e.g. "/estatuas") */
	const catToHrefMap = new Map();
	catToHrefMap.set("busto", "/bustos");
	catToHrefMap.set("chafariz", "/chafarizes");
	catToHrefMap.set("estátua", "/estatuas");
	catToHrefMap.set("marco", "/marcos");
	catToHrefMap.set("escultura", "/esculturas");
	catToHrefMap.set("obra", "/obras");
	catToHref = cat => catToHrefMap.get(cat) || "";

	/* Conversão de categorias (e.g. "estátua")
		 em classe CSS (e.g. "cat-estatua") */
	const catToClassMap = new Map();
	catToClassMap.set("busto", "cat-busto");
	catToClassMap.set("chafariz", "cat-chafariz");
	catToClassMap.set("estátua", "cat-estatua");
	catToClassMap.set("marco", "cat-marco");
	catToClassMap.set("escultura", "cat-escultura");
	catToClassMap.set("obra", "cat-obra");
	catToClass = cat => catToClassMap.get(cat) || "";

	makeTag = (tagName) => {
		return `<a class="tag" href="${catToHref(tagName)}">`
		+`<i class="category ${catToClass(tagName)}">${tagName}</i>`
		+`</a>`;
	};
};
