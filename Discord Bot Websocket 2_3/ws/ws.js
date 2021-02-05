const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

class WebSocket {

    constructor(port, token) {

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
            res.render('index', {
                status: "Online"
            });
        });
    }
}

module.exports = WebSocket;