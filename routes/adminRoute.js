const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { graphCache, trieCache } = require('../cache');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.use(verifyToken, verifyAdmin);

router.post('/metros', async (req, res) => {
    const { name, city } = req.body;
    try {
        const metro = await prisma.metro.create({
            data: { name, city }
        });
        res.status(201).json(metro);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create metro' });
    }
});

router.get('/metros', async (req, res) => {
    try {
        const metros = await prisma.metro.findMany();
        res.json(metros);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch metros' });
    }
});


router.post('/metros/:metroId/lines', async (req, res) => {
    const metroId = parseInt(req.params.metroId);
    const { name, color } = req.body;
    try {
        const line = await prisma.line.create({
            data: { name, color, metroId }
        });
        graphCache.delete(`graph:${metroId}`);
        trieCache.delete(`trie:${metroId}`);
        res.status(201).json(line);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create line' });
    }
});


router.post('/lines/:lineId/stations', async (req, res) => {
    const lineId = parseInt(req.params.lineId);
    const { stationName, connectionTime = 2 } = req.body;

    try {
        const line = await prisma.line.findUnique({ where: { id: lineId }});
        if (!line) return res.status(404).json({ error: 'Line not found' });
        
        const station = await prisma.station.upsert({
            where: { name: stationName },
            update: {},
            create: { name: stationName }
        });

        await prisma.stationToLine.create({
            data: { stationId: station.id, lineId }
        });


        graphCache.delete(`graph:${line.metroId}`);
        trieCache.delete(`trie:${line.metroId}`);
        
        res.status(201).json(station);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to create and link station' });
    }
});


module.exports = router;
