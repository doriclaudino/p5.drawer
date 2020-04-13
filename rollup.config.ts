import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import copy from 'rollup-plugin-copy'
import image from '@rollup/plugin-image'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const libraryName = 'p5.drawer'

export default {
  input: `src/${libraryName}.ts`,
  output: [{ file: pkg.module, format: 'iife', name: camelCase(libraryName), sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['p5', 'p5/global', 'p5/lib/addons/p5.dom', 'p5/lib/addons/p5.sound'],
  watch: {
    include: 'src/**'
  },
  plugins: [
    image(),

    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, objectHashIgnoreUnknownHack: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    uglify.uglify(),

    // Resolve source maps to the original source
    sourceMaps(),

    copy({
      targets: [{ src: 'dist/*.*', dest: 'examples/' }, { src: 'assets/**/*.*', dest: 'examples/' }],
      verbose: true,
      copyOnce: true,
      hook: 'onwrite',
      overwrite: true
    })
  ]
}
