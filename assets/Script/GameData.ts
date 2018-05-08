const { ccclass, property } = cc._decorator;

export default class GameData {
  static totalQuestion: number = 0;
  static totalScore: number = 0;
  static totalRight: number = 0;

  public static reset(): void {
    GameData.totalQuestion = 0;
    GameData.totalScore = 0;
    GameData.totalRight = 0;
  }
}
