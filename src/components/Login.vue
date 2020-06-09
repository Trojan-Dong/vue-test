<template>
  <div id="page">
    <table>
      <tr>
        <td><label>用户名:</label></td>
        <td><input type="text" name="loginName" v-model="userName"></td>
      </tr>
      <tr>
        <td><label>密码:</label></td>
        <td><input type="password" name="password" v-model="password"></td>
      </tr>
      <tr>
        <td><button type="button" v-on:click="cancel()">取消</button></td>
        <td><button type="button" v-on:click="login()">登录</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "Login",
    data() {
      return {
        userName: "",
        password: ""
      }
    },
    methods: {
      login: function() {
        var app = this;
        var params = this.$route.query;
        console.log(params)
        axios.post(this.HOST + '/login', {
          "loginName": app.userName,
          "password": app.password
        }).then(function(res) {
          console.log(res)
          
          if (params.sourceUrl == null || params.sourceUrl == "") {
            params.sourceUrl = "index"
          }
          app.$router.push({
            name: params.sourceUrl,
            params: {

            }
          })
        }).catch(function(error) {
          console.debug(error);
          // alert(error);
        });
      },
      cancel: function() {
        this.$router.push("./index")
      }
    },
    mounted() {

    }
  }
</script>

<style>
</style>
