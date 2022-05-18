const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
const router = express.Router();

let anouncements = [
    { id: 1650911666036, title: "Hi, I found a set of keys in the park. Anyone missing their keys? Fatih" },
    { id: 1648319617236, title: "I graduated from my weiterbildung program. Now party time details commig soon!!! Fatih" },
    { id: 1651343700037, title: "I would like to sell my couch for 10 euros. If interested just give me a call. Fatih" },
    { id: 1651732568239, title: "Why nobody using this app except me!!!" },
];

server.use(cors());

server.use(bodyParser.json());

router.get("/anouncements/:interval?", (req, res) => {
    const interval = req.params.interval;

    if (!interval || interval === "all") {
        return res.json(anouncements)
    }

    const filteredResult = anouncements.filter(item => item.id > (Date.now() - (+interval * 24 * 60 * 60 * 1000)))

    res.json(filteredResult);

});

router.post("/anouncements", (req, res) => {
    anouncements.push(req.body);
    res.json(req.body);
});

router.delete("/anouncements/:id", (req, res) => {
    const id = +req.params.id;
    anouncements = anouncements.filter(item => item.id !== id);
    res.end();
});

server.use(router);

server.listen(8080, () => {
    console.log("Server running on 'http://localhost:8080'")
})