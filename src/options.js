import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const links = {
   "Arrays & Hashing": [
      "https://leetcode.com/problems/contains-duplicate/",
      "https://leetcode.com/problems/valid-anagram/",
      "https://leetcode.com/problems/two-sum/",
      "https://leetcode.com/problems/group-anagrams/",
      "https://leetcode.com/problems/top-k-frequent-elements/",
      "https://leetcode.com/problems/product-of-array-except-self/",
      "https://leetcode.com/problems/valid-sudoku/",
      "https://leetcode.com/problems/longest-consecutive-sequence/",
   ],
   "Two Pointers": [
      "https://leetcode.com/problems/valid-palindrome/",
      "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      "https://leetcode.com/problems/3sum/",
      "https://leetcode.com/problems/container-with-most-water/",
      "https://leetcode.com/problems/trapping-rain-water/"
   ],
   "Sliding Window": [
      "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      "https://leetcode.com/problems/longest-repeating-character-replacement/",
      "https://leetcode.com/problems/permutation-in-string/"
   ],
   "Custom": [

   ]
};

function getProblems(count, category="All", minDifficulty="E", maxDifficulty="H") {
   const result = new Set();
   const problems = Object.values(links).reduce((all, curr) => all.concat(curr));
   while(result.size < count) {
      result.add(Math.floor(Math.random() * problems.length));
   }
   return [...result].map(i => problems[i]);
}


root.render(
   <div> 
      {getProblems(3).map(url => 
         <p key={ url }><a href={ url }>{ url }</a></p>
      ) 
   }</div>
);



