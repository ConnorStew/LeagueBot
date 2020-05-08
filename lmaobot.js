const Discord = require('discord.js')
const fs = require('fs')
const fetch = require('node-fetch')

const client = new Discord.Client();
const discordToken = fs.readFileSync("discordToken.txt").toString()
const riotAPIToken = fs.readFileSync("riotToken.txt").toString()

apiVersion = null

var getLatestApiVersion = new Promise((resolve, reject) => {
    if (apiVersion === null) {
        fetch('https://ddragon.leagueoflegends.com/api/versions.json')
        .then(res => res.json())
        .then(json =>  resolve(json[0]))
        .catch(error => console.log(error))
    } else {
        resolve(apiVersion)
    }
});

var getChampions = new Promise((resolve, reject) => {
    getLatestApiVersion.then(version => {
        fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_GB/champion.json`)
        .then(res => res.json())
        .then(json => {
            var championNames = [];
            for(var key in json.data) {
                championNames.push(key);
            }

            resolve(championNames)
        })
        .catch(error => console.log(error))
    })
});

var randomChampion = new Promise((resolve, reject) => {
    getChampions.then(championNames =>{
        totalCount = championNames.length

        champIndex = Math.floor(Math.random() * totalCount)
        resolve(championNames[champIndex])
    })
    .catch(error => console.log(error))
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }

    if (msg.content === '!random') {
        randomChampion.then(champion => msg.reply(`Your random champion is ${champion}`))
    }
});

client.login(discordToken);