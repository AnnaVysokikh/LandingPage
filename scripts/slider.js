let images = [{
    url: "images/project1.jpg",
    title: "Rostov-on-Don, Admiral"
  }, {
    url: "images/project2.jpg",
    title: "Sochi Thieves"
  }, {
    url: "images/project3.jpg",
    title: "Rostov-on-Don Patriotic"
  }];


function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };
  
  let arrowLeft = document.querySelector(".slider-arrow-left");
  let arrowRight = document.querySelector(".slider-arrow-right");
  let sliderDots = document.querySelector(".slider-dots");
  let projectNav = document.querySelector(".project-nav");
  let projectImg = document.querySelector(".project-img");
  
  initImages();
  initArrows();
  initMenu();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      projectImg.innerHTML += imageDiv;
    });
  }
  
  function initArrows() {
	  
	arrowLeft.addEventListener("click", function() {
		let curNumber = +projectImg.querySelector(".active").dataset.index;
        let nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
		moveSlider(nextNumber);
	});
	arrowRight.addEventListener("click", function() {
		let curNumber = +projectImg.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
		moveSlider(nextNumber);
	});		
  }
  
  function initMenu() {
    images.forEach((image, index) => {
      let li = `<li class="project-nav__item n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].title}</li>`;
      projectNav.innerHTML += li;
    });
    projectNav.querySelectorAll(".project-nav__item").forEach(li => {
      li.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })	  
  }
  
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<li class="slider-dots__item n${index} ${index === 0? "active" : ""}" data-index="${index}"></li>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider-dots__item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function moveSlider(num) {
    projectImg.querySelector(".active").classList.remove("active");
    projectImg.querySelector(".n" + num).classList.add("active");
	
	projectNav.querySelector(".active").classList.remove("active");
    projectNav.querySelector(".n" + num).classList.add("active");
	  
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
  }
  
  function initAutoplay() {
    setInterval(() => {
      let curNumber = +projectImg.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  autoplay: true,
  autoplayInterval: 5000
};


document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});