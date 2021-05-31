<template>
<div>
    <div class="pa-5">
        <div class="text-h5">{{user.meta.name}}</div>
        <div class="text-h6">{{user.address}}</div>
    </div>
    <v-btn dark color="red" v-on:click="queryDids()"><v-icon>{{lockicon}}</v-icon> ' my creds </v-btn>
    
    <v-simple-table dark class="mt-10">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>

        </tr>
      </thead>
      <tbody>
        <tr
          v-for="did in dids"
          :key="did"
        >
          <td >{{ did }}</td>
            <v-btn text>add delegates</v-btn>
            <v-btn text>add attributes</v-btn>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</div>
</template>

<script>
const { ApiPromise, WsProvider} = require('@polkadot/api')

export default {
    data(){
        return{
            dids: [],
            lockicon: 'mdi-lock'
        }
    },
    computed: {
        user(){
            return this.$store.state.selectedAccount
        }
    },
    methods: {
        async queryDids(){
            this.dids = []
            const provider = new WsProvider('ws://127.0.0.1:9944')
            const api = await ApiPromise.create({ provider, types: {}});
            const unsub = await api.query.templateModule.credentialsBy(this.user.address, (res) => {                
            for(let i=0; i<res.length; i++){
                this.dids.push(this.hexToString(res[i]))
            }
            unsub()
            });
            this.lockicon = 'mdi-lock-open-variant'
        },
        hexToString (hex) {
            var string = '';
            for (var i in hex) {
                string+=String.fromCharCode(hex[i])
            }
            return string;
        }
    }
}
</script>