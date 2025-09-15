const { LRUCache } = require('lru-cache')

const options = {
  max: 50,
  ttl: 1000 * 60 * 60
}

const graphCache = new LRUCache(options)
const trieCache = new LRUCache(options)

module.exports = { graphCache, trieCache }