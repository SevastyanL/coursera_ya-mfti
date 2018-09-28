/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var words = tweet.split(" ");
  var hashtags = [];
  words.forEach(checkHash);
  function checkHash(word) {
    if (word[0] == "#")
      hashtags.push(word.slice(1));
      return hashtags;
  }
  return hashtags;
};
