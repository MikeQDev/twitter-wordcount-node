module.exports = (tweetData) => {
  // Perform word-count
  const wordCounts = {};
  tweetData.forEach((tweet) => {
    tweet.text.split(/[ ,-]+/).forEach((word) => { wordCounts[word] = word in wordCounts ? wordCounts[word] + 1 : 1; });
  });

  // Sort
  const sortable = [];
  Object.keys(wordCounts).forEach((word) => { sortable.push({ word, count: wordCounts[word] }); });
  sortable.sort((a, b) => b.count - a.count);
  return sortable;
};
