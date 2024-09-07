import React from "react";
import { Game, Reflector } from "../../core";
import { Emitter, Battery, Button } from "../../core";
import { TFrame } from "../../core/types";
import spritePath from "/sprite.png";

const reflectorFrames: TFrame[] = [
    { x: 0, y: 0, width: 283, height: 283, duration: 100 },
];

const emmiterFrames: TFrame[] = [
    { x: 1020, y: 668, width: 283, height: 283, duration: 100 },
];

const batteryFrames: TFrame[] = [
    { x: 0, y: 1060, width: 161, height: 283, duration: 100 },
];

const CanvasGame: React.FC<object> = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const gameRef = React.useRef<Game | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        gameRef.current = new Game(canvas.id);

        const reflector = new Reflector(
            20,
            50,
            canvas,
            spritePath,
            reflectorFrames,
            25,
            25,
        );

        const emitter = new Emitter(
            20,
            120,
            { dx: 0, dy: -1 },
            spritePath,
            emmiterFrames,
        );

        const battery = new Battery(100, 50, spritePath, batteryFrames);

        const button = new Button(150, 100, canvas, 200, 75, "Start Game");

        gameRef.current.addEntity(reflector);
        gameRef.current.addEntity(emitter);
        gameRef.current.addEntity(battery);
        gameRef.current.addEntity(button);

        gameRef.current.start();

        return () => {
            gameRef.current?.stop();
        };
    }, []);

    return (
        <canvas
            id="game"
            ref={canvasRef}
            width={500}
            height={800}
            style={{ border: "2px solid black" }}
        ></canvas>
    );
};

export default CanvasGame;
