function findSuggestions(node, prefix, suggestions) {
    if (node.isEnd) {
        const formatted = prefix.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        suggestions.push(formatted);
    }

    for (let char in node) {
        if (char !== 'isEnd') {
            findSuggestions(node[char], prefix + char, suggestions);
        }
    }
}


function getRecommendations(trie, prefix) {
    let node = trie.root;
    const suggestions = [];
    const lowercasedPrefix = prefix.toLowerCase();

    for (let i = 0; i < lowercasedPrefix.length; i++) {
        if (node[lowercasedPrefix[i]]) {
            node = node[lowercasedPrefix[i]];
        } else {
            return [];
        }
    }

   findSuggestions(node, lowercasedPrefix, suggestions);

    return suggestions;
}

module.exports = { getRecommendations };
