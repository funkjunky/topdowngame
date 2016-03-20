function MathHelper() {
}

MathHelper.dist = function(p1, p2) {
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

MathHelper.areRectsIntersecting = function(rect1, rect2) {
    var lines = MathHelper._linesInRect(rect1);
    for(var i=0; i!=lines.length; ++i)
        if(MathHelper.isLineIntersectingRectangle(lines[i], rect2))
            return true;
    if(MathHelper.isRectInsideRect(rect1, rect2) || MathHelper.isRectInsideRect(rect2, rect1))
        return true;

    return false;
};

MathHelper.isRectInsideRect = function(rect1, rect2) {
    points = MathHelper._pointsInRect(rect1);
    for(var i = 0; i != points.length; ++i)
        if(!MathHelper.isPointInsideRect(points[i], rect2))
            return false;

    return true;
};

MathHelper.isPointInsideRect = function(point, rect) {
    return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
};

MathHelper._linesInRect = function(rect) {
    var points = MathHelper._pointsInRect(rect);
    var lines = [];
    for(var i = 0; i < points.length - 1; ++i)
        lines.push({p1: points[i], p2: points[i + 1]});

    return lines;
};

MathHelper._pointsInRect = function(rect) {
    var points = [
        {x: rect.x,                 y: rect.y},
        {x: rect.x + rect.width,    y: rect.y},
        {x: rect.x + rect.width,    y: rect.y + rect.height},
        {x: rect.x,                 y: rect.y + rect.height},
    ];
    return points;
};

MathHelper.isLineIntersectingRectangle = function(line, rect) {
    var lines = MathHelper._linesInRect(rect);

    for(var i = 0; i != lines.length; ++i)
        if(MathHelper.isLineIntersectingLine(line, lines[i]))
            return true;

    return false;
};

MathHelper.isLineIntersectingLine = function(l1, l2) {
    var q = ((l1.p1.y - l2.p1.y)
                * (l2.p2.x - l2.p1.x))
            - ((l1.p1.x - l2.p1.x)
                * (l2.p2.y - l2.p1.y));

    var d = ((l1.p2.x - l1.p1.x)
                * (l2.p2.y - l2.p1.y))
            - ((l1.p2.y - l1.p1.y)
                * (l2.p2.x - l2.p1.x));
    
    if(d == 0)
        return false;

    var r = q / d;

    var q2 = (l1.p1.y - l2.p1.y) * (l1.p2.x - l1.p1.x) - (l1.p1.x - l2.p1.x) * (l1.p2.y - l1.p1.y);

    var s = q2 / d;

    if( r < 0 || r > 1 || s < 0 || s > 1 )
        return false;

    return true;
};
