'use strict';

define(function () {
  class Drawer {
    constructor(image, sound, tipPosition) {
      this._speed = 2;
      this._image = image;
      this._sound = sound;
      this._position = p5.instance.createVector(0, 0);
      this._targetPosition = p5.instance.createVector(0, 0);
      this._saveSteps = true;
      this._penTipPosition = tipPosition || p5.instance.createVector(0, 0);
      this._steps = [];
    }

    get speed() {
      return this._speed;
    }

    set speed(speed) {
      this._speed = speed;
    }

    get sound() {
      return this._sound;
    }

    set sound(sound) {
      this._sound = sound;
    }

    get image() {
      return this._image;
    }

    set image(image) {
      this._image = image;
    }

    get steps() {
      return this._steps;
    }

    set steps(steps) {
      this._steps = steps;
    }

    get position() {
      return this._position;
    }

    set position(position) {
      this._position = position;
    }

    get targetPosition() {
      return this._targetPosition;
    }

    set targetPosition(targetPosition) {
      this._targetPosition = targetPosition;
    }

    get saveSteps() {
      return this._saveSteps;
    }

    set saveSteps(canSaveSteps) {
      this._saveSteps = canSaveSteps;
    }

    get penTipPosition() {
      return this._penTipPosition;
    }

    set penTipPosition(penTipPosition) {
      this._penTipPosition = penTipPosition;
    }

    stopSound() {
      this.sound && this.sound.stop();
    }

    /**
     * check if still need to move
     */
    get hasToMove() {
      return this.targetPosition && this.position && this.targetDistance > 0;
    }

    get targetReached() {
      return !this.hasToMove;
    }

    /**
     * 2d distance
     */
    get targetDistance() {
      return p5.instance.dist(
        this.targetPosition.x,
        this.targetPosition.y,
        this.position.x,
        this.position.y
      );
    }

    /**
     * create a loop
     * to-do: play with loop speed, based on speed or penstyle
     */
    playAudio(replaceSpeed) {
      if (this.hasToMove) {
        if (this.sound && !this.sound.isPlaying()) {
          this.applySoundSpeed(replaceSpeed);
          this.sound.play();
        }
      } else this.sound && this.sound.stop();
    }

    applySoundSpeed(replaceSpeed) {
      let currentSpeed = replaceSpeed ? replaceSpeed : this.speed;
      //todo create a map for control the soundspeed, ex: from 1 to 100  map to 0.5 to 4
      let soundSpeed = p5.instance.map(currentSpeed, 1, 100, 0.5, 4);
      soundSpeed = p5.instance.constrain(soundSpeed, 0.01, 4);
      this.sound && this.sound.rate(soundSpeed);
    }

    /**
     * @param coordinate vector where you want to move
     * @param replaceSpeed override the speed for next movements until reach the target
     */
    moveTo(x, y, replaceSpeed) {
      this.targetPosition = p5.instance.createVector(x, y);
      this.startMovement(replaceSpeed);
    }

    /**
     *
     * @param replaceSpeed override the speed for next movements until reach the target
     */
    startMovement(replaceSpeed) {
      if (this.hasToMove) this.updateToNextPosition(replaceSpeed);
      this.draw();
      this.playAudio(replaceSpeed);
    }

    draw() {
      p5.instance.push();
      if (this.penTipPosition) p5.instance.translate(this.penTipPosition);

      //draw an image as last element to override everythin an maitain the shadow effect
      if (this.image)
        p5.instance.image(this.image, this.position.x, this.position.y);
      p5.instance.pop();
    }

    /**
     *
     * @param replaceSpeed override the speed for next movements until reach the target
     */
    updateToNextPosition(replaceSpeed) {
      //show image as last element
      let nextY,
        nextX,
        distanceFromX,
        distanceFromY,
        minimalDistanceFromX,
        minimalDistanceFromY;

      //check if user override the main speed
      let definedSpeed = replaceSpeed ? replaceSpeed : this.speed;

      //absolute distance (ignore minus)
      distanceFromX = Math.abs(this.targetPosition.x - this.position.x);
      distanceFromY = Math.abs(this.targetPosition.y - this.position.y);

      //max step available based on distance and speed/pixels
      minimalDistanceFromX = Math.min(definedSpeed, distanceFromX);
      minimalDistanceFromY = Math.min(definedSpeed, distanceFromY);

      //increase or decrease X-axe
      if (this.position.x > this.targetPosition.x)
        //decrease
        nextX = this.position.x - minimalDistanceFromX;
      //increase
      else nextX = this.position.x + minimalDistanceFromX;

      //increase or decrease Y-axe
      if (this.position.y > this.targetPosition.y)
        //decrease
        nextY = this.position.y - minimalDistanceFromY;
      //increase
      else nextY = this.position.y + minimalDistanceFromY;

      //create next position
      let nextPositionVector = p5.instance.createVector(nextX, nextY);

      //save the step
      if (this.saveSteps) this.steps.push(nextPositionVector);

      //update the current position
      this.position = nextPositionVector;
    }
  }

  p5.Drawer = Drawer;
  p5.prototype.createDrawer = function (image, sound, tipPosition) {
    return new p5.Drawer(image, sound, tipPosition);
  };
  // register preload handling of loadSound and images
  p5.prototype.registerPreloadMethod('createDrawer', p5.prototype);
});
