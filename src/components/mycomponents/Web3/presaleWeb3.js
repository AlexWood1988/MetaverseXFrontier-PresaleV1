import Web3 from "web3";
import * as constants from "../constants/contracts.json";
import PresaleAbi from "./abi/PresaleV1.json";

const PresaleWeb3 = {
    init(){
        return new Promise((resolve, reject) => {
            window.ethereum.request({method: 'eth_requestAccounts'}).then(accounts => {
                window.web3 = new Web3(window.ethereum);
                const presaleContract = constants.presaleContract;
                // init contract
                window.presaleContract = new window.web3.eth.Contract(PresaleAbi.abi, presaleContract);
                // get default eth address
                window.defaultAccount = accounts[0];
                resolve(true);
            })
        })
    },

    getBNBPrice(){
        return new Promise((resolve, reject) => {
            window.presaleContract.methods.getLatestPrice().call().then(result => {
                resolve(Number(result)/100000000);
            })
        })
    },

    buyToken(bnbAmount){
        console.log(Web3.utils.toWei(bnbAmount, "ether"), window.defaultAccount);
        return new Promise((resolve, reject) => {
            window.presaleContract.methods.buyToken().send(
                {from:window.defaultAccount, value:Web3.utils.toWei(bnbAmount, "ether")}).then(re => {
                    resolve(re);
                })
        })
    },

    buyTokenDiscount(bnbAmount ,returnAddress){
        return new Promise((resolve, reject) => {
            window.presaleContract.methods.buyTokenDiscount(returnAddress).send(
                {from:window.defaultAccount, value:Web3.utils.toWei(bnbAmount, "ether")}).then(re => {
                    resolve(re);
                })
        })
    }
}

export default PresaleWeb3;