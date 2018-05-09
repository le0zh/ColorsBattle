
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,

        nameLabel: cc.Label,
        scoreLabel: cc.Label,
        avatar: cc.Sprite,
    },

    start () {
        console.log('sub context start');
        wx.onMessage(data => {
            switch (data.message) {
                case 'Show':
                    this._show();
                    break;
                case 'Hide':
                    this._hide();
                    break;
            }
        });
    },

    createImage (sprite,url){
        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = url;
    },

    _show () {
        console.log('wx get friend cloud storage');

        wx.getFriendCloudStorage({
            keyList: ['avatarUrl', 'nickname', 'openid', 'score'],
            success: (res) => {
                console.log('success');
                console.log(res);
                if(res.data.length > 0){
                    var tmp = res.data[0];

                    console.log(tmp);

                    this.nameLabel.string = tmp.nickname;
                    this.scoreLabel.string = tmp.KVDataList[0].value;
                    this.createImage(this.avatar, tmp.avatarUrl);
                }
            },
            fail: function(){
                console.log('fail');
                console.log('getFriendCloudStorage fail');
            },
            complete: function() {
                console.log('complete');``
            }
        });

        let moveTo = cc.moveTo(0.5, 0, 73);
        this.display.runAction(moveTo);
    },

    _hide () {
        let moveTo = cc.moveTo(0.5, 0, 1000);
        this.display.runAction(moveTo);
    }
});
