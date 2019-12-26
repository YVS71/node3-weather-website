const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6a85cee840882c100cfbc1cc5acdd080/' + longitude + ',' + latitude + '?units=si&lang=en'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currently = body.currently
            const daily = body.daily
            const forecast = daily.data[0].summary + " It is currently " + currently.temperature + " degrees out." +
            " There is a " + currently.precipProbability + "% chance of rain." +
            " Today's apparent maximum/minimum temperature: "+daily.data[0].apparentTemperatureMin+"/"+daily.data[0].apparentTemperatureMax 
            callback(undefined, forecast)
        }
    })
}

module.exports = forecast

