function hiden_introduction(elementId) {
	const hide_detail = document.getElementById("hiden-introduction");
	if (hide_detail.style.display === "block") {
		hide_detail.style.display = "none";
	} else {
		hide_detail.style.display = "block";
	}
}
