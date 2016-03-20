var HelloWorldLayer = InteractiveTopDownLayer.extend({
    ctor:function () {
        this._super();

        var gameMap = this.gameMap = new GameMap(new cc.TMXTiledMap(res.smallMap), "obstructions");

        var character = this.createInteractive(res.jane, ['woeful', 'student'], {
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
        });

        var enemy = this.createInteractive(res.mouse, ['wiley', 'mouse'], {
            x: 1,
            y: 17,
        });

        character.onTagEnter('mouse', 128, function(mouse, distance) {
            console.log('char close to mouse: ', distance, mouse);
        });
        character.onTagExit('mouse', 128, function(mouse, distance) {
            console.log('char left mouse: ', distance, mouse);
        });

        enemy.onSelect(function() {
            do {
                randomLocation = {x: Math.random() * cc.winSize.width, y: Math.random() * cc.winSize.height};
            } while(!gameMap.move(enemy, randomLocation, 0.05)) //speed is seconds per tile
        }, true);

        this.onClick(function(touches, event) {
            gameMap.move(character, touches[0].getLocation(), 0.1); //speed is seconds per tile
        });

        this.addChild(this.gameMap.tiledMap);
        this.addChild(character);
        this.addChild(enemy);

        this.addOnHoverEffect();

        return true;
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

