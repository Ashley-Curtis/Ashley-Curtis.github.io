(function () {
  "use strict";
  
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

    // Navbar links active state on scroll
  const onscroll = (el, listener) => el.addEventListener('scroll', listener);
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;

    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;

      let section = select(navbarlink.hash);
      if (!section) return;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };

  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);
  window.addEventListener('scroll', navbarlinksActive);

/**  ------------------------------------------------------------------ */

// Function to handle the page transition
function pageTransition() {
  // Apply the fade-out class on page unload
  document.body.classList.add('fade-out');
}

// Add transition when a link is clicked
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(event) {
    // Only prevent default for links that do not open in a new tab
    if (link.target !== "_blank") {
      event.preventDefault(); // Prevent the default link behavior
      pageTransition();
      
      // Wait for the transition to finish (adjust the delay as needed)
      setTimeout(() => {
        window.location.href = link.href; // Now navigate to the link
      }, 1000); // Delay should match the duration of your fade-out effect
    }
  });
});

// Add fade-in effect when the page loads
window.addEventListener('load', function() {
  // Ensure the fade-in is applied immediately when the page loads
  document.body.classList.add('fade-in');
});

// Optionally, if you want to make sure the page transition happens properly before loading a new page, 
// you can add an additional event listener to handle unloading the page.
window.addEventListener('beforeunload', function() {
  // Optional: Set fade-out before the page unloads, giving it enough time to transition
  document.body.classList.add('fade-out');
});



/**  ------------------------------------------------------------------ */
  /**  
   * Back to top button
   */
   jQuery(document).ready(function($){
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
      //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      offset_opacity = 200,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 700,
      //grab the "back to top" link
      $back_to_top = $('.back-to-top');
  
    //hide or show the "back to top" link
    $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('hero-is-visible') : $back_to_top.removeClass('hero-is-visible hero-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
        $back_to_top.addClass('hero-fade-out');
      }
    });
  
    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
         }, scroll_top_duration
      );
    });
  
  });
 
  



   /**  
    * Mobile nav toggle
    */
  on('click', '.mobile-nav-toggle', function () {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });



  /**  
   * Hero type effect
   */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }


  
  /**  
   * Portfolio isotope and filter
   */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, { 
          layoutMode: 'fitRows', 
          itemSelector: '.portfolio-item',
          stagger: 50 });
  
        let portfolioFilters = select('#portfolio-flters li', true);
        on('click', '#portfolio-flters li', function (e) {
          e.preventDefault();
          portfolioFilters.forEach(el => el.classList.remove('filter-active'));
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('layoutComplete');
        }, 100);
      }
    });
  



    //SERVICES SWIPER
 const servicesswiper = GLightbox({ selector: '.swiper-slide' });
 new Swiper('.services-slider', {
   speed: 1000,
   loop: true,
   navigation: {
    nextEl: '.next', // Next button selector
    prevEl: '.prev'  // Previous button selector
  },
   autoplay: { delay: 6000, disableOnInteraction: true },
   slidesPerView: 'auto',
   pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
   breakpoints: { 320: { slidesPerView: 1, spaceBetween: 20 }, 1500: { slidesPerView: 3, spaceBetween: 20 } }
 });
  /**  
   * Initialize Lightbox, Swiper, Waypoint, and other plugins
   */
  const testimonialsLightbox = GLightbox({ selector: '.portfolio-lightbox' });
  new Swiper('.testimonials-slider', {
    speed: 1000,
    loop: true,
    autoplay: { delay: 6000, disableOnInteraction: true },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    breakpoints: { 320: { slidesPerView: 1, spaceBetween: 20 }, 1500: { slidesPerView: 3, spaceBetween: 20 } }
  });



  /** 
   * Initialize animations on scroll
   */
  window.addEventListener('load', () => AOS.init({ duration: 800, easing: 'ease-in-out', once: true, mirror: false }));



  /**
   * Command Prompt about me (terminal style)
   */
  document.addEventListener("DOMContentLoaded", function() {
    const cmdElement = document.getElementById('cmd'); 
    const commandElement1 = document.getElementById('command1');
    const commandElement = document.getElementById('command');
  
    let messages = [
      "I have a black cat named Trout (pictured below)",
      "I love outdoor activities such as hiking, camping, 4wheeling, fishing, kayaking, etc",
      "I prioritize happiness as a central life goal",
      'In my spare time I love to play Call Of Duty <a href="https://www.twitch.tv/ashholetries" target="_blank" title="Twitch website" class="twitch"><i class="bx bxl-twitch"></i></a>,&nbsp VR or board games with friends',
      'I love music <a href="https://open.spotify.com/user/bxokp82qxw18fm2gyr5sopn5m?si=1965663e321a414f" target="_blank" title="My Spotify" class="spotify"><i class="bx bxl-spotify"></i></a>'
    ];
  
    let index = 0;
    let iterationCount = 0;
    const maxIterations = 5;
    
    // Function to get the next message in the sequence
    function nextMessage() {
      let message = messages[index];
      index = (index + 1) % messages.length;
      return message;
    }
  
    let counter = 1400;
    let intervalId; // Variable to hold the interval ID
  
    // Function to start or restart the message sequence
    function autorun() {
      if (checkVisible(cmdElement)) {
        if (!intervalId) {
          intervalId = setInterval(() => {
            if (iterationCount >= maxIterations) {
              clearInterval(intervalId);
                      intervalId = null;
  
                      // Pause for 5 seconds before restarting
                      setTimeout(() => {
                          // Reset iteration count and clear the previous messages
                          iterationCount = 0;
                          commandElement.innerHTML = '';  // Clear the previous messages
  
                          // Restart the autorun process
                          autorun();
                      }, 5000);  // 5000ms = 5 seconds delay
                      return;
            }
  
            const message = nextMessage();
            const messageElement = document.createElement('div');
            messageElement.innerHTML = "C:\\Users\\ashley> " + "<span class='green-text'>" + message + "</span><br>";
  
            commandElement.appendChild(messageElement);
            iterationCount++;
            cmdElement.scrollTop = cmdElement.scrollHeight;
          }, counter); // Start a new interval with the specified counter time
        }
      }
    }
  
    // Trigger autorun on page load
    autorun();
  
    // Listen for scrolling to trigger autorun again
    window.onscroll = autorun;
  
    // Function to check if the element is in the viewport
    function checkVisible(elm) {
      var rect = elm.getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0); // Check if it's in the viewport
    }
  });


