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
    <div style="clear: both; display: none;" v-bind:style="{ display: isDisplay}">
      <button v-on:click="switchPage(currentPage-1)">上一页</button>
      <button v-on:click="switchPage(currentPage+1)">下一页</button>
      <span>当前第{{currentPage}}页</span>
      <span>共{{totalPage}}页</span>
      <br />
      <button>跳转到</button><input type="text" style="width: 35%;" />页
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
        pageSize: 20,
        isDisplay: "none"
      }

    },
    methods: {
      switchPageto: function() {
        // this.$router.push('/test')
      }
    },
    mounted() {
      var app = this;

      var info = this.$route.params.novelInfo;
      console.log(info);
      var url = this.HOST + '/getChapter';
      console.log(url)
      axios
        .post(url, {
          "nName": info.nName,
          "nURL": info.nURL
        })
        .then(function(response) {
          console.log(response.data)
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
  .dirList {
    list-style: none;
    float: left;
    width: 49%;
    margin-bottom: 15px;
    color: #000000;
  }
</style>
