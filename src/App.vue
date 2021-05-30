<template>
  <v-app>
    <Header/>

    <v-main>
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
  </v-app>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  },

  data: () => ({
    //
  }),
};
</script>
