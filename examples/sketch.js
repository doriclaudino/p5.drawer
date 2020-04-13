/**
 * example using js
 * window.p5Drawer is the namespace
 */

let canvas
let drawer
let userClickPositionOnCanvas
let slider
let radio

//get mouse position-minus pencil margin
function getMousePosition() {
  return createVector(mouseX, mouseY)
}

function onUserClickOnMyCanvasAction() {
  userClickPositionOnCanvas = getMousePosition()
}
let drawerImg, axiImg
function preload() {
  drawerImg = loadImage('pencildrawer.png')
  axiImg = loadImage('axidrawer.png')
  //override the image or sound passing the object already loaded or an string
  initDrawer({
    drawer: {
      image: drawerImg,
      sound: 'pencildrawer.mp3'
    },
    axidrawer: {
      image: axiImg,
      sound: 'axidrawer.mp3'
    },
    scribitdrawer: {
      image: 'scribitdrawer.png',
    }
  })
}

function getInstanceForRadio(optionSelected = 1) {
  switch (parseInt(optionSelected)) {
    case 2:
      return new p5Drawer.AxiDrawer()
    case 3:
      return new p5Drawer.ScribitDrawer()
    default:
      return new p5Drawer.Drawer()
  }
}

function onDrawerSelected() {
  let newInstance = getInstanceForRadio(radio.value())
  if (drawer && drawer.steps.length) {
    drawer.stopSound()
    newInstance.steps = drawer.steps
    newInstance.position = drawer.position
    drawer = newInstance
  } else {
    drawer = newInstance
  }
}

function setup() {
  canvas = createCanvas(600, 600)
  canvas.mouseClicked(onUserClickOnMyCanvasAction)
  slider = createSlider(1, 100, 5)
  radio = createRadio()
  radio.option('default Pencil', 1)
  radio.option('axiDraw-v3', 2)
  radio.option('scribit', 3)
  radio.changed(onDrawerSelected)
}

function draw() {
  background(245)
  text(`speed:${slider.value()}`, 10, 20)
  if (drawer) {
    text(`targetReached: ${drawer.targetReached}`, 10, 40)
    text(`targetDistance: ${drawer.targetDistance}`, 10, 60)
    text(`targetVector(${drawer.targetPosition.x},${drawer.targetPosition.y})`, 10, 80)
    text(`positiontVector(${drawer.position.x},${drawer.position.y})`, 10, 100)

    if (drawer.steps && drawer.steps.length > 1) {
      positions = drawer.steps
      for (let i = 0; i < positions.length - 1; i++) {
        let startPoint = positions[i]
        let endPoint = positions[i + 1]
        line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
      }
    }

    if (userClickPositionOnCanvas) drawer.moveTo(userClickPositionOnCanvas, slider.value())

    if (drawer.targetReached)
      userClickPositionOnCanvas = createVector(
        parseInt(random(100, height - 100)),
        parseInt(random(100, height - 100))
      )
  }
}
