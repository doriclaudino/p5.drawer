'use strict';
const P5 = require('p5');
window.p5 = P5;
require('../../dist/p5.drawer');

describe('Array', () => {
  before((done) => {
    window.p5 = P5;

    // eslint-disable-next-line
    new P5();
    window.setup = function () {};
    window.preload = function () {};
    done();
  });

  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      chai.assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });

  describe('instance exist', () => {
    it('should add createDrawer to prototype', () => {
      chai.assert.exists(P5.prototype.createDrawer);
    });

    it('should add Drawer to p5', () => {
      chai.assert.exists(p5.Drawer);
    });

    it('should add Drawer to p5', () => {
      let d = P5.prototype.createDrawer();
      chai.assert.exists(d);
    });

    it('should exist an instance', () => {
      chai.assert.exists(window.p5.instance);
    });

    it('should move to another position', () => {
      let d = P5.prototype.createDrawer();
      d.moveTo(10, 10, 20);
      chai.assert.equal(d.position.x, 10);
    });

    it('can load Image from assets', function (done) {
      loadImage('/base/test/testAssets/pencildrawer.png', function () {
        done();
      });
    });
  });
});
