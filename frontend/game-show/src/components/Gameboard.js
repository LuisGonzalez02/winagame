import { Form, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import styled from 'styled-components';
import "../testing.css"

const Styles = styled.div`
  .button {
    height: 50px
  }
  .Center{
      margin-left:auto,
      margin-right:auto
  }

`;

const squares = [
    { 'id': 1, 'val': '', 'butDisable': true }, { 'id': 2, 'val': '', 'butDisable': true }, { 'id': 3, 'val': '', 'butDisable': true },
    { 'id': 4, 'val': '', 'butDisable': true }, { 'id': 5, 'val': '', 'butDisable': true }, { 'id': 6, 'val': '', 'butDisable': true },
    { 'id': 7, 'val': '', 'butDisable': true }, { 'id': 8, 'val': '', 'butDisable': true }, { 'id': 9, 'val': '', 'butDisable': true }
];
let win = 0;
let lose = 0;
let tie = 0;

let status = "New Game";
let changeGameState = "Start";


class Gameboard extends Component {

    constructor(props) {
        super(props);
        let info = JSON.parse(sessionStorage.getItem("userrecord"));
        win = info['wins'];
        lose = info['loses'];
        tie = info['ties'];

    }

    state = {}

    changeText = async (text) => {
        squares[text]['val'] = "x";
        squares[text]['butDisable'] = true;
        let rand = Math.floor(Math.random() * 9) + 0;
        let count = 0
        while (squares[rand]['butDisable'] === true && count < 500) {
            rand = Math.floor(Math.random() * 9) + 0;
            count++;
        }
        if (count !== 500) {
            squares[rand]['val'] = "o";
            squares[rand]['butDisable'] = true;
        }

        let check = 0;
        let found = ''
        let finished = true;
        for (let i = 0; i < 9; i = i + 3) {
            if (squares[i]['val'] === squares[i + 1]['val'] && squares[i + 1]['val'] === squares[i + 2]['val'] && squares[i]['val'] !== '') {
                check++;
                found = squares[i]['val'];
            }
        }
        for (let i = 0; i < 3; i++) {
            if (squares[i]['val'] === squares[i + 3]['val'] && squares[i + 3]['val'] === squares[i + 6]['val'] && squares[i]['val'] !== '') {
                check++;
                found = squares[i]['val'];
            }
        }
        if (squares[0]['val'] === squares[4]['val'] && squares[4]['val'] === squares[8]['val'] && squares[0]['val'] !== '') {
            check++;
            found = squares[0]['val'];
        }
        if (squares[2]['val'] === squares[4]['val'] && squares[4]['val'] === squares[6]['val'] && squares[2]['val'] !== '') {
            check++;
            found = squares[2]['val'];
        }
        if (check > 1) {
            status = "winner";
            if (count !== 500) {
                squares[rand]['val'] = '';
            }


            for (let i = 0; i < 9; i++) {
                squares[i]['butDisable'] = true;
            }
        }
        else {
            if (check > 0 && found === 'x') {
                status = "winner";
                if (count !== 500) {
                    squares[rand]['val'] = '';
                }

                for (let i = 0; i < 9; i++) {
                    squares[i]['butDisable'] = true;
                }

            }
            if (check > 0 && found === 'o') {
                status = "loser";
                for (let i = 0; i < 9; i++) {
                    squares[i]['butDisable'] = true;
                }
            }
            if (check === 0) {

                for (let i = 0; i < 9; i++) {
                    if (squares[i]['butDisable'] === false) {
                        finished = false;
                    }
                }
            }

        }
        if (status === "winner") {
            let headerf = new Headers();
            headerf = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('userToken')
            };
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/win', {
                method: 'PUT',
                headers: headerf,
            })
            if (response.ok) {
                const gotKey = await response.json();
                const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/record', {
                    method: 'GET',
                    headers: headerf,
                })
                if (response2.ok) {
                    const gotRecord = await response2.json();
                    win = gotRecord['wins'];
                    this.setState({ win });
                }
            }
        }
        else if (status === "loser") {
            let headerf = new Headers();
            headerf = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('userToken')
            };
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/lose', {
                method: 'PUT',
                headers: headerf,
            })
            if (response.ok) {
                const gotKey = await response.json();
                const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/record', {
                    method: 'GET',
                    headers: headerf,
                })
                if (response2.ok) {
                    const gotRecord = await response2.json();
                    lose = gotRecord['loses'];
                    this.setState({ lose });
                }
            }
        }
        else if (finished === true) {
            let headerf = new Headers();
            headerf = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('userToken')
            };
            const response = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/tie', {
                method: 'PUT',
                headers: headerf,
            })
            if (response.ok) {
                const gotKey = await response.json();
                const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/record', {
                    method: 'GET',
                    headers: headerf,
                })
                if (response2.ok) {
                    const gotRecord = await response2.json();
                    tie = gotRecord['ties'];
                    this.setState({ tie });
                }
            }
        }


        this.setState({ squares, status });
    }
    setGameState = () => {
        if (changeGameState === "Start") {
            for (let i = 0; i < 9; i++) {
                squares[i]['butDisable'] = false;
            }
            changeGameState = "Reset";
            status = "Game in progress";
        }
        else {
            for (let i = 0; i < 9; i++) {
                squares[i]['butDisable'] = false;
                squares[i]['val'] = '';
            }
            changeGameState = "Reset";
            status = "Game in progress";
        }

        this.setState({ squares, changeGameState, status });
    }
    render() {
        //   const { text } = this.state //destucture state

        return (
            <React.Fragment >
                <div className="row align-items-center justify-content-center">
                    <h2>Wins: {win} Loses: {lose} Ties: {tie}</h2>
                </div>


                <div className="row align-items-center justify-content-center">
                    <Button className="boardTile" disabled={squares[0]['butDisable']} onClick={() => { this.changeText(0) }} >{squares[0]['val']}</Button>
                    <Button className="boardTile" disabled={squares[1]['butDisable']} onClick={() => { this.changeText(1) }} >{squares[1]['val']}</Button>
                    <Button className="boardTile" disabled={squares[2]['butDisable']} onClick={() => { this.changeText(2) }} >{squares[2]['val']}</Button>
                </div>
                <div className="row align-items-center justify-content-center">
                    <Button className="boardTile" disabled={squares[3]['butDisable']} onClick={() => { this.changeText(3) }} >{squares[3]['val']}</Button>
                    <Button className="boardTile" disabled={squares[4]['butDisable']} onClick={() => { this.changeText(4) }} >{squares[4]['val']}</Button>
                    <Button className="boardTile" disabled={squares[5]['butDisable']} onClick={() => { this.changeText(5) }} >{squares[5]['val']}</Button>
                </div>
                <div className="row align-items-center justify-content-center">
                    <Button className="boardTile" disabled={squares[6]['butDisable']} onClick={() => { this.changeText(6) }} >{squares[6]['val']}</Button>
                    <Button className="boardTile" disabled={squares[7]['butDisable']} onClick={() => { this.changeText(7) }} >{squares[7]['val']}</Button>
                    <Button className="boardTile" disabled={squares[8]['butDisable']} onClick={() => { this.changeText(8) }} >{squares[8]['val']}</Button>
                </div>
                <div className="row align-items-center justify-content-center">
                    <h3>{status}</h3>
                </div>
                <div className="row align-items-center justify-content-center" id="spaceup">
                    <Button onClick={() => { this.setGameState() }} className="cusClass">{changeGameState}</Button>
                </div>

            </React.Fragment>
        );

    }
}

export default Gameboard;