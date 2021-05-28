import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication'
import loading from './loading'
import product_nft from './product_nft'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: '/api',
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    authentication,
    loading,
    product_nft,
  },
});
