function findRecomm(root, word) {
    // console.log(word);
    const recommendations= root.findRecommendation(word);
    // console.log("inside findRecomm");
    // console.log("Return value ",recommendations);
    return {recommendations};
}



module.exports = { findRecomm };
