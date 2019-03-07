<template>
  <div id="signup">
    <div class="wrap" style="text-align: center;padding-top: 30px">
      <!--<img src="./../assets/logo.png" style="width: 140px" alt="" class="logo">-->
      <p style="font-size: 50px;color: var(--main-color)">超越</p>
      <p style="margin-top: 15px;margin-bottom:15px;color: var(--main-color);font-size: 22px;text-align: center">
        {{mode==-1?'登录':'注册'}}新用户，发现更多超越的话题</p>

      <!--login-->
      <div class="login-form" v-show="mode==-1">
        <el-form style="text-align: center">
          <el-form-item>
            <el-input style="width: 352px" v-model="ruleForm.user_phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 352px" v-model="ruleForm.user_password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" @click="onClickLoginBtn(ruleForm.user_phone,ruleForm.user_password)">
          登录
        </div>
      </div>

      <!--reg-->
      <div class="reg-form" v-show="mode==1">
        <el-form style="text-align: center">
          <el-form-item>
            <el-input style="width: 352px" v-model="ruleForm.user_phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 352px" v-model="ruleForm.user_password" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" @click="onClickLoginBtn(ruleForm.user_phone,ruleForm.user_password)">
          注册
        </div>
      </div>
      <div class="reg-form"></div>
      <div class="switch">
        <p>
          {{mode==-1?'没有账号？':'已有账号？'}}
          <span
            @click="onClickSwitch"
            style="cursor: pointer;color: #175199">{{mode==-1?'注册':'登录'}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import AuthService from './../service/auth'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        mode:-1,
        ruleForm: {
          user_phone: '',
          user_password: '',
        }
      }
    },
    methods: {
      ...mapActions(['login']),
      onClickLoginBtn(user_phone, user_password) {
        AuthService.login(user_phone, user_password).then(res => {
          this.$message({
            message: '手机号、密码校验通过，登录成功！',
            type: 'success'
          });
          this.login(res);
          setTimeout(() => {
            this.$router.push({path: '/people'})
          }, 200)
        }).catch(error => {
          this.$message.error(error);
        })
      },
      onClickSwitch(){
        this.mode=-this.mode
      }
    }
  }
</script>
<style>
  #signup {
    width: 100vw;
    height: 100vh;
    min-height: 500px;
    background-image: url("./../assets/ycy-bg.jpg");
    background-position: center;
    padding-top: 50px;
    box-sizing: border-box;
  }

  #signup > .wrap {
    width: 432px;
    background-color: white;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #signup > .wrap .btn {
    width: 352px;
    line-height: 36px;
    background-color: var(--main-color);
    color: white;
    text-align: center;
    margin-bottom: 30px;
  }

  #signup > .wrap .switch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #F6F6F6;
    line-height: 58px;
    text-align: center;
    border-top: 1px solid #EBEBEB;
    font-size: 16px;
  }
</style>
