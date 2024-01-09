class Ground {
         
        constructor(x,y,w,h,visible){

            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.visible = visible;

            let options = {
                isStatic : true,
                
            }

            this.body = Bodies.rectangle(x ,y , w, h, visible,options);
            World.add(world, this.body);
        }

        show(){
            var pos = this.body.position;

            push();
            rectMode(CENTER);
            stroke(125);
            fill("orange");
            rect(pos.x,pos.y,this.w,this.h,this.visible);
            pop();

        }
}