const difficultyMapping = {
    "Easy": "E",
    "Medium": "M",
    "Hard": "H"
};
let obj = {};
document.querySelectorAll(".accordion-container.flex-container-col").forEach(category => {
    let name = category.querySelector("p").textContent;
    obj[name] = [];
    category.querySelectorAll("tbody tr").forEach(problem => {
        let link = problem.querySelector("a"); 
        obj[name].push([link.textContent, link.href, difficultyMapping[problem.querySelector("td:nth-child(4) b").textContent]]);
    });
});
console.log(obj);

