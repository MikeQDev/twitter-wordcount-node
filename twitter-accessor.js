const Twitter = require('twitter-v2');
const privateVars = require('./private-vars.js');

const client = new Twitter({
  bearer_token: privateVars.bearer_token,
});

const allTweets = []; // Start with empty array of tweets.
// When no more tweets are left to pull from API,
// return populated array, allTweets, to module caller in index.js

function getTweets(query, nextToken) {
  const urlParams = { query, max_results: 10 };
  if (nextToken) {
    urlParams.next_token = nextToken;
  }
  client.get('tweets/search/recent', urlParams).then((result) => {
    allTweets.push(...result.data);
    if (!result.meta.next_token) {
      // No more results left in 'pagination'
      return;
    }
    // Get next 'page' of results
    getTweets(query, result.meta.next_token);
  });
}

module.exports.getAggregatedTweets = (tweetQuery) => {
  getTweets(tweetQuery);
  return allTweets;
};
