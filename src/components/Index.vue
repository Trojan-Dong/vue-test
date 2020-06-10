<template>
  <div id="body">
    <div>
      <ol>
        <li class="dirList" v-for="(novelInfo,index) in novelInfos" v-bind:key="index" v-if="index>((currentPage-1)*pageSize)&&index<currentPage*pageSize"
          v-on:click="switchPageto(novelInfo)">
          <span> {{ novelInfo.nName }} </span>
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
    name: 'Index',
    data() {
      return {
        totalPage: 0,
        isFirst: true,
        novelInfos: null,
        currentPage: 1,
        pageSize: 20,
        isDisplay: "none"
      }

    },
    methods: {
      switchPageto: function(novelInfo) {
        this.$router.push({
          path: 'chapter',
          query: {
            name: novelInfo.nName,
            url: encodeURI(novelInfo.nURL)
          }
        })
      },
      switchPage: function(currentPage) {
        this.currentPage = currentPage
      },
      getDirectory: function() {
        var app = this;
        var url = this.HOST + '/getDirectory';
        // console.log(url)
        axios
          .post(url, {
            "isFirst": app.isFirst
          })
          .then(function(response) {
            // console.log(response.data)
            var data = response.data;
            app.novelInfos = data.novelList;
            app.isFirst = false;
            app.totalPage = Math.ceil(data.totalCount / app.pageSize);
            app.isDisplay = "block";
          })
          .catch(function(error) {
            console.log(error);
          });
      }

    },
    mounted() {
      this.getDirectory();
      setTimeout(() => {
        this.getDirectory();
      }, 1000);
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
    margin: 1rem auto;
    color: #000000;
    text-align: center;
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
