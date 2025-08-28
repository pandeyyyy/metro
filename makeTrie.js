class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        if (!word) return; 
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    findRecommendation(word) {
        let node = this.root;
        const recommendations = [];

        for (let char of word.toLowerCase()) {
            // console.log(typeof node.children);
            if (!node.children[char]) {
                return recommendations; 
            }
            node = node.children[char];
        }

        this._findWords(node, word, recommendations);
        // console.log("parent function",recommendations);
        return recommendations.slice(0,5); 
    }

    _findWords(node, prefix, recommendations) {
        // console.log("inside findWords");
        if (node.isEndOfWord) {
            recommendations.push(prefix);
            // console.log(recommendations);
        }
        for (let char in node.children) {
            this._findWords(node.children[char], prefix + char, recommendations);
        }
    }
}

const root = new Trie();



function insertStations(stationNames) {
    for (let name of stationNames) {
        root.insert(name);
    }
}

const stations = {
    blueLine: require('./stations/blueLine.json'),
    blueBranchedLine: require('./stations/blueBranchedLine.json'),
    magentaLine: require('./stations/magentaLine.json'),
    yellowLine: require('./stations/yellowLine.json'),
    violetLine: require('./stations/violetLine.json'),
    redLine: require('./stations/redLine.json'),
    greenLine: require('./stations/greenLine.json'),
    greenBranchedLine: require('./stations/greenBranchedLine.json'),
    pinkLine: require('./stations/pinkLine.json'),
    pinkBranchedLine: require('./stations/pinkBranchedLine.json'),
    orangeLine: require('./stations/orangeLine.json'),
    greyLine: require('./stations/greyLine.json')
};


for (let line in stations) {
    insertStations(stations[line].map(station => station.name.toLowerCase()));
}

module.exports = root;
