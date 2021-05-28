<template>
  <div>
    <!-- <vue-metamask userMessage="msg" @onComplete="onComplete"> </vue-metamask> -->
    Trying to connect to wallet
  </div>
</template>
<script>
// import VueMetamask from "vue-metamask";
import router from "../router";
import { toast } from "bulma-toast";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    // VueMetamask
  },
  async mounted() {
    console.log("mounted");
    console.log("CONNECTING TO WALLET");
    await this.connectToWallet();

    let toast_message = null;
    console.log(this.walletError);
    if (this.walletError) {
      console.log("Error", this.walletError);
      toast_message = {
        message: this.walletError,
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      };
    } else {
      toast_message = {
        message: "Wallet is connected",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      };

      router.push('/')
    }

    toast(toast_message);
  },
  data() {
    return {
      msg: "This is demo net work",
    };
  },
  computed: {
    ...mapState("authentication", ["walletID", "walletError"]),
  },
  methods: {
    ...mapActions("authentication", ["connectToWallet"]),
    // onComplete(data) {
    //   console.log("data:", data);
    //   this.connectToWallet(data.metaMaskAddress)
    //   router.push('/')
    // }
  },
};
</script>
