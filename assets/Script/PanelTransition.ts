const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property() duration: number = 0;

  outOfWorld: cc.Vec2;
  actionFadeIn: cc.Action = null;
  actionFadeOut: cc.Action = null;

  onLoad() {
    this.outOfWorld = cc.p(3000, 0);
    this.node.position = this.outOfWorld;
    let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
    let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
    this.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 255), cc.scaleTo(this.duration, 1.0)), cbFadeIn);
    this.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 0), cc.scaleTo(this.duration, 2.0)), cbFadeOut);
    this.node.on('fade-in', this.startFadeIn, this);
    this.node.on('fade-out', this.startFadeOut, this);
  }

  startFadeIn() {
    cc.eventManager.pauseTarget(this.node, true);
    this.node.position = cc.p(0, 0);
    this.node.setScale(2);
    this.node.opacity = 0;
    this.node.runAction(this.actionFadeIn);
  }

  startFadeOut() {
    cc.eventManager.pauseTarget(this.node, true);
    this.node.runAction(this.actionFadeOut);
  }

  onFadeInFinish() {
    cc.eventManager.resumeTarget(this.node, true);
  }

  onFadeOutFinish() {
    this.node.position = this.outOfWorld;
  }
}
