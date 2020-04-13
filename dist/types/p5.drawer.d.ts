import { default as p5, Image, SoundFile, Vector } from 'p5';
import 'p5/global';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
export declare class Drawer {
    _sketch: p5;
    _speed: number;
    _image?: Image;
    _sound?: SoundFile;
    _position: Vector;
    _targetPosition: Vector;
    _saveSteps: boolean;
    _penTipPosition: Vector;
    _steps: Vector[];
    constructor(p?: p5);
    get sketch(): p5;
    set sketch(sketch: p5);
    get speed(): number;
    set speed(speed: number);
    get sound(): p5.SoundFile | undefined;
    set sound(sound: p5.SoundFile | undefined);
    get image(): p5.Image | undefined;
    set image(image: p5.Image | undefined);
    get steps(): p5.Vector[];
    set steps(steps: p5.Vector[]);
    get position(): p5.Vector;
    set position(position: p5.Vector);
    get targetPosition(): p5.Vector;
    set targetPosition(targetPosition: p5.Vector);
    get saveSteps(): boolean;
    set saveSteps(canSaveSteps: boolean);
    get penTipPosition(): p5.Vector;
    set penTipPosition(penTipPosition: p5.Vector);
    stopSound(): void;
    /**
     * check if still need to move
     */
    get hasToMove(): boolean;
    get targetReached(): boolean;
    /**
     * 2d distance
     */
    get targetDistance(): number;
    /**
     * create a loop
     * to-do: play with loop speed, based on speed or penstyle
     */
    playAudio(replaceSpeed: number): void;
    applySoundSpeed(replaceSpeed: number): void;
    /**
     * @param coordinate vector where you want to move
     * @param replaceSpeed override the speed for next movements until reach the target
     */
    moveTo(coordinate: Vector, replaceSpeed: number): void;
    /**
     *
     * @param replaceSpeed override the speed for next movements until reach the target
     */
    startMovement(replaceSpeed: number): void;
    draw(): void;
    /**
     *
     * @param replaceSpeed override the speed for next movements until reach the target
     */
    updateToNextPosition(replaceSpeed: number): void;
}
export declare class AxiDrawer extends Drawer {
    constructor(p?: p5);
}
export declare class ScribitDrawer extends Drawer {
    constructor(p?: p5);
}
