<template>
  <div class="home">
  <div class="pa-10 pt-10 text-center">
    <div class="text-h4">Welcome to DOT ID</div>
    <div class=" pt-2 text-subtitle-1">Identity Blockchain on Polkadot</div>
  </div>
    <div class="d-flex flex-wrap justify-center">
      <v-card dark color="red" class="ma-5" to="/identity" max-width="500px"> 
        <v-img src="https://www.w3.org/TR/did-core/diagrams/parts-of-a-did.svg"></v-img>
        <v-card-title>Naming Service</v-card-title>
        <v-card-subtitle>Manage identites easily with dedicated Naming Service on parachain</v-card-subtitle>
      </v-card>
      <v-card dark color="red" class="ma-5" to="/vc"  max-width="500px"> 
        <v-img src="https://didproject.azurewebsites.net/images/issuer-verifier.png"></v-img>
        <v-card-title>Verifiable Credentials</v-card-title>
        <v-card-subtitle>Create verifiable credentials using DOTID domain with public key verification</v-card-subtitle>
      </v-card>
      <v-card dark color="red" class="ma-5" to="/delegation" max-width="500px"> 
        <v-img  src="https://2firkl1qsbue2ashgy21ze4i-wpengine.netdna-ssl.com/wp-content/uploads/The_art_of_delegation1200x600-848x400.png"></v-img>
        <v-card-title>Account delegation</v-card-title>
        <v-card-subtitle>Delegate access to your account to other address for particular access or execution of resources</v-card-subtitle>
      </v-card>
      <v-card dark color="red" class="ma-5" to="/attributes" max-width="500px"> 
        <v-img src="https://www.gatevidyalay.com/wp-content/uploads/2018/06/Key-Attributes-Example.png"></v-img>
        <v-card-title>Identity Attributes</v-card-title>
        <v-card-subtitle>Assign and revoke attributes to identities which could be verified by other blockchains on parachain</v-card-subtitle>
      </v-card>
      <v-card dark color="red" class="ma-5" to="/kms" max-width="500px"> 
        <v-img src="https://cdn.helpsystems.com/styles/gallery_rectangle/storage-api-public/key-management-img.jpg"></v-img>
        <v-card-title>Access Control</v-card-title>
        <v-card-subtitle>Access control with Decentralized Key Management System on parachaiin</v-card-subtitle>
      </v-card>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    connect() {this.$store.dispatch('connect')},
    loadAccounts() {this.$store.dispatch('loadAccounts')},
    loadDefaultAccounts() {this.$store.dispatch('loadDefaultAccounts')}
  }
}
</script>
