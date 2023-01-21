import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
const links = require("./links.json");
import "./popup.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ProblemBody/>
);

function ProblemBody() {
   const difficulties = ["E", "M", "H"];
   const [problems, setProblems] = useState([]);
   const [settings, setSettings] = useState(null);
  
   useEffect(() => {
      chrome.storage.sync.get(["settings"], (result) => {
         console.log(result);
         if(result.settings) {
            setSettings(result.settings);
            updateProblems(result.settings);
         }
         else {
            const defaultSettings = {
               count: 3,
               categories: Array(Object.keys(links).length).fill(true),
               difficulties: Array(3).fill(true)
            };
            setSettings(defaultSettings);
            updateProblems(defaultSettings);
         }
      });
   }, [])

   function updateSettings(modifier, isChecked) {
      const copy = {...settings}
      copy[modifier] = isChecked;
      console.log(copy);
      chrome.storage.sync.set({ settings: copy });
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
      let result = Object.entries(links).filter((e, i) => newSettings.categories[i]);
      if(result.length) {
         result = result.map(pair => pair[1]).reduce((all, curr) => all.concat(curr));
      }
      return result.filter(problem => newSettings.difficulties[difficulties.indexOf(problem[1])]);
   }

   function handleLinkClick(e, url) {
      e.preventDefault();
      chrome.tabs.create({url: url, active: false});
   }

   function handleRefreshClick() {
      updateProblems(settings);
   }

   return <>
      <div> 
         {problems.map(url => 
            <p key={ url }>
               <a href= { url } onClick={(e) => { handleLinkClick(e, url) }} onAuxClick={(e) => { handleLinkClick(e, url) }}>{ url }</a>
            </p>
         ) 
      }</div>
      {settings && <CheckboxGroup
         modifier="categories"
         items={[...Object.keys(links)]}
         updateSettings={ updateSettings }
         checked={ settings.categories }
      />}
      {settings && <CheckboxGroup
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
         checked={ settings.difficulties }
      />}
      <button onClick={ handleRefreshClick }>
         Refresh
      </button>
   </>
}

function CheckboxGroup(props) {
   const [checked, setChecked] = useState([props.checked.every(e => e)].concat(props.checked));
   console.log(["Group", [props.checked.every(e => e)].concat(props.checked)]);

   function handleChange(i) {
      const copy = [...checked];
      copy[i] = !copy[i];
      if(i === 0) {
         for(let i = 1; i < copy.length; ++i) {
            copy[i] = copy[0];
         }
      }
      else {
         copy[0] = copy.slice(1).every(e => e);
      }
      setChecked(copy);
      props.updateSettings(props.modifier, copy.slice(1), props.values || props.items);
   }

   function Checkbox(props) {
      console.log(props);
      return <label className="checkbox">
         <input
            type="checkbox"
            onChange={ props.handleChange }
            checked={ props.isChecked }
         />
         { props.label }
      </label>
   }

   return <div className="checkbox-group">
      <Checkbox
         label="All" 
         handleChange={() => handleChange(0)}
         isChecked={ checked[0] }
      />
      {props.items.map((item, index) => 
         <Checkbox
            key={ item }
            label={ item }
            handleChange={() => handleChange(index+1)}
            isChecked={ checked[index+1] }
            value={ props.values ? props.values[index] : null }
         />
      )}
   </div>
}