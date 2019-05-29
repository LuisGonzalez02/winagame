import React, { Component } from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import boatImage from './assets/boatImage.jpg';
import NavigationBar from './components/NavigationBar';

const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .span{
    color: #FFFFFF;
    padding-left: 50px;
    &:hover {
      color: red;
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

class Home extends Component {

  state = {}
  render() {
    return (<div>
      <NavigationBar />
      <Styles>
        <Jumbo fluid className="jumbo">
          <div className="overlay"></div>
          <Container>
            <h1>Play to Win</h1>
          </Container>
        </Jumbo>
      </Styles>
      <Container>
        <div className="row align-items-center justify-content-center">
          <h2><span>Play . </span>  <span>Have Fun .</span><span> Win</span></h2>
        </div>
      </Container>
    </div>);
  }
}

export default Home;

