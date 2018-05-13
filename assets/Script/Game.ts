import GameData from "./GameData";

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

const moveRightAction = cc.moveTo(59, 2065, 0);

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label) labelMeaning: cc.Label = null;

  @property(cc.Label) labelText: cc.Label = null;

  @property(cc.Button) buttonNo: cc.Button = null;

  @property(cc.Button) buttonYes: cc.Button = null;

  @property(cc.Node) answerRightTip: cc.Node = null;

  @property(cc.Node) answerWrongTip: cc.Node = null;

  @property(cc.Node) comboNode: cc.Node = null;
  @property(cc.Label) comboLabel: cc.Label = null;

  @property(cc.Node) countDownTip: cc.Node = null;

  @property(cc.Label) countDownLabel: cc.Label = null;

  @property(cc.Node) card1: cc.Node = null;
  @property(cc.Node) card2: cc.Node = null;

  @property(cc.Label) timeLabel: cc.Label = null;
  @property(cc.Label) scoreLabel: cc.Label = null;

  @property(cc.Sprite) bgSprite: cc.Sprite = null;

  isGameStarted: boolean = false;
  isSame: boolean = false;

  // 游戏时间，默认60秒
  time: number = 60;

  // 连击数
  combo: number = 0;

  // 答对一题，加十分
  scorePerQuestion: number = 10;

  // onLoad () {}

  start() {
    GameData.reset();
    this.card1.active = false;
    this.card2.active = false;

    this.buttonNo.node.active = false;
    this.buttonYes.node.active = false;
    this.buttonNo.node.on('click', this.onButtonNoClicked, this);
    this.buttonYes.node.on('click', this.onButtonYesClicked, this);

    this.countDown();
    cc.director.preloadScene('GameOver');
  }

  onButtonNoClicked(e) {
    this.onResult(!this.isSame);

    this.isSame = this.generate();
  }

  onButtonYesClicked(e) {
    this.onResult(this.isSame);

    this.isSame = this.generate();
  }

  lastRightTime:number = 0;
  onResult(correct: boolean) {    
    if (correct) {
      // 回答正确
      this.answerRightTip.active = true;
      this.answerWrongTip.active = false;

      this.answerRightTip.runAction(cc.sequence(showAction, hideAction));

      this.checkCombo();
      
      if(this.combo > 1){
        this.comboLabel.string = `x ${this.combo}`;
        this.comboNode.runAction(cc.sequence(moveInAction, moveOutAction));
      }

      GameData.totalScore += this.scorePerQuestion + ((this.combo > 1) ? (this.combo - 1) * 2 : 0);
      this.scoreLabel.string = `${GameData.totalScore}`;
      GameData.totalRight++;

      this.lastRightTime = Date.now();      
    } else {
      // 回答错误
      this.answerRightTip.active = false;
      this.answerWrongTip.active = true;
      this.combo = 0;

      this.answerWrongTip.runAction(cc.sequence(showAction, hideAction));
    }
  }

  checkCombo () {
    // 连击
    if(Date.now() - this.lastRightTime <= 1500){
      this.combo++;
    }else {
      this.combo = 0;
    }
  }

  countDown() {
    const cbCountDown = cc.callFunc(this.onCountDownDone, this);
    const countShow = cc.scaleTo(0.8, 0.7, 0.7).easing(cc.easeBackOut());
    const countHide = cc.scaleTo(0.1, 0, 0).easing(cc.easeBackIn());

    this.countDownTip.active = true;
    this.countDownLabel.string = '3';

    const count2 = cc.callFunc(this.updateCountLabel, this, '2');
    const count1 = cc.callFunc(this.updateCountLabel, this, '1');

    this.countDownTip.runAction(
      cc.sequence(countShow, countHide, count2, countShow, countHide, count1, countShow, countHide, cbCountDown)
    );
  }

  updateCountLabel(target, number) {
    this.countDownLabel.string = number;
  }

  onCountDownDone() {
    console.log('timer start now');

    // 滚动背景
    this.bgSprite.node.runAction(moveRightAction);

    this.card1.active = true;
    this.card2.active = true;

    this.buttonNo.node.active = true;
    this.buttonYes.node.active = true;

    this.countDownTip.active = false;
    this.isGameStarted = true;
    this.isSame = this.generate();

    this.schedule(this.updateTime, 1);
  }

  updateTime() {
    this.time--;

    if (this.time === 0) {
      // game over
      console.log('game over');
      this.unschedule(this.updateTime);
      cc.director.loadScene('GameOver');
    }

    if(this.time < 10){
      // TODO: 增加sacle效果
      this.timeLabel.string = `0:0${this.time}`;
    }else {
      this.timeLabel.string = `0:${this.time}`;    
    }
  }

  generate(): boolean {
    const meaningIndex = getRandom(0, colorsText.length);
    const textIndex = getRandom(0, colorsText.length);
    let valueIndex;

    const ran = Math.random();
    if (ran < 0.5) {
      // 正确
      valueIndex = meaningIndex;
    } else {
      valueIndex = getRandom(0, colorsValue.length);
      if (valueIndex === meaningIndex) {
        if (ran > 0.8) {
          valueIndex -= 1;
        } else {
          valueIndex += 1;
        }
        valueIndex = cc.clampf(valueIndex, 0, colorsValue.length - 1);
      }
    }

    this.labelMeaning.string = colorsText[meaningIndex];
    this.labelText.string = colorsText[textIndex];

    const color = colorsValue[valueIndex];
    this.labelText.node.color = new cc.Color().fromHEX(color);

    GameData.totalQuestion++;
    
    return meaningIndex === valueIndex;
  }

  // update (dt) {}
}
