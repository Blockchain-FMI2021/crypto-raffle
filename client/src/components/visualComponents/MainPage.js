import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import user from '../imgs/user.png'; // 
import ticket from '../imgs/ticket.png';
import ethereum from '../imgs/ethereum.png';
import EntriesCurrentExtraction from './../drizzle-custom/Lottery/EntriesCurrentExtraction';
import PickWinner from './../drizzle-custom/Lottery/PickWinner';
import LastExtractions from './../drizzle-custom/Lottery/LastExtractions';
import EnterLottery from './../drizzle-custom/Lottery/EnterLottery';
import ApproveLottery from './../drizzle-custom/Lottery/ApproveLottery';
import GetMaiaTokens from './../drizzle-custom/MaiaToken/GetMaiaTokens';
import Ticket from './Ticket'
import keccak256 from 'keccak256';


var tickets = 50;
var cashmoney = 3500;



function MainPage(props) {
  const { drizzle, drizzleState } = props;
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [hasApprovedMaiaTokens, setHasApprovedMaiaTokens] = useState(false);

  const buyIn = () => {
    return selectedNumbers;
    // console.log(`0x${keccak256(selectedNumbers.toString().replaceAll(',', '')).toString('hex')}`);
    // return `0x${keccak256(selectedNumbers.toString().replaceAll(',', '')).toString('hex')}`;
  }

  return (
    <div className={styles.container}>

      <div className={styles.maintab}>
        <div className={styles.playerlist}>
          <LastExtractions drizzle={drizzle} drizzleState={drizzleState}/>
        </div>

        <div className={styles.pot}>
          <GetMaiaTokens drizzle={drizzle} drizzleState={drizzleState} />
          {hasApprovedMaiaTokens ? <EnterLottery drizzle={drizzle} drizzleState={drizzleState} buyIn = {() => buyIn()} callback={() => setHasApprovedMaiaTokens(false)} /> : <ApproveLottery drizzle={drizzle} drizzleState={drizzleState} callback={() => setHasApprovedMaiaTokens(true)} />}
          <PickWinner drizzle={drizzle} drizzleState={drizzleState} />
        </div>


        <div className={styles.gridcss}>
          <Ticket
            selectedNumbers={selectedNumbers}
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
