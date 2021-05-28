import Vue from 'vue'

export default {
    namespaced: true,
    state: {
       walletID:null,
       walletError: null,
    },
    mutations: {
        setWalletID(state, walletID){
            state.walletID = walletID
        },
        setWalletError(state, walletError){
            state.walletError = walletError
        }

    },
    actions:{
        async connectToWallet({commit}){
            let message = null
            let error = null
            // let walletID = null
            if(typeof window.ethereum !== 'undefined'){
                message = "MetaMask is installed"
                const walletID = window.ethereum.selectedAddress
                commit('setWalletID', walletID)
                
            }
            else{
                message = "MetaMask is not installed"
                error = message
            }
            console.log(message)
            commit('setWalletError', error)
            // commit('setWallID', )


            // console.log("CONNECT TO WALLET")
            // console.log("DATA", data)
            // commit('setWalletID', data)

        }
    },
    getters:{
        isConnected(state){
            console.log(state.walletID)
            console.log(!!state.walletID)
            return !!state.walletID

        }
    }
}