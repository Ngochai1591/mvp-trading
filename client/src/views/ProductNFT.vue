<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-6">
        <div>
          <LazyYoutube :src="currentProduct.url" />
        </div>
      </div>

      <div class="column is-6">
        <h2 class="subtitle sub-color">Information</h2>
        <h1 class="title sub-color">
          {{ currentProduct.name }}
        </h1>
        <!-- <p>
          {{ currentProduct.description }}
        </p> -->
        <p>
          <strong class="price-color bigger-price">
            <u> ${{ currentProduct.price }} BNB</u></strong
          >
        </p>
        <div class="field has-addons mt-6">
          <div class="control">
            <a class="button is-dark" @click="buying()">
              SELECT AND BUY
            </a>
          </div>
        </div>
      </div>
      <div class="detail-div">
        COLLECTION DETAIL
        <i class="icon-right fas fa-arrow-down"></i>
        <div class="description">
          <!-- {{product.description}} -->
          Players: {{ currentProduct.players }} <br />
          Champions: {{ currentProduct.champions }} <br />
          Owner_id: {{ currentProduct.owner_id }} <br />
          Keywords: {{ currentProduct.keyWords }} <br />
          Locations: {{ currentProduct.locations }} <br />
          Teams: {{ currentProduct.teams }} <br />
          Tournaments: {{ currentProduct.tournaments }} <br />
          Popular Score: {{ currentProduct.popularScore }} <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { toast } from "bulma-toast";

import { LazyYoutube } from "vue-lazytube";




