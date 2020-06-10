<template>
  <div id="body">
    <div>
      <ol>
        <li class="dirList" v-for="(chapterInfo,index) in chapterInfos" v-bind:key="index" v-if="index>=((currentPage-1)*pageSize)&&index<currentPage*pageSize"
          v-on:click="switchPageto(chapterInfo)">
          <span> {{ chapterInfo.chapterName }} </span>
        </li>
      </ol>
    </div>
    <div class="footNav-page" style="clear: both; " v-bind:style="{ display: isDisplay}">
      <table>
        <tr>
          <td><button v-on:click="switchPage(currentPage-1)">上一页</button></td>
          <td>第<input type="text" style="width: 25%;" v-model="currentPage" /><span>{{totalPage}}页</span></td>
          <td><button v-on:click="switchPage(currentPage+1)">下一页</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Chapter',
    data() {
      return {
        totalPage: 0,
        author: "",
        isFirst: true,
        chapterInfos: null,
        currentPage: 1,
        pageSize: 50,
        isDisplay: "none"
      }

    },
    methods: {
      switchPageto: function(chapter) {
        this.$router.push({
          path: 'Content',
          query: {
            url: encodeURI(chapter.chapterUrl)
          }
        })
      },
      switchPage: function(currentPage) {
        this.currentPage = currentPage
      }

    },
    mounted() {
      var app = this;
      var info = this.$route.query;
      console.log(info)
      var url = this.HOST + '/getChapter';
      axios
        .post(url, {
          "nName": info.name,
          "nURL": decodeURI(info.url)
        })
        .then(function(response) {
          // console.log(response.data)
          var data = response.data;
          app.chapterInfos = data.chapterInfo;
          app.author = data.author
          app.totalPage = Math.ceil(app.chapterInfos.length / app.pageSize);
          app.isDisplay = "block";
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
</script>

<style>
  #body {
    margin-bottom: 20%;
  }

  .dirList {
    list-style: none;
    width: 80%;
    margin: 1rem 0 1rem 20%;
    color: #000000;
    text-align: left;
    /* padding: 0px 30% */
  }

  .footNav-page table {
    width: 100%;
    border-spacing: 2%;
  }

  .footNav-page td {
    display: inline-block;
    background-color: #FFFFFF;
    width: 35%;
  }

  .footNav-page button {
    width: 100%;
  }

  .footNav-page td:nth-child(2) {
    width: 25%;
  }
</style>
