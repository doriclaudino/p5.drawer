'use strict';
const P5 = require('p5');
window.p5 = P5;
require('../../dist/p5.drawer');

describe('p5.Drawer', () => {
  var d;
  const { assert } = chai;
  before((done) => {
    window.p5 = P5;

    // eslint-disable-next-line
    new P5();
    window.setup = function () {};
    window.preload = function () {};
    done();
  });

  beforeEach((done) => {
    d = P5.prototype.createDrawer();
    done();
  });

  describe('smoke test', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  describe('instance exist', () => {
    it('should add createDrawer to prototype', () => {
      assert.exists(P5.prototype.createDrawer);
    });

    it('should add Drawer to p5', () => {
      assert.exists(p5.Drawer);
    });

    it('should add Drawer to p5', () => {
      d = P5.prototype.createDrawer();
      assert.exists(d);
    });

    it('can create instance', function () {
      assert.property(d, 'speed');
      expect(d).to.exist;
    });

    // it('can load Sound from assets', function (done) {
    //   loadSound('/base/test/testAssets/axidrawer.mp3', function () {
    //     done();
    //   });
    // });

    it('can load Image from assets', function (done) {
      loadImage('/base/test/testAssets/axidrawer.png', function () {
        done();
      });
    });

    it('drawer can move', function () {
      d.moveTo(10, 10, 20);
      assert.equal(d.position.x, 10);
      assert.equal(d.position.y, 10);
    });

    // it('can set an sound', function (done) {
    //   loadSound('/base/test/testAssets/axidrawer.mp3', function (sound) {
    //     d.sound = sound;
    //     assert.deepEqual(d.sound, sound);
    //     done();
    //   });
    // });

    it('can set an image', function (done) {
      loadImage('/base/test/testAssets/axidrawer.png', function (img) {
        d.image = img;
        assert.deepEqual(d.image, img);
        done();
      });
    });

    it('should save 10 steps', function () {
      let maxSteps = 10;
      for (let index = 0; index < maxSteps; index++) {
        d.moveTo(100, 0, 1);
      }
      assert.equal(d.steps.length, maxSteps);
    });

    it('should override speed', function () {
      d.speed = 2;
      d.moveTo(100, 0); //walk 2
      d.moveTo(100, 0, 5); //walk 7
      d.speed = 3;
      d.moveTo(100, 0); //walk 10
      d.moveTo(100, 0, 1); //walk 11
      assert.equal(d.targetDistance, 89);
    });

    it('should not save steps', function () {
      d.saveSteps = false;
      this.timeout(3000);
      let maxSteps = 10;
      for (let index = 0; index < maxSteps; index++) {
        d.moveTo(100, 0, 1);
      }
      assert.equal(d.steps.length, 0);
    });
  });
});
