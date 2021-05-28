import Vue from 'vue'

import HTTP from '../http'

const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");
const web3 = require('web3');

const BSC_TESTNET_ADDRESS = 'https://data-seed-prebsc-1-s1.binance.org:8545'
const HOAN_ADDRESS = '0xc24BC060a2305E35641c4A67F0Ee4aD932b2E083'
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
      }
  ];
const NFT_SMARTCONTRACT_ADDRESS = '0x3CBCfEB7b8d93c501bcB155712FeecC8a45c1221'
// const metadata_link = 'https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=0-PUG.json';


export default {

    namespaced: true,
    state : {
       url:null,
       name:null,
       players:null,
       champions:null,
       tournaments:null,
       popularScore:null,
       keyWords:null,
       locations:null,
       teams:null,
       price:null,
       products: [],
       currentProduct: null

    },
    actions: {
        async createProduct({commit, state}){
            console.log("CREATE PRODUCT")
            const clone = (({ products, currentProduct, ...o }) => o)(state) // remove products
            const json_data = JSON.stringify(clone)
            const cid = await ipfs.add(json_data)
            const ipfs_link = "https://ipfs.io/ipfs/".concat(cid)
            console.log("IPFS cid", ipfs_link)
            // console.log(await ipfs.cat(cid))

            const web3_account = new web3();
            // console.log("HOANBT", HOAN_PRIVATE_KEY)
            console.log("1")
            console.log(typeof(web3_account))
            web3_account.eth.accounts.privateKeyToAccount(HOAN_PRIVATE_KEY);
            console.log("2")
            web3_account.eth.setProvider('https://data-seed-prebsc-2-s2.binance.org:8545');
            console.log("3")
            web3_account.eth.defaultAccount = HOAN_ADDRESS;
            console.log("4")

            // this.CreateToken(ipfs_link,BSC_TESTNET_ADDRESS,NFT_SMARTCONTRACT_ADDRESS, MIN_ABI, HOAN_PRIVATE_KEY, web3_account)
            const Contract = require('web3-eth-contract');

            Contract.setProvider(BSC_TESTNET_ADDRESS);
            const contract = new Contract(MIN_ABI, NFT_SMARTCONTRACT_ADDRESS);
            const encodedABI = contract.methods.createCollectible(ipfs_link).encodeABI();
            // const owner =  contract.methods.createCollectible(tokenId).call();
            
            contract.options.from = web3_account.eth.defaultaccount;
            const lastNonce = (await web3_account.eth.getTransactionCount(HOAN_ADDRESS));

            const tx = {
                gas: 2000000,
                nonce: lastNonce.toString(),
                data: encodedABI,
                to: NFT_SMARTCONTRACT_ADDRESS,
              };
            await web3_account.eth.accounts.signTransaction(tx, HOAN_PRIVATE_KEY, async (err, hash)=>{
                if(!err){
                    await web3_account.eth.sendSignedTransaction(hash.rawTransaction, async (error, result)=>{
                        if(!error){
                            console.log("DONE", result)
                        }
                        console.log("SEND_TRANS_ERR", error)
                    });
                    console.log("DONE TRANSACTION")

                }
                console.log("ERROR", err)
                
            });    

            commit('setUrl', null)
            commit('setName', null)            
            commit('setPlayers', null)
            commit('setChampions', null)
            commit('setTournaments', null)
            commit('setPopularScore', null)
            commit('setKeyWords', null)
            commit('setLocations', null)
            commit('setTeams', null)
            commit('setPrice', null)


        },

      
            
    },
    getters: {

    },
    mutations: {
        setUrl(state, url){
            let urlValue = null
            if(url !== null){
                urlValue = url.target.value
            }
            state.url = urlValue
        },
        setName(state, name){
            let nameValue = null
            if(name !== null){
                nameValue = name.target.value
            }
            state.name = nameValue
        },
        setPlayers(state, players){
            let playersValue = null;
            if(players !== null){
                playersValue = players.target.value
            }
            state.players = playersValue
        },
        setChampions(state, champions){

            let championsValue = null
            if(champions !== null){
                championsValue = champions.target.value
            }
            state.champions = championsValue
        },
        setTournaments(state, tournaments){
            let tournamentsValue = null
            if(tournaments !== null){
                tournamentsValue = tournaments.target.value
            }
            state.tournaments = tournamentsValue
        },
        setPopularScore(state, popularScore){
            let popularScoreValue = null
            if(popularScore !== null){
                popularScoreValue = popularScore.target.value
            }
            state.popularScore = popularScoreValue
        },
        setKeyWords(state, keyWords){
            let keyWordsValue = null
            if(keyWords !== null){
                keyWordsValue = keyWords.target.value
            }
            state.keyWords = keyWordsValue
        },
        setLocations(state, locations){
            let locationsValue = null
            if(locations !== null){
                locationsValue = locations.target.value
            }
            state.locations = locationsValue
        },
        setTeams(state, teams){
            let teamsValue = null
            if(teams !== null){
                teamsValue = teams.target.value
            }
            state.teams = teamsValue
        },
        setPrice(state, price){
            let priceValue = null
            if(price !== null){
                priceValue = price.target.value
            }
            state.price = priceValue
        },
        setProducts(state, products){
            state.products = products
        },
        setCurrentProduct(state, currentProduct){
            state.currentProduct = currentProduct
        }

    },

}
