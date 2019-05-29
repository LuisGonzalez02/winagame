import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, Table } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    padding-left: 5px;
    &:hover {
      color: red;
    }
  }
`;

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: []

    };

  }
  async componentDidMount() {
    let headerf = new Headers();
    headerf = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': sessionStorage.getItem("userToken")
    };

    const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/leaderboard', {
      method: 'GET',
      headers: headerf,
    })
    if (response2.ok) {
      const gotRecord = await response2.json();
      let createdTable = []
      let children = []
      children.push(<th key='user'>Username</th>)
      children.push(<th key='win'>Wins</th>)
      children.push(<th key='lose'>Loses</th>)
      children.push(<th key='tie'>Ties</th>)
      createdTable.push(<tr key='heading'>{children}</tr>)
      // Outer loop to create parent
      for (let i = 0; i < gotRecord['leaders'].length; i++) {
        children = []

        children.push(<td key={`name ${i}`}>{gotRecord['leaders'][i]['name']}</td>)
        children.push(<td key={`wins ${i}`}>{gotRecord['leaders'][i]['wins']}</td>)
        children.push(<td key={`loses ${i}`}>{gotRecord['leaders'][i]['loses']}</td>)
        children.push(<td key={`ties ${i}`}>{gotRecord['leaders'][i]['ties']}</td>)
        //Create the parent and add the children
        createdTable.push(<tr key={i + 6}>{children}</tr>)


      }
      this.setState({ table: createdTable });

    }



  }
  state = {}
  render() {
    if (this.state.table.length === 0) {
      return null;
    }
    else {
      return (
        <Table>
          <tbody>
            {this.state.table}
          </tbody>
        </Table>
      );
    }
  }
}

export default Leaderboard;
