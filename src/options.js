import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const links = {
   "Arrays & Hashing": [
      ["https://leetcode.com/problems/contains-duplicate/", "E"],
      ["https://leetcode.com/problems/valid-anagram/", "E"],
      ["https://leetcode.com/problems/two-sum/", "E"],
      ["https://leetcode.com/problems/group-anagrams/", "M"],
      ["https://leetcode.com/problems/top-k-frequent-elements/", "M"],
      ["https://leetcode.com/problems/product-of-array-except-self/", "M"],
      ["https://leetcode.com/problems/valid-sudoku/", "M"],
      ["https://leetcode.com/problems/longest-consecutive-sequence/", "M"],
   ],
   "Two Pointers": [
      ["https://leetcode.com/problems/valid-palindrome/", "E"],
      ["https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", "M"],
      ["https://leetcode.com/problems/3sum/", "M"],
      ["https://leetcode.com/problems/container-with-most-water/", "M"],
      ["https://leetcode.com/problems/trapping-rain-water/", "H"]
   ],
   "Sliding Window": [
      ["https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", "E"],
      ["https://leetcode.com/problems/longest-substring-without-repeating-characters/", "M"],
      ["https://leetcode.com/problems/longest-repeating-character-replacement/", "M"],
      ["https://leetcode.com/problems/permutation-in-string/", "M"]
   ],
   "Stack": [
      ["https://leetcode.com/problems/valid-parentheses/", "E"],
      ["https://leetcode.com/problems/min-stack/", "M"],
      ["https://leetcode.com/problems/evaluate-reverse-polish-notation/", "M"],
      ["https://leetcode.com/problems/generate-parentheses/", "M"],
      ["https://leetcode.com/problems/daily-temperatures/", "M"],
      ["https://leetcode.com/problems/car-fleet/", "M"],
      ["https://leetcode.com/problems/largest-rectangle-in-histogram/", "H"]
   ],
   "Custom": [

   ]
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ProblemBody/>
);

function ProblemBody() {
   const [problems, setProblems] = useState([]);
   const [settings, setSettings] = useState({
      count: 3,
      categories: [],
      difficulties: ["E", "M", "H"]
   });

   useEffect(() => {
      updateProblems(settings);
   }, [])

   function updateSettings(modifier, isChecked, values) {
      const copy = { ...settings }
      copy[modifier] = values.filter((e, i) => isChecked[i]);
      setSettings(copy);
      updateProblems(copy);
   }

   function updateProblems(newSettings) {
      const result = new Set();
      const problems = filterProblems(newSettings);
      while(result.size < problems.length && result.size < newSettings.count) {
         result.add(Math.floor(Math.random() * problems.length));
      }
      setProblems([...result].map(i => problems[i][0]));
   }
   
   function filterProblems(newSettings) {
      let result;
      if(newSettings.categories.length && newSettings.difficulties.length) {
         result = Object.entries(links).filter(e => newSettings.categories.includes(e[0]))
            .map(pair => pair[1])
            .reduce((all, curr) => all.concat(curr));
      }
      else {
         result = Object.values(links).reduce((all, curr) => all.concat(curr))
      }
      return result.filter(problem => newSettings.difficulties.includes(problem[1]));
   }

   return <>
      <div> 
         {problems.map(url => 
            <p key={ url }><a href={ url }>{ url }</a></p>
         ) 
      }</div>
      <CheckboxGroup
         modifier="categories"
         items={[
            "Arrays & Hashing",
            "Two Pointers",
            "Sliding Window",
            "Stack"
         ]}
         updateSettings={ updateSettings }
      />
      <CheckboxGroup
         modifier="difficulties"
         items={[
            "Easy",
            "Medium",
            "Hard"
         ]}
         values={[
            "E",
            "M",
            "H"
         ]}
         updateSettings={ updateSettings }
      />
   </>
}

function CheckboxGroup(props) {
   const [allChecked, setAllChecked] = useState(true);
   const [checked, setChecked] = useState(Array(props.items.length).fill(true));

   function checkAll() {
      setChecked(Array(props.items.length).fill(!allChecked));
      props.updateSettings(props.modifier, Array(props.items.length).fill(!allChecked), props.values ? props.values : props.items);
      setAllChecked(!allChecked);
   }

   function handleChange(i) {
      const copy = [...checked];
      copy[i] = !copy[i];
      setChecked(copy);
      props.updateSettings(props.modifier, copy, props.values ? props.values : props.items);
   }

   function Checkbox(props) {
      return <label>
         <input
            type="checkbox"
            onChange={ props.handleChange }
            checked={ props.isChecked }
         />
         { props.label }
      </label>
   }

   return <div>
      <Checkbox
         label="All" 
         handleChange={ checkAll }
         isChecked={ allChecked }
      />
      { props.items.map((item, index) => 
         <Checkbox
            key={ item }
            label={ item }
            handleChange={() => handleChange(index)}
            isChecked={ checked[index] }
            value={ props.values ? props.values[index] : null }
         />
      )}
   </div>
}




