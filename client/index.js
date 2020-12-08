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
    const $deposit = document.getElementById('deposit');
    const $depositResult = document.getElementById('deposit-result');
    const $send = document.getElementById('send');
    const $sendResult = document.getElementById('send-result');
    const $balance = document.getElementById('balance');
    let accounts = [];

    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
    });

    const refreshBalance = () => {
        EtherWallet.methods
            .balanceOf()
            .call()
            .then(result => {
                $balance.innerHTML = result;
            });
    }
    refreshBalance();

    $deposit.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = event.target.elements[0].value;
        etherWallet.methods 
            .deposit()
            .send({ from: accounts[0], value: amount })
            .then(result => {
                $depositResult.innerHTML = `Successful ${amount} wei deposit`;
                refreshBalance();
            })
            .catch(error => {
                $depositResult.innerHTML = 'Ooops... there was an error trying to make a deposit...';
            });
    });

    $send.addEventListener('submit', (event) => {
      event.preventDefault();
      const to = event.target.elements[0].value;
      const amount = event.target.elements[1].value;
      etherWallet.methods
        .send(to, amount)
        .send({ from: accounts[0] })
        .then(result => {
          $sendResult.innerHTML = `Send ${amount} wei to ${to}`;
          refreshBalance();
        })
        .catch(error => {
          $sendResult.innerHTML = `Ooops...there was an error while trying to send from the contract...`;
        });
    });

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_etherWallet => {
      etherWallet = _etherWallet;
      initApp();
    })
    .catch(error => console.log(error.message));
})