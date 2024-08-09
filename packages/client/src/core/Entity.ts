import { TFrame } from "./types";
import { loadImage } from "../utils";

export default abstract class Entity {
    public x: number;
    public y: number;
    public width?: number;
    public height?: number;

    constructor(x: number, y: number, width?: number, height?: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public abstract update(deltaTime: number): void; // Здесь можно реализовывать анимации или движения сущеностей, которые зависят от обновления кадра

    public abstract render(ctx: CanvasRenderingContext2D): void; // Здесь можно отрисовывать внешний вид и размер сущности на canvas
}
