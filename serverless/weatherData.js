const axios = require('axios');

exports.handler = async (event) => {

    const {city} = event.queryStringParameters;
    const apiKey = process.env.API_KEY;
    const apiCall = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
    
    const {data} = await axios(apiCall);

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}