
export default class CVExample
{
    /**@type {string} */
    title;
    /**@type {string} */
    projectName;
    /**@type {string} */
    timePeriod;
    /**@type {string[]} */
    skills;

    /**
     * @param {string} title 
     * @param {string} projectName 
     * @param {string} timePeriod 
     * @param {string} skills 
     */
    constructor(title, projectName, timePeriod, skills){
        this.title = title;
        this.projectName = projectName;
        this.timePeriod = timePeriod;
        this.skills = skills;
    }

    toString()
    {
        let result = 
        `
        <h6>${this.title}</h6>
        ${this.projectName} ${this.timePeriod}<br>
        `;

        this.skills.forEach(skill => 
        {
            result += `\u2022 ${skill}<br>`;
        });

        return result;
    }

    /**
     * 
     * @param {string} titleId 
     * @param {string} projectNameId 
     * @param {string} timePeriodId 
     */
    static fetchData(titleId, projectNameId, timePeriodId){
        let title = document.getElementById(titleId);
        let projectName = document.getElementById(projectNameId);
        let timePeriod = document.getElementById(timePeriodId);

        return new CVExample(title, projectName, timePeriod, "");
    }
}