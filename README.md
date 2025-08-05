

# CSV Matching Tasks

This is a small project where I practiced solving two tasks related to CSV data parsing and matching using Node.js.

## Task Descriptions

### Task 1 – Find First Match

Given a CSV string and a dictionary of search keys, the function `task1` finds the first matching row and returns its value.  
If no match is found, it returns `'-1'`. If search keys do not match the CSV header, an exception is raised.

### Task 2 – Weighted Average

Given a list of search keys and the same CSV format as above, the function `task2` calculates the weighted average of the matched values.  
Weights:
- 10 if the value is odd
- 20 if the value is even

The result is a string rounded to one decimal place.

## How to Run

### 1. Install Dependencies

npm install lz4

## 2. Prepare Input File
Place your own data file named:

find_match_average.dat.lz4
in the project root directory. This is the file that will be read and decompressed with:

const fs = require('fs');
const lz4 = require('lz4');

const compressed = fs.readFileSync('find_match_average.dat.lz4');

3. Run the Script

node main.cjs

## Example Output
INDEX CREATED
Weighted average: 2.0
Execution time: 120ms

