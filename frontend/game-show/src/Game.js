import { Form, Button, Jumbotron as Jumbo, Container } from 'react-bootstrap';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import base64 from 'base-64';
import Gameboard from './components/Gameboard';
import Leaderboard from './components/Leaderboard';
import NavigationBar from './components/NavigationBar';
import boatImage from './assets/boatImage.jpg';
import './testing.css';


const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }


  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;


class Game extends Component {

    constructor(props) {
        super(props);

        this.state = {
            condition: true

        };
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(condition) {
        this.setState({ condition })
    }

    state = {}


    render() {
        const { condition } = this.state;
        return (
            <React.Fragment>
                <NavigationBar />
                <Styles>
                    <Jumbo fluid className="jumbo">
                        <div className="overlay"></div>
                        <Container>
                            <h1>Game</h1>
                        </Container>
                    </Jumbo>
                </Styles>
                <Container>
                    <div className="row align-items-center justify-content-center">
                        <Button onClick={() => { this.handleClick(true) }} size="lg" className="cusClass">Game</Button>
                        <Button onClick={() => { this.handleClick(false) }} size="lg" className="cusClass">Leaderboard</Button>
                    </div>
                    <div className="spaceLittle">
                        {condition === true ? <Gameboard /> : <Leaderboard />}
                    </div>
                </Container>
            </React.Fragment>
        );



    }
}

export default Game;

