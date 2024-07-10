
// carousel
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".carousel-container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

document.addEventListener("DOMContentLoaded", function () {
  let options = {
    strings: [
      `<span class="typed-red">photographer</span>`,
      `<span class="typed-brown">videographer</span>`,
      `<span class="typed-yellow">cinematographer</span>`,
    ],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true,
  };
  let typed = new Typed("#typed-brown", options);
});

$("document").ready(function () {
  $("#ulButton").click(function () {
    $("#pagesDiv").css({
      position: "fixed",
      right: " 0",
      transition: "1s",
    });
    $("#ulButton").css({
      display: "none",
      transition: "1s",
    });
  });
  $("#pagesDivClose").click(function () {
    $("#pagesDiv").css({
      position: "fixed",
      right: "-400px",
      transition: "1s",
    });
    $("#ulButton").css({
      display: "block",
      transition: "1s",
    });
  });
});

// carousel
let currentIndex = 0;

function moveLeft() {
  const carousel = document.querySelector(".carousel");
  const images = document.querySelectorAll(".carousel img");
  console.log(images);
  const totalImages = images.length;

  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  const offset = -currentIndex * 300;
  carousel.style.transform = `translateX(${offset}px)`;
}

function moveRight() {
  const carousel = document.querySelector(".carousel");
  const images = document.querySelectorAll(".carousel img");
  const totalImages = images.length;

  currentIndex = (currentIndex + 1) % totalImages;
  const offset = -currentIndex * 300;
  carousel.style.transform = `translateX(${offset}px)`;
}
// conact-form
const contact = document.getElementById("contactForm");
const senderName = document.getElementById("name");
const senderEmail = document.getElementById("email").value;
const senderSubject = document.getElementById("subject").value;
const senderMessage = document.getElementById("message").value;
const submitButton = document.getElementById("submit");

function sendEmail() {
  let param = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };
  const serviceId = "service_1cteqyi";
  const templateId = "template_qntn0xr";

  emailjs
    .send(serviceId, templateId, param)
    .then((res) => {
      console.log(res);
      alert("Message has been sent successfully");
    })
    .catch((err) => console.log(err));
}


// food-carousel
const scrollContainer = document.querySelector(".gallery");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

console.log(scrollContainer,rightBtn,leftBtn);

scrollContainer.addEventListener("wheel", (e)=>{
  e.preventDefault()
  scrollContainer.style.scrollBehavior = "auto"
  scrollContainer.scrollLeft +=e.deltaY
})

leftBtn.addEventListener("click", (e)=>{
  e.preventDefault()
  scrollContainer.style.scrollBehavior = "smooth"
  scrollContainer.scrollLeft -= 600;
})

rightBtn.addEventListener("click", (e)=>{
  e.preventDefault()
  scrollContainer.style.scrollBehavior = "smooth"
  scrollContainer.scrollLeft +=  600;
})
