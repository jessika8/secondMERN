import React, { Component } from 'react'
import './App.css';
import BeerData from './components/BeerData'
import NumberData from './components/NumberData'


export default class App extends Component {

  state = {
    beerData: [],
    numberData: [],
    inputDay: "",
    inputMonth: ""
  }

  // async componentDidMount() {
  //   let data = await fetch('http://localhost:8080/ping');

  //     console.log(await data.text());
      

  // }

  async getPong() {
    let data = await fetch('http://localhost:8080/ping');

      console.log(await data.text());
    
  }

   getBeer = async() => {
     
     
    let data = await fetch('http://localhost:8080/beer')

    console.log(await data.json())

    this.setState({
      beerData: data
    })

  }

  async getNumberData() {
    let data = await fetch('http://localhost:8080/')

    this.setState({
      numberData: data
    })
  }

  onChangeHandlerDate = (event) => {
    let name = event.target.name;
    let value = event.target.value
    this.setState({
      [name]: value
    })
  }


  render() {
    return (
      <>
       <input name="inputDay" className="" value={this.state.inputDay} onChange={this.onChangeHandlerDate} placeholder="Day (numbers only)"></input>
              <input name="inputMonth" className="" value={this.state.inputMonth} onChange={this.onChangeHandlerDate} placeholder="Month (numbers olny)"></input>
              <button type="button" onClick={this.getNumberData}>Facts about dates </button>
            

      <NumberData data={this.state.numberData}/>
      <br></br>



        <button onClick={this.getPong}>Send a get request</button>
        <br></br>
        <button type="button" onClick={this.getBeer}>Get Beer data</button>
        <BeerData data={this.state.beerData} />
      </>
    )
  }
}

