var images = [
  'https://i.ibb.co/tQ24kt4/In-Shot-20240901-085226460.jpg',
  'https://i.ibb.co/jbqFY86/In-Shot-20240901-085204069.jpg',
  'https://i.ibb.co/xXsvK5k/In-Shot-20240901-085147191.jpg',
  'https://i.ibb.co/w0LHwtY/In-Shot-20240901-085126639.jpg',
  'https://i.ibb.co/9pf980m/In-Shot-20240901-085104394.jpg',
  'https://i.ibb.co/FnbSQYT/In-Shot-20240901-085037450.jpg',
  'https://i.ibb.co/SKzDGpv/In-Shot-20240901-084932460.jpg'
];

var totalClicks = 0;

function randomizeImage() {
let root = document.documentElement;

// Select a random image from the images array
var randomIndex = Math.floor(Math.random() * images.length);
var selectedImage = images[randomIndex];

// Set the selected image as the background image
root.style.setProperty('--image', 'url(' + selectedImage + ')');

// Randomly position puzzle items
var puzzleItems = document.querySelectorAll('#puzz i');
for (var i = 0; i < puzzleItems.length; i++) {
  puzzleItems[i].style.left = Math.random() * (window.innerWidth - 100) + 'px';
  puzzleItems[i].style.top = Math.random() * (window.innerHeight - 100) + 'px';
}
}

randomizeImage();

function reloadPuzzle() {
var doneItems = document.querySelectorAll('.done');
doneItems.forEach(function (element) {
  element.classList.toggle('done');
});
var droppedItems = document.querySelectorAll('.dropped');
droppedItems.forEach(function (element) {
  element.classList.toggle('dropped');
});
var allDoneElement = document.querySelector('.allDone');
allDoneElement.style = '';
allDoneElement.classList.toggle('allDone');
}

// Mobile functionality
var puzzleItemsMobile = document.querySelectorAll('#puzz i');
puzzleItemsMobile.forEach(function (element) {
element.addEventListener('mousedown', function () {
  totalClicks++;
  document.querySelector('#clicks').innerHTML = totalClicks;
});
element.addEventListener('click', function () {
  if (document.querySelector('.clicked')) {
    document.querySelector('.clicked').classList.toggle('clicked');
    element.classList.toggle('clicked');
  } else {
    element.classList.toggle('clicked');
  }
});
});

var puzzleItemsDesktop = document.querySelectorAll('#puz i');
puzzleItemsDesktop.forEach(function (element) {
element.addEventListener('click', function () {
  if (document.querySelector('.clicked')) {
    var clickedElement = document.querySelector('.clicked');
    if (clickedElement.classList.contains(element.classList)) {
      element.classList.add('dropped');
      clickedElement.classList.add('done');
      clickedElement.classList.toggle('clicked');

      if (document.querySelectorAll('.dropped').length == 9) {
        document.querySelector('#puz').classList.add('allDone');
        document.querySelector('#puz').style.border = 'none';
        document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

        setTimeout(function () {
          reloadPuzzle();
          randomizeImage();
        }, 1500);
      }
    }
  }
});
});

// Desktop drag and drop
function allowDrop(ev) {
ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("text");

if (ev.target.className == data) {
  ev.target.classList.add('dropped');
  document.querySelector('.' + data + "[draggable='true']").classList.add('done');

  if (document.querySelectorAll('.dropped').length == 9) {
    document.querySelector('#puz').classList.add('allDone');
    document.querySelector('#puz').style.border = 'none';
    document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

    setTimeout(function () {
      reloadPuzzle();
      randomizeImage();
    }, 1500);
  }
}
}
