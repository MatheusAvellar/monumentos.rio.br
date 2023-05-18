// Lista de <details> in <nav>
const details = [...document.querySelectorAll("nav > ul > li > details")];
const main_footer = [
	document.querySelector("main"),
	document.querySelector("footer")
];

// Fecha todos os <details> que não sejam o `except`
function closeDetails(except=null) {
	details.forEach(el => {
		if(el === except) return;
		el.removeAttribute("open");
	});
}
// Calcula se a largura do elemento é grande demais pra janela
function isOutside(parent, child) {
	const parent_rect = parent.getBoundingClientRect();
	const child_rect = child.getBoundingClientRect();
	return (parent_rect.x + child_rect.width > window.innerWidth);
}
// Cada vez que algum dos <details> é aberto...
details.forEach(det => {
	det.addEventListener("toggle", _ => {
		if(det.open) {
			// Fecha os outros
			closeDetails(det);
			// Verifica se ele está caindo fora da janela, e ajusta
			const list = det.querySelector(":scope > ul");
			list.style.right = isOutside(det, list) ? "0px" : "";
		}
	});
});
// Caso o <main> ou o <footer> recebam foco, fecha <details> abertos
main_footer.forEach(el => {
	el.addEventListener("focusin", closeDetails);
	el.addEventListener("click", closeDetails);
});