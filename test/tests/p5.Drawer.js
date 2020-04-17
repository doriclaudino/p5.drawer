'use strict';

define(['chai'], function (chai) {
  var expect = chai.expect;
  var assert = chai.assert;

  describe('p5.Drawer', function () {
    this.timeout(1000);
    var d = createDrawer();

    beforeEach(function () {
      // runs before each test in this block
      d = createDrawer();
    });

    after(function (done) {
      p5 && p5.instance.remove();
      done();
    });

    it('can create instance', function () {
      assert.property(d, 'speed');
      expect(d).to.exist;
    });

    it('can load Sound from assets', function (done) {
      loadSound('./testAssets/axidrawer.mp3', function () {
        done();
      });
    });

    it('can load Image from assets', function (done) {
      loadImage('./testAssets/axidrawer.png', function () {
        done();
      });
    });

    it('drawer can move', function () {
      d.moveTo(10, 10, 20);
      assert.equal(d.position.x, 10);
      assert.equal(d.position.y, 10);
    });

    it('can set an sound', function (done) {
      loadSound('./testAssets/axidrawer.mp3', function (sound) {
        d.sound = sound;
        assert.deepEqual(d.sound, sound);
        done();
      });
    });

    it('can set an image', function (done) {
      loadImage('./testAssets/axidrawer.png', function (img) {
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
