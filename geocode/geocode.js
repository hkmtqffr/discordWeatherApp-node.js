const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    var timesRun = 0;

    var interval = setInterval(function () {
        timesRun += 1;
        if (timesRun === 1) {
            clearInterval(interval);
        }
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].address_components[0].long_name,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
                key = true;
            };
        });
    }, 300);
};

module.exports.geocodeAddress = geocodeAddress;