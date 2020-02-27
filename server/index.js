
const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
//CORS is a W3C spec that allows cross-domain communication from the browser
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false})); //Ignore data types and make everything a string
app.use(bodyParser.json());  // Parse data as JSON




const fetchNumberData = async (day, month) => {

    const url = `https://numbersapi.p.rapidapi.com/6/21/date`
    // `https://numbersapi.p.rapidapi.com/6/21/date`
    //https://numbersapi.p.rapidapi.com/${month}/{dya}/date

    let data = await fetch(url, {
        method: 'GET',        
        headers: {
            'x-rapidapi-host': 'numbersapi.p.rapidapi.com',
            'x-rapidapi-key': `${process.env.NUMBERID}`
          }
    })
   //console.log(await data.json());
    // console.log(data)
    
    return await data.text()

}

const fetchBeer = async() => {
    const url = `https://api.punkapi.com/v2/beers/random`

    let data = await fetch(url)
    console.log(data);
    
    return await data.json()
}

// app.post('/', async(req, res) => {
//     let beerName = req.body.beerName;
//     let data = await fetchBeer(beerName)

//     let name = data.name;
//     let description = data.description
//     console.log(description)
    
//     res.render('index', {data: name, description})

// })


app.get('/', async (req, res) => {
    let day = req.query.day
    let month = req.query.month
    
    let responseData = {
        'numberData' : await fetchNumberData(day, month),
        'beer' : await fetchBeer()
    }

    let beerName = responseData.beer[0].name
    let beerDescription = responseData.beer[0].description
    let firstBrewed = responseData.beer[0].first_brewed
    let foodPairing = responseData.beer[0].food_pairing[0]
    let foodPairing1 = responseData.beer[0].food_pairing[1]
    let foodPairing2 = responseData.beer[0].food_pairing[2]
    let brewersTips = responseData.beer[0].brewers_tips

    let beerImg = responseData.beer[0].image_url
    console.log(beerName,firstBrewed, foodPairing, foodPairing1, foodPairing2, beerDescription, brewersTips);
    
    // console.log(responseData)
    res.send(responseData)

})

// app.get('/ping', (req, res) => {
//     res.send('pong')
// })



app.listen(8080, () => {
    console.log('server running on port 8080');
    
})