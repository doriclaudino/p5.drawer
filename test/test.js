require.config({
  baseUrl: './',
  paths: {
    lib: './testDeps',
    chai: './testDeps/chai',
    sinon: './testDeps/sinon',
  },
});

var allTests = ['bdd/p5.drawer.test.js'];

require(allTests, function () {
  mocha.run();
});
