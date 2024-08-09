import Entity from "./Entity";

export default class Lazer extends Entity {
    private _speed: number;
    private _direction: { dx: number; dy: number };

    constructor(
        x: number,
        y: number,
        speed: number,
        direction: { dx: number; dy: number },
    ) {
        super(x, y);

        this._speed = speed;
        this._direction = direction;
    }

    public update(deltaTime: number): void {
        // console.log(deltaTime);
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.moveTo(0, -this.y);
        ctx.lineTo(0, 0);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
