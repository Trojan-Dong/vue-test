<template>
  <div id="page">
    <div class="bookShelf">

      <div class="list" v-for="(list,index) in bookLists" v-bind:key="index"
           v-bind:class="list.readtime<list.lastUpdateTime?'haveRead':''">
        <div class="imageInfo"><img src="../assets/temp.png"></div>
        <div class="novelInfo">
          <div class="novelName">
            <span v-on:click="switchTo(list,1)"> {{ list.nName }} </span>
          </div>
          <div class="readInfo reading">
            <label>读至</label><span v-on:click="switchTo(list,2)"> {{list.chapterName}}</span>
          </div>
          <div class="readInfo updateTime">
            <label>更新时间:</label> <span>{{list.lastUpdateTime|formatDate}}</span>
          </div>
          <div class="readInfo updateTime">
            <label>最新章节:</label> <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    formatDate
  } from '../js/date.js'

  export default {
    name: 'BookShelf',
    data() {
      return {
        user: null,
        bookLists: null
      }
    },
    methods: {
      checkLogin: function () {
        var app = this;
        var user = this.$cookies.get("user");
        console.log(user)
        if (user == null || user == "") {
          this.$router.push({
            name: 'login',
            params: {
              sourceUrl: "bookShelf"
            }
          })
        } else {
          axios.post(app.HOST + '/findByUserId', {
            "id": user.userId
          }).then(function (res) {
            app.bookLists = res.data
          }).catch(function (error) {
            console.log(error)
          });
        }
        //判断是否登录
        // axios.post(this.HOST + '/loginCheck').then(function (res) {
        //   app.user = res.data;
        //   // console.log(r)
        //   if (app.user == null || app.user == "") {
        //     app.$router.push({
        //       name: 'login',
        //       params: {
        //         sourceUrl: "bookShelf"
        //       }
        //     })
        //   } else {
        //     // console.log(app.user.id)
        //     //发现用户下的书架记录
        //     axios.post(app.HOST + '/findByUserId', {
        //       "id": app.user.id
        //     }).then(function (res) {
        //       // console.log(res)
        //       app.bookLists = res.data
        //     }).catch(function (error) {
        //       console.log(error)
        //       // alert(error)
        //     });
        //   }
        // })
      },
      switchTo: function (data, type) {
        var path = "";
        var params = {};
        if (type == 1) {
          path = "chapter";
          params.name = data.nName;
          params.url = decodeURI(data.nUrl);
        } else {
          path = "content";
          params.url = decodeURI(data.chapterUrl)
        }
        this.$router.push({
          name: path,
          query: params
        })
      }
    },
    mounted() {
      this.checkLogin();
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    }
  }
</script>

<style>
  #page {
    margin-bottom: 20%;
  }

  .list {
    margin: 1rem 0 1rem 10%;
    font-size: 1.3rem;
    text-align: left;
  }

  .imageInfo {
    width: 30%;
    height: 8rem;
    background-color: #CCCCCC;
    float: left;
    clear: both;
    margin-right: 0.8rem;
  }

  .imageInfo img {
    width: 100%;
    height: 100%;
  }

  .novelInfo {
    font-size: 1rem;
    height: 8rem;
  }

  .novelName {
    font-size: 1.3rem;
  }

  .readInfo {
    height: 1rem;
    line-height: 1rem;
    overflow: hidden;
    margin: 0.8rem 0;
  }

  .haveRead {
    color: red;
  }
</style>
