const Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = async function(pageNumber, searchKeyWord, filter) {
    try {
        var list = [];
        if(filter.type === 1 && searchKeyWord.value === "" ) {
            if(filter.value.length === 2 &&  !filter.value[1]){
            followersNumber = filter.value[0];
            const result = await client.get('users/search.json',{q: searchKeyWord.type , page: pageNumber, count: 20});
            await result.forEach(item => {
                if(item["followers_count"] > followersNumber  ) {
                    list.push(item);
                }
            });
            } else if(filter.value.length === 2 ){
            followersNumberOne = filter.value[0];
            followersNumberTwo = filter.value[1];
            const result = await client.get('users/search.json',{q: searchKeyWord.type  , page: pageNumber, count: 20});
            await result.forEach(item => {
                if(item["followers_count"] >= followersNumberOne && item["followers_count"] <= followersNumberTwo) {
                    list.push(item);
                }
            });
            }
        } else if(searchKeyWord.value !== "" && filter.type === 1) {
            if(filter.value.length === 2 &&  !filter.value[1]){
                followersNumber = filter.value[0];
                const result = await client.get('users/search.json',{q: searchKeyWord.type , page: pageNumber, count: 20});
                await result.forEach(item => {
                    if(item["followers_count"] > followersNumber &&  item["location"] == searchKeyWord.value  ) {
                        list.push(item);
                    }
                });
                } else if(filter.value.length === 2 ){
                followersNumberOne = filter.value[0];
                followersNumberTwo = filter.value[1];
                const result = await client.get('users/search.json',{q: searchKeyWord.type  , page: pageNumber, count: 20});
                await result.forEach(item => {
                    if(item["followers_count"] >= followersNumberOne && item["followers_count"] <= followersNumberTwo && item["location"] == searchKeyWord.value) {
                        list.push(item);
                    }
                });
                }
           
        } else  {
            if(searchKeyWord.value !== ""){
                const result = await client.get('users/search.json',{q: searchKeyWord.type  , page: pageNumber, count: 20});
                await result.forEach(item => {
                    if( item["location"] == searchKeyWord.value) {
                        list.push(item);
                    }
                });
            } else {
                const result = await client.get('users/search.json',{q: searchKeyWord.type, page: pageNumber, count: 20});
                list = result;
            }
           
        }
        return list;
    } catch (error) {
        throw new Error(error);
    }
};

