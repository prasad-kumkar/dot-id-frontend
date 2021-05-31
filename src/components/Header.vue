<template>
  <div class="overflow-hidden">
    <v-app-bar
      color="#FFFFFF" 
    >
      <img src="https://i.ibb.co/XbqVqfT/logo-cropped-1.png" alt="logo" style=" width: 180px; margin-left: 50px">
      <v-spacer></v-spacer>

        <v-tabs align-with-title color='red'>
          <v-tab to="/">Home</v-tab>
          <v-menu
            v-model="showMenu"
            transition="slide-y-transition"
            bottom
            
            open-on-click
            >
            <template v-slot:activator="{ on, attrs }">
                <v-tab v-on="on" v-bind="attrs">Features</v-tab>
            </template>

            <v-list>
                <div class="text-subtitle-2 ml-4">Features</div>
                <v-list-item
                v-for="(item, index) in items"
                :key="index" @click="true"
                :to="item.href"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
          <v-tab to="/profile">Profile</v-tab>
        </v-tabs>
      <v-btn text v-on:click="dialog=true" v-if="!accounts">
        <v-icon>mdi-account</v-icon>
        connect
      </v-btn>

        <v-menu v-else>
            <template v-slot:activator="{ on, attrs }">
            <v-btn text v-on="on" v-bind="attrs">
                <v-icon>mdi-account</v-icon>
                
                {{selectedAccount.meta.name}}
            </v-btn>
            </template>
            <v-list>
                <div class="text-subtitle-2 ml-4">Select Account</div>
                <v-list-item
                v-for="(item, index) in accounts"
                :key="index" @click="true"
                v-on:click="selectAccount(item)"
                >
                <v-list-item-title>{{ item.meta.name }}</v-list-item-title>
                <v-list-item-title>{{ item.address }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
      

      <v-btn icon to="">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
        
    </v-app-bar>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
    <v-card @click="loadDefaultAccounts" class="pa-5">
        <v-card-title class="headline">
          Default accounts
        </v-card-title>

        <v-card-text>
          RECOMMENDED Use preset default test accounts
        </v-card-text>

      </v-card>
      
      <br/>
      <p style="text-align: center; color: white">OR</p>
      <br/>

      <v-card @click="loadAccounts" class="pa-5" disabled>
        <v-img src="https://polkadot.js.org/extension/logo.jpg" class="ma-5"></v-img>

        <v-card-text>
          Use Polkadot extension
        </v-card-text>

      </v-card>
      
    </v-dialog>
  </div>
</template>

<script>
// import mapState from 'vuex';
export default {
    data() {
        return{
            dialog: false,
            showMenu: false,
            items: [
                { title: 'Identity', href: '/identity'},
                { title: 'Attributes', href: '/attributes' },
                { title: 'Delegates', href: '/delegates' },
                { title: 'Verifiable Credentials', href: '/vc' },
            ],
            
        }
    },
    computed: {
        accounts(){
            return this.$store.state.accounts
        },
        selectedAccount(){
            return this.$store.state.selectedAccount
        }
    },
    methods: {
    connect() {
        this.dialog = false;
        this.$store.dispatch('connect')},
    loadAccounts() {
        this.connect()
        this.dialog = false;
        this.$store.dispatch('loadAccounts')
        },
    loadDefaultAccounts() {
        this.connect()
        this.dialog = false;
        this.$store.dispatch('loadDefaultAccounts')},
    selectAccount(account){
        this.$store.commit('SELECT_ACCOUNT', account)
    }
  }
}
</script>