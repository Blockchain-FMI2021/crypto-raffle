import React, { useState } from "react";
import styles from "./MainPage.module.css";
import user from '../imgs/user.png'; // 
import ticket from '../imgs/ticket.png';
import ethereum from '../imgs/ethereum.png';
var tickets=50;
var cashmoney=3500;
function MainPage()  {
 
  return (
    <div className={styles.container}> 
           <div className={styles.maintab}> 
           <div className={styles.playerlist}> 
            <p>Active players:</p>
              <img src={user}/><p className={styles.playerlist}>Bot 1</p> <br/>
              <img src={user}/><p className={styles.playerlist}>Bot 2</p><br/>
              <img src={user}/><p className={styles.playerlist}>Bot 3</p><br/>
              <img src={user}/><p className={styles.playerlist}>Bot 4</p><br/>
              <img src={user}/><p className={styles.playerlist}>Bot 5</p><br/>
            </div>
            <div className={styles.pot}> 
              <p style={{"marginLeft" : "150px"}}> Your pot:</p>
              <p className={styles.totalpot}>  {tickets} </p> 
              <img className={styles.ticketimg} src={ticket}/>
              <p className={styles.money} >{cashmoney} <img className={styles.ticketimg} src={ethereum}/></p>
              <button className={styles.cashoutbutton} >Buy in</button>
              <br/>
              <button className={styles.buyinbutton}>Cash out</button>
            </div>
              <div className={styles.betbuttons}>
              <div className={styles.betbutton}>
                <button> WIN 2X <img src={ticket}></img> </button>
              </div>
              <div className={styles.betbutton}>
                <button style={{"backgroundColor":"green"}}>WIN 5X <img src={ticket}/></button></div>
              </div>  
            </div>
    </div>
  );
};

export default MainPage;
