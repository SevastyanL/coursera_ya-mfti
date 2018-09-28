/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    
    var uniqueHashes;

    if (hashtags.length == 0)
        return uniqueHashes;

    hashtags = hashtags.map(checkSpases);

    function checkSpases(data, index){
        return (data !== "");
    }
    var arrTags = [];
    var isExist;
    for (j = 0; j < hashtags.length; j++) {
      isExist = true;
        for (i = 0; i < arrTags.length; i++)
            if (hashtags[j].toLowerCase() === arrTags[i])
                isExist = false;
      if(isExist && hashtags[j] !== "")
          arrTags.push(hashtags[j].toLowerCase());
    }
    uniqueHashes = arrTags.join(", ");
    return uniqueHashes;
};
