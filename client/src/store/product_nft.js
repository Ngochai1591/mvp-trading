import Vue from "vue";

import HTTP from "../http";

const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const web3 = require("web3");

const BSC_TESTNET_ADDRESS = "https://data-seed-prebsc-1-s1.binance.org:8545";
// const HOAN_ADDRESS = "0xc24BC060a2305E35641c4A67F0Ee4aD932b2E083";
const MIN_ABI = [{
    constant: true,
    inputs: [{
      name: "tokenId",
      type: "uint256"
    }],
    name: "tokenURI",
    outputs: [{
      name: "Chuong",
      type: "string"
    }],
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "tokenURI",
      type: "string"
    }],
    name: "createCollectible",
    outputs: [],
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      "name": "tokenId",
      "type": "uint256"
    }],
    name: "buy",
    outputs: [],
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "tokenId",
      type: "uint256"
    }],
    name: "getPrice",
    outputs: [{
      name: "price",
      type: "uint"
    }],
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "tokenId",
      type: "uint256"
    }],
    name: "ownerOf",
    outputs: [{
      name: "onwnerAdress",
      type: "address"
    }],
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{
      "name": "total supply",
      "type": "uint256"
    }],
    type: "function"
  }
];

const Contract = require("web3-eth-contract");



// const NFT_SMARTCONTRACT_ADDRESS = "0x3CBCfEB7b8d93c501bcB155712FeecC8a45c1221";
const PROVIDER = "https://data-seed-prebsc-2-s2.binance.org:8545"
const NFT_SMARTCONTRACT_ADDRESS = "0x780F4bE29E4a995EF020556b67A079D24Ee85bE5"
const GAS_PRICE = "1000000000"

async function totalSupply(provider, minABI, contract_id) {
  Contract.setProvider(provider);
  const contract = new Contract(minABI, contract_id);
  const URI_LINK = await contract.methods.totalSupply().call();
  return URI_LINK
}

async function whoOwnThisToken(tokenId, provider, minABI, contract_id) {
  Contract.setProvider(provider);
  const contract = new Contract(minABI, contract_id);
  const owner = await contract.methods.tokenURI(tokenId).call();
  console.log("OWNER", owner)
  const data_callback = await HTTP()
    .get(owner)
    .then(({
      data
    }) => {
      return data
    })
    .catch(err => {
      console.log(err)
    })

  return data_callback
}

async function findOwner(token_id, provider, minABI, contract_id) {
  Contract.setProvider(provider)
  const constract = new Contract(minABI, contract_id)
  const owner_id = await constract.methods.ownerOf(token_id).call()
  console.log("RESULT", owner_id)
  return owner_id
}

