
export default class CVExample
{
    /**@type {string} */
    title;
    /**@type {string} */
    projectName;
    /**@type {string} */
    timePeriod;
    /**@type {string[]} */
    tasks;

    /**
     * @param {string} title 
     * @param {string} projectName 
     * @param {string} timePeriod 
     * @param {string} tasks 
     */
    constructor(title, projectName, timePeriod, tasks){
        this.title = title;
        this.projectName = projectName;
        this.timePeriod = timePeriod;
        this.tasks = tasks;
    }

    toString()
    {
        let result = 
        `
        <h6>${this.title}</h6>
        ${this.projectName} ${this.timePeriod}<br>
        `;

        this.tasks.forEach(task => 
        {
            result += `\u2022 ${task}<br>`;
        });

        return result;
    }

    /**
     * @param {string} titleId 
     * @param {string} projectNameId 
     * @param {string} timePeriodId 
     * @param {string} skillsIdPrefix
     * @param {number} count
     */
    static fetchData(titleId, projectNameId, timePeriodId, tasksIdPrefix, taskFieldsCount){
        let title = document.getElementById(titleId).value;
        let projectName = document.getElementById(projectNameId).value;
        let timePeriod = document.getElementById(timePeriodId).value;
        let tasks = [];

        for(let i = 0; i < taskFieldsCount; i++)
        {
            console.log(tasksIdPrefix + i);
            tasks.push(document.getElementById(tasksIdPrefix + i).value);
        }

        console.log(tasks);

        return new CVExample(title, projectName, timePeriod, tasks);
    }
}