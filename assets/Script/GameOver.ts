import GameData from "./GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label) scoreLabel: cc.Label = null;

  @property(cc.Label) totalQuestionLabel: cc.Label = null;

  @property(cc.Label) rightRatioLabel: cc.Label = null;

  @property(cc.Button) restartButton: cc.Button = null;

  @property(cc.Button) rankButton: cc.Button = null;

  @property(cc.Sprite) display: cc.Sprite = null;
  @property(cc.Sprite) bgRay: cc.Sprite = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  isShow: boolean = false;
  tex: cc.Texture2D = null;

  start() {
    this.isShow = false;
    this.tex = new cc.Texture2D();

    wx.showShareMenu();

    wx.onShareAppMessage(function() {
      // 用户点击了“转发”按钮
      return {
        title: `我在color大作战中得了${GameData.totalScore}分！！！`
      };
    });

    this.scoreLabel.string = `${GameData.totalScore}`;
    // this.totalQuestionLabel.string = `${GameData.totalQuestion}`;
    // this.rightRatioLabel.string = `${(
    //   GameData.totalRight /
    //   GameData.totalQuestion *
    //   100
    // ).toFixed(2)}%`;

    this.restartButton.node.on(
      "click",
      function(e) {
        cc.director.loadScene("Home");
      },
      this
    );

    const rotation = cc.rotateBy(10, 360);
    this.bgRay.node.runAction(cc.repeatForever(rotation));

    this.rankButton.node.on("click", this.showRank, this);

      wx.setUserCloudStorage({
        KVDataList: [
          {
            key: "score",
            value: `${GameData.totalScore}`
          }
        ]
      });

      // 发送消息给子域
      wx.postMessage({
        message: "Show"
      });
  }

  showRank() {
    this.isShow = !this.isShow;

    // if (wx) {
    //   // 发送消息给子域
    //   wx.postMessage({
    //     message: this.isShow ? "Show" : "Hide"
    //   });
    // }
  }

  updaetSubDomainCanvas() {
    if (!this.tex) {
      return;
    }

    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.display.spriteFrame = new cc.SpriteFrame(this.tex);
  }

  // tmpScore: number = 0;
  // updateScore() {
  //   if(this.tmpScore >= GameData.totalScore){
  //     this.unschedule(this.updateScore);
  //     return;
  //   }

  //   this.tmpScore += 10;
  //   this.scoreLabel.string = `${this.tmpScore}`;
  // }

  update(dt) {
    this.updaetSubDomainCanvas();
  }
}
