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
    <div style="clear: both; display: none;">
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
        // console.log(novelInfo)
        this.$router.push({
          name: 'chapter',
          params: {
            novelInfo: novelInfo
          }
        })
      }
    },
    mounted() {
      var app = this;
      var url = this.HOST + '/getDirectory';
      console.log(url)
      axios
        .post(url, {
          "isFirst": this.isFirst
        })
        .then(function(response) {
          console.log(response.data)
          var data = response.data;
          app.novelInfos = data.novelList;
          app.totalPage = Math.ceil(data.totalCount / app.pageSize);
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
