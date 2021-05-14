const MaiaToken = artifacts.require('MaiaToken');

contract('MaiaToken', accounts => {

    const _name = 'MaiaToken';
    const _symbol = 'Maia'
    const _decimals = 1;
    const _initialSupply ='10000000000';

    beforeEach(async function () {
        this.token = await MaiaToken.new(_name, _symbol, _decimals);
    });

    describe('token attributes', function () {
        it('has the correct name', async function () {
            const name = await this.token.name();
            assert.equal(name, _name, "Name of the token is not correct!");
        });

        it('has the correct symbol', async function () {
            const symbol = await this.token.symbol();
            assert.equal(symbol, _symbol, "Symbol of the token is not correct!");
        });

        it('has the correct decimals', async function () {
            const decimals = await this.token.decimals();
            assert.equal(decimals, _decimals, "Decimals of the token are not correct!");
        });
    })

    describe('token metrics', function () {
        it('has the right amount of tokens', async function () {
            const balance = await this.token.balanceOf(accounts[0]);
            assert.equal(balance.eq(web3.utils.toBN(_initialSupply)), true, "Initial supply of the token is not correct!");
        })
    })

    describe('transactions correctness', function () {
        it('transfer 1 MaiaToken', async function() {
            const beforeBalanceSender = await this.token.balanceOf(accounts[0]);
            const beforeBalanceReceiver = await this.token.balanceOf(accounts[1]);
            await this.token.transfer(accounts[1], 10);
            const afterBalanceSender = await this.token.balanceOf(accounts[0]);
            const afterBalanceReceiver = await this.token.balanceOf(accounts[1]);

            assert.equal(beforeBalanceSender.sub(afterBalanceSender).eq(web3.utils.toBN('10')), true, "Sender has the wrong number of tokens!");
            assert.equal(afterBalanceReceiver.sub(beforeBalanceReceiver).eq(web3.utils.toBN('10')), true, "Receiver has the wrong number of tokens!");
        })

        it('mints new 1 MaiaToken', async function() {
            await this.token.mint(accounts[0], 10);
            const balance = await this.token.balanceOf(accounts[0]);
            const newSupply = '10000000010';
            assert.equal(balance.eq(web3.utils.toBN(newSupply)), true, "Total supply of the token is not correct!");
        })
    })
})