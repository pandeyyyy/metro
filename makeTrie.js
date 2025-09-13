const prisma = require('./prisma/client');
const { trieCache } = require('./cache');

// Your original, efficient Trie implementation
class Trie {
    constructor() {
        this.root = {};
    }
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node[word[i]]) {
                node[word[i]] = {};
            }
            node = node[word[i]];
        }
        node.isEnd = true;
    }
}

async function getTrieForMetro(metroId) {
    const cacheKey = `trie:${metroId}`;
    let trie = trieCache.get(cacheKey);

    if (!trie) {
        console.log(`CACHE MISS: Building Trie for Metro ID ${metroId}`);
        
        const stations = await prisma.station.findMany({
            where: {
                lines: {
                    some: {
                        line: {
                            metroId: metroId,
                        },
                    },
                },
            },
            select: {
                name: true,
            },
        });

        trie = new Trie();
        for (const station of stations) {
            trie.insert(station.name.toLowerCase());
        }

        trieCache.set(cacheKey, trie);
    } else {
        console.log(`CACHE HIT: Using cached Trie for Metro ID ${metroId}`);
    }

    return trie;
}

module.exports = { getTrieForMetro, Trie };

