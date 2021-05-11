const fs = require('fs');
const twitterAccessor = require('./twitter-accessor');
const wordCounter = require('./word-counter');

// # of most-common words to print. Set >0 to execute, <0 will print all
const topNWords = -1;
const wordSequenceCount = 5; // # of words to group together in count
const tweetQuery = 'i wish there was an app';
const tweetDataOutPath = `${tweetQuery.replace(/[^A-Za-z]/g, '')}-${Date.now()}-output.json`;

if (wordSequenceCount < 1) {
  console.log('Word sequence count must be >= 1');
  process.exit(1);
}

twitterAccessor.getAggregatedTweets(
  tweetQuery,
).then((allTweets) => {
  console.log('Working with', allTweets.length, 'tweets for query `', tweetQuery, '`');
  // write tweets to file for follow-up
  fs.writeFile(tweetDataOutPath, JSON.stringify(allTweets), (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
    }
  });

  // NOTE: watch out duplicate words/phrases from retweets, 'RT @user ...'
  if (topNWords > 0) {
    // for printing just topN common words
    console.log(wordCounter(allTweets).slice(0, topNWords));
  } else {
    // print all words that occurs more than once
    wordCounter(allTweets, wordSequenceCount).forEach((wordCount) => {
      if (wordCount.count > 2) {
        console.log(wordCount);
      }
    });
  }
});
