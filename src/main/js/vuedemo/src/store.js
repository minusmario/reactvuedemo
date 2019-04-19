import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInput: '',
    listData: [],
  },
  mutations: {
    setUserInput(state, payload) {
      state.userInput = payload.textValue;
    },
    takeListData(state, payload) {
      state.listData = payload.listData;
    },
  },
  actions: {
    getListData({ commit }) {
      axios.get('/example').then(function (res) {
        commit('takeListData', { listData: res.data });
      });
    },
  },
});
