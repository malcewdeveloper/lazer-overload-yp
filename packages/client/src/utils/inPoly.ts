type TPoint = {
    x: number;
    y: number;
};

export function inPoly(x: number, y: number, points: TPoint[]) {
    const pointsLength = points.length;
    let j = pointsLength - 1;
    let c = false;

    for (let i = 0; i < pointsLength; i++) {
        const pointI = points[i];
        const pointJ = points[j];

        if (
            ((pointI.y <= y && y < pointJ.y) ||
                (pointJ.y <= y && y < pointI.y)) &&
            x >
                ((pointJ.x - pointI.x) * (y - pointI.y)) /
                    (pointJ.y - pointI.y) +
                    pointI.x
        ) {
            c = !c;
        }
        j = i;
    }
    return c;
}
