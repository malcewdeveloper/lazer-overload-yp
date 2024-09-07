export default class Button {
    private _fillColor: string = "";
    private _textColor: string = "";
    private _text: string = "Button";
    public x: number = 0;
    public y: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    private _canvas: HTMLCanvasElement;
    private _isClick: boolean = false;

    constructor(
        x: number,
        y: number,
        canvas: HTMLCanvasElement,
        width: number,
        height: number,
        name: string,
    ) {
        this._canvas = canvas;
        this._init(name);
        this._setPosition(x, y);
        this._setSize(width, height);
        this._canvas.addEventListener("click", this._handleClick);
    }
    private _handleClick = (event: MouseEvent) => {
        this._isClick = true;
    };

    private _init(name: string): void {
        this._fillColor = "#eeaa00";
        this._textColor = "#001122";
        this._text = name;
    }

    private _setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public _setSize(width: number, height: number): void {
        this._width = width;
        this._height = height;
    }

    public update(deltaTime: number): void {}

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this._fillColor;
        ctx.fillRect(this.x, this.y, this._width, this._height);
        ctx.fillStyle = this._textColor;
        ctx.textAlign = "center";
        ctx.font = "25px arial";
        ctx.fillText(
            this._text,
            this.x + this._width / 2,
            this.y + this._height / 2 + 8,
            this._width,
        );
    }
}
