import React, { Component } from 'react';
import { Form, Button, Jumbotron as Jumbo, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import base64 from 'base-64';
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


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formControls: { useremail: { value: "" }, userpass: { value: "" } }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    }
    async handleSubmit(event) {
        event.preventDefault();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(this.state.formControls.useremail.value + ":" + this.state.formControls.userpass.value));
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/login', {
            method: 'GET',
            headers: headers,
        })
        if (response.ok) {

            const gotKey = await response.json();
            let headerf = new Headers();
            headerf = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': gotKey['token']
            };
            const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://serene-inlet-43777.herokuapp.com/user/record', {
                method: 'GET',
                headers: headerf,
            })
            if (response2.ok) {
                const gotRecord = await response2.json();
                sessionStorage.setItem("userToken", gotKey['token']);
                sessionStorage.setItem("userrecord", JSON.stringify(gotRecord));
                this.props.history.push({
                    pathname: '/game',
                });
            }

        }

    }

    state = {}
    render() {
        return (
            <div>
                <NavigationBar />
                <Styles>
                    <Jumbo fluid className="jumbo">
                        <div className="overlay"></div>
                        <Container>
                            <h1>Log In</h1>
                        </Container>
                    </Jumbo>
                </Styles>
                <Container>
                    <Form type="Form" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="useremail" type="email" placeholder="Enter email" value={this.state.formControls.useremail.value} onChange={this.handleChange} />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="userpass" type="password" placeholder="Password" value={this.state.formControls.userpass.value} onChange={this.handleChange} />
                        </Form.Group>
                        <Link to='/signup'>
                            <Form.Text className="text-muted">
                                Don't have an account? Sign up!
                    </Form.Text>
                        </Link>

                        <Button variant="primary" type="submit">
                            Submit
         </Button>

                    </Form>
                </Container>
            </div>);
    }
}

export default Login;

