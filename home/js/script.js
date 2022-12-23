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

// Start autoplaying automatically
var autoplayInterval = setInterval(function () {
	// Get element via id and click next
	document.getElementById("next").onclick();
}, 2500); // Do this every 1 second, increase this!

// Stop function added to button
function stopAutoplay() {
	// Stop the autoplay
	clearInterval(autoplayInterval);
}

// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
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