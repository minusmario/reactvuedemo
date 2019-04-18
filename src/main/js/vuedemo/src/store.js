import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInput: '',
  },
  mutations: {
    setUserInput(state, payload){
      state.userInput = payload.textValue;
    }
  },
  actions: {},
});
