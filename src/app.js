var HelloWorldLayer = cc.Layer.extend({
    myInteractives: [],
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

        var enemy = new cc.Sprite(res.mouse);
        enemy.setName('mouse');
        enemy.attr(gameMap.adjustedScreenCoords({
            x: 1,
            y: 17,
        }));
        enemy.setAnchorPoint(0,0);
        this.addChild(enemy);
        this.addInteractive(enemy, function() {
            var randomLocation = {x: Math.random() * size.width, y: Math.random() * size.height};
            gameMap.move(enemy, randomLocation, 0.05); //speed is seconds per tile
        });

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
                //console.log('mouseDown location: ', touches[0].getLocation());
                //iterate through all object interaction events.
                for(var i=0; i!=this.myInteractives.length; ++i)
                    this.myInteractives[i](touches[0].getLocation());

                gameMap.move(character, touches[0].getLocation(), 0.1); //speed is seconds per tile
            }.bind(this),
        }, this);

/*  //another way to do it? This just sends "enemy" as this to the events... nothing special.
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                console.log('enem touched?', this);
            },
        }, enemy);
        */

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
    },
    addInteractive: function(sprite, cb) {
        this.myInteractives.push(function(point) {
            if(MathHelper.isPointInsideRect(point, sprite))
                cb(sprite, point);
        });
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