/**
   * Cat hero page 
   */
  document.addEventListener("DOMContentLoaded", function () {
    const cat = document.querySelector('.cat');
    const body = document.querySelector('.body');
    const head = document.querySelector('.head');
    const eyes = document.querySelectorAll('.eyes circle');
    const eyel = document.querySelectorAll('.eyes-l');
    const eyer = document.querySelectorAll('.eyes-r');
    const ears = document.querySelectorAll('.ears');
    const earsl = document.querySelector('.ears-l');
    const earsr = document.querySelector('.ears-r');
    const tail = document.querySelector('.tail');
    const backlegs = document.querySelector('.backlegs');
    const frontlegs = document.querySelector('.frontlegs');
    const frontlegs1 = document.querySelector('.frontlegs1');
    const backcircle = document.querySelector('.body-backcircle');
    const frontcircle = document.querySelector('.body-frontcircle');
    const bodybetween = document.querySelector('.body-between');
    const logo = document.querySelector('.logoani');
    const logofix = document.querySelector('.logo');
    const ani = document.querySelector('.animation-wrapper');
    const layout = document.querySelector('.layout');
  
    // Start animation
    function initAni() {
      const tl = new TimelineMax({ delay: 0.5, onComplete: loopAnimation });
      const tl_eye = new TimelineMax({ delay: 1.5, repeat: 3, repeatDelay: 1 });
  
      resetit();
      logonotVisible();
  
      tl.to([head, eyes, ears], 0.2, { y: 45, x: 30 })
        .addLabel("twink")
        .to(eyel, 0.1, { scaleY: 1, y: 45 }, "twink-=0.1")
        .to(eyel, 0.1, { scaleY: 0.1, y: 55 }, "twink")
        .to(eyel, 0.1, { scaleY: 1, y: 45 }, "twink +=0.1")
        .to(eyer, 0.1, { scaleY: 0.1, y: 55 }, "twink")
        .to(eyer, 0.1, { scaleY: 1, y: 45 }, "twink +=0.1")
        // .to(earsl, 0.1, { y: 8, x: -5, rotation: -20 }, "twink +=0.1")
        .to(earsr, 0.1, { y: 8, x: -25, rotation: -60 }, "twink +=0.1")
        .set(frontlegs, { opacity: 1 }, "+=0.5")
        .to(frontlegs1, 0.1, { y: 35, x: 15, rotation: -60 })
        .to(logo, 0.1, { x: 5 })
        .to(frontlegs1, 0.1, { y: 35, x: 5, rotation: -60 })
        .to(frontlegs1, 0.1, { y: 35, x: 15, rotation: -60 })
        .to(logo, 0.3, { x: 10 })
        .to(frontlegs1, 0.1, { y: 35, x: -5, rotation: -60 })
        .to(frontlegs1, 0.1, { y: 35, x: 25, rotation: -60 }, "+=0.5")
        .to(logo, 0.1, { x: 12 })
        .to(frontlegs1, 0.1, { y: 35, x: 5, rotation: -60 })
        .to(frontlegs1, 0.1, { y: 35, x: 25, rotation: -60 })
        .to(logo, 0.3, { x: 17 })
        .to(frontlegs1, 0.1, { y: 35, x: -5, rotation: -60 })
        .to(frontlegs1, 0.1, { y: 35, x: 35, rotation: -60 })
        .to(logo, 0.1, { x: 20 })
        .to(frontlegs1, 0.1, { y: 35, x: -5, rotation: -60 })
        .to(frontlegs1, 0.1, { y: 30, x: 30, rotation: -60, scaleY: 1.2 })
        .to(logo, 0.5, { x: 30 })
        .to(logo, 0.1, { rotation: 10 })
        .to(frontlegs1, 0.1, { y: 35, x: -15, rotation: -60, scaleY: 1 })
        .addLabel("wiggle")
        .to([head, eyes, ears], 0.1, { y: 48 }, "wiggle")
        // .to(earsl, 0.1, { y: 10, x: -5, rotation: -20 }, "wiggle")
        // .to(earsr, 0.1, { y: 18, x: -15, rotation: -60 }, "wiggle")
        .to(backcircle, 0.1, { y: 30, x: 40 }, "wiggle =-0.2")
        .to(backcircle, 0.1, { y: 30, x: 37 }, "wiggle =-0.1")
        .to(backcircle, 0.1, { y: 35, x: 40 }, "wiggle")
        .to(backcircle, 0.1, { y: 30, x: 40 })
        .to(backcircle, 0.1, { y: 30, x: 37 })
        .to(backcircle, 0.1, { y: 35, x: 40 })
        .to(backcircle, 0.1, { y: 30, x: 40 })
        .to(backcircle, 0.1, { y: 30, x: 37 })
        .to(backcircle, 0.1, { y: 35, x: 40 })
        .addLabel("logowiggle")
        .to(frontlegs1, 0.1, { y: 35, x: 30, rotation: -60, scaleY: 1.25 }, "logowiggle-=0.1")
        .to(logo, 0.1, { rotation: 60, x: 70 }, "logowiggle")
        .to(logo, 0.5, { y: 50 }, "logowiggle+=0.1")
        .to(logo, 0.1, { rotation: 120 }, "logowiggle+=0.1")
        .to(logo, 0.1, { rotation: 270 }, "logowiggle+=0.2")
        .to(logo, 0.5, { y: 550, x: 90 }, "logowiggle+=0.2")
        .to(logo, 0.5, { opacity: 0 }, "logowiggle")
        .to(frontlegs1, 0.1, { y: 35, x: -15, rotation: -60, scaleY: 1 })
        .addLabel("jump")
        .to([head, eyes, ears], 0.1, { y: 5 }, "jump")
        .to(frontcircle, 0.1, { y: 15, x: 5 }, "jump")
        .to(bodybetween, 0.1, { rotation: -25, x: 25, y: 38 }, "jump")
        .to(frontlegs1, 0.1, { y: 0, x: 0, rotation: 0 }, "jump")
        .to(tail, 0.1, { y: 115, x: 20, rotation: -10 }, "jump")
        .to(frontlegs, 0.1, { y: -20 }, "jump+=0.1")
        .to([head, eyes, ears, frontcircle], 0.1, { x: 75, y: 5 }, "jump+=0.2")
        .to(frontcircle, 0.1, { x: 55, y: 5 }, "jump+=0.2")
        .to(bodybetween, 0.1, { scaleX: 1, x: 45, y: 25, rotation: -15 }, "jump+=0.2")
        .to(backcircle, 0.1, { x: 50, y: 25 }, "jump+=0.2")
        .to(backlegs, 0.1, { x: 70 }, "jump+=0.2")
        .to(frontlegs, 0.1, { x: 250, y: 5, rotation: -45 }, "jump+=0.3")
        .to(frontcircle, 0.1, { x: 250 }, "jump+=0.3")
        .to(backcircle, 0.1, { y: 0, x: 250 }, "jump+=0.3")
        .to(bodybetween, 0.1, { y: 0, x: 255, scaleX: 1, rotation: 4 }, "jump+=0.3")
        .to([head, eyes, ears], 0.1, { x: 275 }, "jump+=0.3")
        .to(tail, 0.1, { y: 25, x: 230, rotation: 15 }, "jump+=0.3")
        .to(backlegs, 0.1, { rotation: 45, x: 250, y: -25 }, "jump+=0.3")
        .to(frontlegs, 0.1, { x: 340, y: 105, rotation: -15 }, "jump+=0.4")
        .to(frontcircle, 0.1, { x: 340, y: 105 }, "jump+=0.4")
        .to(backcircle, 0.1, { y: 60, x: 350 }, "jump+=0.4")
        .to(bodybetween, 0.1, { y: 70, x: 380, scaleX: 1, rotation: 35 }, "jump+=0.4")
        .to([head, eyes, ears], 0.1, { x: 385, y: 125 }, "jump+=0.4")
        .to(tail, 0.1, { y: 50, x: 370, rotation: 35 }, "jump+=0.4")
        .to(backlegs, 0.1, { rotation: 95, x: 350, y: 5 }, "jump+=0.4")
        .to(frontlegs, 0.1, { x: 420, y: 205, rotation: -15 }, "jump+=0.5")
        .to(frontcircle, 0.1, { x: 420, y: 205 }, "jump+=0.5")
        .to(backcircle, 0.1, { y: 160, x: 430 }, "jump+=0.5")
        .to(bodybetween, 0.1, { y: 170, x: 460, scaleX: 1, rotation: 35 }, "jump+=0.5")
        .to([head, eyes, ears], 0.1, { x: 465, y: 225 }, "jump+=0.5")
        .to(tail, 0.1, { y: 150, x: 450, rotation: 35 }, "jump+=0.5")
        .to(backlegs, 0.1, { rotation: 95, x: 430, y: 95 }, "jump+=0.5")
        .to(cat, 0.5, { opacity: 0 }, "jump+=0.3");
  
      // Cat blinking animation
      tl_eye.addLabel("twink")
        .to(eyel, 0.1, { scaleY: 1, y: 45 }, "twink-=0.1")
        .to(eyel, 0.1, { scaleY: 0.1, y: 55 }, "twink")
        .to(eyel, 0.1, { scaleY: 1, y: 45 }, "twink+=0.1")
        .to(eyer, 0.1, { scaleY: 0.1, y: 55 }, "twink")
        .to(eyer, 0.1, { scaleY: 1, y: 45 }, "twink+=0.1");
  
      // Loop the animation
      function loopAnimation() {
        tl.restart();  // Restart the timeline when it finishes
      }
    }
  
    // Reset function to make sure animation starts fresh
    function resetit() {
      // Reset all elements to their initial state here
    }
  
    // Make the logo invisible
    function logonotVisible() {
      logofix.style.opacity = 0;
    }
  
    // Initialize the animation
    initAni();
  });


