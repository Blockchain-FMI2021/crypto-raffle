const MaiaToken = artifacts.require('MaiaToken');

contract('MaiaToken', accounts => {

    const _name = 'MaiaToken';
    const _symbol = 'Maia'
    const _decimals = 18;
    const _initialSupply = web3.utils.toBN('1000000000000000000000000000');

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
            assert.deepEqual(balance, _initialSupply, "Initial supply of the token is not correct!");
        })
    })
})