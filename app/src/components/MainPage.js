import React, { useState } from "react";
import styles from "./MainPage.module.css";
import user from '../imgs/user.png';
import ticket from '../imgs/ticket.png';
import ethereum from '../imgs/ethereum.png';
import { ContractData } from "drizzle-react-components";
import {DrizzleContext} from "drizzle-react";
import {
  Button,
  Container,
  ButtonGroup,
  Row,
<<<<<<< HEAD
  Col
=======
  Col,
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46
} from "reactstrap";


var tickets = 50;
var cashmoney = 3500;
const colStyle = { "marginBottom": "5px" };

<<<<<<< HEAD
function MainPage(props) {
=======
function MainPage(props)  {
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46
  const [cSelected, setCSelected] = useState([]);
  const { drizzle, drizzleState } = props;
  const LotteryContract = drizzle.contracts.Lottery;
  const LotteryContractState = drizzleState.contracts.Lottery;
  const MaiaTokenContract = drizzle.contracts.MaiaToken;
  const MaiaTokenContractState = drizzleState.contracts.MaiaToken;
  const [maiaTokenState, setMaiaTokenState] = useState(null);
  const [lotteryTokenState, setLotteryTokenState] = useState(null);

<<<<<<< HEAD
  const buyIn = () => {
    console.log('Enter buy in', lotteryTokenState);
    const stackId = LotteryContract.methods.enter.cacheSend(drizzle.web3.utils.asciiToHex("16324546474849"), { from: drizzleState.accounts[0], value: drizzle.web3.utils.toWei('0.01', 'ether'), gas: drizzle.web3.utils.toBN("1000000") });
    console.log(stackId);
    setLotteryTokenState({ ...lotteryTokenState, 'entranceStackId': stackId });
    console.log('Leave buy in', lotteryTokenState);
  }

  const getEnterTransactionStatus = () => {
    if (lotteryTokenState && drizzleState.transactionStack[lotteryTokenState['entranceStackId']]) {
      const txHash = drizzleState.transactionStack[lotteryTokenState['entranceStackId']]
      console.log(LotteryContractState.transactions[txHash].status);
    }
  }

  const getBalanceMaiaToken = () => {
    const balanceDataKey = MaiaTokenContract.methods.balanceOf.cacheCall(drizzleState.accounts[0], { from: drizzleState.accounts[0] });
    setMaiaTokenState({ ...maiaTokenState, 'balanceDataKey': balanceDataKey });
  }

=======
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46
  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  }
  return (
<<<<<<< HEAD
    <div className={styles.container}>
      <ContractData
        contract="Lottery"
        method="enter"
        methodArgs={drizzle.web3.utils.asciiToHex("16324546474849"), { from: drizzleState.accounts[0], value: drizzle.web3.utils.toWei('0.01', 'ether'), gas: drizzle.web3.utils.toBN("1000000") }}
      />
      {lotteryTokenState && lotteryTokenState.entranceStackId && getEnterTransactionStatus()}
      {lotteryTokenState && <span>{JSON.stringify(lotteryTokenState)}</span>}
      {maiaTokenState && maiaTokenState.balanceDataKey && MaiaTokenContractState.balanceOf[maiaTokenState['balanceDataKey']] && <span>{MaiaTokenContractState.balanceOf[maiaTokenState['balanceDataKey']].value}</span>}
      <div className={styles.maintab}>
        <div className={styles.playerlist}>
          <p>Active players:</p>
          <img src={user} /><p className={styles.playerlist}>Bot 1</p><br />
          <img src={user} /><p className={styles.playerlist}>Bot 2</p><br />
          <img src={user} /><p className={styles.playerlist}>Bot 3</p><br />
          <img src={user} /><p className={styles.playerlist}>Bot 4</p><br />
          <img src={user} /><p className={styles.playerlist}>Bot 5</p><br />
        </div>
        <div className={styles.pot}>
          <p style={{ "marginLeft": "25%" }}> Your pot:</p>
          <p className={styles.totalpot}>  {tickets} </p>
          <img className={styles.ticketimg} src={ticket} />
          <p className={styles.money} >{cashmoney} <img className={styles.ticketimg} src={ethereum} /></p>
          <button className={styles.buyinbutton} onClick={buyIn}>Buy in</button>
          <br />
          <button className={styles.cashoutbutton}>Cash out</button>
        </div>
=======
    <div className={styles.container}> 
          <div className={styles.maintab}> 
            <div className={styles.playerlist}> 
              <p>Active players:</p>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 1</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 2</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 3</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 4</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 5</p><br/>
              </div>
              //pot din dreapta sus 
              <div className={styles.pot}> 
                <p style={{"marginLeft" : "25%"}}> Your pot:</p>
                <p className={styles.totalpot}>  {tickets} </p> 
                <img alt=""className={styles.ticketimg} src={ticket}/>
                <p className={styles.money} >{cashmoney} <img alt=""className={styles.ticketimg} src={ethereum}/></p>
                <button className={styles.buyinbutton} >Buy in</button>
                <br/>
                <button className={styles.cashoutbutton}>Cash out</button>
              </div>
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46


        <div className={styles.gridcss}>
          <Container >
            <Row>
              <ButtonGroup>
                <Col style={colStyle} > <Button color="success" onClick={() => onCheckboxBtnClick(1)} active={cSelected.includes(1)}>01</Button></Col>
                <Col > <Button color="success" onClick={() => onCheckboxBtnClick(2)} active={cSelected.includes(2)}>02</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(3)} active={cSelected.includes(3)}>03</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(4)} active={cSelected.includes(4)}>04</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(5)} active={cSelected.includes(5)}>05</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(6)} active={cSelected.includes(6)}>06</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(7)} active={cSelected.includes(7)}>07</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(8)} active={cSelected.includes(8)}>08</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(9)} active={cSelected.includes(9)}>09</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(10)} active={cSelected.includes(10)}>10</Button></Col>
              </ButtonGroup>
            </Row>
            <Row>
              <ButtonGroup>
                <Col style={colStyle}> <Button color="success" onClick={() => onCheckboxBtnClick(11)} active={cSelected.includes(11)}>11</Button></Col>
                <Col > <Button color="success" onClick={() => onCheckboxBtnClick(12)} active={cSelected.includes(12)}>12</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(13)} active={cSelected.includes(13)}>13</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(14)} active={cSelected.includes(14)}>14</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(15)} active={cSelected.includes(15)}>15</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(16)} active={cSelected.includes(16)}>16</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(17)} active={cSelected.includes(17)}>17</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(18)} active={cSelected.includes(18)}>18</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(19)} active={cSelected.includes(19)}>19</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(20)} active={cSelected.includes(20)}>20</Button></Col>
              </ButtonGroup>
            </Row>
            <Row>
              <ButtonGroup>
                <Col style={colStyle}> <Button color="success" onClick={() => onCheckboxBtnClick(21)} active={cSelected.includes(21)}>21</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(22)} active={cSelected.includes(22)}>22</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(23)} active={cSelected.includes(23)}>23</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(24)} active={cSelected.includes(24)}>24</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(25)} active={cSelected.includes(25)}>25</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(26)} active={cSelected.includes(26)}>26</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(27)} active={cSelected.includes(27)}>27</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(28)} active={cSelected.includes(28)}>28</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(29)} active={cSelected.includes(29)}>29</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(30)} active={cSelected.includes(30)}>30</Button></Col>
              </ButtonGroup>
            </Row>
            <Row>
              <ButtonGroup>
                <Col style={colStyle}> <Button color="success" onClick={() => onCheckboxBtnClick(31)} active={cSelected.includes(31)}>31</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(32)} active={cSelected.includes(32)}>32</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(33)} active={cSelected.includes(33)}>33</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(34)} active={cSelected.includes(34)}>34</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(35)} active={cSelected.includes(35)}>35</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(36)} active={cSelected.includes(36)}>36</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(37)} active={cSelected.includes(37)}>37</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(38)} active={cSelected.includes(38)}>38</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(39)} active={cSelected.includes(39)}>39</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(40)} active={cSelected.includes(40)}>40</Button></Col>
              </ButtonGroup>
            </Row>
            <Row>
              <ButtonGroup>
                <Col style={colStyle}> <Button color="success" onClick={() => onCheckboxBtnClick(41)} active={cSelected.includes(41)}>41</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(42)} active={cSelected.includes(42)}>42</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(43)} active={cSelected.includes(43)}>43</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(44)} active={cSelected.includes(44)}>44</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(45)} active={cSelected.includes(45)}>45</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(46)} active={cSelected.includes(46)}>46</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(47)} active={cSelected.includes(47)}>47</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(48)} active={cSelected.includes(48)}>48</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(49)} active={cSelected.includes(49)}>49</Button></Col>
                <Col> <Button color="success" onClick={() => onCheckboxBtnClick(50)} active={cSelected.includes(50)}></Button></Col>
              </ButtonGroup>
            </Row>
          </Container>

<<<<<<< HEAD
        </div>
        <p>Selected: {JSON.stringify(cSelected)}</p>

        <div className={styles.betbuttons}>
          <div >
            <button className={styles.betbutton1}> WIN 2X <img src={ticket}></img> </button>
          </div>
          <div >
            <button className={styles.betbutton2} >WIN 5X <img src={ticket} /></button>
=======
              </div>
              <p>Selected: {JSON.stringify(cSelected)}</p>
              
              <div className={styles.betbuttons}>
                <div >
                  <button className={styles.betbutton1}> WIN 2X <img alt=""src={ticket}></img> </button>
                </div>
                <div >
                  <button className={styles.betbutton2} >WIN 5X <img alt=""alt=""src={ticket}/></button>
                </div>
              </div>  
>>>>>>> 2926c7f80e176530aa7ecbfccd7b9795dca3fc46
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
