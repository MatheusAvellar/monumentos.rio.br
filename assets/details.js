const details = [...document.querySelectorAll("nav details")];
const main_footer = [
	document.querySelector("main"),
	document.querySelector("footer")
];

function closeDetails(except=null) {
	details.forEach(el => {
		if(el === except) return;
		el.removeAttribute("open");
	});
}
details.forEach(det => {
	det.addEventListener("toggle", (event) => {
		if(det.open)
			closeDetails(except=det);
	});
});
main_footer.forEach(el => {
	el.addEventListener("focusin", closeDetails);
	el.addEventListener("click", closeDetails);
});
