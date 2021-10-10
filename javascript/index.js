function fire(pow, angl, dir) {
    var ball = document.getElementById("fireball");
    var table = document.querySelector("table");
    var resetAngle = document.getElementById("angle");
    var resetPower = document.getElementById("power");
    var tank1 = document.getElementById("tank1");
    var tank2 = document.getElementById("tank2");
    var fireball = document.getElementById("fireball");
    var boom = document.getElementById("boom");
    const pi = Math.PI;
    var hbar = 1;
    // var pow = 100;
    // var angl = 88;
    var save;
    var incr =0;
    var tank_pos = document.getElementById("tank1").offsetLeft+90 ;
    if(dir == -1){
        tank_pos = document.getElementById("tank2").offsetLeft  ;
    }
    if(angl >75){
        incr = 25;  
    }
    if(angl < 60 && angl > 30){
        incr = -25;
    }
    if(angl < 25){
        incr = -50;
    }
    var t;
    var rng ;
    // var dir =1;
    var i= tank_pos , y;             //position of tank 1/2 from left side 


    angle(angl);
    function angle(angl){
        radian = angl*(pi/180);
        range(pow+30 , radian);
    }
    function range(pow , radian ){
        rng =  (pow*pow) * (Math.sin(2*radian))/10;
        time(pow , radian);
    }
    function time(pow , radian){
        t = (pow*(Math.sin(radian)))/10;
  
        if(dir ==-1)
            i = (Math.tan(radian) + Math.sqrt(Math.tan(radian)*Math.tan(radian) - (20/((pow*(Math.cos(radian)))*(pow*(Math.cos(radian)))) )))/ (10/((pow*Math.cos(radian))*(pow*Math.cos(radian))) );
        save = i;
        if(dir ==1)
            projectile1(pow ,angl ,rng );
        else
            projectile2(pow , angl , rng);
    }
    function projectile1(pow , angl , rng ){
        setTimeout(function(){
            ball.style.left=i+(tank_pos -save)+"px";
            y = 560 -( (Math.tan(radian))*(i - tank_pos) - ( 10*((i - tank_pos)*(i - tank_pos)) )/ (  (2*(pow*(Math.cos(radian)) ) )* (pow*(Math.cos(radian)))   ) );
            ball.style.top= y + "px";
            i=i+2;
            if(  y  <= 590){
                    if(fireball.offsetLeft>=tank2.offsetLeft&&fireball.offsetLeft<=(tank2.offsetLeft+90) 
                        && fireball.offsetTop>=tank2.offsetTop&&fireball.offsetTop<=(tank2.offsetTop+50))
                    {
                        
                        
                        if(hbar == 1){
                            document.getElementById("health2").style.width = (document.getElementById("health2").offsetWidth) -32+ "px";
                            if(document.getElementById("health2").offsetWidth  < 10 ){
                                boom.style.left=(tank2.offsetLeft +10)+"px";
                                boom.style.top=(tank2.offsetTop-13)+"px";
                                document.getElementById("health2").style.width="0px"
                                popup.style.visibility="visible"
                                pocketTank.style.backgroundImage="url(photos/gameover.png)";
                                pocketTank.style.visibility="visible";
                                pocketTank.style.left="15%"
                                playButton.innerHTML="Tank1 Winner !!!";
                                playButton.style.visibility="visible"
                                

                            }
                            hbar = 0;
                        }        
                    } 
                       
                    setTimeout(() => {
                        boom.style.top=-200+"px";
                    }, 3000);
                projectile1(pow , angl , rng );
            }
            else{
                boom.style.left=(fireball.offsetLeft)+"px";
                boom.style.top=(fireball.offsetTop - 50)+"px";
                fireball.style.top = "-200px"
                setTimeout(() => {
                    count=-1;
                    turn = -1;
                    turretturn++;                                                                  //turret turn chaance 
                    turretturn =(turretturn%2);
                    table.style.right = "0px";
                    table.style.left = "unset";
                    resetAngle.innerHTML="45";
                    resetPower.innerHTML="50";
                    
                }, 1500);
               
            }
        },(60/t)+incr)
    }
    function projectile2(pow  , angl , rng){
        setTimeout(function(){
            ball.style.left= i+(tank_pos - save)+"px";
            y = 560 -( (Math.tan(radian))*(i) - ( 10*((i)*(i)) )/ (  (2*(pow*(Math.cos(radian)) ) )* (pow*(Math.cos(radian)))   ) );
            ball.style.top = y+"px";
            i = i-2;
            if( y <=590 ){
                if(fireball.offsetLeft>=tank1.offsetLeft&&fireball.offsetLeft<=(tank1.offsetLeft+90)
                &&fireball.offsetTop>=(tank1.offsetTop+20)&&fireball.offsetTop<=(tank1.offsetTop+50))
                {
 
                    if(hbar == 1){
                        document.getElementById("health1").style.width = (document.getElementById("health1").offsetWidth) -32+ "px";
                        if(document.getElementById("health1").offsetWidth  < 10 ){
                            boom.style.left=(tank1.offsetLeft +10)+"px";
                            boom.style.top=(tank1.offsetTop-13)+"px";
                            document.getElementById("health1").style.width="0px"
                            popup.style.visibility="visible"
                            pocketTank.style.backgroundImage="url(photos/gameover.png)";
                            pocketTank.style.visibility="visible";
                            pocketTank.style.left="15%"
                            playButton.innerHTML="Tank2 Winner !!!";
                            playButton.style.visibility="visible"
                        }
                        hbar = 0;
                    }
                }
                setTimeout(() => {
                    boom.style.top=-200+"px";
                }, 3000);
    
                projectile2(pow , angl , rng);
            }
            else{
                boom.style.left=(fireball.offsetLeft)+"px";
                boom.style.top=(fireball.offsetTop - 50)+"px";
                fireball.style.top = "-200px"
                setTimeout(() => {
                    count=0;
                    turn = 1;
                    turretturn++;
                    turretturn =(turretturn%2);
                    table.style.left = "0px";
                    table.style.right = "unset";
                    resetAngle.innerHTML="45";
                    resetPower.innerHTML="50";
                }, 1500);
            }
        },(60/t)+ incr)
    }
}