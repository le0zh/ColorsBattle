// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label) label: cc.Label = null;

  @property(cc.Button) startButton: cc.Button = null;

  @property(cc.Sprite) rayBg: cc.Sprite = null;

  @property text: string = "hello";

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.startButton.node.on("click", this.onStartbuttonClicked, this);
  }

  start() {
    cc.director.preloadScene("Game");

    const rotation = cc.rotateBy(10, 360);
    this.rayBg.node.runAction(cc.repeatForever(rotation));

    const scale1 = cc.scaleTo(1, 1.1);
    const scale2 = cc.scaleTo(1, 1);
    this.startButton.node.runAction(
      cc.repeatForever(cc.sequence(scale1, scale2))
    );

    wx.showShareMenu();

    wx.onShareAppMessage(function() {
      // 用户点击了“转发”按钮
      return {
        title: "Color大作战，邀你来战！"
      };
    });
  }

  // update (dt) {}

  onStartbuttonClicked(event) {
    console.log("start!!!");
    // 切换到游戏场景
    cc.director.loadScene("Game");
  }
}
