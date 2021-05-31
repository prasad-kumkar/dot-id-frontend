<template>
  <v-card class="pt-10">
    <v-toolbar flat color="red" dark>
      <v-toolbar-title>Verifiable Credentials</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical color="red" class="pt-5">
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        New Credential
      </v-tab>
      <v-tab>
        <v-icon left> mdi-lock </v-icon>
        Sign Credential
      </v-tab>
      <v-tab>
        <v-icon left> mdi-eye </v-icon>
        Verify Credential
      </v-tab>

      <v-tab-item class="pa-10">
        <v-card flat>
          <v-form>
            <v-text-field label="Credential ID" v-model="cred.id">
            </v-text-field>
            <v-text-field label="Key" v-model="cred.name"> </v-text-field>
            <v-text-field label="Value" v-model="cred.value"> </v-text-field>
            <v-btn color="red" dark @click="newCred()">Create</v-btn>
          </v-form>

        </v-card>
      </v-tab-item>
      <v-tab-item class="pa-10">
        <v-card flat>
          <v-form>
            <v-text-field label="Credential ID" v-model="sign.id">
            </v-text-field>
            <v-text-field label="Account ID" v-model="sign.for"> </v-text-field>
            <v-btn color="red" dark @click="signCredential()">Sign</v-btn>
            <div v-if="signed">{{ signed }}</div>
          </v-form>
  
        </v-card>
      </v-tab-item>
      <v-tab-item class="pa-10">
        <v-card flat>
          <v-form>
            <v-text-field label="Credential ID" v-model="verify.id">
            </v-text-field>
            <v-text-field label="Signature" v-model="verify.sig">
            </v-text-field>

            <v-btn color="red" dark @click="verifySignature()">Verify</v-btn>
            <div v-if="signed">{{ signed }}</div>
          </v-form>

        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="pa-5">
        <v-card-title>Signature</v-card-title>
        <v-card-text>
          <v-card-subtitle>{{ message }}</v-card-subtitle>
        </v-card-text>
      </v-card>
    </v-dialog>

		<div class="text-body-2">{{message}}</div>
		<div v-if="events.length>0">
			<div v-for="event in events" :key="event" class="text-caption">{{event}}</div>
		</div>
			
  </v-card>
</template>

<script>
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { signatureVerify } from "@polkadot/util-crypto";
const { ApiPromise, WsProvider} = require('@polkadot/api')

export default {
  data() {
    return {
      name: "did:dotid:",
      cred: {
        id: "did:dotid:",
        name: null,
        value: null,
      },
      sign: {
        id: "did:dotid:",
        for: null,
      },
      verify: {
        sig: null,
        id: 'did:dotid:',
      },
      signed: null,
      dialog: false,
      message: null,
			error: null,
			events: []
    };
  },
  computed: {
    user() {
      return this.$store.state.selectedAccount;
    },
  },
  methods: {
    async newCred() {
      if (this.cred.id.slice(0, 10) !== "did:dotid:") {
        this.error = "Identity name should start with 'did:dotid:'";
        return;
      }

			const provider = new WsProvider('ws://127.0.0.1:9944')
      const api = await ApiPromise.create({ provider});

      const unsub = await api.tx.templateModule
			.createIdentity(this.cred.id)
			.signAndSend(this.user, async({ events = [], status }) => {
				
				if (status.isFinalized) {
					let failed = false;
					// Loop through Vec<EventRecord> to display all events
					events.forEach(({ phase, event: { data, method, section } }) => {
					this.events.push(`Phase: ${phase} \n Section: ${section} \n Method: ${method} \n Data: ${data}`);
					if(method=='ExtrinsicFailed'){
						failed = true
					}
					});
					
					if(!failed){
						await api.tx.templateModule
						.addAttribute(this.cred.id, this.cred.name, this.cred.value)
						.signAndSend(this.user, ({ events = [], status }) => {
						this.message = `Current status is ${status.type}`
						if (status.isFinalized) {
								
								// Loop through Vec<EventRecord> to display all events
								events.forEach(({ phase, event: { data, method, section } }) => {
								this.events.push(`${phase}: ${section}.${method}:: ${data}`);
								});
								
								this.message = `Transaction included at blockHash ${status.asFinalized}`
								return
						}
							
							});
					}

					unsub()
					
				}
				console.log(`Current status is ${status.type}`)
			});

			
    },
    signCredential() {
      if (this.sign.id.slice(0, 10) !== "did:dotid:") {
        this.error = "Identity name should start with 'did:dotid:'";
        return;
      }
      let cred = stringToU8a("thisignCred");
      let signature = this.user.sign(cred);
      this.message = u8aToHex(signature);
      this.dialog = true;
    },
    async verifySignature() {
      let signature = this.verify.sig;
      let cred = this.verify.id;
			const provider = new WsProvider('ws://127.0.0.1:9944')
			const api = await ApiPromise.create({ provider, types: {}});
			const unsub = await api.query.templateModule.ownerOf(cred, (res) => {
				console.log(res)
				let isValid = signatureVerify(cred, signature, res.toString());
				this.message = `The signature ${u8aToHex(signature)}, is ${isValid ? "" : "in"}valid`;
				this.dialog = true;
				unsub()
			});      
    },
  },
};
</script>