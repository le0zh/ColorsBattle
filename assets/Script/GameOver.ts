import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    totalQuestionLabel: cc.Label = null;

    @property(cc.Label)
    rightRatioLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
      this.scoreLabel.string = `${GameData.totalScore}`;
      this.totalQuestionLabel.string = `${GameData.totalQuestion}`;
      this.rightRatioLabel.string = `${((GameData.totalRight / GameData.totalQuestion) * 100).toFixed(2)}%`;
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

    update (dt) {}
}
