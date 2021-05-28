<template>
  <div class="column is-3">
    <div class="box">
      <figure class="imgage mb-4">
        <img :src="this.getThumbnail(product.url)" />
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">
       {{ product.price }} BNB
      </p>
      <p>OWNER: {{product.owner_id}}</p>

      <!-- <router-link :to="product.get_absolute_url" class="button is-dark mt-4">
        View listing
      </router-link> -->
      <div class="button is-dark mt-4" @click="chooseProduct(product)">
          View listing
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import router from '../router';


export default {
    
    name: "ProductBox",

    props: {
            product: Object
        },
        methods:{
            ...mapMutations('product_nft', [
                "setCurrentProduct"
            ]),
            getVideoID(video_link){
              console.log("VIDEO_LINK", video_link)
              if(video_link){
                const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                const match = video_link.match(regExp);
                return (match && match[7].length === 11) ? match[7] : false;
              }
              return null
            },
            getThumbnail(url){
                const video_id = this.getVideoID(url)
                return `https://img.youtube.com/vi/${video_id}/default.jpg`
            },
            chooseProduct(product){
                console.log("CHOOSING", product)
                this.setCurrentProduct(product)
                router.push('/productNFT')
            }
        }
}
</script>
