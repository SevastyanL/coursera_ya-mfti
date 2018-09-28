/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    
    hashtags = hashtags.filter(checkSpases);
    hashtags = delCommas(hashtags);
    if (hashtags.length == 0)
      return "";
    hashtags = delDoubles(hashtags).join(", ");

    function delCommas(hashtags){
      for(var i = 0; i < hashtags.length; i++)
        if (hashtags[i][0] === "\'" || hashtags[i][0] === "\"")
          hashtags[i] = hashtags[i].slice(1, -1);
      return hashtags;
    }

    function checkSpases(data, index){
        return (data !== "" && data !== '');
    }

    function delDoubles(hashtags){
      var tags = [hashtags[0].toLowerCase()];
      var check;
      for(var i = 1; i < hashtags.length; i++){
        check = true;
        for (var j = 0; j < tags.length; j++){
          if (hashtags[i].toLowerCase() === tags[j])
            check = false;
        }
        if (check){
          tags.push(hashtags[i].toLowerCase());
        }
      }
      return tags;
    }
    return hashtags;
};
