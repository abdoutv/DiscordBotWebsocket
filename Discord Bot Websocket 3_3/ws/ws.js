const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

class WebSocket {

    constructor(port, token, client) {

        this.client = client;
        this.port = port;
        this.token = token;

        this.app = express();
        this.app.engine('hbs', hbs( {
            extname: "hbs",
            defaultLayout: "layout",
            layoutsDir: __dirname + "/layouts"
        }));

        this.app.set('views', path.join(__dirname, "views"));
        this.app.set('view engine', "hbs");
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.registerRoots();

        this.server = this.app.listen(port, () => {
            console.log(`Websocket listening on port ${this.server.address().port}`);
        });
    }

    checkToken(_token) {
        if ( _token == this.token) {
            return true;
        } else {
            return false;
        }
    }

    registerRoots() {
        console.log('registeringRouts');
        this.app.get('/', (req, res) => {
            let _token = req.query.token;

            if (!this.checkToken(_token)) {
                res.render("error", { title: "Error", err: 'Invalid token!'});
                return;
            }

            let channels = [];

            this.client.guilds.cache.forEach(guild => {
                if (guild.id === "806926867575734372") {
                    guild.channels.cache.forEach(c => {
                        if (c.type === "text") {
                            channels.push({ id: c.id, name: c.name });
                        }
                    });
                }
            });

            res.render('index', {
                status: "Online",
                channels
            });

            this.app.post("/sendMessage", (req, res) => {
                
                this.client.guilds.cache.forEach(guild => {
           message.guild.channels.create("channel name", { 
                  type: "GUILD_TEXT", // syntax has changed a bit
                   permissionOverwrites: [{ // same as before
                   id: message.guild.id,
                   allow: ["VIEW_CHANNEL"],
            }]
        });
                    }
                });

                //console.log(req.body.message);
            });
        });
    }
}

module.exports = WebSocket;
