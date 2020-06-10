<template>
  <div id="login">
    <div class="login-logo"></div>
    <div class="login-menu">
      <table>
        <tr>
          <!--        <td><label>用户名:</label></td>-->
          <td><input class="qxs-ic_user qxs-icon" placeholder="用户名" type="text" name="loginName" v-model="userName">
          </td>
        </tr>
        <tr>
          <!--        <td><label>密码:</label></td>-->
          <td><input class="qxs-ic_password qxs-icon" placeholder="密码" type="password" name="password"
                     v-model="password">
          </td>
        </tr>
        <tr>
          <!--        <td>-->
          <!--          <button type="button" v-on:click="cancel()">取消</button>-->
          <!--        </td>-->
          <td>
            <button class="login-button" type="button" v-on:click="login()">登录</button>
          </td>
        </tr>
        <tr>
          <td class="login-tips"><span>忘记密码</span><span>立即注册</span></td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import "@/css/login.css";

  export default {
    name: "Login",
    data() {
      return {
        userName: "",
        password: ""
      }
    },
    methods: {
      login: function () {
        var app = this;
        var params = this.$route.params;
        axios.post(this.HOST + '/login', {
          "loginName": app.userName,
          "password": app.password
        }).then(function (res) {
          app.$cookies.set("user", {userId: res.data.id, userName: res.data.loginName});
          if (params.sourceUrl == null || params.sourceUrl == "") {
            params.sourceUrl = "index"
          }
          app.$router.push({
            name: "bookShelf",
            params: {}
          })
        }).catch(function (error) {
          console.debug(error);
        });
      },
      cancel: function () {
        this.$router.push("./index")
      }
    },
    mounted() {

    }
  }
</script>

<style>


  .login-logo {
    width: 100%;
    height: 200px;
    opacity: 0.2;
    background: url("../assets/passenger.jpg") no-repeat;
    background-size: 100% 100%;
    /*background-position: 3%;*/
  }

  .login-menu table {
    width: 90%;
    margin: 0px auto;
    border-spacing: 5px;
  }

  .qxs-icon {
    width: 80%;
    height: 35px;
    padding: 0 10%;
    border-radius: 5px;
    margin: 5px auto;
    border-color: #FFFFCC;
    border-width: 0.5px;
    border-right-color: #CCCCCC;
    border-bottom-color: #CCCCCC;
    font-size: 18px;
  }

  .qxs-icon::placeholder {
    font-size: 16px;
    font-style: italic;
  }

  .qxs-ic_user {
    background: url("../assets/login/user-login.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
  }

  .qxs-ic_password {
    background: url("../assets/login/pass-login.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    /*margin-bottom: 20px;*/
  }

  .login-button {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    background-color: blue;
    color: #FFFFFF;
  }

  .login-tips {
    font-size: 10px;
  }

  .login-tips span:nth-child(1) {
    float: left;
  }

  .login-tips span:nth-child(2) {
    float: right;
  }

</style>

