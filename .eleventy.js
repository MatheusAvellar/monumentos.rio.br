const ejsPlugin = require("@11ty/eleventy-plugin-ejs");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(ejsPlugin);

	eleventyConfig.addGlobalData("IMRJ_URL",
		"https://web.archive.org/web/0/http://www.inventariodosmonumentosrj.com.br/index.asp?iMENU=catalogo&iiCOD=");
	eleventyConfig.addGlobalData("HPIP_URL", "https://hpip.org/pt/heritage/details/");
	eleventyConfig.addGlobalData("WIKIDATA_URL", "https://www.wikidata.org/wiki/");
	eleventyConfig.addGlobalData("STRUCTURAE_URL", "https://structurae.net/structures/");
	eleventyConfig.addGlobalData("CONA_URL", "http://vocab.getty.edu/page/cona/");
	eleventyConfig.addGlobalData("IPHAN_URL",
		"http://portal.iphan.gov.br/uploads/ckfinder/arquivos/Lista_bens_tombados_processos_andamento_2018");
	const MARKER_PATH = "/assets/leaflet/images";
	eleventyConfig.addGlobalData("MARKER_PATH", MARKER_PATH);
	eleventyConfig.addGlobalData("cross", "✝&#xFE0E;");

	website_domain = "monumentos.rio.br";

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("CNAME");
	// [Ref] https://github.com/11ty/eleventy/issues/2461#issuecomment-1238279042
	eleventyConfig.addPassthroughCopy("{,!(_site)/**/}*.png");
	eleventyConfig.addPassthroughCopy("{,!(_site)/**/}*.jpg");
	eleventyConfig.addPassthroughCopy("{,!(_site)/**/}*.pdf");
	eleventyConfig.addPassthroughCopy("{,!(_site)/**/}*.svg");

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
	getYearsSince = (date, ago=true) => {
		const d =dateify(date);
		if(!d) return `? anos${ago ? " atrás" : ""}`;
		const start_year = d.getUTCFullYear();
		const current_year = (new Date()).getUTCFullYear();
		const delta_years = current_year - start_year;
		return `${delta_years} ano${delta_years >= 2 ? "s" : ""}${ago ? " atrás" : ""}`;
	};

	getYearFromDate = (date, circa) => {
		const d = dateify(date);
		if(!d) return "S.d.";
		// Se é só ano e aproximado, então "c.XXXX"
		if(typeof date === "number" && circa)
			return "c." + d.getUTCFullYear();
		// Caso contrário, o ano é conhecido, então só "XXXX"
		return d.getUTCFullYear();
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

	makeCard = (item, hyperlink_tag=true) => {
		const ID = getIDFromPath(item.filePathStem);
		const data = item.data;
		const hasIMRJ = (data.imrj && `${data.imrj}`.length > 0);
		const isEarly = [data.tags].flat().includes("preliminar");
		const hasMissing = [data.tags].flat().includes("removido");
		const bairro = data.bairro instanceof Array
			? data.bairro.join(" / ")
			: data.bairro || "?";
		return `<div class="card" data-${hasIMRJ ? "" : "no-"}imrj ${isEarly ? "data-preliminar" : ""}>
	<a href="/id/${ID}">
		<div class="card-preview">
			<img src="/id/${ID}/thumb.jpg" decoding="async" loading="lazy">
		</div>
	</a>
	<div class="card-description">
		<a href="/id/${ID}">
			<p class="truncate" title="${data.name || "?"}">
				<strong>
				${isEarly ? "(" : ""}${data.name || "?"}${isEarly ? ")" : ""}</strong>
			</p>
		</a>
		<div class="card-details">
			<span class="identifier">${ID}</span>
			&middot;
			<span>${getYearFromDate(data.data_inaug, data.data_circa)}</span><br>
			<span class="neighborhood">${bairro}</span>
		</div>
		<div class="card-tags">
			${makeTag(data.categoria, hyperlink_tag)}
			${isEarly ? makeInfoTag("preliminar") : ""}
			${hasMissing ? makeInfoTag("removido") : ""}
		</div>
	</div>
</div>`;
	};

	makeMap = (item) => {
		const lat = item.lat;
		const lon = item.lon;
		const local = item.local;
		const bairro = item.bairro instanceof Array
			? item.bairro.join(" / ")
			: item.bairro || "?";
		const categoria = item.categoria;
		if(!(lat && lon)) return "";

		const out = [];
		const location_text = local ? `${local}, ${bairro}` : bairro;
		out.push(`<section class="location"><h2>Localização</h2>`);
		if(local || bairro)
			out.push(`<p><strong>Localização:</strong> ${location_text}</p>`);
		out.push(`<p><strong>Coordenadas:</strong> ${lat.toFixed(5)}, ${lon.toFixed(5)}</p>`);
		out.push(`<div id="monument-location-map"></div>`);
		out.push(`<!-- [Ref] https://leafletjs.com/ -->
<link href="/assets/leaflet/leaflet.1.9.3.css" rel="stylesheet" type="text/css">
<script src="/assets/leaflet/leaflet.1.9.3.min.js"></script>
<!-- [Ref] https://github.com/Leaflet/Leaflet.fullscreen -->
<link href="/assets/leaflet/leaflet.fullscreen.1.0.1.css" rel="stylesheet" type="text/css">
<script src="/assets/leaflet/leaflet.fullscreen.1.0.1.js"></script>`);
		out.push(`<script>
const bounds = new L.LatLngBounds(
	new L.LatLng(${lat-0.025}, ${lon-0.05}),
	new L.LatLng(${lat+0.025}, ${lon+0.05})
);
const map = L.map("monument-location-map", {
	center: bounds.getCenter(),
	zoom: 17,
	maxBounds: bounds,
	maxBoundsViscosity: .75,
	fullscreenControl: true
})
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	minZoom: 15,
	maxZoom: 19,
	attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OSMF</a>"
}).addTo(map);
L.marker([${lat}, ${lon}], {
	icon: L.icon({
		iconUrl: "${MARKER_PATH}/phosphor-marker--${catCleanup(categoria)}.svg",
		iconSize: [64, 64],
		iconAnchor: [32, 64],
		shadowUrl: "${MARKER_PATH}/marker-shadow.png",
		shadowSize: [41, 41],
		shadowAnchor: [13, 44],
	})
}).addTo(map);
</script></section>`);
		return out.join("");
	};

	makeRelated = (related_list, ctx) => {
		const monuments = ctx.collections.all.filter(file => file.filePathStem.startsWith("/id/"));
		const mon = monuments.filter(m => related_list.includes(m.data.internal_ref));
		if(!mon.length)
			return "";
		const out = [];
		out.push(`<section class="related"><h2>Monumentos relacionados</h2><div class="card-list">`);
		for(let i = 0; i < mon.length; i++) {
			out.push(makeCard(mon[i]));
		}
		out.push("</div></section>");
		return out.join("");
	};

	makeOthersFromSeries = (ctx) => {
		if(!("series" in ctx) || ![ctx.series].flat().length)
			return "";
		const series = [ctx.series].flat();

		const monuments = ctx.collections.all.filter(file => file.filePathStem.startsWith("/id/"));
		monuments.sort((a, b) => a.data.name.localeCompare(b.data.name));
		const thisFilePath = ctx.page.filePathStem;

		const out = [];
		out.push(`<section class="related"><h2>Monumentos relacionados</h2>`);

		for(let i = 0; i < series.length; i++) {
			const mon = monuments.filter(m => {
				if(!("data" in m) || !m.data)
					return false;
				if(!("series" in m.data) || !m.data.series)
					return false;
				if(![m.data.series].flat().includes(series[i]))
					return false;
				return true;
			});
			if(mon.length <= 1)
				continue;
			const section = [];
			section.push(`<h3>Série '${series[i]}'</h3>
<p><strong>${mon.length}</strong> monumento${(mon.length) < 2 ? "" : "s"}</p>
<div class="card-list">`);
			for(let j = 0; j < mon.length; j++) {
				section.push(makeCard(mon[j]));
			}
			section.push(`</div>`);
			// Se não é o último
			if(i !== series.length - 1) {
				section.push(`<hr>`);
			}
			out.push(section.join(""));
		}
		out.push("</section>");
		if(out.length <= 2) return "";
		return out.join("");
	};

	makePanorama = (ctx, title, authorDate) => {
		title = (title||"").replace('"', '\\"');
		authorDate = (authorDate||"").replace('"', '\\"');

		const out = [];
		out.push(`<section class="panorama">`);
		out.push(`<h2>Panorama</h2>`);
		out.push(`<link rel="stylesheet" href="/assets/pannellum.2.5.6.css"/>`);
		out.push(`<script type="text/javascript" src="/assets/pannellum.2.5.6.js"></script>`);
		out.push(`<figure id="panorama-viewer" style="height:min(400px,max(50vw,250px))"></figure>`);
		out.push(`<script>
pannellum.viewer("panorama-viewer", {
	"title": "${title}",
	"author": "${authorDate}",
	"previewAuthor": "${authorDate}",
	"hfov": 100,
	"type": "multires",
	"multiRes": {
		"path": "panorama/%l/%s%y_%x",
		"fallbackPath": "panorama/fallback/%s",
		"extension": "jpg",
		"tileResolution": 512,
		"maxLevel": 4,
		"cubeResolution": 2768
	}
});
</script>`);
		out.push(`</section>`);
		return out.join("");
	};

	refID = (id) => {
		return `<a class="id-tag" href="/id/${id}">${id}</a>`;
	};

	generateCards = (ctx) => {
		const isMonument = (ctx.page.url.indexOf("/id/") >= 0);
		let name = ctx?.name || ctx?.title || "Monumentos Rio";
		if("tags" in ctx && [ctx.tags].flat().includes("preliminar"))
			name = `${name} (preliminar)`;
		const url = `https://${website_domain}${ctx.page.url}`;
		let image_url = `${url}thumb.jpg`;
		if(!isMonument) {
			image_url = `https://${website_domain}/thumb.jpg`;
		}
		let description = (isMonument)
			? "Monumento da cidade do Rio de Janeiro."
			: "Catálogo de monumentos da cidade do Rio de Janeiro.";

		return `<meta property="og:type" content="website">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image_url}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${name}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image_url}">`;
	};
};
