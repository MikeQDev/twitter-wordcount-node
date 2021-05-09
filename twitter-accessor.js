const Twitter = require('twitter-v2');
const privateVars = require('./private-vars.js');

const client = new Twitter({
  bearer_token: privateVars.bearer_token,
});

/* Equivalent to:
(urlParams) => new Promise((resolve) => resolve(
  client.get('tweets/search/recent', urlParams).then((result) => result)));
and (urlParams) =>
  Promise.resolve(client.get('tweets/search/recent', urlParams).then((result) => result));
*/
const queryTwitter = (urlParams) => client.get('tweets/search/recent', urlParams).then((result) => result);

async function getTweets(query, nextToken) {
  if (typeof nextToken === 'undefined') { // No more results left in 'pagination'
    return [];
  }

  // Set params and execute request
  const requestParams = { query, max_results: 10 };
  if (nextToken !== null) {
    requestParams.next_token = nextToken;
  }
  const resp = await queryTwitter(requestParams);

  // Combine response data with subsequent pagination request results
  return resp.data
    .concat(await (getTweets(query, resp.meta.next_token)));
}

module.exports.getAggregatedTweets = (tweetQuery) => getTweets(tweetQuery, null);
