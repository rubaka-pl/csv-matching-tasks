const fs = require('fs');
const lz4 = require('lz4');

function computeHash(values) {
  let hash = BigInt(0);
  for (const val of values) {
    hash = hash * BigInt(1_000_003) + BigInt(val);
  }
  return hash;
}

function parseAndIndexCSV(dataStr) {
  const lines = dataStr.trim().split('\n');
  const headers = lines[0].trim().split(',');

  const valueIndex = headers.indexOf('value');
  if (valueIndex === -1) throw new Error("CSV data missing 'value' column");

  const searchKeys = headers.filter((_, i) => i !== valueIndex);
  const searchIndices = searchKeys.map((key) => headers.indexOf(key));

  const index = new Map();

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const key = computeHash(searchIndices.map((idx) => row[idx]));
    index.set(key, row[valueIndex]);
  }

  console.log('INDEX CREATED');
  return { index, searchKeys };
}

function task1(search, parsed) {
  const { index, searchKeys } = parsed;

  const inputKeys = Object.keys(search);
  const keysMatch =
    inputKeys.length === searchKeys.length &&
    searchKeys.every((k) => inputKeys.includes(k));

  if (!keysMatch) throw new Error('Key mismatch');

  const key = computeHash(searchKeys.map((k) => search[k]));
  const value = index.get(key);
  return value === undefined ? '-1' : value;
}

function task2(searchList, parsed) {
  let sumWeighted = 0;
  let totalWeight = 0;

  for (const search of searchList) {
    const valueStr = task1(search, parsed);
    if (valueStr === '-1') continue;

    const value = parseInt(valueStr, 10);
    const weight = value % 2 === 0 ? 20 : 10;

    sumWeighted += value * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return '0.0';
  const average = sumWeighted / totalWeight;
  return average.toFixed(1);
}

console.time('Execution');

const compressed = fs.readFileSync('find_match_average.dat.lz4');
const decompressed = lz4.decode(compressed);
const csvData = decompressed.toString('utf-8');

const parsed = parseAndIndexCSV(csvData);

const result = task2(
  [
    { a: 862984, b: 29105, c: 605280, d: 678194, e: 302120 },
    { a: 20226, b: 781899, c: 186952, d: 506894, e: 325696 },
  ],
  parsed
);

console.log(result);
console.timeEnd('Execution');
