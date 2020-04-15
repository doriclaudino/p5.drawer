require.config({
  baseUrl: './',
  paths: {
    lib: './testDeps',
    chai: './testDeps/chai',
    sinon: './testDeps/sinon',
  },
});

var allTests = [ 'tests/p5.Drawer'];

require(allTests, function () {
  mocha.run();
});
