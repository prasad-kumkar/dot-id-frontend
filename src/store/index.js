import Vue from 'vue'
import Vuex from 'vuex'
const { ApiPromise, WsProvider, Keyring} = require('@polkadot/api')
const { web3Accounts, web3Enable } = require('@polkadot/extension-dapp');

const config = require('./config');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {},
    accounts: null,
    err: null
  },
  mutations: {
    CONNECT_SUCCESS(state, events){
      state.api.events = events
    },
    LOAD_ACCOUNTS(state, accounts){
      state.accounts = accounts
    },
    CONNECT_ERROR(state, err){
      state.err = err
    }
  },
  actions: {
    async connect({commit}){
      const provider = new WsProvider('ws://127.0.0.1:9944')
      var _api = new ApiPromise({provider})
      _api.on('connected', () => {
        console.log(_api)
        commit('CONNECT_SUCCESS', _api)
      });
      // _api.on('ready', () => commit({ type: 'CONNECT_SUCCESS' }));
      _api.on('error', err => commit('CONNECT_ERROR', err ));
      
      // api.query.palletDid.attributeOf(['5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', '0xae8332a4cc412577137d61e72634d8ae3a1c4ac7d03be1e3c5494ad194228e57'])

    },

    async loadAccounts({commit}){
    try {
      await web3Enable("Dot ID");
      let allAccounts = await web3Accounts();
      allAccounts = allAccounts.map(({ address, meta }) =>
        ({ address, meta: { ...meta, name: `${meta.name} (${meta.source})` } }));
      
      
      // keyring.loadAll({ isDevelopment: true }, allAccounts);
      commit('LOAD_ACCOUNTS', allAccounts);
    } catch (e) {
      console.error(e);
      commit('error', e);
    }
  },

  async loadDefaultAccounts({commit}){
    const keyring = new Keyring({ type: 'sr25519' });
    const accounts = []
    for (let i in config.accounts){
      accounts.push(keyring.addFromUri('//'+config.accounts[i], { name: config.accounts[i] }))
    }
    commit('LOAD_ACCOUNTS', accounts);
  }
  },
  modules: {
  }
})
