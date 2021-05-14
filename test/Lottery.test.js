const MaiaToken = artifacts.require('MaiaToken');
const Lottery = artifacts.require('Lottery');


contract('Lottery', accounts => {

    const _name = 'MaiaToken';
    const _symbol = 'Maia'
    const _decimals = 1;
    const _ticketPrice = 100;

    beforeEach(async function () {
        this.token = await MaiaToken.new(_name, _symbol, _decimals);
        this.lottery = await Lottery.new(this.token.address);
    });

    describe('lottery logic', function () {
        it('adds the right allowance', async function () {
            await this.token.approve(this.lottery.address, _ticketPrice);
            const approvedValue = await this.lottery.getApprovedLotteryValue(accounts[0]);
            assert.equal(approvedValue, "100");
        });

        it('picks the winner correct', async function () {
            await this.token.approve(this.lottery.address, _ticketPrice);
            const approvedValue = await this.lottery.getApprovedLotteryValue(accounts[0]);
            const hash = "0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a";
            await this.lottery.enterLottery(hash);
            const name = await this.lottery.pickWinner();
            console.log(name);
        });
    })
})