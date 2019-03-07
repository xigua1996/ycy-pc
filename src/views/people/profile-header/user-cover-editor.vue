<template>
  <div class="user-cover-editor">
    <div class="user-cover-wrap">
      <img style="width: 100%" src="./../../../assets/v2-28e2fd6519981f5c6f5609fe0987442b_r.jpg" alt="">
      <el-button class="editor-btn" @click="isRender = true">编辑封面图片</el-button>
    </div>
    <div class="dialog" v-show="isRender">
      <!--<img :src="ddd" alt="">-->
      <div class="editor">
        <canvas
          id="myCanvas"
          width="1000"
          height="240"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
        ></canvas>
      </div>
      <ul class="action">
        <li>
          <p>调整图片尺寸与位置</p>
          <p>遮罩覆盖区域在移动端设备上可能会被裁切</p>
        </li>
        <li>
          <div class="block" style="width: 300px">
            <span class="demonstration">默认</span>
            <el-slider v-model="scale"></el-slider>
          </div>
        </li>
        <li>
          <el-button @click="onSave">保存</el-button>
          <el-button @click="isRender=false">取消</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Userservice from './../../../service/user'
  export default {
    data() {
      return {
        isRender:false,
        canvas:{},
        scale: 50,
        ctx: {},
        img: {},
        isDown: false,
        XY:{
          x:0,
          y:0
        },
        startXY:{
          x:0,
          y:0
        },
        endXY:{
          x:0,
          y:0
        },
        ddd:''
      }
    },
    mounted() {
      this.loadImg();
    },
    methods: {
      loadImg() {
        this.canvas = document.getElementById("myCanvas");
        if (this.canvas.getContext) {
          this.ctx = this.canvas.getContext("2d");
        }
        this.img = new Image();
        // this.img.setAttribute('crossOrigin','anonymous');
        this.img.src = "http://localhost:8085/ycy.jpg";
        this.img.onload = () => {
          this.drawImage(this.XY.x+this.endXY.x,this.XY.y+this.endXY.y);
        };
      },
      drawImage(x,y) {
        this.ctx.clearRect(0, 0, 1000, 240);
        this.ctx.drawImage(
          this.img,
          0, 0,
          this.img.width, this.img.height,
          x,y,
          this.img.width*this.scale/100, this.img.height*this.scale/100
        );
      },
      onMouseDown(e){
        this.isDown = true;
        this.startXY.x = e.offsetX;
        this.startXY.y = e.offsetY;
      },
      onMouseMove(e){
        if (this.isDown){
          this.XY.x = e.offsetX-this.startXY.x;
          this.XY.y = e.offsetY-this.startXY.y;
          this.drawImage(this.XY.x+this.endXY.x,this.XY.y+this.endXY.y);
        }
      },
      onMouseUp(){
        this.endXY.x = this.XY.x+this.endXY.x;
        this.endXY.y = this.XY.y+this.endXY.y;
        this.isDown = false;
      },
      onSave(){
        // console.log(this.canvas.toDataURL())
        this.ddd = this.canvas.toDataURL()
        Userservice.updateUser({user_cover:this.canvas.toDataURL()}).then(res=>{
          console.log(res)
        })
      }
    },
    watch:{
      scale(){
        this.drawImage(this.endXY.x,this.endXY.y);
      }
    }
  }
</script>
<style>
  .user-cover-editor {
    position: relative;
  }

  .user-cover-editor > .user-cover-wrap .editor-btn {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .dialog{
    background-color: white;
    position: absolute;
    top: 0;
  }
  .action {
    display: flex;
    justify-content: space-between;
  }
</style>