/** 
 * Mouse click
*/
function createBurst(e) {
  const fragment = document.createDocumentFragment();

  let count = Math.floor(Math.random() * 250); // Random count of bursts

  for (let i = 0; i < count; i++) {
    let r = Math.floor(Math.random() * 256),  // Random RGB color
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        size = Math.floor(Math.random() * 8), // Random size of burst element
        tl = gsap.timeline({ paused: true });  // Using GSAP 3's new timeline API

    const el = document.createElement('div'),
          left = e.pageX,  // Correcting position to pageX/pageY for absolute positioning
          top = e.pageY;

    fragment.appendChild(el);
    el.setAttribute('style', `
      width: ${size}px; 
      height: ${size}px;
      border-radius: 50%;
      position: absolute;
      left: ${left}px;
      top: ${top}px;
      background: rgb(${r}, ${g}, ${b});`);

    // Animation complete handler to remove the element after animation finishes
    function onComplete() {
      el.remove();
    }

    // GSAP animation
    tl.to(el, {
      x: Math.random() * 300 - 150, // Move left/right by a random distance
      y: Math.random() * 300 - 150, // Move up/down by a random distance
      duration: 0.6,
      ease: "expo.out",
      transformOrigin: 'center center'
    })
    .to(el, {
      scale: 0,
      autoAlpha: 0,
      duration: 0.5,
      x: Math.random() * 250, // Randomize position again
      y: Math.random() * 250,
      onComplete: onComplete,
      ease: "expo.in"
    })
    .play();
  }

  document.body.appendChild(fragment);
}

// Event listener for mouse click
document.addEventListener('mousedown', createBurst);

//
//
//IMAGE CAROUSEL
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const images = document.querySelectorAll('.services-image-carousel img');
let currentIndex = 0;

// Set the first image as active by default
 images[currentIndex].classList.add('active');

 // Show the next image
 nextButton.addEventListener('click', () => {
   // Remove the 'active' class from the current image
   images[currentIndex].classList.remove('active');

  // Increment the index to show the next image
   currentIndex = (currentIndex + 1) % images.length; // Wrap around to the first image

   // Add the 'active' class to the new image
   images[currentIndex].classList.add('active');
 });

 // Show the previous image
 prevButton.addEventListener('click', () => {
   // Remove the 'active' class from the current image
   images[currentIndex].classList.remove('active');

   // Decrement the index to show the previous image
   currentIndex = (currentIndex - 1 + images.length) % images.length; // Wrap around to the last image if at the first

   // Add the 'active' class to the new image
   images[currentIndex].classList.add('active');
 });

 AOS.init({
   duration: 1000,
   easing: 'ease-in-out',
  once: true,
   offset: 100, // Trigger animation when item is 100px into the viewport
 });

