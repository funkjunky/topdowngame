var TopDownLayer = cc.Layer.extend({
    selectEvents: [],
    gameMap: null,
    _stopPropagation: false,
    ctor: function() {
        this._super();

        this.onClick(function(touches, event) {
            //iterate through all object interaction events.
            for(var i=0; i!=this.selectEvents.length; ++i)
                this.selectEvents[i](touches[0].getLocation());
        });
    },
    onClick: function(cb) {
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                //allows selects to not bubble to global clicks.
                if(this._stopPropagation) {
                    this._stopPropagation = false;
                    return;
                }
                cb.bind(this)(touches, event);
            }.bind(this),
        }, this);
    },
    addOnHoverEffect: function() {
        var cursor = this.createGraphic(res.cursor, {
            x: -32,
            y: -32,
        });
        cursor.setOpacity(75);
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
    onSelect: function(sprite, cb, stopPropagation) {
        this.selectEvents.push(function(point) {
            if(MathHelper.isPointInsideRect(point, sprite)) {
                cb(sprite, point);
                if(stopPropagation)
                    this._stopPropagation = true;
            }
        }.bind(this));
    },
    createGraphic: function(resource, location) {
        var character = new cc.Sprite(resource);
        if(location)
            character.attr(this.gameMap.getScreenTileCoords(location));
        character.setAnchorPoint(0,0);
        return character;
    },
});
