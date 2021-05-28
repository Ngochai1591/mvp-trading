<template>
  <div id="wrapper">
    <nav class="navbar navbar-color">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <!-- <strong>MVP trading</strong> -->
          <!-- <img src="<%= BASE_URL %>mvp.ico"/> -->

          <img src="https://i.ibb.co/FDjHsm8/photo-2021-05-28-23-10-40.jpg"/>
          <img class="ml-3 mb-2" src="https://lh5.googleusercontent.com/Ja0yCw81LMzaCw8JcfKt6i8QnEYr0r9y1ZwSjr3kwHGIvhpVSia-usYXEB4B0NpwxsXAoZmyaEdFjLO3evyH1DyfTebRNoyeTwYL2K_OFNbCcqFO398SzYbiPA_kFJ3VcLit2G4QzJ4"/>
        </router-link>

        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{ 'is-active': showMobileMenu }">
        <div class="navbar-start">
          <div class="navbar-item">
            <!-- <form> -->
            <div class="field has-addons">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="What are you looking for?"
                />
              </div>

              <div class="control">
                <button class="button is-success" @click="searchItem()">
                  <span class="icon">
                    <i class="fas fa-search"></i>
                  </span>
                </button>
              </div>
            </div>
            <!-- </form> -->
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/connectWallet" class="button is-light">{{this.getWalletID()}}</router-link>

              
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="is-loading-bar has-text-centered" :class="{ 'is-loading': isLoading }">
      <div class="lds-dual-ring"></div>
    </div>

    <section class="section">
      <router-view />
    </section>
    <div :class="showCreateButton()" @click="moveToCreateProduct()">
      <div class="create">
        <div class="block1">
        <i class="fas fa-plus-circle fa-3x"></i>
        </div>
        <div class="block2">
           Create Product
        </div>
      </div>
    </div>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>
<script>
import { mapState, mapGetters} from "vuex";
import router from "./router";


export default {
  data() {
    return {
      showMobileMenu: false
    };
  },
 
  computed: {
    ...mapGetters("authentication", [
      'isConnected',
    ]),
    ...mapState("loading", ["isLoading"]),
    ...mapState("authentication", [
      "walletID",
      'walletError'
    ]),
  },
  methods: {
    moveToCreateProduct(){
      router.push('/createProduct')
    },
    getWalletID(){
      console.log("WALLET_STATUS", this.isConnected)
      if(this.isConnected){
        // return this.walletID
        return "Wallet is connected"
      }
      return "Connect to wallet"
    },
    showCreateButton(){
      console.log(router.currentRoute.fullPath)
      if(router.currentRoute.fullPath === "/createProduct"){
        return "is-hidden"
      }
      return "create-product"
    }
  }
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}

.section {
  background: rgba(6, 28, 37, 0.9);
  color: white;
}

.navbar-color {
  background: rgb(33, 33, 39);
}

.create-product {
   position: fixed;
    bottom: 2em;
    right: 1em;
    

    .create{
      // background-color: green;
      color: green;
      height: 50px;
      width: 120px;

      .block1 .block2{
        display: inline;
      }

    }
}
.create-product:hover{
      cursor: pointer;
    }

.is-hidden{
  display: none;
}
</style>
