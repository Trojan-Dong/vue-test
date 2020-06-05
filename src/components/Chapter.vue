<template>
<div>{{totalPage}}</div>
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
          app.totalPage = Math.ceil(data.chapterInfo.length / app.pageSize);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
</script>

<style>
</style>
