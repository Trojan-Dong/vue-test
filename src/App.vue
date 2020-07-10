<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div id="footNav" v-if="displayNav">
      <table>
        <tr>
          <td v-on:click="toIndex()" class="icon indexIcon"><img src="./assets/index.png"></td>
          <td v-on:click="toBookShelf()" class="icon bookIcon"><img src="./assets/book.png"></td>
          <td v-on:click="toMyInfo()" class="icon infoIcon"><img src="./assets/login.png"></td>
        </tr>
      </table>
    </div>
    <router-view/>
  </div>
</template>
<script>
  // import VConsole from 'vconsole'
  // let vConsole = new VConsole()
  export default {
    name: 'App',
    data() {
      return {
        displayNav: true
      }
    },
    methods: {
      toIndex: function () {
        this.$router.push("/index");
      },
      toBookShelf: function () {
        this.$router.push("/bookShelf");
      },
      toMyInfo: function () {
        this.$router.push("/my");
      }
    },
    mounted() {
      // console.log('Hello world');
    },
    watch: {
      $route(e) {
        if (e.name == 'content') {
          this.displayNav = false;
        } else {
          this.displayNav = true;
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #footNav {
    margin: 0;
    position: fixed;
    width: 100%;
    bottom: 0%;
    left: 0%;
  }

  #footNav table {
    border-spacing: 0;
  }

  /**
 * 设置icon背景
 */
  .icon {
    background-color: aliceblue;
    margin: 0;
  }

  /**
 * 设置图片大小 填充td
 */
  .icon img {
    width: 30%;
  }
</style>
