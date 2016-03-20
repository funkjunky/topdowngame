var __stopPropagation = false; //TODO: eventually get rid of this global.

var TopDownLayer = cc.Layer.extend({
    gameMap: null,
    _stopPropagation: false,
    ctor: function() {
        this._super();
    },
    onClick: function(cb) {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                //allows selects to not bubble to global clicks.
                if(__stopPropagation) {
                    __stopPropagation = false;
                    return;
                }
                cb.bind(this)(touches, event);
            }.bind(this),
        }, this);
    },
    createGraphic: function(resource, opacity) {
        var graphic = new cc.Sprite(resource);

        graphic.setAnchorPoint(0,0);

        if(opacity)
            graphic.setOpacity(opacity);

        return graphic;
    },
    addOnHoverEffect: function() {
        var cursor = this.createGraphic(res.cursor, 75);
        cursor.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.5), cc.TintTo.create(0.3, 255, 128, 128), cc.TintTo.create(0.3, 255,255,255))));
        this.addChild(cursor);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event) {
                screenLoc = event.getLocation();
                cursor.setPosition(this.gameMap.getScreenTileCoords(screenLoc));
            }.bind(this),
        }, this);
    },
});
