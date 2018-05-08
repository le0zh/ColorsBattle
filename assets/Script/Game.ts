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

const colorsText = ['蓝色', '黑色', '红色', '黄色', '绿色'];
const colorsValue = ['#2196f3', '#000000', '#f44336', '#ffeb3b', '#4caf50'];

// [min, max)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const showAction = cc.scaleTo(0.4, 0.7, 0.7).easing(cc.easeBackOut());
const hideAction = cc.scaleTo(0.1, 0, 0).easing(cc.easeBackIn());

const moveInAction = cc.moveTo(0.5, -242, 382).easing(cc.easeBackOut());
const moveOutAction = cc.moveTo(0.2, -393, 382).easing(cc.easeBackIn());

@ccclass
export default class NewClass extends cc.Component {
  // @property(cc.Label)
  // label: cc.Label = null;

  // @property
  // text: string = 'hello';

  @property(cc.Label) 
  labelMeaning: cc.Label = null;

  @property(cc.Label) 
  labelText: cc.Label = null;

  @property(cc.Button) 
  buttonNo: cc.Button = null;

  @property(cc.Button) 
  buttonYes: cc.Button = null;

  @property(cc.Node) 
  answerRightTip: cc.Node = null;

  @property(cc.Node) 
  answerWrongTip: cc.Node = null;

  @property(cc.Node) 
  comboNode: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.buttonNo.node.on('click', this.onButtonNoClicked, this);
    this.buttonYes.node.on('click', this.onButtonYesClicked, this);

    this.isSame = this.generate();
  }

  isSame: boolean;

  onButtonNoClicked(e) {
    this.onResult(!this.isSame);

    this.isSame = this.generate();
  }

  onButtonYesClicked(e) {
    this.onResult(this.isSame);

    this.isSame = this.generate();
  }

  onResult(correct: boolean) {
    if (correct) {
      // 回答正确
      this.answerRightTip.active = true;
      this.answerWrongTip.active = false;

      this.answerRightTip.runAction(cc.sequence(showAction, hideAction));

      this.comboNode.runAction(cc.sequence(moveInAction, moveOutAction));
    } else {
      // 回答错误
      this.answerRightTip.active = false;
      this.answerWrongTip.active = true;

      this.answerWrongTip.runAction(cc.sequence(showAction, hideAction));
    }
  }

  generate(): boolean {
    const index1 = getRandom(0, colorsText.length);
    const index2 = getRandom(0, colorsText.length);
    const index3 = getRandom(0, colorsValue.length);

    this.labelMeaning.string = colorsText[index1];
    this.labelText.string = colorsText[index2];

    const color = colorsValue[index3];
    this.labelText.node.color = new cc.Color().fromHEX(color);

    this.labelMeaning.node.emit('fade-in');

    return index1 === index3;
  }

  // update (dt) {}
}
