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
            commit('loading/setIsLoading', true,  { root: true })

            let message = null
            let error = null
            // let walletID = null
            if(typeof window.ethereum !== 'undefined'){
                window.ethereum.enable()
                message = "MetaMask is installed"
                const walletID = window.ethereum.selectedAddress
                if(!walletID){
                    error = "Address is null"
                }
                commit('setWalletID', walletID)
            }
            else{
                message = "MetaMask is not installed"
                error = message
            }
            console.log(message)
            commit('setWalletError', error)

            commit('loading/setIsLoading', false,  { root: true })

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