export default {
  namespaced: true,
  state: {
    product: {
      url: null,
      name: null,
      players: null,
      champions: null,
      tournaments: null,
      popularScore: null,
      keyWords: null,
      locations: null,
      teams: null,
      price: null
    },
    products: [],
    currentProduct: null,
    error: null,
    success: null,
  },
  actions: {
    async fetchProductNFT({
      commit,
      state
    }) {
      try {

        commit('setError', null)
        commit('setSuccess', null)

        commit('loading/setIsLoading', true, {
          root: true
        })
        const total_product = await totalSupply(PROVIDER, MIN_ABI, NFT_SMARTCONTRACT_ADDRESS)
        console.log("TOTAL", total_product)
        let index_product = 0
        const product_list = []
        while (index_product < total_product) {
          const data = await whoOwnThisToken(index_product, PROVIDER, MIN_ABI,
            NFT_SMARTCONTRACT_ADDRESS)
          console.log(data)
          const data_object = data
          const owner_id = await findOwner(index_product, PROVIDER, MIN_ABI,
            NFT_SMARTCONTRACT_ADDRESS)
          console.log("OWNER_ID", owner_id)
          data_object.owner_id = owner_id
          data_object.tokenId = index_product
          product_list.push(data_object)
          index_product += 1
        }
        console.log("LIST", product_list)
        commit('setProducts', product_list)

        const success = "Fetch data success"

        commit('setSuccess', success)


      } catch (err) {
        console.log(err)
        const error = "something went wrong"
        commit('setError', error)
      } finally {
        commit('loading/setIsLoading', false, {
          root: true
        })

      }




    },
    async createProduct({
      commit,
      state
    }) {
      try {
        commit('setError', null)
        commit('setSuccess', null)
        commit('loading/setIsLoading', true, {
          root: true
        })

        console.log("CREATE PRODUCT");
        //   const clone = (({ products, currentProduct, ...o }) => o)(state); // remove products
        //   const json_data = JSON.stringify(clone);
        const product_json_data = JSON.stringify(state.product)
        const cid = await ipfs.add(product_json_data);
        const ipfs_link = "https://ipfs.io/ipfs/".concat(cid);
        console.log("IPFS cid", ipfs_link);
        Contract.setProvider(BSC_TESTNET_ADDRESS);
        const contract = new Contract(MIN_ABI, NFT_SMARTCONTRACT_ADDRESS);
        const encodedABI = contract.methods.createCollectible(ipfs_link).encodeABI();

        const transactionParameters = {
          gasPrice: GAS_PRICE, // customizable by user during MetaMask confirmation.
          // gas: '2000000',
          to: NFT_SMARTCONTRACT_ADDRESS, // Required except during contract publications.
          from: window.ethereum.selectedAddress, // must match user's active address.
          // value: '0x00', // Only required to send ether to the recipient from the initiating external account.
          data: encodedABI,
          gasLimit: '420510',

        };

        console.log("1")
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
        console.log("DONE")

        commit("setUrl", null);
        commit("setName", null);
        commit("setPlayers", null);
        commit("setChampions", null);
        commit("setTournaments", null);
        commit("setPopularScore", null);
        commit("setKeyWords", null);
        commit("setLocations", null);
        commit("setTeams", null);
        commit("setPrice", null);
        
        const success = "Create success"
        commit('setSuccess', success)
      } catch (err) {
        console.log(err)
        const error = "something went wrong"
        commit('setError', error)
      } finally {
        commit('loading/setIsLoading', false, {
          root: true
        })

      }
    },
    async buyProduct({commit, state}){
      try{
        commit('setError', null)
        commit('setSuccess', null)

        commit('loading/setIsLoading', true, {
          root: true
        })


        Contract.setProvider(BSC_TESTNET_ADDRESS);
        const contract = new Contract(MIN_ABI, NFT_SMARTCONTRACT_ADDRESS);
        const encodedABI = contract.methods.buy(state.currentProduct.tokenId).encodeABI();
        const transactionParameters = {
          gasPrice: GAS_PRICE, // customizable by user during MetaMask confirmation.
          // gas: '2000000',
          to: NFT_SMARTCONTRACT_ADDRESS, // Required except during contract publications.
          from: window.ethereum.selectedAddress, // must match user's active address.
          // value: '0x2386f26fc10000',
          value: web3.utils.numberToHex(10000000000000000),
          data: encodedABI,
          gasLimit: '131227',

        };



        console.log("1")
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
        console.log("DONE")
        const success = "Buy success"
        commit('setSuccess', success)
      }
      catch(err){
        console.log(err)
        const error = "something went wrong"
        commit('setError', error)
      }
      finally{
        commit('loading/setIsLoading', false, {
          root: true
        })

      }
    }
  },
  getters: {},
  mutations: {
    setUrl(state, url) {
      let urlValue = null;
      if (url !== null) {
        urlValue = url.target.value;
      }
      state.product.url = urlValue;
    },
    setName(state, name) {
      let nameValue = null;
      if (name !== null) {
        nameValue = name.target.value;
      }
      state.product.name = nameValue;
    },
    setPlayers(state, players) {
      let playersValue = null;
      if (players !== null) {
        playersValue = players.target.value;
      }
      state.product.players = playersValue;
    },
    setChampions(state, champions) {
      let championsValue = null;
      if (champions !== null) {
        championsValue = champions.target.value;
      }
      state.product.champions = championsValue;
    },
    setTournaments(state, tournaments) {
      let tournamentsValue = null;
      if (tournaments !== null) {
        tournamentsValue = tournaments.target.value;
      }
      state.product.tournaments = tournamentsValue;
    },
    setPopularScore(state, popularScore) {
      let popularScoreValue = null;
      if (popularScore !== null) {
        popularScoreValue = popularScore.target.value;
      }
      state.product.popularScore = popularScoreValue;
    },
    setKeyWords(state, keyWords) {
      let keyWordsValue = null;
      if (keyWords !== null) {
        keyWordsValue = keyWords.target.value;
      }
      state.product.keyWords = keyWordsValue;
    },
    setLocations(state, locations) {
      let locationsValue = null;
      if (locations !== null) {
        locationsValue = locations.target.value;
      }
      state.product.locations = locationsValue;
    },
    setTeams(state, teams) {
      let teamsValue = null;
      if (teams !== null) {
        teamsValue = teams.target.value;
      }
      state.product.teams = teamsValue;
    },
    setPrice(state, price) {
      let priceValue = null;
      if (price !== null) {
        priceValue = price.target.value;
      }
      state.product.price = priceValue;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setCurrentProduct(state, currentProduct) {
      state.currentProduct = currentProduct;
    },
    setSuccess(state, success){
      state.success = success
    },
  }
};
