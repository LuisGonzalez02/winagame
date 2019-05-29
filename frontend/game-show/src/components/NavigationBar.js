import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #203354;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #FFFFFF;
    padding-left: 15px;
    &:hover {
      color: white;
    }
  }
`;





class NavigationBar extends Component {
  logout(){
    sessionStorage.removeItem("userToken");
    sessionStorage.clear();
  }
  
  state = {}
  render() {
    return (<Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">WinAGame</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink to="/">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              {sessionStorage.getItem('userToken')?<NavLink to="/" onClick={this.logout}> 
            Log Out
          </NavLink>:<NavLink to="/login" >
              Log In
          </NavLink>}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles >);
  }
}

export default NavigationBar;

