const fs = require('fs');

// Generate mock data
const searchData = [];
for (let i = 0; i < 1000; i++) {
  searchData.push({
    title: 'Test Title ' + i,
    tags: 'tag1 tag2',
    category: 'tech',
    excerpt: 'This is a test excerpt ' + i,
    content: 'This is a long test content with lots of text '.repeat(10),
    lang: i % 2 === 0 ? 'pt' : 'en',
    url: '/test/' + i
  });
}

const currentLang = 'all';
function langMatches(item) {
  return currentLang === 'all' || item.lang === currentLang;
}

const q = 'content'.toLowerCase();

function searchOriginal() {
  const matches = searchData.filter(function (item) {
    if (!langMatches(item)) { return false; }
    var haystack = (
      item.title + ' ' +
      item.tags + ' ' +
      item.category + ' ' +
      item.excerpt + ' ' +
      (item.content || '')
    ).toLowerCase();
    return haystack.indexOf(q) !== -1;
  });
  return matches;
}

function preprocessOptimized() {
  for (let i = 0; i < searchData.length; i++) {
    const item = searchData[i];
    item._haystack = (
      item.title + ' ' +
      item.tags + ' ' +
      item.category + ' ' +
      item.excerpt + ' ' +
      (item.content || '')
    ).toLowerCase();
  }
}

function searchOptimized() {
  const matches = searchData.filter(function (item) {
    if (!langMatches(item)) { return false; }
    return item._haystack.indexOf(q) !== -1;
  });
  return matches;
}

const iterations = 1000;

console.log("Running baseline benchmark...");
const startOriginal = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
  searchOriginal();
}
const endOriginal = process.hrtime.bigint();
const timeOriginal = Number(endOriginal - startOriginal) / 1000000; // ms
console.log(`Original time: ${timeOriginal}ms`);

console.log("Running optimized benchmark...");
preprocessOptimized(); // Precomputation is a one-time cost
const startOptimized = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
  searchOptimized();
}
const endOptimized = process.hrtime.bigint();
const timeOptimized = Number(endOptimized - startOptimized) / 1000000; // ms
console.log(`Optimized time: ${timeOptimized}ms`);

console.log(`Improvement: ${(timeOriginal / timeOptimized).toFixed(2)}x faster`);
