const {Client} = require('discord.js');
const client = new Client();

//Websocket
const Websocket = require('./ws/ws');
const ws = new Websocket('1234', "1111", client);

client.once('ready', () => {
    console.log(`Your bot ${client.user.username} is online`);
});

client.login('ODA2MTQ1ODczMzU5NjY3MjQw.YBlL2Q.LosmdZXdyf1KNrhdcV0kkOY7-qQ');