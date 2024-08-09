import Entity from "./Entity";
import Sprite from "./Sprite";
import { TFrame } from "./types";

export default class Battery extends Entity {
    private _sprite: Sprite;
    public frames: TFrame[];

    constructor(x: number, y: number, spritePath: string, frames: TFrame[]) {
        super(x, y, 15, 25);

        this.frames = frames;
        this._sprite = new Sprite(
            x,
            y,
            spritePath,
            this.frames,
            this.width,
            this.height,
        );
    }

    public update(deltaTime: number): void {
        this._sprite.update(deltaTime);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.translate(this.x, this.y);

        this._sprite.render(ctx);

        ctx.restore();
    }
}
