<template>
  <div id="page">
    <div id="nav" style="position: fixed;width: 10%;top: 45%;left: 0;">
      <table class="navTable">
        <tr>
          <td><span v-on:click="goToIndex()">首<br />页
            </span></td>
        </tr>
        <tr>
          <td><span v-on:click="switchPageto(chapterListUrl,true)">目<br />录
            </span></td>
        </tr>
        <tr>
          <td><span v-on:click="setting()">设<br />置
            </span></td>
        </tr>
        <tr>
          <td><span v-on:click="toBookShelf()">书<br />架
            </span></td>
        </tr>
      </table>
    </div>
    <div id="setting" class="setting" v-bind:style="{display:settingDisplay}">
      <table>
        <tr>
          <td><span v-on:click="changeSize('sub','font')">-</span></td>
          <td>字体大小</td>
          <td> <span v-on:click="changeSize('add','font')">+</span></td>
        </tr>
        <tr>
          <td><span v-on:click="changeSize('sub','line')">-</span></td>
          <td>行间距</td>
          <td><span v-on:click="changeSize('add','line')">+</span></td>
        </tr>
        <!-- <tr>
          <td><span style="float: left;" v-on:click="cancel()">取消</span></td>
          <td> &nbsp;</td>
          <td><span v-on:click="save()">保存</span></td>
        </tr> -->
      </table>
    </div>
    <h1>{{chapterName}}</h1>
    <p id="content" class="content" v-html="content" v-bind:style="{lineHeight: fontSize*multLine+'rem',
    fontSize: fontSize+'rem'}"></p>
    <div id="footNav-content" v-bind:style="{ display: isDisplay}">
      <button v-on:click="switchPageto(preChapterUrl,false)">上一章</button>
      <!-- <span v-on:click="switchPageto(chapterListUrl,true)">目录</span>
      <span v-on:click="goToIndex()">首页</span> -->
      <button v-on:click="switchPageto(nextChapterUrl,false)">下一章</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import $ from 'jquery';
  export default {
    name: 'Content',
    data() {
      return {
        content: null,
        chapterName: null,
        isDisplay: 'none',
        preChapterUrl: '',
        chapterListUrl: '',
        nextChapterUrl: '',
        fontSize: 1.2,
        multLine: 2.5,
        settingDisplay: "none"
      }

    },
    methods: {
      switchPageto: function(url) {
        alert("a");
        var path = "";
        if (url.startsWith(this.sourceUrl)) {
          path = "Chapter"
        } else {
          url = this.sourceUrl + url;
          if (url == this.chapterListUrl) {
            path = "Chapter"
          } else {
            path = "Content"
          }

        }
        this.$router.push({
          path: path,
          query: {
            url: url
          }
        });
        this.$router.go(0);
      },
      goToIndex: function() {
        this.$router.push('/index')
      },
      setting: function() {
        if (this.settingDisplay == "block") {
          this.settingDisplay = "none"
        } else {
          this.settingDisplay = "block"
        }

      },
      changeSize: function(act, type) {

        if ("sub" == act) {
          if (type == "font") {

            this.fontSize -= 0.5
          } else {
            this.multLine -= 0.5;
            if (this.multLine <= 1) {
              this.multLine += 0.5;
              this.multLine += 0.5;
            }
          }
        } else {
          if (type == "font") {
            this.fontSize += 0.5
          } else {
            this.multLine += 0.5;
          }
        }
      },
      save: function() {
        this.settingDisplay = "none"
      },
      cancel: function() {
        this.settingDisplay = "none"
      },
      toBookShelf: function() {
        this.$router.push("/bookShelf")
      }

    },
    mounted() {
      var app = this;
      var info = this.$route.query;
      // console.log(info)
      var url = this.HOST + '/getNovelContent';
      axios
        .post(url, {
          "chapterUrl": decodeURI(info.url)
        })
        .then(function(response) {
          var data = response.data;
          app.content = data.content.replace(/<br\s*\/>/g, 'temp').replace(/temp\s*temp/g, '<br />');
          app.isDisplay = "block";
          app.chapterName = data.chapterName;
          app.preChapterUrl = data.preChapterUrl;
          app.nextChapterUrl = data.nextChapterUrl;
          app.chapterListUrl = data.chapterListUrl;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
</script>

<style>
  .content {
    margin: 0px 5% 0px 10%;
    text-align: left;
  }

  #nav {
    background: #FFFFCC;
  }

  #footNav-content {
    display: none;
  }

  .navTable {
    margin: 0;
    padding: 0;
    font-style: italic;
  }

  .navTable table {
    margin-left: 0;
    border-spacing: 0.5rem;
  }

  .setting {
    position: fixed;
    width: 80%;
    height: 10rem;
    top: 45%;
    left: 10%;
    background-color: #FFFFFF;
    font-size: 1.5rem;
  }

  .setting table {
    margin: 0.5rem auto;
    border-spacing: 1.5rem;

  }

  .setting table td {
    text-align-last: justify;
  }

  #footNav-content {
    font-size: 1.5rem;
    color: #2C3E50;
  }

  #footNav-content span {
    display: inline-block;
    width: 45%;
    height: 1rem;
    font-style: italic;
    font-weight: bold;
  }

  /* .setting span {
    display: inline-block;
    width: 1rem;
    margin: 1rem 2rem;
  } */
</style>
