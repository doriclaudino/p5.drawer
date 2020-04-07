"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//how detect loadSound on prototype or @types
var p5_1 = require("p5");
require("p5/global");
require("p5/lib/addons/p5.sound");
require("p5/lib/addons/p5.dom");
var _loadedAssets = {
    drawer: {
        image: new p5_1.default.Image(),
        sound: new p5_1.default.SoundFile(''),
        imageFile: 'https://raw.githack.com/doriclaudino/p5.drawer/master/assets/images/pencildrawer.png',
        soundFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/pencildrawer.mp3'
    },
    axidrawer: {
        image: new p5_1.default.Image(),
        sound: new p5_1.default.SoundFile(''),
        imageFile: 'https://raw.githack.com/doriclaudino/p5.drawer/master/assets/images/axidrawer.png',
        soundFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/axidrawer.mp3'
    },
    scribitdrawer: {
        image: new p5_1.default.Image(),
        sound: new p5_1.default.SoundFile(''),
        imageFile: 'https://raw.githack.com/doriclaudino/p5.drawer/master/assets/images/scribitdrawer.png',
        soundFile: 'https://raw.githubusercontent.com/doriclaudino/p5.drawer/master/assets/sounds/axidrawer.mp3'
    }
};
//@ts-ignore
p5_1.default.prototype.initDrawer = function () {
    var _this = this;
    Object.keys(_loadedAssets).forEach(function (drawerName) {
        var drawerData = _loadedAssets[drawerName];
        //@ts-ignore
        drawerData.sound = _this.loadSound(drawerData.soundFile);
        drawerData.image = _this.loadImage(drawerData.imageFile);
        _loadedAssets[drawerName] = drawerData;
    });
};
//@ts-ignore
p5_1.default.prototype.registerMethod('init', p5_1.default.prototype.initDrawer);
var Drawer = /** @class */ (function () {
    function Drawer(p) {
        //@ts-ignore
        this._sketch = p || window;
        var indexName = this.constructor.name.toLowerCase();
        if (!this.sketch)
            throw 'p5 not defined';
        this._speed = 2;
        this._image = _loadedAssets[indexName].image;
        this._sound = _loadedAssets[indexName].sound;
        this._position = this._sketch.createVector(0, 0);
        this._targetPosition = this._sketch.createVector(0, 0);
        this._saveSteps = true;
        this._penTipPosition = this._sketch.createVector(-52, -128);
        this._steps = [];
        console.log(this);
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
        this.sound.stop();
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
            if (!this.sound.isPlaying()) {
                this.sound.play();
            }
        }
        else
            this.sound.stop();
        this.applySoundSpeed(replaceSpeed);
    };
    Drawer.prototype.applySoundSpeed = function (replaceSpeed) {
        var currentSpeed = replaceSpeed ? replaceSpeed : this.speed;
        //todo create a map for control the soundspeed, ex: from 1 to 100  map to 0.5 to 4
        var soundSpeed = this.sketch.map(currentSpeed, 1, 100, 0.5, 4);
        soundSpeed = this.sketch.constrain(soundSpeed, 0.01, 4);
        this.sound.rate(soundSpeed);
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
exports.Drawer = Drawer;
var AxiDrawer = /** @class */ (function (_super) {
    __extends(AxiDrawer, _super);
    function AxiDrawer(p) {
        var _this = _super.call(this, p) || this;
        _this.speed = _this.speed * 2;
        _this.penTipPosition = _this.sketch.createVector(-100, -52);
        return _this;
    }
    return AxiDrawer;
}(Drawer));
exports.AxiDrawer = AxiDrawer;
var ScribitDrawer = /** @class */ (function (_super) {
    __extends(ScribitDrawer, _super);
    function ScribitDrawer(p) {
        var _this = _super.call(this, p) || this;
        _this.speed = _this.speed * 2;
        _this.penTipPosition = _this.sketch.createVector(-140, -108);
        return _this;
    }
    return ScribitDrawer;
}(Drawer));
exports.ScribitDrawer = ScribitDrawer;
//# sourceMappingURL=p5.drawer.js.map