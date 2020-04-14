var p5Drawer = (function (exports,p5) {
    'use strict';

    p5 = p5 && p5.hasOwnProperty('default') ? p5['default'] : p5;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var _loadedAssets = {
        drawer: {
            image: new p5.Image(),
            imageFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/images/pencildrawer.png',
            soundFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/pencildrawer.mp3'
        },
        axidrawer: {
            image: new p5.Image(),
            imageFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/images/axidrawer.png',
            soundFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/axidrawer.mp3'
        },
        scribitdrawer: {
            image: new p5.Image(),
            imageFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/images/scribitdrawer.png',
            soundFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/axidrawer.mp3'
        }
    };
    /**
     * load drawers assets
     * user can override it calling this method on preload()
     */
    //@ts-ignore
    p5.prototype.initDrawer = function () {
        var _this = this;
        var drawerNames = Object.keys(_loadedAssets);
        drawerNames.forEach(function (drawerName) {
            var asset = _loadedAssets[drawerName];
            _loadedAssets[drawerName].image = _this.loadImage(asset.imageFile);
            //@ts-ignore
            _loadedAssets[drawerName].sound = _this.loadSound(asset.soundFile);
        });
    };
    //@ts-ignore
    p5.prototype.registerMethod('init', p5.prototype.initDrawer);
    //@ts-ignore
    p5.prototype.registerPreloadMethod('initDrawer', p5.prototype);
    var Drawer = /** @class */ (function () {
        function Drawer(p) {
            this._sketch = p ? p : window;
            if (!this._sketch)
                throw 'p5 not defined';
            this._speed = 2;
            this._image = _loadedAssets['drawer'].image;
            this._sound = _loadedAssets['drawer'].sound;
            this._position = this._sketch.createVector(0, 0);
            this._targetPosition = this._sketch.createVector(0, 0);
            this._saveSteps = true;
            this._penTipPosition = this._sketch.createVector(-52, -128);
            this._steps = [];
            if (!this._image || !this._sound)
                console.warn("Make sure to load the image and sound on preload(), we remove the boths from build. See the example folder.");
        }
        Object.defineProperty(Drawer.prototype, "sketch", {
            get: function () {
                return this._sketch;
            },
            set: function (sketch) {
                this._sketch = sketch;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (speed) {
                this._speed = speed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "sound", {
            get: function () {
                return this._sound;
            },
            set: function (sound) {
                this._sound = sound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "image", {
            get: function () {
                return this._image;
            },
            set: function (image) {
                this._image = image;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "steps", {
            get: function () {
                return this._steps;
            },
            set: function (steps) {
                this._steps = steps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (position) {
                this._position = position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "targetPosition", {
            get: function () {
                return this._targetPosition;
            },
            set: function (targetPosition) {
                this._targetPosition = targetPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "saveSteps", {
            get: function () {
                return this._saveSteps;
            },
            set: function (canSaveSteps) {
                this._saveSteps = canSaveSteps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "penTipPosition", {
            get: function () {
                return this._penTipPosition;
            },
            set: function (penTipPosition) {
                this._penTipPosition = penTipPosition;
            },
            enumerable: true,
            configurable: true
        });
        Drawer.prototype.stopSound = function () {
            this.sound && this.sound.stop();
        };
        Object.defineProperty(Drawer.prototype, "hasToMove", {
            /**
             * check if still need to move
             */
            get: function () {
                return this.targetPosition && this.position && this.targetDistance > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "targetReached", {
            get: function () {
                return !this.hasToMove;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Drawer.prototype, "targetDistance", {
            /**
             * 2d distance
             */
            get: function () {
                return this.sketch.dist(this.targetPosition.x, this.targetPosition.y, this.position.x, this.position.y);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * create a loop
         * to-do: play with loop speed, based on speed or penstyle
         */
        Drawer.prototype.playAudio = function (replaceSpeed) {
            if (this.hasToMove) {
                if (this.sound && !this.sound.isPlaying()) {
                    this.sound.play();
                }
            }
            else
                this.sound && this.sound.stop();
            this.applySoundSpeed(replaceSpeed);
        };
        Drawer.prototype.applySoundSpeed = function (replaceSpeed) {
            var currentSpeed = replaceSpeed ? replaceSpeed : this.speed;
            //todo create a map for control the soundspeed, ex: from 1 to 100  map to 0.5 to 4
            var soundSpeed = this.sketch.map(currentSpeed, 1, 100, 0.5, 4);
            soundSpeed = this.sketch.constrain(soundSpeed, 0.01, 4);
            this.sound && this.sound.rate(soundSpeed);
        };
        /**
         * @param coordinate vector where you want to move
         * @param replaceSpeed override the speed for next movements until reach the target
         */
        Drawer.prototype.moveTo = function (coordinate, replaceSpeed) {
            this.targetPosition = coordinate;
            this.startMovement(replaceSpeed);
        };
        /**
         *
         * @param replaceSpeed override the speed for next movements until reach the target
         */
        Drawer.prototype.startMovement = function (replaceSpeed) {
            if (this.hasToMove)
                this.updateToNextPosition(replaceSpeed);
            this.draw();
            this.playAudio(replaceSpeed);
        };
        Drawer.prototype.draw = function () {
            this.sketch.push();
            this.sketch.translate(this.penTipPosition);
            //draw an image as last element to override everythin an maitain the shadow effect
            if (this.image)
                this.sketch.image(this.image, this.position.x, this.position.y);
            this.sketch.pop();
        };
        /**
         *
         * @param replaceSpeed override the speed for next movements until reach the target
         */
        Drawer.prototype.updateToNextPosition = function (replaceSpeed) {
            //show image as last element
            var nextY, nextX, distanceFromX, distanceFromY, minimalDistanceFromX, minimalDistanceFromY;
            //check if user override the main speed
            var definedSpeed = replaceSpeed ? replaceSpeed : this.speed;
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
            else
                nextX = this.position.x + minimalDistanceFromX;
            //increase or decrease Y-axe
            if (this.position.y > this.targetPosition.y)
                //decrease
                nextY = this.position.y - minimalDistanceFromY;
            //increase
            else
                nextY = this.position.y + minimalDistanceFromY;
            //create next position
            var nextPositionVector = this.sketch.createVector(nextX, nextY);
            //save the step
            if (this.saveSteps)
                this.steps.push(nextPositionVector);
            //update the current position
            this.position = nextPositionVector;
        };
        return Drawer;
    }());
    var AxiDrawer = /** @class */ (function (_super) {
        __extends(AxiDrawer, _super);
        function AxiDrawer(p) {
            var _this = _super.call(this, p) || this;
            _this.image = _loadedAssets['axidrawer'].image;
            _this.sound = _loadedAssets['axidrawer'].sound;
            _this.speed = _this.speed * 2;
            _this.penTipPosition = _this.sketch.createVector(-100, -52);
            return _this;
        }
        return AxiDrawer;
    }(Drawer));
    var ScribitDrawer = /** @class */ (function (_super) {
        __extends(ScribitDrawer, _super);
        function ScribitDrawer(p) {
            var _this = _super.call(this, p) || this;
            _this.image = _loadedAssets['scribitdrawer'].image;
            _this.sound = _loadedAssets['scribitdrawer'].sound;
            _this.speed = _this.speed * 2;
            _this.penTipPosition = _this.sketch.createVector(-140, -108);
            return _this;
        }
        return ScribitDrawer;
    }(Drawer));

    exports.Drawer = Drawer;
    exports.AxiDrawer = AxiDrawer;
    exports.ScribitDrawer = ScribitDrawer;

    return exports;

}({},p5));
//# sourceMappingURL=p5.drawer.es5.js.map
