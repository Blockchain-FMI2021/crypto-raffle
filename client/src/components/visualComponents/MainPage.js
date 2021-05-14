import React, { useState,useEffect } from "react";
import styles from "./MainPage.module.css";
import user from '../imgs/user.png'; // 
import ticket from '../imgs/ticket.png';
import ethereum from '../imgs/ethereum.png';
import EntriesCurrentExtraction from './../drizzle-custom/Lottery/EntriesCurrentExtraction';
import EnterLottery from './../drizzle-custom/Lottery/EnterLottery';
import ApproveLottery from './../drizzle-custom/Lottery/ApproveLottery';
import GetMaiaTokens from './../drizzle-custom/MaiaToken/GetMaiaTokens';
import Ticket from './Ticket'

var tickets=50;
var cashmoney=3500;



function MainPage(props)  {
  const {drizzle, drizzleState} = props;
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [hasApprovedMaiaTokens, setHasApprovedMaiaTokens] = useState(false);

  const buyIn = () => {
    if(selectedNumbers.length !== 6) return;
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
                <GetMaiaTokens drizzle={drizzle} drizzleState={drizzleState} />
                {hasApprovedMaiaTokens ? <EnterLottery drizzle={drizzle} drizzleState={drizzleState}  /> : <ApproveLottery drizzle={drizzle} drizzleState={drizzleState} callback={() => setHasApprovedMaiaTokens(true)}/> }
              </div>


              <div  className={styles.gridcss}>
                <Ticket 
                selectedNumbers = {selectedNumbers}
                onNumbersChange={(numbers) => setSelectedNumbers(numbers)} 
                
                />
              </div>
              
              <div className={styles.totalEntries}>
                <EntriesCurrentExtraction drizzle={drizzle} drizzleState={drizzleState} />
              </div>  
          </div>
    </div>
  );
};

export default MainPage;