// Handle the expandable extra-info
document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', function() {
    const extraContent = this.nextElementSibling; // The div with class 'extra-content'
    
    // Toggle visibility of the extra content
    if (extraContent.style.display === 'none' || extraContent.style.display === '') {
      extraContent.style.display = 'block';
      this.textContent = 'Show Less'; // Change button text to 'Show Less'
    } else {
      extraContent.style.display = 'none';
      this.textContent = 'Show More'; // Change button text to 'Show More'
    }
  });
});



//HERO TITLE
$(document).ready(function(){
  var mouseX, mouseY;
  var ww = $( window ).width();
  var wh = $( window ).height();
  var traX, traY;
  $(document).mousemove(function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    traX = ((10 * mouseX) / 570) + 40;
    traY = ((10 * mouseY) / 570) + 50;
    console.log(traX);
    $(".title").css({"background-position": traX + "%" + traY + "%"});
  });
});






//BACKGROUND
// Utilities
var Vector3 = {};
var Matrix44 = {};
Vector3.create = function (x, y, z) {
  return { x: x, y: y, z: z };
};
Vector3.dot = function (v0, v1) {
  return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
};
Vector3.cross = function (v, v0, v1) {
  v.x = v0.y * v1.z - v0.z * v1.y;
  v.y = v0.z * v1.x - v0.x * v1.z;
  v.z = v0.x * v1.y - v0.y * v1.x;
};
Vector3.normalize = function (v) {
  var l = v.x * v.x + v.y * v.y + v.z * v.z;
  if (l > 0.00001) {
    l = 1.0 / Math.sqrt(l);
    v.x *= l;
    v.y *= l;
    v.z *= l;
  }
};
Vector3.arrayForm = function (v) {
  if (v.array) {
    v.array[0] = v.x;
    v.array[1] = v.y;
    v.array[2] = v.z;
  } else {
    v.array = new Float32Array([v.x, v.y, v.z]);
  }
  return v.array;
};
Matrix44.createIdentity = function () {
  return new Float32Array([
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0
  ]);
};
Matrix44.loadProjection = function (m, aspect, vdeg, near, far) {
  var h = near * Math.tan(((vdeg * Math.PI) / 180.0) * 0.5) * 2.0;
  var w = h * aspect;

  m[0] = (2.0 * near) / w;
  m[1] = 0.0;
  m[2] = 0.0;
  m[3] = 0.0;

  m[4] = 0.0;
  m[5] = (2.0 * near) / h;
  m[6] = 0.0;
  m[7] = 0.0;

  m[8] = 0.0;
  m[9] = 0.0;
  m[10] = -(far + near) / (far - near);
  m[11] = -1.0;

  m[12] = 0.0;
  m[13] = 0.0;
  m[14] = (-2.0 * far * near) / (far - near);
  m[15] = 0.0;
};
Matrix44.loadLookAt = function (m, vpos, vlook, vup) {
  var frontv = Vector3.create(
    vpos.x - vlook.x,
    vpos.y - vlook.y,
    vpos.z - vlook.z
  );
  Vector3.normalize(frontv);
  var sidev = Vector3.create(1.0, 0.0, 0.0);
  Vector3.cross(sidev, vup, frontv);
  Vector3.normalize(sidev);
  var topv = Vector3.create(1.0, 0.0, 0.0);
  Vector3.cross(topv, frontv, sidev);
  Vector3.normalize(topv);

  m[0] = sidev.x;
  m[1] = topv.x;
  m[2] = frontv.x;
  m[3] = 0.0;

  m[4] = sidev.y;
  m[5] = topv.y;
  m[6] = frontv.y;
  m[7] = 0.0;

  m[8] = sidev.z;
  m[9] = topv.z;
  m[10] = frontv.z;
  m[11] = 0.0;

  m[12] = -(vpos.x * m[0] + vpos.y * m[4] + vpos.z * m[8]);
  m[13] = -(vpos.x * m[1] + vpos.y * m[5] + vpos.z * m[9]);
  m[14] = -(vpos.x * m[2] + vpos.y * m[6] + vpos.z * m[10]);
  m[15] = 1.0;
};

//
var timeInfo = {
  start: 0,
  prev: 0, // Date
  delta: 0,
  elapsed: 0 // Number(sec)
};

//
var gl;
var renderSpec = {
  width: 0,
  height: 0,
  aspect: 1,
  array: new Float32Array(3),
  halfWidth: 0,
  halfHeight: 0,
  halfArray: new Float32Array(3)
  // and some render targets. see setViewport()
};
renderSpec.setSize = function (w, h) {
  renderSpec.width = w;
  renderSpec.height = h;
  renderSpec.aspect = renderSpec.width / renderSpec.height;
  renderSpec.array[0] = renderSpec.width;
  renderSpec.array[1] = renderSpec.height;
  renderSpec.array[2] = renderSpec.aspect;

  renderSpec.halfWidth = Math.floor(w / 2);
  renderSpec.halfHeight = Math.floor(h / 2);
  renderSpec.halfArray[0] = renderSpec.halfWidth;
  renderSpec.halfArray[1] = renderSpec.halfHeight;
  renderSpec.halfArray[2] = renderSpec.halfWidth / renderSpec.halfHeight;
};

function deleteRenderTarget(rt) {
  gl.deleteFramebuffer(rt.frameBuffer);
  gl.deleteRenderbuffer(rt.renderBuffer);
  gl.deleteTexture(rt.texture);
}

function createRenderTarget(w, h) {
  var ret = {
    width: w,
    height: h,
    sizeArray: new Float32Array([w, h, w / h]),
    dtxArray: new Float32Array([1.0 / w, 1.0 / h])
  };
  ret.frameBuffer = gl.createFramebuffer();
  ret.renderBuffer = gl.createRenderbuffer();
  ret.texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, ret.texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    w,
    h,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  gl.bindFramebuffer(gl.FRAMEBUFFER, ret.frameBuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    ret.texture,
    0
  );

  gl.bindRenderbuffer(gl.RENDERBUFFER, ret.renderBuffer);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);
  gl.framebufferRenderbuffer(
    gl.FRAMEBUFFER,
    gl.DEPTH_ATTACHMENT,
    gl.RENDERBUFFER,
    ret.renderBuffer
  );

  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  return ret;
}

