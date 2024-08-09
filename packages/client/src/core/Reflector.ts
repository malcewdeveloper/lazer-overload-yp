import Entity from "./Entity";
import Sprite from "./Sprite";
import { TFrame } from "./types";

export default class Reflector extends Entity {
    private _angle: number;
    private _canvas: HTMLCanvasElement;
    private _sprite: Sprite;
    private _isAnimating = false;

    constructor(
        x: number,
        y: number,
        canvas: HTMLCanvasElement,
        spritePath: string,
        frames: TFrame[],
        width?: number,
        height?: number,
    ) {
        super(x, y, width, height);

        this._angle = 0;
        this._canvas = canvas;
        this._sprite = new Sprite(x, y, spritePath, frames, width, height);
        this._canvas.addEventListener("click", this._handleClick);
    }

    private _handleClick = (event: MouseEvent) => {
        // Плохое и не точное отслеживание клика по рефлектору
        const rect = this._canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        if (
            clickX >= this.x - this.width! / 2 &&
            clickX <= this.x - this.width! / 2 + this.width! &&
            clickY >= this.y &&
            clickY <= this.y + this.height!
        ) {
            this.rotate();
        }
    };

    public rotate(): void {
        if (this._isAnimating) return;

        this._angle = (this._angle + 90) % 360;
        this._isAnimating = true;

        this._animateRotation();
    }

    private async _animateRotation(): Promise<void> {
        for (let i = 0; i < this._sprite.frames.length; i++) {
            this._sprite.update(0);

            await new Promise((resolve) =>
                setTimeout(resolve, this._sprite.frames[i].duration),
            );
        }

        this._isAnimating = false;
    }

    public update(deltaTime: number): void {
        if (this._isAnimating) {
            this._sprite.update(deltaTime); // Обновляем только если идет анимация
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.rotate((this._angle * Math.PI) / 180);

        this._sprite.render(ctx);

        ctx.restore();
    }
}