export default {
  name: "ProductNFT",
  components: {
    LazyYoutube
  },
  data() {
    return {
      isShowDetail: false
    };
  },
  computed: {
    ...mapState("product_nft", ["currentProduct"])
  },
  methods: {
    ...mapActions('product_nft', [
      "buyProduct"
    ]),
    async buying(){
      await this.buyProduct()

      let toast_message = null
     const error = this.$store.state.product_nft.error
      const success = this.$store.state.product_nft.success

    console.log(error)
    console.log(success)
    if (error) {
      toast_message = {
        message: error,
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right"
      };
    }

    if (success) {
      toast_message = {
        message: success,
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right"
      };
    }

    toast(toast_message)
    }

  //   async selectBuy(product){
  //       console.log("BUYING", product)
  //           const web3_account = new web3();
  //           // console.log("HOANBT", HOAN_PRIVATE_KEY)
  //           console.log("1")
  //           web3_account.eth.accounts.privateKeyToAccount(HOAN_PRIVATE_KEY);
  //           console.log("2")
  //           web3_account.eth.setProvider(PROVIDER);
  //           console.log("3")
  //           web3_account.eth.defaultAccount = HOAN_ADDRESS;
  //           console.log("4")


  //       console.log("START")
  //       // await this.enableSell(product.tokenId, BSC_TESTNET_ADDRESS, NFT_SMARTCONTRACT_ADDRESS, MIN_ABI, web3_account, HOAN_ADDRESS, HOAN_PRIVATE_KEY)
  //       console.log("STEP 1")
  //       // await this.approve(product.tokenId, CHUONG_ADDRESS, BSC_TESTNET_ADDRESS, NFT_SMARTCONTRACT_ADDRESS, MIN_ABI, web3_account, HOAN_PRIVATE_KEY, HOAN_ADDRESS)
  //       console.log("STEP 2")
  //       await this.buy(product.tokenId, BSC_TESTNET_ADDRESS, NFT_SMARTCONTRACT_ADDRESS, MIN_ABI, CHUONG_ADDRESS, CHUONG_PRIVATE_KEY,web3_account, HOAN_PRIVATE_KEY, HOAN_ADDRESS)
  //       console.log("DONE")
  //   },
  //   async buy(tokenId, bsc_testnet_address, nft_smartcontract_address, minABI, chuong_address, chuong_private_key,  web3_account, hoan_private_key, hoan_address) {
  //     const Contract = require("web3-eth-contract");

  //     Contract.setProvider(bsc_testnet_address);
  //     const contract = new Contract(minABI, nft_smartcontract_address);
  //     const  encodedABI = contract.methods.buy(tokenId).encodeABI();
  //     web3_account.eth.defaultaccount = chuong_address;
  //   //   const lastNonce = await web3_account.eth.getTransactionCount(hoan_address);
  //     const  tx = {
  //       value: 10000000000000000,
  //       gas: 2000000,
  //       data: encodedABI,
  //       to: nft_smartcontract_address,
  //       // nonce: lastNonce.toString()
  //     };
  //     console.log("CHUONG_KEY", chuong_private_key)
  //     console.log("HOAN_KEY", hoan_private_key)
  //     console.log("CHUONG_ADD", chuong_address)
  //     console.log("HOAN_ADD", hoan_address)
  //     await web3_account.eth.accounts.signTransaction(tx, chuong_private_key, async (err, hash) => {
  //       console.log("error", err, " hash: ", hash);
  //       await web3_account.eth.sendSignedTransaction(hash.rawTransaction, async (error, result) => { 
  //           if(!error){
  //               console.log("SEND_SIGN", result)
  //           }
  //           else{
  //               console.log("ERR_SEND_SIGN", error)
  //           }
  //       });
  //     });
  //   },

  //   async approve(tokenId, to,bsc_testnet_address, nft_smartcontract_address, minABI, web3_account, hoan_private_key, hoan_address) {
  //     const Contract = require("web3-eth-contract");

  //     Contract.setProvider(bsc_testnet_address);
  //     const contract = new Contract(minABI, nft_smartcontract_address);
  //     const encodedABI = contract.methods.approve(to, tokenId).encodeABI();
  //     // const owner =  contract.methods.createCollectible(tokenId).call();
  //     const lastNonce = await web3_account.eth.getTransactionCount(hoan_address);
  //     console.log("NONCE ", lastNonce);
  //     const tx = {
  //       gas: 2000000,
  //       nonce: lastNonce.toString(),
  //       data: encodedABI,
  //       to: nft_smartcontract_address
  //     };
  //     await web3_account.eth.accounts.signTransaction(tx, hoan_private_key, async (err, hash) => {
  //       await web3_account.eth.sendSignedTransaction(hash.rawTransaction);
  //     });
  //   },
  //   async enableSell(tokenId, bsc_testnet_address, nft_smartcontract_address, minABI, web3_account, hoan_address, hoan_private_key) {
  //     const Contract = require("web3-eth-contract");

  //     Contract.setProvider(bsc_testnet_address);
  //     const contract = new Contract(minABI, nft_smartcontract_address);
  //     const encodedABI = contract.methods.enableSell(tokenId).encodeABI();
  //     // const owner =  contract.methods.createCollectible(tokenId).call();
  //     const lastNonce = await web3_account.eth.getTransactionCount(hoan_address);
  //     console.log("NONCE ", lastNonce);
  //     const tx = {
  //       gas: 2000000,
  //       nonce: lastNonce.toString(),
  //       data: encodedABI,
  //       to: nft_smartcontract_address
  //     };
  //     await web3_account.eth.accounts.signTransaction(tx, hoan_private_key, async (err, hash) => {
  //       console.log("error", err, " hash: ", hash);
  //       await web3_account.eth.sendSignedTransaction(hash.rawTransaction);
  //     });
  //   }
  },

  mounted() {
    const default_string = " MVP| Top E-sport NFT trading";
    document.title = default_string;
  }
};
</script>
<style scoped lang="scss">
.sub-color {
  color: rgb(201, 206, 214);
}

.price-color {
  color: red;
}

.bigger-price {
  font-size: 50px;
}

.dropdown {
  width: 100%;

  .dropdown-menu {
    width: 100%;
  }

  .dropdown-trigger {
    width: 100%;

    button {
      width: 100%;
    }
  }
}

.detail-div {
  background-color: black;
  width: 100%;
  font-size: 30px;
  padding-left: 30px;
  text-align: left;
  font-family: Shapiro, sans-serif;

  .icon-right {
    float: right;
    padding-right: 10px;
    padding-top: 7px;
  }
}

.description {
  font-size: 15px;
  padding-top: 15px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 15px;
  // background-color: red;
}
</style>
