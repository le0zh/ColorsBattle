// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const colorsText = ['蓝色', '黑色', '红色', '黄色', '绿色'];
const colorsValue = ['#2196f3', '#000000', '#f44336', '#ffeb3b', '#4caf50'];

// [min, max)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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
    buttonRandom: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
      this.buttonRandom.node.on('click', this.onRandomButtonClicked, this);
    }

    onRandomButtonClicked (e){
      const answar = this.generate();
      console.log(answar);
    }

    generate (): boolean { 
      const index1 = getRandom(0, colorsText.length);
      const index2 = getRandom(0, colorsText.length);
      const index3 = getRandom(0, colorsValue.length);

      this.labelMeaning.string = colorsText[index1];
      this.labelText.string = colorsText[index2];

      const color = colorsValue[index3];
      this.labelText.node.color = (new cc.Color()).fromHEX(color);

      this.labelMeaning.node.emit("fade-in");

      return index1 === index3;
    }

    // update (dt) {}
}
