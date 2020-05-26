const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const riotKey = process.env.RIOTKEY;

let championsList = {};
axios
  .get(
    `http://ddragon.leagueoflegends.com/cdn/10.10.3208608/data/en_US/champion.json`
    
  )
  .then((response) => (championsList = response.data.data))
  .catch((error) => error);

router.post("/summoner", (req, res) => {
  if (!riotKey) res.json("no api key");
  else {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summonerName}?api_key=${riotKey}`;
    axios
      .get(url)
      .then(({ data }) => res.json(data))
      .catch((error) => res.json(error));
  }
});

router.post("/championslist", (req, res) => {
  const list = Object.keys(championsList);
  res.json(list.length ? list : "sth wrong with getting championList variable");
});

router.post("/champions", (req, res) => {
  if (!req.body.name) res.json({ error: "error" });
  else {
    const url = `http://ddragon.leagueoflegends.com/cdn/10.9.1/data/en_US/champion/${req.body.name}.json`;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        res.json(response.data.data[req.body.name]);
      })
      .catch((error) => res.json(error));
  }
});

module.exports = router;
