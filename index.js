const twitterAccessor = require('./twitter-accessor');
const wordCounter = require('./word-counter');

// # of most-common words to print. Set >0 to execute, <0 will print all
const topNWords = -1;
const tweetQuery = 'i wish there was an app';

twitterAccessor.getAggregatedTweets(
  tweetQuery,
).then((allTweets) => {
  console.log('Working with', allTweets.length, 'tweets for query `', tweetQuery, '`');
  if (topNWords > 0) {
    // for printing just topN common words
    console.log(wordCounter(allTweets).slice(0, topNWords));
  } else {
    // print all words that occurs more than once
    wordCounter(allTweets).forEach((wordCount) => {
      if (wordCount.count > 2) {
        console.log(wordCount);
      }
    });
  }
});
