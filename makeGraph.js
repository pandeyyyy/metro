const prisma = require('./prisma/client');
const { graphCache } = require('./cache');

async function getGraphForMetro(metroId) {
  const cacheKey = `graph:${metroId}`;
  let graphData = graphCache.get(cacheKey);

  if (!graphData) {
    console.log(`CACHE MISS: Building graph for Metro ID ${metroId}`);
    
    const connections = await prisma.connection.findMany({
      where: { line: { metroId: metroId } },
      include: {
        fromStation: { select: { name: true } },
        toStation: { select: { name: true } },
        line: { select: { color: true } },
      },
    });

    const adj = {};
    const stationNames = new Set();

    for (const conn of connections) {
      const from = conn.fromStation.name;
      const to = conn.toStation.name;
      
      stationNames.add(from);
      stationNames.add(to);

      if (!adj[from]) adj[from] = [];
      if (!adj[to]) adj[to] = [];

      adj[from].push({ station: to, time: conn.timeInMinutes, line: conn.line.color });
    }
    
    graphData = {
        adj,
        stations: Array.from(stationNames)
    };

    graphCache.set(cacheKey, graphData);
  } else {
    console.log(`CACHE HIT: Using cached graph for Metro ID ${metroId}`);
  }

  return graphData;
}

module.exports = { getGraphForMetro };
