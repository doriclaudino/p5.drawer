# p5Drawer

[![NPM](https://nodei.co/npm/p5.drawer.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/p5.drawer/)

[![](https://data.jsdelivr.com/v1/package/npm/p5.drawer/badge?style=rounded)](https://www.jsdelivr.com/package/npm/p5.drawer)
[![npm version](https://badge.fury.io/js/p5.drawer.svg)](https://badge.fury.io/js/p5.drawer)

[![CircleCI](https://circleci.com/gh/doriclaudino/p5.drawer/tree/master.svg?style=svg)](https://circleci.com/gh/doriclaudino/p5.drawer/tree/master)
[![codecov](https://codecov.io/gh/doriclaudino/p5.drawer/branch/master/graph/badge.svg)](https://codecov.io/gh/doriclaudino/p5.drawer)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/doriclaudino/p5.drawer/issues)


<br>
<br>
Create a drawer animation emulating Scribit, AxiDraw extremely easy.
<br>
<div>
<img src="https://i.imgur.com/emokMlD.png" width="200">
<img src="https://imgur.com/AevdDH0.png" width="200">
<img src="https://imgur.com/nbt0qGb.png" width="200">
</div>

### Requirements

```bash
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/addons/p5.sound.js"></script>
```

### Install

```bash
<script src="https://cdn.jsdelivr.net/npm/p5.drawer@1.0.0/dist/p5.drawer.min.js"></script>
or 
<script src="https://raw.githack.com/doriclaudino/p5.drawer/master/dist/p5.drawer.min.js"></script>;
or
import 'p5.drawer' 
```

**Start coding!**

[p5.drawer sketch](https://editor.p5js.org/doriclaudino/sketches/5UUjoEKRx)

```bash
createDrawer(image,audio,position);


//on Preload
let myDrawer;
function preload() {
  let img = loadImage('image_path')
  let sound = loadSound('sound_path')
  let pos = createVector(20,20)
  
  myDrawer = createDrawer(img,sound,pos);
}
```
![](https://media.giphy.com/media/U3hHR6jI6XbOfdH9Ka/giphy.gif)

### Features

- Control speed
- Control soundSpeed based on speed
- Change sounds
- Change Images
- Center images
- Save internal steps

### Importing library

You can import our library for testing purpose or to use on web:
```javascript
import 'p5' //make sure you expose p5 or import somewhere
import 'p5.drawer' //extend p5 prototype and expose our methods everywhere
```

Additionally, you can use the cdn compile version [(ready-to-copy example)](https://editor.p5js.org/doriclaudino/sketches/5UUjoEKRx):
```javascript
<script src="https://cdn.jsdelivr.net/npm/p5.drawer@1.0.0/dist/p5.drawer.min.js"></script>

or using githack

<script src="https://raw.githack.com/doriclaudino/p5.drawer/master/dist/p5.drawer.min.js"></script>;
```

## Resources

## Credits

Projects started using typescript-library-starter
