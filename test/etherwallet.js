const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', accounts => {
    let etherWallet  = null;

    before(async () => {
        etherWallet = await EtherWallet.deployed();
    })

    it('Should set accounts[0] as owner', async () => {
        const owner = await etherWallet.owner();
        assert(owner === accounts[0]);
    })

    it('Should deposit ether to etherWallet', async () => {
        await etherWallet.deposit({ 
            from : accounts[0],
            vavlue: 100
        });
        const balance = await web3.eth.getBalance(etherWallet.address);
        
        assert(parseInt(balance) === 100);
    });
})