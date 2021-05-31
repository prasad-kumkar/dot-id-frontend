<template>
    <div>
      <v-card class="pa-5 mt-10" dark>
        <v-card-title>Add Delegates</v-card-title>
        <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
            <v-text-field
                v-model="id"
                :counter="64"
                label="Identity"
                required
              ></v-text-field>
              <v-text-field
                v-model="address"
                :counter="48"
                label="Address"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="red" large dark class="align-item-center" @click="add()">add</v-btn>
              <p v-if="error" style="color: red" class="text-subtitle-2 mt-2">{{error}}</p>
            </v-col>

            <div v-if="tx.message || tx.events">
              <div class="text-body-2">{{tx.message}}</div>
              <div v-if="tx.events">
                <div v-for="event in tx.events" :key="event" class="text-caption">{{event}}</div>
              </div>
              
            </div>
          </v-row>
        </v-container>
      </v-form>
      <div>{{message}}</div>
      <div v-if="events.length>0">{{events}}</div>
      </v-card>
    </div>
</template>

<script>
const { ApiPromise, WsProvider} = require('@polkadot/api')

export default {
    data(){
      return {
        address: '',
        id: 'did:dotid:',
        error: null,
        message: null,
        events: []
      }
    },
    computed: {
      tx(){
        return this.$store.state.transactionStatus
      },
      user(){
          return this.$store.state.selectedAccount
      }
    },
    methods: {
      async add(){
        this.events = []
        this.message = []
        if(this.id.slice(0,10)!=='did:dotid:'){
          this.error = "Identity name should start with 'did:dotid:'"
          return
        }
        const provider = new WsProvider('ws://127.0.0.1:9944')
        const api = await ApiPromise.create({ provider});

        await api.tx.templateModule
        .addDelegate(this.address, this.id)
        .signAndSend(this.user, ({ events = [], status }) => {
        this.message = `Current status is ${status.type}`
        if (status.isFinalized) {
            
            // Loop through Vec<EventRecord> to display all events
            events.forEach(({ phase, event: { data, method, section } }) => {
            this.events.push(`${phase}: ${section}.${method}:: ${data}`);
            });
            
            this.message = `Transaction included at blockHash ${status.asFinalized}`
        }
        
        });
      }
    }
}
</script>

