<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <!-- <p class="title mb-6">Welcome to MVP</p> -->
        <img
          src="https://lh5.googleusercontent.com/Ja0yCw81LMzaCw8JcfKt6i8QnEYr0r9y1ZwSjr3kwHGIvhpVSia-usYXEB4B0NpwxsXAoZmyaEdFjLO3evyH1DyfTebRNoyeTwYL2K_OFNbCcqFO398SzYbiPA_kFJ3VcLit2G4QzJ4"
        />
        <p class="subtitle">best E-sport NFT trading on Binance Smart Chain</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-3 has-text-centered">Latest Products</h2>
      </div>

      <ProductNFTBox v-for="product in products" :key="product.tokenId" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from "vuex";
import ProductNFTBox from "@/components/ProductNFTBox.vue";
import {toast} from 'bulma-toast'

export default {
  name: "Home",
  components: {
    ProductNFTBox
  },
  async mounted() {
    document.title = "MVP | Top E-sport NFT trading";
    await this.fetchProductNFT();
    let toast_message = null;
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
  },
  computed: {
    ...mapState("product_nft", ["products", "error", "success"])
  },
  methods: {
    ...mapActions("product_nft", ["fetchProductNFT"]),

    ...mapMutations("product_nft", ["setProducts"])
  }
};
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
