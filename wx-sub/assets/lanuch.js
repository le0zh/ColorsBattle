cc.Class({
  extends: cc.Component,

  properties: {
    display: cc.Node,

    nameLabel: cc.Label,
    scoreLabel: cc.Label,
    avatar: cc.Sprite,
    rankItem: cc.Prefab,
    content: cc.Node,
  },

  start() {
    console.log("sub context start");
    wx.onMessage(data => {
      switch (data.message) {
        case "Show":
          this._show();
          break;
        case "Hide":
          this._hide();
          break;
      }
    });
  },

  createImage(sprite, url) {
    let image = wx.createImage();
    image.onload = function() {
      let texture = new cc.Texture2D();
      texture.initWithElement(image);
      texture.handleLoadedTexture();
      sprite.spriteFrame = new cc.SpriteFrame(texture);
    };
    image.src = url;
  },

  _show() {
    console.log("wx get friend cloud storage");

    wx.getFriendCloudStorage({
      keyList: ["avatarUrl", "nickname", "openid", "score"],
      success: res => {
        console.log("success");

        if (res.data.length > 0) {
          // sort
          res.data.sort(
            (a, b) => Number(a.KVDataList[0].value) < Number(b.KVDataList[0].value)
          );

          for(let i =0; i< res.data.length; i++){
            var tmp = res.data[i];
            var newItem = cc.instantiate(this.rankItem);
            newItem.getComponent('RankItem').setData(i+1, tmp.nickname, tmp.KVDataList[0].value,  tmp.avatarUrl);
            this.content.addChild(newItem);
          }
        }
      },
      fail: function() {
        console.log("fail");
        console.log("getFriendCloudStorage fail");
      },
      complete: function() {
        console.log("complete");
        ``;
      }
    });

    let moveTo = cc.moveTo(0.5, 0, 0);
    this.display.runAction(moveTo);
  },

  _hide() {
    let moveTo = cc.moveTo(0.5, 0, 1000);
    this.display.runAction(moveTo);
  }
});
