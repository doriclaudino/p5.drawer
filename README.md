# p5Drawer

[![NPM](https://nodei.co/npm/p5.drawer.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/p5.drawer/)

[![](https://data.jsdelivr.com/v1/package/npm/p5.drawer/badge?style=rounded)](https://www.jsdelivr.com/package/npm/p5.drawer)
[![npm version](https://badge.fury.io/js/p5.drawer.svg)](https://badge.fury.io/js/p5.drawer)

[![CircleCI](https://circleci.com/gh/doriclaudino/p5.drawer/tree/master.svg?style=svg)](https://circleci.com/gh/doriclaudino/p5.drawer/tree/master)
[![codecov](https://codecov.io/gh/doriclaudino/p5.drawer/branch/master/graph/badge.svg)](https://codecov.io/gh/doriclaudino/p5.drawer)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/doriclaudino/p5.drawer/issues)
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/p5.drawer">

### Install (CDN)

```html
<!-- option one jsdelivr-->
<script src="https://cdn.jsdelivr.net/npm/p5.drawer@1.0.0/dist/p5.drawer.min.js"></script>

<!-- option two githack-->
<script src="https://raw.githack.com/doriclaudino/p5.drawer/master/dist/p5.drawer.min.js"></script>

<!-- 
  option three local source
  downloading from: https://github.com/doriclaudino/p5.drawer/blob/master/dist/p5.drawer.min.js -->
<script src="../p5.drawer.min.js"></script>
```

### Install (NPM)

```bash
npm install p5.drawer
or
yarn install p5.drawer
```

### Requirements (CDN)

```bash
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/addons/p5.sound.js"></script>
```

### Requirements (NPM)

```bash
npm install p5
or
yarn install p5
```

<br>
<br>

**Checkout our example on [editor.p5js.org](https://editor.p5js.org/doriclaudino/sketches/5UUjoEKRx)**

```javascript
//main function to create a drawer
createDrawer([image], [audio], [position]);
//main function to move your drawer around
myDrawer.moveTo(mouseX, mouseY, [speed]);

//load images on preload
let myDrawer;
function preload() {
  let img = loadImage('image_path');
  let sound = loadSound('sound_path');
  let pos = createVector(20, 20);

  //create the drawer
  myDrawer = createDrawer(img, sound, pos);
}

function draw() {
  myDrawer.moveTo(mouseX, mouseY);
}
```

### Images from our sketch

Create a drawer animation emulating Scribit, AxiDraw extremely easy.

<div>
<img src="https://i.imgur.com/emokMlD.png" width="200">
<img src="https://imgur.com/AevdDH0.png" width="200">
<img src="https://imgur.com/nbt0qGb.png" width="200">
</div>

### Gifs from our sketch

![](https://media.giphy.com/media/U3hHR6jI6XbOfdH9Ka/giphy.gif)

### Features

- Control speed
- Control soundSpeed based on speed
- Change sounds
- Change Images
- Center images
- Save internal steps

##Development
[Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) this project

```bash
#use yarn or npm
#install all deps
yarn

#auto-reload watch files src files, tests files
#serve example at http://localhost:8000/
#serve test at http://localhost:8000/test/
yarn dev

#clean and run new tests with coverage artifacts
yarn test

#final build version with optimizations
yarn build


### continuos integrations

#validate our ci configs
yarn ci:validate

#execute local ci using our config, it will fail on coverage
yarn ci:executeLocal
```

## Resources

- [Grunt](https://github.com/gruntjs/grunt-cli)
- [Webpack](https://github.com/webpack/webpack)
- [p5.js](https://github.com/processing/p5.js)
- [p5.js-sound](https://github.com/processing/p5.js-sound)

## References and Inspiration

- p5.js-sound. Licensed under The MIT License (MIT). [github](https://github.com/processing/p5.js-sound)
- Daniel Shiffmmann @shiffmann [github](https://github.com/shiffman)
- Stefano Padoan @stefanopadoan.art [instagram](https://www.instagram.com/stefanopadoan.art/)
- Samer Dabra @spongenuity [instagram](https://www.instagram.com/spongenuity/)