function compileShader(shtype, shsrc) {
  var retsh = gl.createShader(shtype);

  gl.shaderSource(retsh, shsrc);
  gl.compileShader(retsh);

  if (!gl.getShaderParameter(retsh, gl.COMPILE_STATUS)) {
    var errlog = gl.getShaderInfoLog(retsh);
    gl.deleteShader(retsh);
    console.error(errlog);
    return null;
  }
  return retsh;
}

function createShader(vtxsrc, frgsrc, uniformlist, attrlist) {
  var vsh = compileShader(gl.VERTEX_SHADER, vtxsrc);
  var fsh = compileShader(gl.FRAGMENT_SHADER, frgsrc);

  if (vsh == null || fsh == null) {
    return null;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, vsh);
  gl.attachShader(prog, fsh);

  gl.deleteShader(vsh);
  gl.deleteShader(fsh);

  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    var errlog = gl.getProgramInfoLog(prog);
    console.error(errlog);
    return null;
  }

  if (uniformlist) {
    prog.uniforms = {};
    for (var i = 0; i < uniformlist.length; i++) {
      prog.uniforms[uniformlist[i]] = gl.getUniformLocation(
        prog,
        uniformlist[i]
      );
    }
  }

  if (attrlist) {
    prog.attributes = {};
    for (var i = 0; i < attrlist.length; i++) {
      var attr = attrlist[i];
      prog.attributes[attr] = gl.getAttribLocation(prog, attr);
    }
  }

  return prog;
}

function useShader(prog) {
  gl.useProgram(prog);
  for (var attr in prog.attributes) {
    gl.enableVertexAttribArray(prog.attributes[attr]);
  }
}

function unuseShader(prog) {
  for (var attr in prog.attributes) {
    gl.disableVertexAttribArray(prog.attributes[attr]);
  }
  gl.useProgram(null);
}

/////
var projection = {
  angle: 60,
  nearfar: new Float32Array([0.1, 100.0]),
  matrix: Matrix44.createIdentity()
};
var camera = {
  position: Vector3.create(0, 0, 100),
  lookat: Vector3.create(0, 0, 0),
  up: Vector3.create(0, 1, 0),
  dof: Vector3.create(10.0, 4.0, 8.0),
  matrix: Matrix44.createIdentity()
};

var pointFlower = {};
var meshFlower = {};
var sceneStandBy = false;

var BlossomParticle = function () {
  this.velocity = new Array(3);
  this.rotation = new Array(3);
  this.position = new Array(3);
  this.euler = new Array(3);
  this.size = 1.0;
  this.alpha = 1.0;
  this.zkey = 0.0;
};

BlossomParticle.prototype.setVelocity = function (vx, vy, vz) {
  this.velocity[0] = vx;
  this.velocity[1] = vy;
  this.velocity[2] = vz;
};

BlossomParticle.prototype.setRotation = function (rx, ry, rz) {
  this.rotation[0] = rx;
  this.rotation[1] = ry;
  this.rotation[2] = rz;
};

BlossomParticle.prototype.setPosition = function (nx, ny, nz) {
  this.position[0] = nx;
  this.position[1] = ny;
  this.position[2] = nz;
};

BlossomParticle.prototype.setEulerAngles = function (rx, ry, rz) {
  this.euler[0] = rx;
  this.euler[1] = ry;
  this.euler[2] = rz;
};

BlossomParticle.prototype.setSize = function (s) {
  this.size = s;
};

BlossomParticle.prototype.update = function (dt, et) {
  this.position[0] += this.velocity[0] * dt;
  this.position[1] += this.velocity[1] * dt;
  this.position[2] += this.velocity[2] * dt;

  this.euler[0] += this.rotation[0] * dt;
  this.euler[1] += this.rotation[1] * dt;
  this.euler[2] += this.rotation[2] * dt;
};

function createPointFlowers() {
  // get point sizes
  var prm = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
  renderSpec.pointSize = { min: prm[0], max: prm[1] };

  var vtxsrc = document.getElementById("sakura_point_vsh").textContent;
  var frgsrc = document.getElementById("sakura_point_fsh").textContent;

  pointFlower.program = createShader(
    vtxsrc,
    frgsrc,
    ["uProjection", "uModelview", "uResolution", "uOffset", "uDOF", "uFade"],
    ["aPosition", "aEuler", "aMisc"]
  );

  useShader(pointFlower.program);
  pointFlower.offset = new Float32Array([0.0, 0.0, 0.0]);
  pointFlower.fader = Vector3.create(0.0, 10.0, 0.0);

  // paramerters: velocity[3], rotate[3]
  pointFlower.numFlowers = 150;
  pointFlower.particles = new Array(pointFlower.numFlowers);
  // vertex attributes {position[3], euler_xyz[3], size[1]}
  pointFlower.dataArray = new Float32Array(
    pointFlower.numFlowers * (3 + 3 + 2)
  );
  pointFlower.positionArrayOffset = 0;
  pointFlower.eulerArrayOffset = pointFlower.numFlowers * 3;
  pointFlower.miscArrayOffset = pointFlower.numFlowers * 6;

  pointFlower.buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pointFlower.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointFlower.dataArray, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  unuseShader(pointFlower.program);

  for (var i = 0; i < pointFlower.numFlowers; i++) {
    pointFlower.particles[i] = new BlossomParticle();
  }
}

