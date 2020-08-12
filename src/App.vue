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
      },
      initWebSocket () {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage

        // 连接成功
        this.websocket.onopen = this.setOnopenMessage

        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage

        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload
      },
      setErrorMessage () {
        console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
      },
      setOnopenMessage () {
        console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
      },
      setOnmessageMessage (event) {
        // 根据服务器推送的消息做自己的业务处理
        console.log('服务端返回：' + event.data)
      },
      setOncloseMessage () {
        console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
      },
      onbeforeunload () {
        this.closeWebSocket()
      },
      closeWebSocket () {
        this.websocket.close()
      }
    },
    mounted() {
      // console.log('Hello world');
      // WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:80/novel/websocket/'+)
        this.initWebSocket()
      } else {
        alert('当前浏览器 Not support websocket')
      }
    },
    beforeDestroy () {
      this.onbeforeunload()
    },
    watch: {
      $route(e) {
        if (e.name == 'content' || e.name == 'contentTemp') {
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
