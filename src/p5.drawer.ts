//how detect loadSound on prototype or @types
import { default as p5, Image, SoundFile, Vector } from 'p5'
import 'p5/global'
import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'

/// <reference path="../node_modules/p5/lib/addons/p5.sound.js" />

interface IAssetInitInput {
  [key: string]: {
    image?: Image | string
    sound?: SoundFile | string
  }
}

interface IAssetBaseProps {
  image?: Image
  sound?: SoundFile
}

interface IAssetsProps extends IAssetBaseProps {
  imageFile: string
  soundFile: string
}
interface IAssets {
  [key: string]: IAssetsProps
}

let _loadedAssets: IAssets = {
  drawer: {
    image: new p5.Image(),
    imageFile:
      'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/images/pencildrawer.png',
    soundFile:
      'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/pencildrawer.mp3'
  },
  axidrawer: {
    image: new p5.Image(),
    imageFile:
      'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/images/axidrawer.png',
    soundFile:
      'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/axidrawer.mp3'
  },
  scribitdrawer: {
    image: new p5.Image(),
    imageFile:
      'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/images/scribitdrawer.png',
    soundFile:
      'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/axidrawer.mp3'
  }
}

/**
 * load drawers assets
 * user can override it calling this method on preload()
 */
//@ts-ignore
p5.prototype.initDrawer = function() {
  let drawerNames = Object.keys(_loadedAssets)
  drawerNames.forEach((drawerName: keyof IAssets) => {
    let asset = _loadedAssets[drawerName]
    _loadedAssets[drawerName].image = this.loadImage(asset.imageFile)
    //@ts-ignore
    _loadedAssets[drawerName].sound = this.loadSound(asset.soundFile)
  })
}
//@ts-ignore
p5.prototype.registerMethod('init', p5.prototype.initDrawer)
//@ts-ignore
p5.prototype.registerPreloadMethod('initDrawer', p5.prototype)

export class Drawer {
  _sketch: p5 | any
  _speed: number
  _image?: Image
  _sound?: SoundFile
  _position: Vector
  _targetPosition: Vector
  _saveSteps: boolean
  _penTipPosition: Vector
  _steps: Vector[]

  constructor(p?: p5) {
    this._sketch = p ? p : window
    if (!this._sketch) throw 'p5 not defined'
    this._speed = 2
    this._image = _loadedAssets['drawer'].image
    this._sound = _loadedAssets['drawer'].sound
    this._position = this._sketch.createVector(0, 0)
    this._targetPosition = this._sketch.createVector(0, 0)
    this._saveSteps = true
    this._penTipPosition = this._sketch.createVector(-52, -128)
    this._steps = []
    if (!this._image || !this._sound)
      console.warn(
        `Make sure to load the image and sound on preload(), we remove the boths from build. See the example folder.`
      )
  }

  get sketch() {
    return this._sketch
  }

  set sketch(sketch) {
    this._sketch = sketch
  }

  get speed() {
    return this._speed
  }

  set speed(speed) {
    this._speed = speed
  }

  get sound() {
    return this._sound
  }

  set sound(sound) {
    this._sound = sound
  }

  get image() {
    return this._image
  }

  set image(image) {
    this._image = image
  }

  get steps() {
    return this._steps
  }

  set steps(steps) {
    this._steps = steps
  }

  get position() {
    return this._position
  }

  set position(position) {
    this._position = position
  }

  get targetPosition() {
    return this._targetPosition
  }

  set targetPosition(targetPosition) {
    this._targetPosition = targetPosition
  }

  get saveSteps() {
    return this._saveSteps
  }

  set saveSteps(canSaveSteps) {
    this._saveSteps = canSaveSteps
  }

  get penTipPosition() {
    return this._penTipPosition
  }

  set penTipPosition(penTipPosition) {
    this._penTipPosition = penTipPosition
  }

  stopSound() {
    this.sound && this.sound.stop()
  }

  /**
   * check if still need to move
   */
  get hasToMove() {
    return this.targetPosition && this.position && this.targetDistance > 0
  }

