<template>
  <div class="container">
    <el-row>
      <el-col :span="14" class="header" :offset="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的推荐</span>
          </div>
          <div  class="content"  v-show="!this.$store.state.login.currentUser.getUserToken()">
            <p>您必须登录，才能在此看到推荐内容。</p>
            <el-button type="primary" @click="handle">登录</el-button>
          </div>
          <div v-show="this.$store.state.login.currentUser.getUserToken()&&data.length == 0" class="content">
            <p>暂无推荐(你还没浏览过哦,浏览你喜欢的内容，你将会收到推荐 ^_^)</p>
          </div>
           <div v-show="this.$store.state.login.currentUser.getUserToken()&&data.length > 0" class="content">
            <div class="dingyue_wrap">
              <div class="dingyueItems" v-for="(item,index) in data" :key="index">
                 <router-link :to="{name:'detail',params:{id:item.id}}">
                   <img :src="data[index].img" alt="" class="images">
                 </router-link>
                <div class="text">
                  <router-link :to="{name:'detail',params:{id:item.id}}" class="title">{{item.name}}</router-link>
                  <p>类型: {{item.category}}</p>
                  <p>订阅数: {{item.dingyue}}</p>
                  <p>时间: {{item.time}}</p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>  
    </el-row>
    <Login :dialogVisible="show"></Login>
  </div>
</template>
<script>
import Login from '@/components/common/login.vue'
import {mapState,mapActions} from 'vuex';
import axios from 'axios'
export default {
  components:{
    Login
  },
  data(){
    return{
      show:'',
      data:''
    }
  },
  computed:{
    ...mapState([
      show=>state.dialog.dialogVisible
    ]),
  },
  mounted(){
    this.getUserSub();
  },
  methods:{
    ...mapActions(['handle']),
    getUserSub(){
      let uid = localStorage.getItem('id')
      if(!uid){
        return
      }
      axios.get('/api/userLikes',{
        params:{
          uid:uid
        }
      })
      .then(res=>{
        this.data = res.data.data
      }) 
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  margin-bottom: 15px;
  .dingyue_wrap{
    width: 100%;
  }
  .dingyueItems{
    width: 23.3%;
    height: 100px;
    border:1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    float: left;
    margin-right: 16px;
    margin-bottom: 15px;
    transition: all .3s;
    &:hover{
      transform: scale(1.12)
    }
    .images{
      width: 28%;
      height: 100px;
      float: left;
      border-radius: 5px;
    }
    .text{
      width: 72%;
      height: 100px;
      float: left;
      padding: 5px 10px;
      box-sizing: border-box;
      .title{
        text-align: left;
        font-size: 18px;
        color:#000;
        font-weight: bold;
        display: block;
        transition: all .2s;
        margin-bottom: 5px;
        &:hover{
          color: salmon;
        }
      }
      p{
        font-size: 14px;
        text-align: left;
        color:#666;
      }
    }
  }
}
.content{
  text-align: center;
  .el-button{
    margin-top: 20px;
  }
}
</style>

