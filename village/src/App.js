import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import { Route, Link, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err)
      })

  }
  handleChange = e => {
    this.setState({smurfs: e})
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <div className="Navbar">
        <NavLink exact to={"/"} ><span>HOME</span></NavLink>
        <NavLink to={"/form"} ><span>FORM</span></NavLink>
        </div>
        <Route path="/form"   render={props => (<SmurfForm {...props} handleChange={this.handleChange} smurfs={this.state.smurfs} />) } />
        <Route exact path="/" render={props => (<Smurfs {...props} smurfs={this.state.smurfs} />)}/>
      </div>
    );
  }
}

export default App;
