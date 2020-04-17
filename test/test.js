require.config({
  baseUrl: './',
  paths: {
    lib: './testDeps',
    chai: './testDeps/chai',
    sinon: './testDeps/sinon',
  },
});

var allTests = ['tests/p5.Drawer'];

after(function (done) {
  var total = 0;
  var passed = 0;
  var failed = 0;
  console.log(mocha)
  mocha.suite.suites
  .forEach((suite) => {
    passed += suite.tests.filter((test) => test.state === 'passed').length;
    total += suite.tests.length;
    failed += total - passed;
  });
  console.log({ total, passed, failed });
  done();
});
require(allTests, function () {
  mocha.run();
});
