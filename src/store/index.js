import Vue from 'vue'
import Vuex from 'vuex'
const { ApiPromise, WsProvider, Keyring} = require('@polkadot/api')
const { web3Accounts, web3Enable } = require('@polkadot/extension-dapp');
const def = require('@polkadot/types/interfaces/system/definitions')
const {hexToString} = require('@polkadot/util')

const config = require('./config');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {},
    accounts: null,
    selectedAccount: null,
    err: null,
    transactionStatus: {message: null, events: null}
  },
  mutations: {
    CONNECT_SUCCESS(state, api){
      state.api = api
    },
    SELECT_ACCOUNT(state, account){
      state.selectedAccount = account
    },
    LOAD_ACCOUNTS(state, accounts){
      state.accounts = accounts
      state.selectedAccount = accounts[0]
    },
    CONNECT_ERROR(state, err){
      state.err = err
    },
    TX_UPDATE(state, tx){
      state.transactionStatus = tx
    },
    TX_CALL(state, update){
      state.transactionStatus.message = update
    },
    TX_DONE(state, {events, status}){
      state.transactionStatus.message = status
      state.transactionStatus.events = events
    },
    CLEAR_TX(state){
      state.transactionStatus.message = ''
      state.transactionStatus.events = ''
    },
  },
  actions: {
    async connect({commit}){
      const provider = new WsProvider('ws://127.0.0.1:9944')
      var _api = new ApiPromise({provider})
      return new Promise((resolve, reject) => {
        _api.on('connected', () => {
          console.log(_api)
          commit('CONNECT_SUCCESS', _api)
          resolve(_api)
        });
        // _api.on('ready', () => commit({ type: 'CONNECT_SUCCESS' }));
        _api.on('error', err =>{ 
          commit('CONNECT_ERROR', err ); 
          reject(err)
        });
      })
      
      
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
  },

  //
  //
  async claimIdentity({state, commit}, did){
    // commit('CLEAR_TX');

    console.log(did)
    const provider = new WsProvider('ws://127.0.0.1:9944')
    const api = await ApiPromise.create({ provider, types: {AccountInfo: def.default.types.AccountInfoWithProviders}});

    await api.tx.templateModule
    .createIdentity(did)
    .signAndSend(state.selectedAccount, ({ events = [], status }) => {
      
      if (status.isFinalized) {
        
        let eve = []
        // Loop through Vec<EventRecord> to display all events
        events.forEach(({ phase, event: { data, method, section } }) => {
         eve.push(`${phase}: ${section}.${method}:: ${data}`);
        });

        
        commit('TX_DONE', {events: eve, status: `Transaction included at blockHash ${status.asFinalized}`});
        
      }
      console.log(status)
      commit('TX_CALL', `Current status is ${status.type}`);
    });
  },

  async addAttribute({state, commit}, did){
    // commit('CLEAR_TX');

    console.log(did)
    const provider = new WsProvider('ws://127.0.0.1:9944')
    const api = await ApiPromise.create({ provider, types: {AccountInfo: def.default.types.AccountInfoWithProviders}});

    await api.tx.templateModule
    .createIdentity(did)
    .signAndSend(state.selectedAccount, ({ events = [], status }) => {
      
      if (status.isFinalized) {
        
        let eve = []
        // Loop through Vec<EventRecord> to display all events
        events.forEach(({ phase, event: { data, method, section } }) => {
         eve.push(`${phase}: ${section}.${method}:: ${data}`);
        });

        
        commit('TX_DONE', {events: eve, status: `Transaction included at blockHash ${status.asFinalized}`});
        
      }
      console.log(status)
      commit('TX_CALL', `Current status is ${status.type}`);
    });
  },

  async addDelegate({state, commit}, did){
    // commit('CLEAR_TX');

    console.log(did)
    const provider = new WsProvider('ws://127.0.0.1:9944')
    const api = await ApiPromise.create({ provider, types: {AccountInfo: def.default.types.AccountInfoWithProviders}});

    await api.tx.templateModule
    .createIdentity(did)
    .signAndSend(state.selectedAccount, ({ events = [], status }) => {
      
      if (status.isFinalized) {
        
        let eve = []
        // Loop through Vec<EventRecord> to display all events
        events.forEach(({ phase, event: { data, method, section } }) => {
         eve.push(`${phase}: ${section}.${method}:: ${data}`);
        });

        
        commit('TX_DONE', {events: eve, status: `Transaction included at blockHash ${status.asFinalized}`});
        
      }
      console.log(status)
      commit('TX_CALL', `Current status is ${status.type}`);
    });
  },

  async createCredential({state, commit}, did){
    // commit('CLEAR_TX');

    console.log(did)
    const provider = new WsProvider('ws://127.0.0.1:9944')
    const api = await ApiPromise.create({ provider, types: {AccountInfo: def.default.types.AccountInfoWithProviders}});

    await api.tx.templateModule
    .createIdentity(did)
    .signAndSend(state.selectedAccount, ({ events = [], status }) => {
      
      if (status.isFinalized) {
        
        let eve = []
        // Loop through Vec<EventRecord> to display all events
        events.forEach(({ phase, event: { data, method, section } }) => {
         eve.push(`${phase}: ${section}.${method}:: ${data}`);
        });

        
        commit('TX_DONE', {events: eve, status: `Transaction included at blockHash ${status.asFinalized}`});
        
      }
      console.log(status)
      commit('TX_CALL', `Current status is ${status.type}`);
    });
  },

  async queryOwner({commit}, did){
    console.log(did)
    commit('CLEAR_TX')
    const provider = new WsProvider('ws://127.0.0.1:9944')
    const api = await ApiPromise.create({ provider, types: {}});
    const unsub = await api.query.templateModule.ownerOf(did, (res) => {
      console.log(res.toString())
      unsub()
    });
  },

  async queryDids(){
    // commit('CLEAR_TX')
    const provider = new WsProvider('ws://127.0.0.1:9944')
    const api = await ApiPromise.create({ provider, types: {}});
    const unsub = await api.query.templateModule.credentialsBy('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', (res) => {
      for(let i in res){
        console.log(hexToString(res[i]))
      }
      unsub()
    });
  },

  },
  modules: {
  }
})
