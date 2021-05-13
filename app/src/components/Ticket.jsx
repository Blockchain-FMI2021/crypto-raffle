import React, { useState, useEffect } from 'react';
import { Button, Container, ButtonGroup, Row, Col } from 'reactstrap';

import _ from 'lodash';
import keccak256 from 'keccak256';

const colStyle = { 'marginBottom': '7px' };

// const nrOfNumbers = 49;
const nrToChoose = 6;

const Ticket = ({ onNumbersChange }) => {
  //   const [selNumbers, setSelNumbers] = useState(new Map());

  const [selectedNumbers, setSelectedNumbers] = useState([]);

  useEffect(() => {
    onNumbersChange(selectedNumbers);
    // console.log(`0x${keccak256(selectedNumbers.toString().replaceAll(',', '')).toString('hex')}`);
  }, [selectedNumbers]);

  const handleNumberSelect = selected => {
    if (selectedNumbers.length === 6 && !selectedNumbers.includes(selected)) return;

    if (selectedNumbers.includes(selected)) setSelectedNumbers(selectedNumbers.filter(number => number !== selected));
    else setSelectedNumbers([...selectedNumbers, selected].sort());
  };

  return (
    <Container>
      <Row>
        <ButtonGroup>
          {_.range(1, 11).map(number => (
            <Col key={number} style={colStyle}>
              <Button
                // color={selNumbers.get(number) ? 'danger' : 'success'}
                // color={selNumbers[number] ? 'danger' : 'success'}
                color={selectedNumbers.includes(number) ? 'danger' : 'success'}
                onClick={() => handleNumberSelect(number)}
              >
                {number < 10 ? `0${number}` : `${number}`}
              </Button>
            </Col>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          {_.range(11, 21).map(number => (
            <Col key={number} style={colStyle}>
              <Button color={selectedNumbers.includes(number) ? 'danger' : 'success'} onClick={() => handleNumberSelect(number)}>
                {number < 10 ? `0${number}` : `${number}`}
              </Button>
            </Col>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          {_.range(21, 31).map(number => (
            <Col key={number} style={colStyle}>
              <Button color={selectedNumbers.includes(number) ? 'danger' : 'success'} onClick={() => handleNumberSelect(number)}>
                {number < 10 ? `0${number}` : `${number}`}
              </Button>
            </Col>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          {_.range(31, 41).map(number => (
            <Col key={number} style={colStyle}>
              <Button color={selectedNumbers.includes(number) ? 'danger' : 'success'} onClick={() => handleNumberSelect(number)}>
                {number < 10 ? `0${number}` : `${number}`}
              </Button>
            </Col>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <ButtonGroup>
          {_.range(41, 51).map(number => {
            if (number < 50)
              return (
                <Col key={number} style={colStyle}>
                  <Button color={selectedNumbers.includes(number) ? 'danger' : 'success'} onClick={() => handleNumberSelect(number)}>
                    {number < 10 ? `0${number}` : `${number}`}
                  </Button>
                </Col>
              );

            return <Col key={number}></Col>;
          })}
        </ButtonGroup>
      </Row>
    </Container>
  );
};

export default Ticket;
