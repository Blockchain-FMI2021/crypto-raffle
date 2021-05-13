import React, { useState,useEffect } from "react";
import styles from "./MainPage.module.css";
import user from '../imgs/user.png'; // 
import ticket from '../imgs/ticket.png';
import ethereum from '../imgs/ethereum.png';

import Ticket from './Ticket'

var tickets=50;
var cashmoney=3500;



function MainPage(props)  {

  const [maiaTokenState, setMaiaTokenState] = useState(null);

  const { drizzle, drizzleState } = props;
  const LotteryContract = drizzle.contracts.Lottery 
  const MaiaTokenContract = drizzle.contracts.MaiaToken;
  const drizzleStoreState = drizzle.store.getState();
  
  const buyIn = () => {
    const balanceDataKey = MaiaTokenContract.methods.balanceOf.cacheCall(drizzleState.accounts[0], {from: drizzleState.accounts[0]});
    setMaiaTokenState({...maiaTokenState, balanceDataKey});
  }



  return (
    <div className={styles.container}> 
    {/* <span>{maiaTokenState.balanceDataKey && MaiaTokenContract.balanceOf[maiaTokenState.balanceDataKey].value}</span> */}

          <div className={styles.maintab}> 
            <div className={styles.playerlist}> 
              <p>Active players:</p>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 1</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 2</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 3</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 4</p><br/>
                <img alt=""src={user}/><p className={styles.playerlist}>Bot 5</p><br/>
              </div>
              <div className={styles.pot}> 
                <p style={{"marginLeft" : "25%"}}> Your pot:</p>
                <p className={styles.totalpot}>  {tickets} </p> 
                <img alt=""className={styles.ticketimg} src={ticket}/>
                <p className={styles.money} >{cashmoney} <img alt=""className={styles.ticketimg} src={ethereum}/></p>
                <button className={styles.buyinbutton} onClick={buyIn}>Buy in</button>
                <br/>
                <button className={styles.cashoutbutton}>Cash out</button>
              </div>


              <div  className={styles.gridcss}>
              <Ticket onNumbersChange={(numbers) => console.log(numbers)} />

              </div>
              {/* <p>Selected: {JSON.stringify(cSelected)}</p> */}
              
              <div className={styles.betbuttons}>
                <div >
                  <button className={styles.betbutton1}> WIN 2X <img alt=""src={ticket}></img> </button>
                </div>
                <div >
                  <button className={styles.betbutton2} >WIN 5X <img alt=""alt=""src={ticket}/></button>
                </div>
              </div>  
          </div>
    </div>
  );
};

export default MainPage;
