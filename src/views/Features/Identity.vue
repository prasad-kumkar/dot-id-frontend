<template>
    <div>
      <v-card class="pa-5 mt-10">
        <v-card-title>Create your unique identity identifier</v-card-title>
        <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="name"
                :counter="10"
                label="Identity Name"
                required
                placeholder='did:dotid:'
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn color='red' large dark class="align-item-center" v-on:click="claim()">create</v-btn>
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
      </v-card>
    </div>
</template>

<script>
export default {
    data(){
      return {
        name: 'did:dotid:',
        error: null
      }
    },
    computed: {
      tx(){
        return this.$store.state.transactionStatus
      }
    },
    methods: {
      claim(){
        if(this.name.slice(0,10)!=='did:dotid:'){
          this.error = "Identity name should start with 'did:dotid:'"
          return
        }
        this.$store.dispatch('claimIdentity', this.name)      
      }
    }
}
</script>