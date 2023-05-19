module.exports = function(eleventyConfig) {
	eleventyConfig.addGlobalData("IMRJ_URL",
		"http://www.inventariodosmonumentosrj.com.br/index.asp?iMENU=catalogo&iiCOD=");
	eleventyConfig.addGlobalData("HPIP_URL", "https://hpip.org/pt/heritage/details/");
	eleventyConfig.addGlobalData("WIKIDATA_URL", "https://www.wikidata.org/wiki/");
	eleventyConfig.addGlobalData("STRUCTURAE_URL", "https://structurae.net/structures/");
	eleventyConfig.addGlobalData("CONA_URL", "http://vocab.getty.edu/page/cona/");
	eleventyConfig.addGlobalData("IPHAN_URL",
		"http://portal.iphan.gov.br/uploads/ckfinder/arquivos/Lista_bens_tombados_processos_andamento_2018");
	eleventyConfig.addGlobalData("MARKER_PATH", "/assets/leaflet/images");

	eleventyConfig.addPassthroughCopy("assets");
	// [Ref] https://github.com/11ty/eleventy/issues/2461#issuecomment-1238279042
	eleventyConfig.addPassthroughCopy("{,!(_site)/**/}*.png");
	eleventyConfig.addPassthroughCopy("{,!(_site)/**/}*.jpg");

	website_domain = "monumentos.rio.br";

	fallback = function(obj, key, if_false="") {
		if(!(key in obj)) return if_false;
		const val = obj[key];
		if(typeof val === "undefined"
			|| val === null
			|| (typeof val === "number" && isNaN(val)))
			return if_false;

		if("dont_show" in obj && [obj.dont_show].flat().includes(key))
			return if_false;

		return (typeof val === "string" ? val.trim() : val);
	}

	const titleCase = (str) => {
		str = `${str}`;
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
	};
	dateify = (date) => {
		if(date instanceof Date)
			return date;
		if(!date)
			return null;
		return new Date(`${date}T00:00Z`);
	};

	getDatePrecision = (date) => {
		return (date instanceof Date) ? 2 : (typeof date === "number" ? 0 : 1);
	};

	formatDate = (date, circa) => {
		const d = dateify(date);
		if(!d) return "S.d.";

		const ye = new Intl.DateTimeFormat("pt-br", { year: "numeric", timeZone: "UTC" }).format(d);
		const mo = new Intl.DateTimeFormat("pt-br", { month: "long", timeZone: "UTC" }).format(d);
		const da = new Intl.DateTimeFormat("pt-br", { day: "numeric", timeZone: "UTC" }).format(d);

		const count = (date instanceof Date) ? 2 : (typeof date === "number" ? 0 : 1);
		if(!circa) {
			if(count >= 2)
				return `${da} de ${mo} de ${ye}`;
			if(count === 1)
				return `${titleCase(mo)} de ${ye}`;
			return `${ye}`;
		} else {
			if(count >= 2)
				return `Circa ${da} de ${mo} de ${ye}`;
			if(count === 1)
				return `Circa ${mo} de ${ye}`;
			return `c.${ye}`;
		}
	};
	getYearsSince = (date) => {
		const d =dateify(date);
		if(!d) return "? anos atrás";
		const start_year = d.getUTCFullYear();
		const current_year = (new Date()).getUTCFullYear();
		const delta_years = current_year - start_year;
		return `${delta_years} ano${delta_years >= 2 ? "s" : ""} atrás`;
	};

	getYearFromDate = (date, circa) => {
		const d = dateify(date);
		if(!d) return "S.d.";
		return (circa ? "c." : "") + d.getUTCFullYear();
	};

	/* Conversão de categorias (e.g. "estátua")
		 em URL de sua lista (e.g. "/estatuas") */
	const catToHrefMap = new Map();
	catToHrefMap.set("obra", "/obras");
	catToHrefMap.set("busto", "/bustos");
	catToHrefMap.set("chafariz", "/chafarizes");
	catToHrefMap.set("estátua", "/estatuas");
	catToHrefMap.set("marco", "/marcos");
	catToHrefMap.set("escultura", "/esculturas");
	catToHref = cat => catToHrefMap.get(cat) || "?";

	/* Conversão de categorias (e.g. "estátua")
		 em classe CSS (e.g. "cat-estatua") */
	const catToClassMap = new Map();
	catToClassMap.set("obra", "obra");
	catToClassMap.set("busto", "busto");
	catToClassMap.set("chafariz", "chafariz");
	catToClassMap.set("estátua", "estatua");
	catToClassMap.set("marco", "marco");
	catToClassMap.set("escultura", "escultura");
	catCleanup = cat => catToClassMap.get(cat) || "?";
	catToClass = cat => `cat-${catToClassMap.get(cat)}` || "?";

	/* Conversão de categorias (e.g. "obra")
		 em nome (e.g. "Obras públicas") */
	const catToNameMap = new Map();
	catToNameMap.set("obra", "Obras públicas");
	catToNameMap.set("busto", "Bustos e efígies");
	catToNameMap.set("chafariz", "Chafarizes e fontes");
	catToNameMap.set("estátua", "Estátuas");
	catToNameMap.set("marco", "Marcos");
	catToNameMap.set("escultura", "Esculturas");
	catToName = cat => catToNameMap.get(cat) || "?";

	// Remove acentos e troca espaços por _
	normalize = text =>
		text.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replaceAll(" ", "_")

	makeTag = (tagName, hyperlink=true) => {
		return (hyperlink ? `<a class="tag" href="${catToHref(tagName)}">` : "")
		+ `<i class="category ${catToClass(tagName)}">${tagName}</i>`
		+ (hyperlink ? `</a>` : "");
	};

	makeInfoTag = (tag) => `<i class="category info-tag ${normalize(tag)}">${tag}</i>`

	getIDFromPath = (path) => {
		const matches = `${path}`.match(/\/id\/([A-Za-z0-9]+)\//);
		if(matches && matches.length > 0)
			return matches[1];
		return "";
	};

	makeCard = (item) => {
		const ID = getIDFromPath(item.filePathStem);
		const data = item.data;
		const hasIMRJ = (data.imrj && `${data.imrj}`.length > 0);
		const hasMissing = [data.tags].flat().includes("removido");
		return `<div class="card" data-${hasIMRJ ? "" : "no-"}imrj >
	<a href="/id/${ID}">
		<div class="card-preview" style="background-image:url(/id/${ID}/thumb.jpg)"></div>
	</a>
	<div class="card-description">
		<a href="/id/${ID}">
			<p class="truncate" title="${data.name || "?"}">
				<strong>${data.name || "?"}</strong>
			</p>
		</a>
		<div class="card-details">
			<span class="identifier">${ID}</span>
			&middot;
			<span>${getYearFromDate(data.data_inaug, data.data_circa)}</span><br>
			<span class="neighborhood">${data.bairro || "?"}</span>
		</div>
		<div class="card-tags">
			${makeTag(data.categoria)} ${hasMissing ? makeInfoTag("removido") : ""}
		</div>
	</div>
</div>`;
	};
};
