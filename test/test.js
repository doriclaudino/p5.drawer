require.config({
  baseUrl:'./',
  paths : {
    'lib' : '../lib',
    'chai' : './testDeps/chai',
    'sinon': './testDeps/sinon'
  }
});

//copy from p5sound
var allTests = [
  'tests/p5.Effect' 
];

p5.prototype.masterVolume(0);

require(allTests, function(){
  mocha.run();
});
