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
})