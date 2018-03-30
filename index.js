const express = require('express');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const config = require('./config.json');

const Discord = require('discord.js');
const bot = new Discord.Client();

const port = process.env.PORT || 3000;
var app = express();

const greatingWords = ['hi', 'hello'];
const prefix = "<";

bot.on('message', (message) => {
    var msg = message.content.toLowerCase();
    if (msg) {
        for (var i = 0; i < greatingWords.length; i++) {
            var greatingWord = greatingWords[i];
            if (msg === greatingWord) {
                message.reply('Hello there!');
            }
        }
    }

    if (msg.startsWith(prefix)) {
        msg = msg.substring(1);
        geocode.geocodeAddress(msg, (errorMessage, results) => {
            if (errorMessage) {
                message.reply(errorMessage);
            } else {
                weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                    var celsius = Math.round((weatherResults.temperature - 32) * 5 / 9);
                    var speed = weatherResults.wind;
                    if (errorMessage) {
                        message.reply(errorMessage);
                    } else {
                        message.reply(`In ${results.address} temperature is ${celsius} ◦C degree. Wind speed ${speed} km/s.`);
                    }
                });
            }
        });
    }
});


bot.login(config.discord.token);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})