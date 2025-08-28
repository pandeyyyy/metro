const express = require("express");
const router = express.Router()
const {findRecomm}= require('../recommend');
const {findFastestPath}=require('../fastestPath');

router.post('/',(req,res)=>{
    try {
            const { startStation, endStation } = req.body;
            
            const adjacencyList = req.adjacencyList;
            const stations = req.stations;
            var {finalPath,totalTime,interChanges,estimatedFare} = findFastestPath(adjacencyList, startStation, endStation,stations);
           
            res.json({finalPath,totalTime,interChanges,estimatedFare});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/recommend1',(req,res)=>{
    try {
            const { stationName } = req.body;
            
            var sta1=stationName.trim().toLowerCase();
            
            const root = req.root;
           
            var {recommendations} = findRecomm(root, sta1);
            var recommendations1=recommendations;

            res.json({recommendations1});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/recommend2',(req,res)=>{
    try {
            const { stationName } = req.body;
           
            var sta1=stationName.trim().toLowerCase();

            const root = req.root;
           
            var {recommendations} = findRecomm(root, sta1);
      
            var recommendations2=recommendations;

            res.json({recommendations2});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
