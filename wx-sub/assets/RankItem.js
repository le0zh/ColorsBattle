// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    rankLabel: cc.Label,
    nameLabel: cc.Label,
    scoreLabel: cc.Label,
    avatar: cc.Sprite
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  setData(rank, name, score, avatarUrl) {
    this.rankLabel.string = rank + '';
    this.nameLabel.string = name + '';
    this.scoreLabel.string = score + '';
    this.createImage(this.avatar, avatarUrl);
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
  }

  // update (dt) {},
});
