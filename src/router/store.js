import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const state = {
  user: {},
  perdata: {},
  wechatUser: {},
  drafts: {
    profile: {}
  }
}

const mutations = {
  login(state, user) {
    state.user = user;
  },
  logout(state) {
    state.user = {};
    state.wechatUser = {};
  },
  update(sate, perdata) {
    state.perdata = _.extend({}, perdata);
  },
  initialiseStore(state) {
    // console.log("store 执行 initialiseStore");
    // Check if the ID exists
    if(localStorage.getItem('store')) {
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      );
    }
  }
}

const store = new Vuex.Store({
  state,
  mutations,
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
})


export default store;
