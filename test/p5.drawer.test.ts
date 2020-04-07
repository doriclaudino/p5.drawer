import { AxiDrawer, Drawer, ScribitDrawer } from '../src/p5.drawer'
import * as p5 from 'p5'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Drawer is instantiable', () => {
    expect(new Drawer(myp5)).toBeInstanceOf(Drawer)
  })

  it('AxiDrawer is instantiable', () => {
    expect(new AxiDrawer(myp5)).toBeInstanceOf(AxiDrawer)
  })

  it('ScribitDrawer is instantiable', () => {
    expect(new ScribitDrawer(myp5)).toBeInstanceOf(ScribitDrawer)
  })
})

let sketch = function(p: p5) {
  let x = 100
  let y = 100

  p.setup = function() {
    p.createCanvas(700, 410)
  }

  p.draw = function() {
    p.background(0)
    p.fill(255)
    p.rect(x, y, 50, 50)
  }
}

let myp5 = new p5(sketch)
