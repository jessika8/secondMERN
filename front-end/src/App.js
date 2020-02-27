import React, { Component } from 'react'
import './App.css';
// import BeerData from './components/BeerData'


export default class App extends Component {

  // async componentDidMount() {
  //   let data = await fetch('http://localhost:8080/ping');

  //     console.log(await data.text());
      

  // }

  async getPong() {
    let data = await fetch('http://localhost:8080/ping');

      console.log(await data.text());
      

  }

  render() {
    return (
      <>
        <button onClick={this.getPong}>Send a get request</button>
      </>
    )
  }
}

