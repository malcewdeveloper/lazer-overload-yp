import Entity from "./Entity";
import Lazer from "./Lazer";
import Sprite from "./Sprite";
import { TFrame } from "./types";

export default class Emitter extends Entity {
    private _lazer: Lazer;
    private _direction: { dx: number; dy: number };
    private _sprite: Sprite;
    public frames: TFrame[];

    constructor(
        x: number,
        y: number,
        direction: { dx: number; dy: number },
        spritePath: string,
        frames: TFrame[],
    ) {
        super(x, y, 25, 25);

        this._direction = direction;
        this.frames = frames;
        this._sprite = new Sprite(
            x,
            y,
            spritePath,
            this.frames,
            this.width,
            this.height,
        );
        this._lazer = new Lazer(x, y, 100, this._direction);
    }

    public update(deltaTime: number): void {
        this._lazer.update(deltaTime);
        this._sprite.update(deltaTime);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.translate(this.x, this.y);

        this._lazer.render(ctx);
        this._sprite.render(ctx);

        ctx.restore();
    }
}
