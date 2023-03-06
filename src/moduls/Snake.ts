class Snake {
    head: HTMLElement;
    bodies: HTMLCollection;
    element:HTMLElement;
    constructor() {
        this.element=document.getElementById('snake')!;
        //蛇的头部
        this.head = document.querySelector('#snake>div')!;
        //蛇的身体
        this.bodies = this.element.getElementsByTagName('div')
    }
    get X() {
        return this.head.offsetLeft;
    }
    get Y() {
        return this.head.offsetTop;
    }
    set X(value:number){
        if(this.X===value){
            return;
        }
        if(value<0||value>290){
            //蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft===value){
            if(value>this.X){
                value=this.X-10
            }
            if(value<this.X){
                value=this.X+10
            }
        }
        this.moveBody();
        this.head.style.left=value+'px';
        this.checkHeadBody();
    }
    set Y(value:number){
        if(this.Y===value){
            return;
        }
        if(value<0||value>290){
            //蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop===value){
            if(value>this.Y){
                value=this.Y-10
            }
            if(value<this.Y){
                value=this.X+10
            }
        }
        this.moveBody();
        this.head.style.top=value+"px";
        this.checkHeadBody()
    }
    //蛇增加身体的方法
    addBody(){
        //向element中添加一个div
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }
    //添加一个蛇身体移动的方法
    moveBody(){
        //遍历所有的身体
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前边身体的位置
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;
            //将值设置到当前的身体上
            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }
    }
    checkHeadBody(){
        //获取所有的身体，检查其是否与蛇头坐标重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement;
            if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
                //撞到身体
                throw new Error("撞到自己了")
            }
        }
    }
}
export default Snake;