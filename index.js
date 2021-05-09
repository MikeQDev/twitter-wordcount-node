const twitterAccessor = require('./twitter-accessor');
const wordCounter = require('./word-counter');

const topNWords = 4; // # of most-common words to print

const allTweets = twitterAccessor.getAggregatedTweets('I wish there was an app');
// console.log(allTweets);
console.log(wordCounter(allTweets).slice(0, topNWords));
