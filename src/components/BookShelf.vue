<template>
  <div id="page">
    <div class="bookShelf">
      <ol>
        <li class="list" v-for="(list,index) in bookLists" v-bind:key="index" v-bind:class="list.readtime<list.lastUpdateTime?'haveRead':''">
          <p>
            <span v-on:click="switchTo(list,1)"> {{ list.nName }} </span>
          </p>
          <p class="readInfo">
            <label style="display: block">更新时间:</label> <span>{{list.lastUpdateTime|formatDate}}</span>
          </p>
          <p class="readInfo">
            <span v-on:click="switchTo(list,2)"> {{list.chapterName}}</span>
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { formatDate } from '../js/date.js'
  export default {
    name: 'BookShelf',
    data() {
      return {
        user: null,
        bookLists: null
      }
    },
    methods: {
      checkLogin: function() {
        var app = this;
        //判断是否登录
        axios.post(this.HOST + '/loginCheck').then(function(res) {
          app.user = res.data;
          // console.log(r)
          if (app.user == null || app.user == "") {
            app.$router.push({
              name: 'login',
              params: {
                sourceUrl: "bookShelf"
              }
            })
          } else {
            console.log(app.user.id)
            //发现用户下的书架记录
            axios.post(app.HOST + '/findByUserId', {
              "id": app.user.id
            }).then(function(res) {
              app.bookLists = res.data
            }).catch(function(error) {
              console.log(error)
              // alert(error)
            });
          }
        })
      },
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
  .bookShelf ol {
    list-style: none;
  }
</style>
