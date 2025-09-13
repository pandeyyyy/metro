const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { calculateRoute } = require('../fastestPath');
const { getTrieForMetro } = require('../makeTrie');
const { getRecommendations } = require('../recommend');

// GET /api/v1/metros
router.get('/metros', async (req, res) => {
    try {
        const metros = await prisma.metro.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        res.json(metros);
    } catch (error) {
        console.error('Failed to fetch metros:', error);
        res.status(500).json({ error: 'Failed to fetch metro systems' });
    }
});

// GET /api/v1/metros/:metroId/stations - autocomplete
router.get('/metros/:metroId/stations', async (req, res) => {
    const metroId = parseInt(req.params.metroId);
    const prefix = req.query.prefix || '';

    if (isNaN(metroId)) {
        return res.status(400).json({ error: 'Invalid Metro ID' });
    }
    if (!prefix) {
        return res.json([]);
    }

    try {
        const trie = await getTrieForMetro(metroId);
        
        const suggestions = getRecommendations(trie, prefix);

        res.json(suggestions.slice(0, 10));
    } catch (error) {
        console.error('Failed to get station recommendations:', error);
        res.status(500).json({ error: 'Failed to get station recommendations' });
    }
});

// POST /api/v1/metros/:metroId/route - fastest route
router.post('/metros/:metroId/route', async (req, res) => {
    const metroId = parseInt(req.params.metroId);
    const { startStation, endStation } = req.body;

    if (isNaN(metroId)) {
        return res.status(400).json({ error: 'Invalid Metro ID' });
    }
    if (!startStation || !endStation) {
        return res.status(400).json({ error: 'Start and end stations are required' });
    }

    try {
        const result = await calculateRoute(metroId, startStation, endStation);

        if (result.message) {
            return res.status(404).json({ error: result.message });
        }
        
        res.json(result);
    } catch (error) {
        console.error('Failed to calculate route:', error);
        res.status(500).json({ error: 'Failed to calculate route' });
    }
});

module.exports = router;