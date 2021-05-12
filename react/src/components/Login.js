import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap";




function Login  ()  {
  return (
    <div className={styles.container}> 
      <Container >
        <Row className={styles.loginstuff}>
        
          <Col  className={styles.loginsquare} xs="4" >
            <Form   >
              <p className="text-center">Autentificare</p>
              <FormGroup>
                <div classname={styles.playerlist} >
                  
                  <Input 
                    type="text"
                    className="form-control py-4"
                    placeholder="Username"
                  />
                </div>
              </FormGroup>
              <br/>
              <div>
                
                <Input
                  type="text"
                  className="form-control py-4"
                  placeholder="Password"
                />
              </div>
              <br/>
              <div>
              <Link to="/MainPage">
              <button type="button">
                Login
              </button>
              </Link>
              
              </div>
              <br/>
              <button type="button">
                Register
              </button>
              
            </Form>
          </Col>
        </Row>
      </Container>

      
    </div>
  );
};

export default Login;
