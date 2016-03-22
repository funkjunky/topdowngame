function BubbleText(attrs) {
    this.setDefaults();
    this.setAttrs(attrs);
    return this;
}

BubbleText.prototype.setDefaults = function() {
    this.attrs = {
        font: 'Verdana',
        size: 24,

        pos: {x: 0, y: 64},

        duration: 2,
        fading: {in: 0.2, delay: 0.3, out: 0.5}, //as percentages

        panOffset: false,
    };
};

BubbleText.prototype.setAttrs = function(attrs) {
    for(var key in attrs)
        this.attrs[key] = attrs[key];
};

BubbleText.prototype.print = function(text, layer, attrs) {
    this.setAttrs(attrs);

    this._print(text, layer);
};

BubbleText.prototype._print = function(text, layer) {
    var textSprite = new cc.LabelTTF(text, this.attrs.font, this.attrs.size);
    layer.addChild(textSprite); //TODO: I should create constants for z-index, like zIndex.bottom(#), zIndex.create('bottom', 100) 100 + #
    textSprite.attr(this.attrs.pos);

    if(this.attrs.fading)
        textSprite.runAction(cc.sequence([
            cc.FadeIn.create(this.attrs.fading.in * this.attrs.duration),
            cc.DelayTime.create(this.attrs.fading.delay * this.attrs.duration),
            cc.FadeOut.create(this.attrs.fading.out * this.attrs.duration),
            cc.callFunc(textSprite.removeFromParent, textSprite),
        ]));
    if(this.attrs.panOffset)
        textSprite.runAction(cc.MoveBy.create(this.attrs.duration, this.attrs.panOffset));
};

BubbleText.quickPrint = function(text, layer, attrs) {
    var bubbleText = new BubbleText(attrs);
    bubbleText.print(text, layer);
};
