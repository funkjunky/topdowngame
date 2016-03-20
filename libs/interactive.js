var eventIncrement = 0;
var Interactive = cc.Sprite.extend({
    eventsInteractivesInRange: {},
    ctor: function(resource, tags) {
        this._super(resource);

        this.setAnchorPoint(0,0);

        this.tags = [];
        this.selectEvents = [];
        this.tagEnterEvents = [];
        this.tagExitEvents = [];

        if(tags)
            this.tags = tags;

        this.scheduleUpdate();

        //TODO: find a simpler way to do events, or make my own event wrapper.
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                for(var i=0; i!=this.selectEvents.length; ++i)
                    this.selectEvents[i](touches[0].getLocation());
            }.bind(this),
        }, this);
    },

    onSelect: function(cb, stopPropagation) {
        this.selectEvents.push(function(point) {
            if(MathHelper.isPointInsideRect(point, this)) {
                cb(point);
                if(stopPropagation)
                    __stopPropagation = true;
            }
        }.bind(this));
    },
    onTagEnter: function(tag, range, cb) {
        this.tagEnterEvents.push({tag: tag, range: range, cb: cb, id: ++eventIncrement});
        this.eventsInteractivesInRange[eventIncrement] = [];
    },
    onTagExit: function(tag, range, cb) {
        this.tagExitEvents.push({tag: tag, range: range, cb: cb, id: ++eventIncrement});
        this.eventsInteractivesInRange[eventIncrement] = [];
    },
});
