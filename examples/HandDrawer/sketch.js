'use strict';
/**
 * example using js
 * window.p5Drawer is the namespace
 */

let canvas;
let drawer;
let lastClickOnCanvas;
let speed = 2;
let settings;

function saveMouseClick() {
  lastClickOnCanvas = createVector(mouseX, mouseY);
}

let drawersConfig = [
  {
    name: 'pencil',
    soundFile: '../assets/pencildrawer.mp3',
    imageFile: '../assets/pencildrawer.png',
    loadedImg: undefined,
    loadedAudio: undefined,
    pencilPosition: {
      x: -52,
      y: -128,
    },
  },
  {
    name: 'axidraw',
    soundFile: '../assets/axidrawer.mp3',
    imageFile: '../assets/axidrawer.png',
    loadedImg: undefined,
    loadedAudio: undefined,
    pencilPosition: {
      x: -100,
      y: -52,
    },
  },
  {
    name: 'scribit',
    soundFile: '../assets/axidrawer.mp3',
    imageFile: '../assets/scribitdrawer.png',
    loadedImg: undefined,
    loadedAudio: undefined,
    pencilPosition: {
      x: -140,
      y: -108,
    },
  },
];

// eslint-disable-next-line
function preload() {
  for (let index = 0; index < drawersConfig.length; index++) {
    drawersConfig[index].loadedImg = loadImage(drawersConfig[index].imageFile);
    drawersConfig[index].loadedAudio = loadSound(
      drawersConfig[index].soundFile
    );
  }
}

// eslint-disable-next-line
function changeDrawer(num) {
  if (!drawer) drawer = createDrawerForConfig(num);
  else {
    drawer.stopSound();
    let copySteps = drawer.steps;
    let copyPosition = drawer.position;
    drawer = createDrawerForConfig(num);
    drawer.steps = copySteps;
    drawer.position = copyPosition;
  }
}

function createDrawerForConfig(num) {
  let _drawer = drawersConfig[num];
  const { x, y } = _drawer.pencilPosition;
  return createDrawer(
    _drawer.loadedImg,
    _drawer.loadedAudio,
    createVector(x, y)
  );
}

// eslint-disable-next-line
function setup() {
  canvas = createCanvas(600, 600);
  canvas.mouseClicked(saveMouseClick);
  settings = QuickSettings.create(255, 5, 'Simulation Parameters');

  var buttonsHtml = '<div style="display: flex;flex-wrap: nowrap; justify-content: space-around ;">';
  drawersConfig.forEach((props, index) => {
    buttonsHtml += `<input id="${props.name}" class="qs_button" type="button" value="${props.name}" onClick=changeDrawer(${index})>`;
  });
  buttonsHtml += '</div>';
  settings.addHTML('drawers',buttonsHtml);

  settings.addRange('speed', 1, 500, speed, 1, (_speed) => speed = _speed);
  settings.addText('Distance', 0);
  settings.addText('Position', '0 , 0');
  settings.addText('Target Position', '0 , 0');
  settings.disableControl('Distance');
  settings.disableControl('Position');
  settings.disableControl('Target Position');
}

// eslint-disable-next-line
function draw() {
  background(245);
  if (drawer) {
    settings.setValue('Distance', parseInt(drawer.targetDistance));
    settings.setValue('Position', `${parseInt(drawer.position.x)} , ${parseInt(drawer.position.y)}`);
    settings.setValue('Target Position', `${parseInt(drawer.targetPosition.x)} , ${parseInt(drawer.targetPosition.y)}`);

    /**
     * loop to positions saved on drawer
     * and create a line
     */
    if (drawer.steps && drawer.steps.length > 1) {
      let positions = drawer.steps;
      for (let i = 0; i < positions.length - 1; i++) {
        let startPoint = positions[i];
        let endPoint = positions[i + 1];
        line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
      }
    }

    /**
     * move drawer to the next position
     */
    if (lastClickOnCanvas)
      drawer.moveTo(lastClickOnCanvas, speed);


    /**
     * generate new position if stop moving
     */
    generateRandomClick();
  }
}

function generateRandomClick() {
  if (drawer.targetReached) {
    lastClickOnCanvas = createVector(
      parseInt(random(100, height - 100)),
      parseInt(random(100, height - 100))
    );
  }
}
