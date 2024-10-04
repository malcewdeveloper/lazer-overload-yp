import { loadImage } from "../utils";
import Entity from "./Entity";
import { TFrame } from "./types";

export default class Sprite extends Entity {
    private _currentFrameIndex = 0;
    private _elapsedTime = 0;
    private _spriteSheet?: HTMLImageElement;
    public frames: TFrame[];
    private _spriteSheetLoaded = false;

    constructor(
        x: number,
        y: number,
        spritePath: string,
        frames: TFrame[],
        width?: number,
        height?: number,
    ) {
        super(x, y, width, height);
        this.frames = frames;
        this._initSprite(spritePath);
    }

    private async _initSprite(path: string): Promise<void> {
        try {
            this._spriteSheet = await loadImage(path);
        } catch (error) {
            throw Error(`Initialization sprite sheet error: ${error}`);
        } finally {
            this._spriteSheetLoaded = true;
        }
    }

    public update(deltaTime: number): void {
        if (this.frames.length === 0) return;

        this._elapsedTime += deltaTime;

        if (
            this._elapsedTime >= this.frames[this._currentFrameIndex].duration
        ) {
            this._elapsedTime = 0;
            this._currentFrameIndex =
                (this._currentFrameIndex + 1) % this.frames.length;
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        if (this.frames.length === 0) return;

        if (!this._spriteSheetLoaded) return;

        if (!this._spriteSheet) {
            throw Error("Does not initialization Sprite Sheet");
        }

        const currentFrame = this.frames[this._currentFrameIndex];

        ctx.drawImage(
            this._spriteSheet,
            currentFrame.x,
            currentFrame.y,
            currentFrame.width,
            currentFrame.height,
            -this.width! / 2,
            -this.height! / 2,
            this.width ?? currentFrame.width,
            this.height ?? currentFrame.height,
        );
    }
}
