var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var map = new cc.TMXTiledMap(res.smallMap);
        this.addChild(map);

        var gameMap = new GameMap(map);

        var character = new cc.Sprite(res.jane);
        character.setName('player');
        character.attr(gameMap.getScreenTileCoords({
            x: size.width / 2,
            y: size.height / 2,
        }));
        character.setAnchorPoint(0,0);
        this.addChild(character);

        var cursor = new cc.Sprite(res.cursor);
        cursor.setOpacity(75);
        cursor.attr({
            x: -32,
            y: -32,
        });
        cursor.setAnchorPoint(0,0);
        this.addChild(cursor);
        cursor.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.5), cc.TintTo.create(0.3, 255, 128, 128), cc.TintTo.create(0.3, 255,255,255))));

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                //end(event.getCurrentTarget()._children) represents the top node, or the player in some cases.
                console.log('click, relevant to player character space?', character.convertToNodeSpace(touches[0].getLocation()));
                console.log('mouseDown location: ', touches[0].getLocation());

                gameMap.move(character, touches[0].getLocation(), 0.1); //speed is seconds per tile
            },
        }, this);

        //TODO: wrap this
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            swallowTouches: true,
            //Note: unique to web
            onMouseMove: function(event) {
                screenLoc = event.getLocation();
                //console.log('coords: ', gameMap.getCoords(screenLoc), gameMap.getScreenTileCoords(screenLoc));
                cursor.setPosition(gameMap.getScreenTileCoords(screenLoc));
            },
        }, this);

        /*
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        */

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

