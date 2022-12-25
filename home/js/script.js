// Sticky header
window.onscroll = function () {
	myFunction();
};
var header = document.getElementById("header");
var sticky = header.offsetTop;
function myFunction() {
	if (window.pageYOffset > sticky) {
		header.classList.add("sticky");
	} else {
		header.classList.remove("sticky");
	}
}

// autoplay slider
document.getElementById("next").onclick = function () {
	let lists = document.querySelectorAll(".slide-item");
	document.getElementById("slide").appendChild(lists[0]);
};
document.getElementById("prev").onclick = function () {
	let lists = document.querySelectorAll(".slide-item");
	document.getElementById("slide").prepend(lists[lists.length - 1]);
};
var slideIndex = 1;
showSlides(slideIndex);
var autoplayInterval = setInterval(function () {
	document.getElementById("next").onclick();
}, 2500);
function stopAutoplay() {
	clearInterval(autoplayInterval);
}
function plusSlides(n) {
	showSlides((slideIndex += n));
}
function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("slide-item");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "block";
	}

	slides[slideIndex - 1].style.display = "block";
}

//telemedicine slider
document.getElementById("telem-next").onclick = function () {
	let lists = document.querySelectorAll(".telem-slide-item");
	document.getElementById("telem-slide").appendChild(lists[0]);
};
document.getElementById("telem-prev").onclick = function () {
	let lists = document.querySelectorAll(".telem-slide-item");
	document.getElementById("telem-slide").prepend(lists[lists.length - 1]);
};

//specialty slider
document.getElementById("spec-next").onclick = function () {
	let lists = document.querySelectorAll(".spec-slide-item");
	document.getElementById("spec-slide").appendChild(lists[0]);
};
document.getElementById("spec-prev").onclick = function () {
	let lists = document.querySelectorAll(".spec-slide-item");
	document.getElementById("spec-slide").prepend(lists[lists.length - 1]);
};

//facility slider
document.getElementById("faci-next").onclick = function () {
	let lists = document.querySelectorAll(".faci-slide-item");
	document.getElementById("faci-slide").appendChild(lists[0]);
};
document.getElementById("faci-prev").onclick = function () {
	let lists = document.querySelectorAll(".faci-slide-item");
	document.getElementById("faci-slide").prepend(lists[lists.length - 1]);
};

//doctor slider
document.getElementById("doctor-next").onclick = function () {
	let lists = document.querySelectorAll(".doctor-slide-item");
	document.getElementById("doctor-slide").appendChild(lists[0]);
};
document.getElementById("doctor-prev").onclick = function () {
	let lists = document.querySelectorAll(".doctor-slide-item");
	document.getElementById("doctor-slide").prepend(lists[lists.length - 1]);
};

//handbook slider
document.getElementById("handbook-next").onclick = function () {
	let lists = document.querySelectorAll(".handbook-slide-item");
	document.getElementById("handbook-slide").appendChild(lists[0]);
};
document.getElementById("handbook-prev").onclick = function () {
	let lists = document.querySelectorAll(".handbook-slide-item");
	document.getElementById("handbook-slide").prepend(lists[lists.length - 1]);
};

