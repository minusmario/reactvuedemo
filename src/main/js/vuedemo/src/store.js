import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInput: '',
    listData: [],
    flowData: {},
  },
  mutations: {
    setUserInput(state, payload) {
      state.userInput = payload.textValue;
    },
    takeListData(state, payload) {
      state.listData = payload.data;
    },
    takeFlowData(state, payload) {
      state.flowData = payload.data;
    },
  },
  actions: {
    getListData({ commit }) {
      axios.get('/example').then(function (res) {
        commit('takeListData', { data: res.data });
      });
    },
    getFlowData({ commit }, payload) {
      axios.get('/JSON/flow-diagram-example.json#' + payload.id).
      then(function (res) {
        commit('takeFlowData', { data: res.data });
      });
    },
  },
});
