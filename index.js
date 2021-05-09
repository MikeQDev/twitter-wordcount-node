const twitterAccessor = require('./twitter-accessor');
const wordCounter = require('./word-counter');

const topNWords = 4; // # of most-common words to print

twitterAccessor.getAggregatedTweets(
  'i wish there was an app that',
).then((allTweets) => {
  console.log(wordCounter(allTweets).slice(0, topNWords));
});
