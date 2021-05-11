// tweetData = array of tweets
// wordSequenceCount = # of words to group together for counting
module.exports = (tweetData, wordSequenceCount) => {
  // Perform word-count
  const wordCounts = {};
  tweetData.forEach((tweet) => {
    const split = tweet.text.split(/[ ,.?]+/);
    split.forEach((word, index) => {
      // one-word count
      // wordCounts[word] = word in wordCounts ? wordCounts[word] + 1 : 1;
      const wordPair = index + wordSequenceCount <= split.length
        ? split.slice(index, index + wordSequenceCount).join(' ')
        : ''; // This probably isn't efficient
      wordCounts[wordPair] = wordPair in wordCounts ? wordCounts[wordPair] + 1 : 1;
    });
  });

  // Sort
  const sortable = [];
  Object.keys(wordCounts).forEach((word) => {
    sortable.push({ word, count: wordCounts[word] });
  });
  sortable.sort((a, b) => b.count - a.count);
  return sortable;
};
