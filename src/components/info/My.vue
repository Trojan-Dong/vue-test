<template>
  <div id="info">
    <table>
      <tr>
        <td>用户名:</td>
      </tr>
      <tr>
        <td>
          <button v-on:click="logOut()">注销登录</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "My",
    data() {
      return {}
    },
    methods: {
      logOut: function () {
        this.$cookies.remove("user");
        this.$router.push("/login");
      }
    },
    mounted() {

    }
  }
</script>

<style>
</style>