function initPointFlowers() {
  //area
  pointFlower.area = Vector3.create(20.0, 20.0, 20.0);
  pointFlower.area.x = pointFlower.area.y * renderSpec.aspect;

  pointFlower.fader.x = 10.0; //env fade start
  pointFlower.fader.y = pointFlower.area.z; //env fade half
  pointFlower.fader.z = 0.1; //near fade start

  //particles
  var PI2 = Math.PI * 2.0;
  var tmpv3 = Vector3.create(0, 0, 0);
  var tmpv = 0;
  var symmetryrand = function () {
    return Math.random() * 2.0 - 1.0;
  };
  for (var i = 0; i < pointFlower.numFlowers; i++) {
    var tmpprtcl = pointFlower.particles[i];

    //velocity
    tmpv3.x = symmetryrand() * 0.3 + 0.8;
    tmpv3.y = symmetryrand() * 0.2 - 1.0;
    tmpv3.z = symmetryrand() * 0.3 + 0.5;
    Vector3.normalize(tmpv3);
    tmpv = 2.0 + Math.random() * 1.0;
    tmpprtcl.setVelocity(tmpv3.x * tmpv, tmpv3.y * tmpv, tmpv3.z * tmpv);

    //rotation
    tmpprtcl.setRotation(
      symmetryrand() * PI2 * 0.5,
      symmetryrand() * PI2 * 0.5,
      symmetryrand() * PI2 * 0.5
    );

    //position
    tmpprtcl.setPosition(
      symmetryrand() * pointFlower.area.x,
      symmetryrand() * pointFlower.area.y,
      symmetryrand() * pointFlower.area.z
    );

    //euler
    tmpprtcl.setEulerAngles(
      Math.random() * Math.PI * 2.0,
      Math.random() * Math.PI * 2.0,
      Math.random() * Math.PI * 2.0
    );

    //size
    tmpprtcl.setSize(0.9 + Math.random() * 0.1);
  }
}

function renderPointFlowers() {
  //update
  var PI2 = Math.PI * 2.0;
  var limit = [pointFlower.area.x, pointFlower.area.y, pointFlower.area.z];
  var repeatPos = function (prt, cmp, limit) {
    if (Math.abs(prt.position[cmp]) - prt.size * 0.5 > limit) {
      //out of area
      if (prt.position[cmp] > 0) {
        prt.position[cmp] -= limit * 2.0;
      } else {
        prt.position[cmp] += limit * 2.0;
      }
    }
  };
  var repeatEuler = function (prt, cmp) {
    prt.euler[cmp] = prt.euler[cmp] % PI2;
    if (prt.euler[cmp] < 0.0) {
      prt.euler[cmp] += PI2;
    }
  };

  for (var i = 0; i < pointFlower.numFlowers; i++) {
    var prtcl = pointFlower.particles[i];
    prtcl.update(timeInfo.delta, timeInfo.elapsed);
    repeatPos(prtcl, 0, pointFlower.area.x);
    repeatPos(prtcl, 1, pointFlower.area.y);
    repeatPos(prtcl, 2, pointFlower.area.z);
    repeatEuler(prtcl, 0);
    repeatEuler(prtcl, 1);
    repeatEuler(prtcl, 2);

    prtcl.alpha = 1.0; //(pointFlower.area.z - prtcl.position[2]) * 0.5;

    prtcl.zkey =
      camera.matrix[2] * prtcl.position[0] +
      camera.matrix[6] * prtcl.position[1] +
      camera.matrix[10] * prtcl.position[2] +
      camera.matrix[14];
  }

  // sort
  pointFlower.particles.sort(function (p0, p1) {
    return p0.zkey - p1.zkey;
  });

  // update data
  var ipos = pointFlower.positionArrayOffset;
  var ieuler = pointFlower.eulerArrayOffset;
  var imisc = pointFlower.miscArrayOffset;
  for (var i = 0; i < pointFlower.numFlowers; i++) {
    var prtcl = pointFlower.particles[i];
    pointFlower.dataArray[ipos] = prtcl.position[0];
    pointFlower.dataArray[ipos + 1] = prtcl.position[1];
    pointFlower.dataArray[ipos + 2] = prtcl.position[2];
    ipos += 3;
    pointFlower.dataArray[ieuler] = prtcl.euler[0];
    pointFlower.dataArray[ieuler + 1] = prtcl.euler[1];
    pointFlower.dataArray[ieuler + 2] = prtcl.euler[2];
    ieuler += 3;
    pointFlower.dataArray[imisc] = prtcl.size;
    pointFlower.dataArray[imisc + 1] = prtcl.alpha;
    imisc += 2;
  }

  //draw
  gl.enable(gl.BLEND);
  //gl.disable(gl.DEPTH_TEST);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  var prog = pointFlower.program;
  useShader(prog);

  gl.uniformMatrix4fv(prog.uniforms.uProjection, false, projection.matrix);
  gl.uniformMatrix4fv(prog.uniforms.uModelview, false, camera.matrix);
  gl.uniform3fv(prog.uniforms.uResolution, renderSpec.array);
  gl.uniform3fv(prog.uniforms.uDOF, Vector3.arrayForm(camera.dof));
  gl.uniform3fv(prog.uniforms.uFade, Vector3.arrayForm(pointFlower.fader));

  gl.bindBuffer(gl.ARRAY_BUFFER, pointFlower.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointFlower.dataArray, gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(
    prog.attributes.aPosition,
    3,
    gl.FLOAT,
    false,
    0,
    pointFlower.positionArrayOffset * Float32Array.BYTES_PER_ELEMENT
  );
  gl.vertexAttribPointer(
    prog.attributes.aEuler,
    3,
    gl.FLOAT,
    false,
    0,
    pointFlower.eulerArrayOffset * Float32Array.BYTES_PER_ELEMENT
  );
  gl.vertexAttribPointer(
    prog.attributes.aMisc,
    2,
    gl.FLOAT,
    false,
    0,
    pointFlower.miscArrayOffset * Float32Array.BYTES_PER_ELEMENT
  );

  // doubler
  for (var i = 1; i < 2; i++) {
    var zpos = i * -2.0;
    pointFlower.offset[0] = pointFlower.area.x * -1.0;
    pointFlower.offset[1] = pointFlower.area.y * -1.0;
    pointFlower.offset[2] = pointFlower.area.z * zpos;
    gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
    gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

    pointFlower.offset[0] = pointFlower.area.x * -1.0;
    pointFlower.offset[1] = pointFlower.area.y * 1.0;
    pointFlower.offset[2] = pointFlower.area.z * zpos;
    gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
    gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

    pointFlower.offset[0] = pointFlower.area.x * 1.0;
    pointFlower.offset[1] = pointFlower.area.y * -1.0;
    pointFlower.offset[2] = pointFlower.area.z * zpos;
    gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
    gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

    pointFlower.offset[0] = pointFlower.area.x * 1.0;
    pointFlower.offset[1] = pointFlower.area.y * 1.0;
    pointFlower.offset[2] = pointFlower.area.z * zpos;
    gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
    gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);
  }

  //main
  pointFlower.offset[0] = 0.0;
  pointFlower.offset[1] = 0.0;
  pointFlower.offset[2] = 0.0;
  gl.uniform3fv(prog.uniforms.uOffset, pointFlower.offset);
  gl.drawArrays(gl.POINT, 0, pointFlower.numFlowers);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  unuseShader(prog);

  gl.enable(gl.DEPTH_TEST);
  gl.disable(gl.BLEND);
}

