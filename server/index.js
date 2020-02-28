
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

    const url = `https://numbersapi.p.rapidapi.com/${month}/${day}/date`
    // `https://numbersapi.p.rapidapi.com/6/21/date`
    //https://numbersapi.p.rapidapi.com/${month}/${day}/date

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
   
    
    return await data.json()
}


const fetchHoliday = async() => {

    const url = `https://calendarific.com/api/v2/holidays?&api_key=${process.env.HOLIDAYID}&country=US&year=2019`

    let data = await fetch(url)
    console.log(data);

    return await data.json()
    

}



app.get('/numbers', async (req, res) => {
    let day = req.query.day
    let month = req.query.month

    let numbersData = await fetchNumberData(day, month)
    console.log(numbersData)
res.send(numbersData)
})


app.get('/beer', async (req, res) => {
    let beerData = await fetchBeer()
    console.log(beerData[0]);
    
    let beerEverything = {
        beerName: beerData[0].name,
        beerDescription: beerData[0].description
    }

    
    // let beerName = beerData.beer[0].name
    // let beerDescription = beerData.beer[0].description

    // let foodPairing = []
    // for (let i =0; i < beerData.beer[0].food_pairing.length ; i++) {
    //     console.log(beerData.beer[0].food_pairing[i]);
        
    //     foodPairing.push(beerData.beer[0].food_pairing[i])
    // }
    // let firstBrewed = beerData.beer[0].first_brewed
    // let brewersTips = beerData.beer[0].brewers_tips

    // let beerImg = beerData.beer[0].image_url
    // console.log(beerName,firstBrewed, foodPairing, beerDescription, brewersTips);

    res.send(beerEverything)
})

app.get('/holiday', async (req, res) => {
    let holidayData = await fetchHoliday()

    let holidayInfo = []
    for (let i =0; i< holidayData.holiday.response.holidays.length; i++) {
        // console.log('------------');
        // console.log(responseData.holiday.response.holidays[i].country.name);
        // console.log('------------');

        holidayInfo.push(holidayData.holiday.response.holidays[i].name)
        holidayInfo.push(holidayData.holiday.response.holidays[i].description)
        holidayInfo.push(holidayData.holiday.response.holidays[i].country.name)
        holidayInfo.push(holidayData.holiday.response.holidays[i].date.iso)
        holidayInfo.push(holidayData.holiday.response.holidays[i].type)
    }
    console.log(holidayInfo)
    res.send(holidayInfo)
})




// app.get('/', async (req, res) => {
//     // let day = req.query.day
//     // let month = req.query.month
    
//     let responseData = {
//         // 'numberData' : await fetchNumberData(day, month),
//         // 'beer' : await fetchBeer(),
//         // 'holiday' : await fetchHoliday()
//     }

//     let beerName = responseData.beer[0].name
//     let beerDescription = responseData.beer[0].description
//     let foodPairing = []
//     for (let i =0; i < responseData.beer[0].food_pairing.length ; i++) {
//         console.log(responseData.beer[0].food_pairing[i]);
        
//         foodPairing.push(responseData.beer[0].food_pairing[i])
//     }
//     let firstBrewed = responseData.beer[0].first_brewed
//     // let foodPairing = responseData.beer[0].food_pairing[0]
//     // let foodPairing1 = responseData.beer[0].food_pairing[1]
//     // let foodPairing2 = responseData.beer[0].food_pairing[2]
//     let brewersTips = responseData.beer[0].brewers_tips

//     let beerImg = responseData.beer[0].image_url
//     console.log(beerName,firstBrewed, foodPairing, beerDescription, brewersTips);

//     console.log('-----------------');
    

//     let holidayInfo = []
//     for (let i =0; i< responseData.holiday.response.holidays.length; i++) {
//         // console.log('------------');
//         // console.log(responseData.holiday.response.holidays[i].country.name);
//         // console.log('------------');

//         holidayInfo.push(responseData.holiday.response.holidays[i].name)
//         holidayInfo.push(responseData.holiday.response.holidays[i].description)
//         holidayInfo.push(responseData.holiday.response.holidays[i].country.name)
//         holidayInfo.push(responseData.holiday.response.holidays[i].date.iso)
//         holidayInfo.push(responseData.holiday.response.holidays[i].type)
//     }
    
// const holidayInfoAll = (arr) => {
//     let results = [];
//     for (const obj of arr) {
//         results.push({
//             holidayName: obj.name,
//             holidayDescription: obj.description,
//             holidayType: obj.type
//         });
//         let otherResults = []
//         for (const otherResults of obj.date) {
//             otherResults.push({
//                 holidayDate: otherResults.iso
//             })
//         }
//         results[results.length -1].date = otherResults
//     }
//     return results
// }


// console.log(holidayInfoAll(responseData.holiday.response.holidays))

    // console.log(holidayInfo);
    
    // let holidayName = responseData.holiday.response.holidays[0].name
    // let holidayName = []
    // for (let i =0; i< responseData.holiday.response.holidays.length; i++) {
    //     holidayName.push(responseData.holiday.response.holidays[i].name)
    // }
    // let holidayDescription = responseData.holiday.response.holidays[0].description
    // let holidayCountry = responseData.holiday.response.holidays[0].country.name
    // let holidayDate = responseData.holiday.response.holidays[0].date.iso
    // let holidayType = responseData.holiday.response.holidays[0].type

    // console.log(holidayName,"---", holidayDescription, "---", holidayCountry, "---", holidayDate, "---", holidayType);
    
    
    // console.log(responseData)
    // res.send(responseData)

// })




// app.get('/ping', (req, res) => {
//     res.send('pong')
// })



app.listen(8080, () => {
    console.log('server running on port 8080');
    
})