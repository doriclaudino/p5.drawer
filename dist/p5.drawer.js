/** [p5.drawer]  Version: 1.1.0 - 2020-04-16 */ 
 /**
 *  <p>p5.drawer extends p5 with custom drawers on top of your canvas
 *  </p>
 *  <p>p5.drawer is on <a href="https://github.com/doriclaudino/p5.drawer/">GitHub</a>.
 *  Download the latest version
 *  <a href="https://github.com/doriclaudino/p5.drawer/blob/master/lib/p5.drawer.js">here</a>.</p>
 *
 *  @module p5.drawer
 *  @submodule p5.drawer
 *  @for p5.drawer
 *  @main
 */

/**
 *  p5.drawer 
 *  https://p5js.org/reference/#/libraries/p5.drawer 
 *
 *  From the Processing Foundation and contributors
 *  https://github.com/doriclaudino/p5.drawer/graphs/contributors
 *
 *  MIT License (MIT)
 *  https://github.com/doriclaudino/p5.drawer/blob/master/LICENSE
 *
 *  Some of the many resources that inspire p5.drawer:
 *   - p5.js-sound. Licensed under The MIT License (MIT). https://github.com/processing/p5.js-sound
 *   - Daniel Shiffmmann @shiffmann https://github.com/shiffman
 *   - Stefano Padoan @stefanopadoan.art
 *   - Samer Dabra @spongenuity
 */

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
  var pkg = __webpack_require__(1);

  return pkg;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  var Drawer = /*#__PURE__*/function () {
    function Drawer(image, sound, tipPosition) {
      _classCallCheck(this, Drawer);

      this._speed = 2;
      this._image = image;
      this._sound = sound;
      this._position = p5.instance.createVector(0, 0);
      this._targetPosition = p5.instance.createVector(0, 0);
      this._saveSteps = true;
      this._penTipPosition = tipPosition || p5.instance.createVector(0, 0);
      this._steps = [];
      if (!this._image || !this._sound) console.warn('Make sure to load the image and sound on preload(), we remove the boths from build. See the example folder.');
    }

    _createClass(Drawer, [{
      key: "stopSound",
      value: function stopSound() {
        this.sound && this.sound.stop();
      }
      /**
       * check if still need to move
       */

    }, {
      key: "playAudio",

      /**
       * create a loop
       * to-do: play with loop speed, based on speed or penstyle
       */
      value: function playAudio(replaceSpeed) {
        if (this.hasToMove) {
          if (this.sound && !this.sound.isPlaying()) {
            this.applySoundSpeed(replaceSpeed);
            this.sound.play();
          }
        } else this.sound && this.sound.stop();
      }
    }, {
      key: "applySoundSpeed",
      value: function applySoundSpeed(replaceSpeed) {
        var currentSpeed = replaceSpeed ? replaceSpeed : this.speed; //todo create a map for control the soundspeed, ex: from 1 to 100  map to 0.5 to 4

        var soundSpeed = p5.instance.map(currentSpeed, 1, 100, 0.5, 4);
        soundSpeed = p5.instance.constrain(soundSpeed, 0.01, 4);
        this.sound && this.sound.rate(soundSpeed);
      }
      /**
       * @param coordinate vector where you want to move
       * @param replaceSpeed override the speed for next movements until reach the target
       */

    }, {
      key: "moveTo",
      value: function moveTo(coordinate, replaceSpeed) {
        this.targetPosition = coordinate;
        this.startMovement(replaceSpeed);
      }
      /**
       *
       * @param replaceSpeed override the speed for next movements until reach the target
       */

    }, {
      key: "startMovement",
      value: function startMovement(replaceSpeed) {
        if (this.hasToMove) this.updateToNextPosition(replaceSpeed);
        this.draw();
        this.playAudio(replaceSpeed);
      }
    }, {
      key: "draw",
      value: function draw() {
        p5.instance.push();
        if (this.penTipPosition) p5.instance.translate(this.penTipPosition); //draw an image as last element to override everythin an maitain the shadow effect

        if (this.image) p5.instance.image(this.image, this.position.x, this.position.y);
        p5.instance.pop();
      }
      /**
       *
       * @param replaceSpeed override the speed for next movements until reach the target
       */

    }, {
      key: "updateToNextPosition",
      value: function updateToNextPosition(replaceSpeed) {
        //show image as last element
        var nextY, nextX, distanceFromX, distanceFromY, minimalDistanceFromX, minimalDistanceFromY; //check if user override the main speed

        var definedSpeed = replaceSpeed ? replaceSpeed : this.speed; //absolute distance (ignore minus)

        distanceFromX = Math.abs(this.targetPosition.x - this.position.x);
        distanceFromY = Math.abs(this.targetPosition.y - this.position.y); //max step available based on distance and speed/pixels

        minimalDistanceFromX = Math.min(definedSpeed, distanceFromX);
        minimalDistanceFromY = Math.min(definedSpeed, distanceFromY); //increase or decrease X-axe

        if (this.position.x > this.targetPosition.x) //decrease
          nextX = this.position.x - minimalDistanceFromX; //increase
        else nextX = this.position.x + minimalDistanceFromX; //increase or decrease Y-axe

        if (this.position.y > this.targetPosition.y) //decrease
          nextY = this.position.y - minimalDistanceFromY; //increase
        else nextY = this.position.y + minimalDistanceFromY; //create next position

        var nextPositionVector = p5.instance.createVector(nextX, nextY); //save the step

        if (this.saveSteps) this.steps.push(nextPositionVector); //update the current position

        this.position = nextPositionVector;
      }
    }, {
      key: "speed",
      get: function get() {
        return this._speed;
      },
      set: function set(speed) {
        this._speed = speed;
      }
    }, {
      key: "sound",
      get: function get() {
        return this._sound;
      },
      set: function set(sound) {
        this._sound = sound;
      }
    }, {
      key: "image",
      get: function get() {
        return this._image;
      },
      set: function set(image) {
        this._image = image;
      }
    }, {
      key: "steps",
      get: function get() {
        return this._steps;
      },
      set: function set(steps) {
        this._steps = steps;
      }
    }, {
      key: "position",
      get: function get() {
        return this._position;
      },
      set: function set(position) {
        this._position = position;
      }
    }, {
      key: "targetPosition",
      get: function get() {
        return this._targetPosition;
      },
      set: function set(targetPosition) {
        this._targetPosition = targetPosition;
      }
    }, {
      key: "saveSteps",
      get: function get() {
        return this._saveSteps;
      },
      set: function set(canSaveSteps) {
        this._saveSteps = canSaveSteps;
      }
    }, {
      key: "penTipPosition",
      get: function get() {
        return this._penTipPosition;
      },
      set: function set(penTipPosition) {
        this._penTipPosition = penTipPosition;
      }
    }, {
      key: "hasToMove",
      get: function get() {
        return this.targetPosition && this.position && this.targetDistance > 0;
      }
    }, {
      key: "targetReached",
      get: function get() {
        return !this.hasToMove;
      }
      /**
       * 2d distance
       */

    }, {
      key: "targetDistance",
      get: function get() {
        return p5.instance.dist(this.targetPosition.x, this.targetPosition.y, this.position.x, this.position.y);
      }
    }]);

    return Drawer;
  }(); // p5.Drawer = function (image, sound, tipPosition) {
  //   this.speed = 2;
  //   this.image = image;
  //   this.sound = sound;
  //   this.position = p5.prototype.createVector(0, 0);
  //   this.targetPosition = p5.prototype.createVector(0, 0);
  //   this.saveSteps = true;
  //   this.penTipPosition = tipPosition || p5.prototype.createVector(-52, -128);
  //   this.steps = [];
  // };


  p5.Drawer = Drawer;

  p5.prototype.createDrawer = function (image, sound, tipPosition) {
    return new p5.Drawer(image, sound, tipPosition);
  }; // register preload handling of loadSound and images


  p5.prototype.registerPreloadMethod('createDrawer', p5.prototype);
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ]);
//# sourceMappingURL=p5.drawer.js.map 