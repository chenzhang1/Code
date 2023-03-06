import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
class GameControl {
    //定义三个属性
    //蛇
    snake: Snake;
    food: Food;
    scorepanel: ScorePanel;

    //创建一个属性来存储蛇的移动方向，也就是按键的方向
    direction: string = '';
    isLive = true;
    constructor() {
        this.food = new Food();
        this.scorepanel = new ScorePanel();
        this.snake = new Snake();
        this.init();
    }
    init() {
        //绑定键盘按下的事件
        document.addEventListener('keydown', this.keydownHandle.bind(this))
        this.run();
    }
    //
    keydownHandle(event: KeyboardEvent) {
        //检查用户是否event.key是否合法
        //修改direction属性
        //while(event.key)
        this.direction = event.key;

    }
    //创建一个控制蛇移动的方法
    run() {
        /* 根据方向（this.direction）来使蛇的位置改变 */
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }
        this.checkEat(X, Y)
        //修改蛇的XY位置
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e: any) {
            alert(e.message)
            this.isLive = false
        }
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorepanel.level - 1) * 30)
    }
    //定一个方法检测蛇吃到食物没有
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorepanel.addScore()
            this.snake.addBody();
        }
    }
}
export default GameControl