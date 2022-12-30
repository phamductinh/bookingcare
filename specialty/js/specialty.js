function show_more_infor() {
	const show_more = document.getElementById("infor-show-more");
	const show_less = document.getElementById("infor-show-less");
	const hide_infor = document.getElementById("specialty-infor");
	if (hide_infor.style.height === "200px") {
		hide_infor.style.height = "auto";
		show_more.style.display = "none";
		show_less.style.display = "block";
	} else {
		hide_infor.style.height = "200px";
		show_more.style.display = "block";
		show_less.style.display = "none";
	}
}

function hiden_introduction(elementId) {
	const hide_detail = document.getElementById("hiden-introduction");
	if (hide_detail.style.display === "block") {
		hide_detail.style.display = "none";
	} else {
		hide_detail.style.display = "block";
	}
}