  get targetReached() {
    return !this.hasToMove
  }

  /**
   * 2d distance
   */
  get targetDistance() {
    return this.sketch.dist(
      this.targetPosition.x,
      this.targetPosition.y,
      this.position.x,
      this.position.y
    )
  }

  /**
   * create a loop
   * to-do: play with loop speed, based on speed or penstyle
   */
  playAudio(replaceSpeed: number) {
    if (this.hasToMove) {
      if (this.sound && !this.sound.isPlaying()) {
        this.sound.play()
      }
    } else this.sound && this.sound.stop()
    this.applySoundSpeed(replaceSpeed)
  }

  applySoundSpeed(replaceSpeed: number) {
    let currentSpeed = replaceSpeed ? replaceSpeed : this.speed
    //todo create a map for control the soundspeed, ex: from 1 to 100  map to 0.5 to 4
    let soundSpeed = this.sketch.map(currentSpeed, 1, 100, 0.5, 4)
    soundSpeed = this.sketch.constrain(soundSpeed, 0.01, 4)
    this.sound && this.sound.rate(soundSpeed)
  }

  /**
   * @param coordinate vector where you want to move
   * @param replaceSpeed override the speed for next movements until reach the target
   */
  moveTo(coordinate: Vector, replaceSpeed: number) {
    this.targetPosition = coordinate
    this.startMovement(replaceSpeed)
  }

  /**
   *
   * @param replaceSpeed override the speed for next movements until reach the target
   */
  startMovement(replaceSpeed: number) {
    if (this.hasToMove) this.updateToNextPosition(replaceSpeed)
    this.draw()
    this.playAudio(replaceSpeed)
  }

  draw() {
    this.sketch.push()
    this.sketch.translate(this.penTipPosition)

    //draw an image as last element to override everythin an maitain the shadow effect
    if (this.image) this.sketch.image(this.image, this.position.x, this.position.y)
    this.sketch.pop()
  }

  /**
   *
   * @param replaceSpeed override the speed for next movements until reach the target
   */
  updateToNextPosition(replaceSpeed: number) {
    //show image as last element
    let nextY, nextX, distanceFromX, distanceFromY, minimalDistanceFromX, minimalDistanceFromY

    //check if user override the main speed
    let definedSpeed = replaceSpeed ? replaceSpeed : this.speed

    //absolute distance (ignore minus)
    distanceFromX = Math.abs(this.targetPosition.x - this.position.x)
    distanceFromY = Math.abs(this.targetPosition.y - this.position.y)

    //max step available based on distance and speed/pixels
    minimalDistanceFromX = Math.min(definedSpeed, distanceFromX)
    minimalDistanceFromY = Math.min(definedSpeed, distanceFromY)

    //increase or decrease X-axe
    if (this.position.x > this.targetPosition.x)
      //decrease
      nextX = this.position.x - minimalDistanceFromX
    //increase
    else nextX = this.position.x + minimalDistanceFromX

    //increase or decrease Y-axe
    if (this.position.y > this.targetPosition.y)
      //decrease
      nextY = this.position.y - minimalDistanceFromY
    //increase
    else nextY = this.position.y + minimalDistanceFromY

    //create next position
    let nextPositionVector = this.sketch.createVector(nextX, nextY)

    //save the step
    if (this.saveSteps) this.steps.push(nextPositionVector)

    //update the current position
    this.position = nextPositionVector
  }
}

export class AxiDrawer extends Drawer {
  constructor(p?: p5) {
    super(p)
    this.image = _loadedAssets['axidrawer'].image
    this.sound = _loadedAssets['axidrawer'].sound
    this.speed = this.speed * 2
    this.penTipPosition = this.sketch.createVector(-100, -52)
  }
}

export class ScribitDrawer extends Drawer {
  constructor(p?: p5) {
    super(p)
    this.image = _loadedAssets['scribitdrawer'].image
    this.sound = _loadedAssets['scribitdrawer'].sound
    this.speed = this.speed * 2
    this.penTipPosition = this.sketch.createVector(-140, -108)
  }
}
