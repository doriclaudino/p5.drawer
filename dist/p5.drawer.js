/** [p5.drawer]  Version: 2.0.0 - 2020-04-19 */ 
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

 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 0);
 })
 ([
 (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {
  var pkg = __webpack_require__(1);

  return pkg;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

 }),
 (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  var Drawer = function () {
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
        var currentSpeed = replaceSpeed ? replaceSpeed : this.speed; 

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
      value: function moveTo(x, y, replaceSpeed) {
        this.targetPosition = p5.instance.createVector(x, y);
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
        if (this.penTipPosition) p5.instance.translate(this.penTipPosition); 

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
        var nextY, nextX, distanceFromX, distanceFromY, minimalDistanceFromX, minimalDistanceFromY; 

        var definedSpeed = replaceSpeed ? replaceSpeed : this.speed; 

        distanceFromX = Math.abs(this.targetPosition.x - this.position.x);
        distanceFromY = Math.abs(this.targetPosition.y - this.position.y); 

        minimalDistanceFromX = Math.min(definedSpeed, distanceFromX);
        minimalDistanceFromY = Math.min(definedSpeed, distanceFromY); 

        if (this.position.x > this.targetPosition.x) 
          nextX = this.position.x - minimalDistanceFromX; 
        else nextX = this.position.x + minimalDistanceFromX; 

        if (this.position.y > this.targetPosition.y) 
          nextY = this.position.y - minimalDistanceFromY; 
        else nextY = this.position.y + minimalDistanceFromY; 

        var nextPositionVector = p5.instance.createVector(nextX, nextY); 

        if (this.saveSteps) this.steps.push(nextPositionVector); 

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
  }();

  p5.Drawer = Drawer;

  p5.prototype.createDrawer = function (image, sound, tipPosition) {
    return new p5.Drawer(image, sound, tipPosition);
  }; 


  p5.prototype.registerPreloadMethod('createDrawer', p5.prototype);
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

 })
 ]);