// effects
//common util
function createEffectProgram(vtxsrc, frgsrc, exunifs, exattrs) {
  var ret = {};
  var unifs = ["uResolution", "uSrc", "uDelta"];
  if (exunifs) {
    unifs = unifs.concat(exunifs);
  }
  var attrs = ["aPosition"];
  if (exattrs) {
    attrs = attrs.concat(exattrs);
  }

  ret.program = createShader(vtxsrc, frgsrc, unifs, attrs);
  useShader(ret.program);

  ret.dataArray = new Float32Array([
    -1.0,
    -1.0,
    1.0,
    -1.0,
    -1.0,
    1.0,
    1.0,
    1.0
  ]);
  ret.buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ret.buffer);
  gl.bufferData(gl.ARRAY_BUFFER, ret.dataArray, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  unuseShader(ret.program);

  return ret;
}

// basic usage
// useEffect(prog, srctex({'texture':texid, 'dtxArray':(f32)[dtx, dty]})); //basic initialize
// gl.uniform**(...); //additional uniforms
// drawEffect()
// unuseEffect(prog)
// TEXTURE0 makes src
function useEffect(fxobj, srctex) {
  var prog = fxobj.program;
  useShader(prog);
  gl.uniform3fv(prog.uniforms.uResolution, renderSpec.array);

  if (srctex != null) {
    gl.uniform2fv(prog.uniforms.uDelta, srctex.dtxArray);
    gl.uniform1i(prog.uniforms.uSrc, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, srctex.texture);
  }
}
function drawEffect(fxobj) {
  gl.bindBuffer(gl.ARRAY_BUFFER, fxobj.buffer);
  gl.vertexAttribPointer(
    fxobj.program.attributes.aPosition,
    2,
    gl.FLOAT,
    false,
    0,
    0
  );
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
function unuseEffect(fxobj) {
  unuseShader(fxobj.program);
}

var effectLib = {};
function createEffectLib() {
  var vtxsrc, frgsrc;
  //common
  var cmnvtxsrc = document.getElementById("fx_common_vsh").textContent;

  //background
  frgsrc = document.getElementById("bg_fsh").textContent;
  effectLib.sceneBg = createEffectProgram(cmnvtxsrc, frgsrc, ["uTimes"], null);

  // make brightpixels buffer
  frgsrc = document.getElementById("fx_brightbuf_fsh").textContent;
  effectLib.mkBrightBuf = createEffectProgram(cmnvtxsrc, frgsrc, null, null);

  // direction blur
  frgsrc = document.getElementById("fx_dirblur_r4_fsh").textContent;
  effectLib.dirBlur = createEffectProgram(
    cmnvtxsrc,
    frgsrc,
    ["uBlurDir"],
    null
  );

  //final composite
  vtxsrc = document.getElementById("pp_final_vsh").textContent;
  frgsrc = document.getElementById("pp_final_fsh").textContent;
  effectLib.finalComp = createEffectProgram(vtxsrc, frgsrc, ["uBloom"], null);
}

// background
function createBackground() {
  //console.log("create background");
}
function initBackground() {
  //console.log("init background");
}
function renderBackground() {
  gl.disable(gl.DEPTH_TEST);

  useEffect(effectLib.sceneBg, null);
  gl.uniform2f(
    effectLib.sceneBg.program.uniforms.uTimes,
    timeInfo.elapsed,
    timeInfo.delta
  );
  drawEffect(effectLib.sceneBg);
  unuseEffect(effectLib.sceneBg);

  gl.enable(gl.DEPTH_TEST);
}

// post process
var postProcess = {};
function createPostProcess() {
  //console.log("create post process");
}
function initPostProcess() {
  //console.log("init post process");
}

function renderPostProcess() {
  gl.enable(gl.TEXTURE_2D);
  gl.disable(gl.DEPTH_TEST);
  var bindRT = function (rt, isclear) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, rt.frameBuffer);
    gl.viewport(0, 0, rt.width, rt.height);
    if (isclear) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
  };

  //make bright buff
  bindRT(renderSpec.wHalfRT0, true);
  useEffect(effectLib.mkBrightBuf, renderSpec.mainRT);
  drawEffect(effectLib.mkBrightBuf);
  unuseEffect(effectLib.mkBrightBuf);

  // make bloom
  for (var i = 0; i < 2; i++) {
    var p = 1.5 + 1 * i;
    var s = 2.0 + 1 * i;
    bindRT(renderSpec.wHalfRT1, true);
    useEffect(effectLib.dirBlur, renderSpec.wHalfRT0);
    gl.uniform4f(effectLib.dirBlur.program.uniforms.uBlurDir, p, 0.0, s, 0.0);
    drawEffect(effectLib.dirBlur);
    unuseEffect(effectLib.dirBlur);

    bindRT(renderSpec.wHalfRT0, true);
    useEffect(effectLib.dirBlur, renderSpec.wHalfRT1);
    gl.uniform4f(effectLib.dirBlur.program.uniforms.uBlurDir, 0.0, p, 0.0, s);
    drawEffect(effectLib.dirBlur);
    unuseEffect(effectLib.dirBlur);
  }

  //display
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, renderSpec.width, renderSpec.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  useEffect(effectLib.finalComp, renderSpec.mainRT);
  gl.uniform1i(effectLib.finalComp.program.uniforms.uBloom, 1);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, renderSpec.wHalfRT0.texture);
  drawEffect(effectLib.finalComp);
  unuseEffect(effectLib.finalComp);

  gl.enable(gl.DEPTH_TEST);
}

