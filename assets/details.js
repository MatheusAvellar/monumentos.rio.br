// Lista de <details> in <nav>
const details = [...document.querySelectorAll("header > nav > details")];
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
// Cada vez que algum dos <details> é aberto...
details.forEach(det => {
	det.addEventListener("toggle", _ => {
		if(det.open) closeDetails(det); // Fecha os outros
	});
});
// Caso o <main> ou o <footer> recebam foco, fecha <details> abertos
main_footer.forEach(el => {
	el.addEventListener("focusin", closeDetails);
	el.addEventListener("click", closeDetails);
});