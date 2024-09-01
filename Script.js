<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Puzzle</title>
    <style>
        /* Add your custom CSS here */
        :root {
            --image: url('https://i.ibb.co/SKzDGpv/In-Shot-20240901-084932460.jpg');
        }
        #puz {
            width: 400px;
            height: 400px;
            background-image: var(--image);
            position: relative;
        }
        #puz i {
            width: 100px;
            height: 100px;
            background-color: rgba(255, 255, 255, 0.8);
            position: absolute;
        }
        .done {
            visibility: hidden;
        }
        .allDone {
            /* Add your custom animation or style for completed puzzle */
        }
    </style>
</head>
<body>

<div id="puz">
    <!-- Puzzle pieces go here -->
    <i class="piece1" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece2" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece3" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece4" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece5" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece6" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece7" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece8" draggable="true" ondragstart="drag(event)"></i>
    <i class="piece9" draggable="true" ondragstart="drag(event)"></i>
</div>

<div id="clicks">Total Clicks: 0</div>

<script>
var images = [
    'https://i.ibb.co/tQ24kt4/In-Shot-20240901-085226460.jpg',
    'https://i.ibb.co/jbqFY86/In-Shot-20240901-085204069.jpg',
    'https://i.ibb.co/xXsvK5k/In-Shot-20240901-085147191.jpg',
    'https://i.ibb.co/w0LHwtY/In-Shot-20240901-085126639.jpg',
    'https://i.ibb.co/9pf980m/In-Shot-20240901-085104394.jpg',
    'https://i.ibb.co/FnbSQYT/In-Shot-20240901-085037450.jpg',
    'https://i.ibb.co/SKzDGpv/In-Shot-20240901-084932460.jpg'
];

var currentIndex = 0;
var totalClicks = 0;

function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  var puzzleItems = document.querySelectorAll('#puz i');
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

// mobile functionality
var puzzleItemsMobile = document.querySelectorAll('#puz i');
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

// desktop drag and drop
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
</script>

</body>
</html>
