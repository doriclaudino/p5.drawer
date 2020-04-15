'use strict';

define(['chai'], function (chai) {
  var expect = chai.expect;
  var assert = chai.assert;

  describe('p5.Drawer', function () {
    this.timeout(1000);
    var drawer = createDrawer();

    it('can create instance', function () {
      assert.property(drawer, 'speed');
      expect(drawer).to.exist;
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
  });
});
