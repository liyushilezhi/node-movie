// 帮助分类查询函数

import axios from 'axios'
const state = {
  category:'',
  mainnClass:''
};
const mutations = {
  SET_CATEGORY(state,payload){
    state.category=payload.class;
    state.mainnClass=payload.mainMenu;
  }
};
const actions = {
  setCategory({commit},params){
    let payload = params;
    commit("SET_CATEGORY",payload)
  }
};
const getters = {
  // 获取按更新状态的数据
  currentCategory:state => {
    return state.category
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}
