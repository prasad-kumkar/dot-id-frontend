<template>
  <v-app>
    <Header/>

    <v-main v-if="user">
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="100%"
    >
      <v-container style="height: 100%;">
      <router-view/>
      </v-container>
    </v-sheet>
      
    </v-main>
    <div v-else>
      <div class="text-h4 ml-10 mt-10">Please connect your wallet</div>
      <div class="text-subtitle-1 ml-10">You need to connect your wallet account to interact with the app</div>
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    user(){
      return this.$store.state.selectedAccount
    }
  },
  data: () => ({
    //
  }),
};
</script>
