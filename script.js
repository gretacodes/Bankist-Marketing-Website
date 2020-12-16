'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const navBar = document.querySelector('.nav');

//--------MODAL WINDOW
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//------ SMOOTH SCROLLING

btnScrollTo.addEventListener('click', function (event) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//------ PAGE NAVIGATION

document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    //matching strategy
    if (event.target.classList.contains('nav__link')) {
      const hrefID = event.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

//---------TABBED COMPONENTS - OPERATIONS

//insteaD of adding to tabs, add it to a parent element and then use tabs as argument
//event delegation.

tabsContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  //guard clause - return early if some condition is met
  if (!clickedButton) return;
  //remove active classes for tabs and content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));
  //active content area - data attribute
  clickedButton.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

//--------NAVBAR FADE ANIMATION

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target;
    //selecting sibling elements
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = clickedLink.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== clickedLink) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

navBar.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

//undo the selection
navBar.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//-----STICKY NAVIGATION
//when the header moves out  of the view
const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

//------REVEALING ELEMENTS ON SCROLL

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const entry = entries[0];
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//--------LAZY LOADING IMAGES
const imgTarget = document.querySelectorAll('img[data-src');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data src - higher resolution photo
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imagObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  //make it load a bit before threshold is reached
  rootMargin: '300px',
});
imgTarget.forEach(img => imagObserver.observe(img));

//--------BUILDING A SLIDER
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);
//go to next slide - changing transform property
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
document.getElementsByClassName('btn'); // will return a live html collection too.

//------COOKIE WINDOW
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`; //
header.prepend(message);
header.append(message); //moved the child to the end of the list

//DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//------STYLES

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = '85px';
