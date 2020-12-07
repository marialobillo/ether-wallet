import Web3 from 'web3';
import EtherWallet from '../build/contracts/EtherWallet.json';

let web3;
let EtherWallet;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
      if(typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable()
          .then(() => {
            resolve(
              new Web3(window.ethereum)
            );
          })
          .catch(error => {
            reject(error);
          });
        return;
      }
      if(typeof window.web3 !== 'undefined') {
        return resolve(
          new Web3(window.web3.currentProvider)
        );
      }
      resolve(new Web3('http://localhost:9545'));
    });
  };

  const initContract = () => {
    const networkId = await web3.eth.net.getId();
    return new web3.Contract(
        EtherWallet.abi, 
        EtherWallet
            .networks[networkId]
            .address
    );
  };
  

  const initApp = () => {
    const $send = document.getElementById('send');
    const $getBalance = document.getElementById('getBalance');
    let accounts = [];

    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
    });
  
};