/////
var SceneEnv = {};
function createScene() {
  createEffectLib();
  createBackground();
  createPointFlowers();
  createPostProcess();
  sceneStandBy = true;
}

function initScene() {
  initBackground();
  initPointFlowers();
  initPostProcess();

  //camera.position.z = 17.320508;
  camera.position.z = pointFlower.area.z + projection.nearfar[0];
  projection.angle =
    ((Math.atan2(pointFlower.area.y, camera.position.z + pointFlower.area.z) *
      180.0) /
      Math.PI) *
    2.0;
  Matrix44.loadProjection(
    projection.matrix,
    renderSpec.aspect,
    projection.angle,
    projection.nearfar[0],
    projection.nearfar[1]
  );
}

function renderScene() {
  //draw
  Matrix44.loadLookAt(camera.matrix, camera.position, camera.lookat, camera.up);

  gl.enable(gl.DEPTH_TEST);

  //gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, renderSpec.mainRT.frameBuffer);
  gl.viewport(0, 0, renderSpec.mainRT.width, renderSpec.mainRT.height);
  gl.clearColor(0.005, 0, 0.05, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  renderBackground();
  renderPointFlowers();
  renderPostProcess();
}

/////
function onResize(e) {
  makeCanvasFullScreen(document.getElementById("sakura"));
  setViewports();
  if (sceneStandBy) {
    initScene();
  }
}

function setViewports() {
  renderSpec.setSize(gl.canvas.width, gl.canvas.height);

  gl.clearColor(0.2, 0.2, 0.5, 1.0);
  gl.viewport(0, 0, renderSpec.width, renderSpec.height);

  var rtfunc = function (rtname, rtw, rth) {
    var rt = renderSpec[rtname];
    if (rt) deleteRenderTarget(rt);
    renderSpec[rtname] = createRenderTarget(rtw, rth);
  };
  rtfunc("mainRT", renderSpec.width, renderSpec.height);
  rtfunc("wFullRT0", renderSpec.width, renderSpec.height);
  rtfunc("wFullRT1", renderSpec.width, renderSpec.height);
  rtfunc("wHalfRT0", renderSpec.halfWidth, renderSpec.halfHeight);
  rtfunc("wHalfRT1", renderSpec.halfWidth, renderSpec.halfHeight);
}

function render() {
  renderScene();
}

var animating = true;
function toggleAnimation(elm) {
  animating ^= true;
  if (animating) animate();
  if (elm) {
    elm.innerHTML = animating ? "Stop" : "Start";
  }
}

function stepAnimation() {
  if (!animating) animate();
}

function animate() {
  var curdate = new Date();
  timeInfo.elapsed = (curdate - timeInfo.start) / 1000.0;
  timeInfo.delta = (curdate - timeInfo.prev) / 1000.0;
  timeInfo.prev = curdate;

  if (animating) requestAnimationFrame(animate);
  render();
}

// function makeCanvasFullScreen(canvas) {
//    var b = document.body;
//    var d = document.documentElement;
//    fullw = Math.max(b.clientWidth, b.scrollWidth, d.scrollWidth, d.clientWidth);
//    fullh = Math.max(
//      b.clientHeight,
//      b.scrollHeight,
//      d.scrollHeight,
//      d.clientHeight
//    );
//    canvas.width = fullw;
//    canvas.height = fullh;
//  }

 function makeCanvasFullScreen(canvas) {
   var fullw = window.innerWidth;
   var fullh = window.innerHeight;
   canvas.width = fullw;
   canvas.height = fullh;
 }

window.addEventListener("load", function (e) {
  var canvas = document.getElementById("sakura");
  try {
    makeCanvasFullScreen(canvas);
    // gl = canvas.getContext("experimental-webgl");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  } catch (e) {
    alert("WebGL not supported." + e);
    console.error(e);
    return;
  }

  window.addEventListener("resize", onResize);

  setViewports();
  createScene();
  initScene();

  timeInfo.start = new Date();
  timeInfo.prev = timeInfo.start;
  animate();
});

//set window.requestAnimationFrame
(function (w, r) {
  w["r" + r] =
    w["r" + r] ||
    w["webkitR" + r] ||
    w["mozR" + r] ||
    w["msR" + r] ||
    w["oR" + r] ||
    function (c) {
      w.setTimeout(c, 1000 / 60);
    };
})(window, "requestAnimationFrame");


/*!
Swaying photo gallery - scroll event
Created on AUGUST 29, 2023
Copyright (c) 2023 by Wakana Y.K. (https://codepen.io/wakana-k/pen/WNLrWMm)
*/
/*
Related works : 
Portforio design @wakana-k - https://codepen.io/wakana-k/pen/BaxKKvE
Swaying photo gallery - hover event @wakana-k - https://codepen.io/wakana-k/pen/oNJxbPw
*/
"use strict";
(function () {
	window.onload = () => {
		const obj = document.querySelector("#gallery");
		const time = 10000;
		function animStart() {
			if (obj.classList.contains("active") == false) {
				obj.classList.add("active");
				setTimeout(() => {
					animEnd();
				}, time);
			}
		}
		function animEnd() {
			obj.classList.remove("active");
			obj.offsetWidth;
		}
		document.addEventListener("scroll", function () {
			// scroll or scrollend
			animStart();
		});
		window.addEventListener("resize", animStart);
		animStart();
	};
})();





// RESUME MENU   https://codepen.io/codesuey/pen/zwyGxm
$(document).on("click", ".container .naccs .menu div", function () {
  // Get the target panel ID from the clicked menu item's data-target attribute
  var targetPanelId = $(this).data("target");

  // If the clicked menu item is not already active
  if (!$(this).hasClass("active")) {
    // Remove 'active' class from all menu items and panels, hide all panels
    $(".container .naccs .menu div").removeClass("active");
    $(".container .naccs .tabvisible").removeClass("active").css("visibility", "hidden").css("opacity", "0"); // Hide all panels

    // Add 'active' class to the clicked menu item
    $(this).addClass("active");

    // Show and activate the corresponding panel
    $("#" + targetPanelId).addClass("active").css("visibility", "visible").css("opacity", "1"); // Only the selected panel will be visible
  }
});





})();