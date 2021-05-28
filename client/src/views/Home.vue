<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <!-- <p class="title mb-6">Welcome to MVP</p> -->
        <img src="https://lh5.googleusercontent.com/Ja0yCw81LMzaCw8JcfKt6i8QnEYr0r9y1ZwSjr3kwHGIvhpVSia-usYXEB4B0NpwxsXAoZmyaEdFjLO3evyH1DyfTebRNoyeTwYL2K_OFNbCcqFO398SzYbiPA_kFJ3VcLit2G4QzJ4"/>                
        <p class="subtitle"> best E-sport NFT trading on Binance Smart Chain</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-3 has-text-centered">Latest Products</h2>
      </div>

    
      <ProductNFTBox 
        v-for="product in products"
        :key="product.tokenId"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from "vuex";
import ProductNFTBox from '@/components/ProductNFTBox.vue';
import axios from 'axios'


const Contract = require("web3-eth-contract");

const PROVIDER = "https://data-seed-prebsc-2-s2.binance.org:8545"
// const BSC_TESTNET_ADDRESS = 'https://data-seed-prebsc-1-s1.binance.org:8545'
// const HOAN_ADDRESS = '0xc24BC060a2305E35641c4A67F0Ee4aD932b2E083'
const MIN_ABI = [
    {
      "constant":true,
      "inputs": [{"name":"tokenId","type":"uint256"}],
      "name":"tokenURI",
      "outputs":[{"name": "Chuong", "type":"string"}],
      "type":"function"
    },
    {
        "constant":true,
        "inputs": [{"name":"tokenURI","type":"string"}],
        "name":"createCollectible",
        "outputs":[],
        "type":"function"
      },
      {
        "constant":true,
        "inputs": [{"name":"tokenId","type":"uint256"}],
        "name":"buy",
        "outputs":[],
        "type":"function"
      },
      {
        "constant":true,
        "inputs": [{"name":"tokenId","type":"uint256"}],
        "name":"getPrice",
        "outputs":[{"name": "price", "type":"uint"}],
        "type":"function"
      },
      {
        "constant":true,
        "inputs": [{"name":"tokenId","type":"uint256"}],
        "name":"ownerOf",
        "outputs":[{"name": "onwnerAdress", "type":"address"}],
        "type":"function"
      },
      {
        "constant":true,
        "inputs": [],
        "name":"totalSupply",
        "outputs":[{"name":"total supply", "type": "uint256" }],
        "type":"function"
      }
  ];
// const NFT_SMARTCONTRACT_ADDRESS = '0x3CBCfEB7b8d93c501bcB155712FeecC8a45c1221'
const NFT_SMARTCONTRACT_ADDRESS = '0x22D8F94D887aEf0d732159F20e440850AEc9Bf53'

export default {
  name: "Home",
  components:{
    ProductNFTBox
    },
  async mounted(){
    document.title = "MVP | Top E-sport NFT trading"
    await this.fetchProductNFT()
  },
  computed:{
    ...mapState('product_nft', [
      'products'
    ])
  },
  methods: {
    ...mapActions('product_nft', [
    ]),

    ...mapMutations('product_nft', [
      "setProducts"
    ]),
     async whoOwnThisToken(tokenId, provider, minABI, contract_id) {
      Contract.setProvider(provider);
      const contract = new Contract(minABI, contract_id);
      const owner = await contract.methods.tokenURI(tokenId).call();
      console.log("OWNER", owner)
      const data_callback =  await  axios
        .get(owner)
        .then(({data}) =>{
          return data
        })
        .catch(err=>{
          console.log(err)
        })

      return data_callback

      
    },
    async totalSupply(provider, minABI, contract_id){
      Contract.setProvider(provider);
      const contract = new Contract(minABI, contract_id);
      const URI_LINK = await contract.methods.totalSupply().call();
      return URI_LINK
    },
    async findOwner(token_id, provider, minABI, contract_id){
      Contract.setProvider(provider)
      const constract = new Contract(minABI, contract_id)
      const owner_id = await constract.methods.ownerOf(token_id).call()
      console.log("RESULT", owner_id)
      return owner_id
    },
    async fetchProductNFT(){
      const total_product = await this.totalSupply(PROVIDER, MIN_ABI, NFT_SMARTCONTRACT_ADDRESS)
      console.log("TOTAL", total_product)
      let index_product = 0
      const product_list = []
      while(index_product < total_product){
        const data = await this.whoOwnThisToken(index_product, PROVIDER, MIN_ABI, NFT_SMARTCONTRACT_ADDRESS)
        console.log(data)
        const data_object = data
        const owner_id = await this.findOwner(index_product, PROVIDER, MIN_ABI, NFT_SMARTCONTRACT_ADDRESS)
        console.log("OWNER_ID", owner_id)
        data_object.owner_id = owner_id
        data_object.tokenId = index_product
        product_list.push(data_object)
        index_product += 1
      }
      console.log("LIST", product_list)
      this.setProducts(product_list)

    }
  },
};
</script>

<style scoped>


.image{
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>