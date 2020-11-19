    //贪吃蛇：运动过程中以头部运动方向为整体运动方向；
    //运动时先移动尾部，再移动身体，最后移动头部；
    //每吃掉一块食物，身体长度加一
    //游戏设计：分析存在哪些对象、构建对象的要素以及对象的功能

    //已解决的问题：
    //1、食物的位置不可随机到贪吃蛇的身体内
    //比较蛇身上除蛇头以外的部分和食物的位置是否重合，重合时则删除该食物，生成新食物。
    //2、快速按两个方向键时，贪吃蛇可回头
    //设置一个用来记录按键状态的变量
  







    //一、食物
    //宽度、高度
    //在地图上显示食物
    function Food(map){
        var sn = new Snake(map);
        this.width = map.atom;
        this.height = map.atom;
        this.bgcolor = "rgb("+Math.floor(Math.random()*200)+
        ","+Math.floor(Math.random()*200)+","+Math.floor(Math.random()*200)+")";       
        this.x = Math.floor(Math.random() * map.xnum);
        this.y = Math.floor(Math.random() * map.ynum);
        this.flag = document.createElement("div");
        this.flag.style.width = this.width + "px";
        this.flag.style.height = this.height + "px";
        this.flag.style.background = this.bgcolor;
        this.flag.style.borderRadius = "50%";
        this.flag.style.position = "absolute";
        this.flag.style.left = this.x * this.width + "px";
        this.flag.style.top = this.y * this.height + "px";
        map.canvas.appendChild(this.flag);
    }




    //二、蛇
    //头、体、尾、宽度、高度
    //朝着不同方向运动；
    //每次吃掉食物，身体就增加相应的长度；
    //遇到某边界时，从对面的边界穿出；
    //自己碰到自己时，游戏结束。
    function Snake(map){
        this.width = map.atom;
        this.height = map.atom;
        this.direction = "right";

        this.body = [
            {x:2,y:0},//蛇头
            {x:1,y:0},//蛇身
            {x:0,y:0},//蛇尾
        ];

        //显示蛇
        this.display = function(){
            for(var i=0; i<this.body.length; i++){
                if(this.body[i].x != null){
                    var s = document.createElement("div");
                    this.body[i].flag = s;
                    s.style.width = this.width + "px";
                    s.style.height = this.height + "px";
                    s.style.background = "rgb("+Math.floor(Math.random()*200)+
                    ","+Math.floor(Math.random()*200)+","+Math.floor(Math.random()*200)+")";
                    s.style.position = "absolute";
                    s.style.left = this.body[i].x * this.width + "px";
                    s.style.top = this.body[i].y * this.height + "px";
                    map.canvas.appendChild(s);
                }
                
            }
        }
        this.run = function() {

            for(var i=this.body.length-1; i>0; i--){
                this.body[i].x = this.body[i-1].x;
                this.body[i].y = this.body[i-1].y;
            }
           
            //根据direction判断蛇的行走方向
            switch(this.direction){
                case "left": 
                    st = true;
                    this.body[0].x -= 1;
                    break;
                case "right":
                    st = true;
                    this.body[0].x += 1;
                    break;
                case "up": 
                    st = true;
                    this.body[0].y -= 1; 
                    break;
                case "down":             
                    st = true;
                    this.body[0].y += 1;
                    break;
            }
           
            //蛇吃到食物之后，长度增加
            if(this.body[0].x == food.x && this.body[0].y == food.y){
                this.body.push({x:null,y:null,flag:null});
                map.canvas.removeChild(food.flag);
                food = new Food(map);
                count++;
            }

            //遇到某边界时，从对面边界穿出：改变头部位置
            if (this.body[0].x < 0) {
                this.body[0].x  = map.xnum-1; 
            } else if(this.body[0].x > map.xnum-1){
                this.body[0].x  = 0;
            }
            if(this.body[0].y < 0){
                this.body[0].y  = map.ynum-1;
            } else if(this.body[0].y > map.ynum-1){
                this.body[0].y  = 0;
            } 


            for(var i=0; i<this.body.length; i++){
                //防止食物随机出现在蛇体内
                if(this.body[i].x == food.x && this.body[i].y == food.y){
                    map.canvas.removeChild(this.body[i].flag);
                    food = new Food(map);
                }
                if(this.body[i].flag != null){
                   
                    map.canvas.removeChild(this.body[i].flag);
                }
                
            }
            
            this.display();
        }
    }


    //四、地图
    //宽、高、X、Y、原子
    //显示画布
    /**
     * 地图对象的构造方法
     * @param {*} atom 原子(宽高相同)
     * @param {*} xnum 横向原子数量
     * @param {*} ynum 纵向原子数量
     */

    var main = document.getElementById("container");
    var showcanvas = true;//是否开启画布格子 
    var map = new Map(20,40,25);
    map.create();
    var food = new Food(map);
    var snake = new Snake(map);
    snake.display();
    var count = 0;//食物个数计数
    var st = true;//标记按键状态


    function Map(atom,xnum,ynum){
        this.atom = atom;
        this.xnum = xnum;
        this.ynum = ynum;

        this.canvas = null;
        //创建画布的方法
        this.create = function(){
            this.canvas = document.createElement('div');
            // 方法一：this.canvas.style.cssText = "";
            //方法二：可以通过设置类名或者ID名，在CSS里面设置其样式
            // this.canvas.id = "space";
            // this.canvas.className = "space";
            this.canvas.setAttribute("class","space");
            this.canvas.style.width = this.atom * this.xnum+'px';
            this.canvas.style.height = this.atom * this.ynum+'px';
            main.appendChild(this.canvas);

            if(showcanvas){
                for(var i=0; i<ynum; i++){
                    for(var j=0; j<xnum; j++ ){
                        var a = document.createElement("div");
                        a.style.cssText = "border:1px solid white";
                        a.style.width = this.atom + "px";
                        a.style.height = this.atom +"px";
                        a.style.background = "rgb(176, 240, 234)";
                        this.canvas.appendChild(a);
                        a.style.position = "absolute";
                        a.style.left = j * this.atom + "px";
                        a.style.top = i * this.atom + "px";
                    }
            
                }
                
            }
        }
    }




   




    //三、游戏规则
    //点击Come按钮，游戏开始
    //点击Over按钮，游戏结束
    //每吃掉一块食物，得一分
    
    window.addEventListener('keydown',function(e){
        var event = e || window.event;
       
        switch(event.keyCode){
            case 74:
                if(st && snake.direction != "right"){
                    snake.direction = "left";
                    st= false;
                }
                break;
            case 73:
                if(st && snake.direction != "down"){
                    snake.direction = "up";
                    st = false;
                }
                break;
            case 76:
                if(st && snake.direction != "left"){
                    snake.direction = "right";
                    st = false;
                }
                break;
            case 75:
                if(st && snake.direction != "up"){
                    snake.direction = "down";
                    st = false;
                }
                break;
        }
    }) 



    //游戏结束
    function overGame(map){
        clearInterval(timer);
        main.removeChild(map.canvas);
        this.prompt = document.createElement("div");
        this.prompt.id = "prompt";
        this.prompt.className = "prompt";
        this.prompt.innerText = "游戏已结束！";
        main.appendChild(this.prompt);
    }

    function showScore(){
        snake.run();
        document.getElementById("show_score").textContent= count;
    }



    var timer;
    var begin_btn = document.querySelector(".begin");
    begin_btn.addEventListener("click",function(){
        clearInterval(timer);
        timer = setInterval(function(){
            snake.run();
        },300);
    });
    var end_btn = document.querySelector(".end");
    end_btn.addEventListener("click",function(){
        overGame(map);
        showScore();
    });
