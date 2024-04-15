const expiriences = document.getElementById("Expiriences");
const skills = document.getElementById("Skills");
const education = document.getElementById("Education");
const buttonHolders = document.getElementsByClassName("ButtonHolder");

let cvExampleForms = {
    "education": [],
    "expirience": []
};
let buttonsCount = 0;
let skillFieldsCount = 0;

createExpirienceForm();
createAddFormButton(createExpirienceForm);
createSkillField();
createAddFormButton(createSkillField);
createEducationForm();
createAddFormButton(createEducationForm);

function createAddFormButton(delegate)
{
    const addCVExampleButton = document.createElement("button");
    addCVExampleButton.className = "btn btn-primary mb-3";
    addCVExampleButton.innerText = "Dodaj Element";
    addCVExampleButton.onclick = () => 
    {
        delegate();
    };
    buttonHolders[buttonsCount++].appendChild(addCVExampleButton);
}
function createAddFieldButton(formDiv, delegate)
{
    const addTaskFieldButton = document.createElement("button");
    addTaskFieldButton.id = "AddTask";
    addTaskFieldButton.className = "btn btn-primary mb-3";
    addTaskFieldButton.innerText = "Dodaj Zadanie";
    addTaskFieldButton.onclick = () => 
    {
        delegate();
    };
    formDiv.appendChild(addTaskFieldButton);
}
function createExpirienceForm()
{
    let length = cvExampleForms["expirience"].length;
    if (length >= 3) return;

    const data = createCVExampleForm(expiriences, "Tytuł", "Nazwa Projektu", "Przediał Czasu");

    createAddFieldButton(
        data.formDiv,
        () => {
        createTaskField("expirience", length, data.skillTasksDiv);
        }
    );

    cvExampleForms["expirience"].push(
        { 
            taskFieldsCount: 0,
        }
    );
}
function createEducationForm()
{
    let length = cvExampleForms["education"].length;
    if (length >= 3) return;

    const data = createCVExampleForm(education, "Szkoła", "Kierunek", "Przediał Czasu");

    createAddFieldButton(
        data.formDiv,
        () => {
        createTaskField("education", length, data.skillTasksDiv);
        }
    );

    cvExampleForms["education"].push(
        { 
            taskFieldsCount: 0,
        }
    );
}
/**
 * @param {HTMLElement} parent
 * @param {string} titleLabel 
 * @param {string} projectNameLabel 
 * @param {string} timePeriodLabel 
 */
function createCVExampleForm(parent, titleLabel, projectNameLabel, timePeriodLabel)
{
    const formDiv = document.createElement("div");
    formDiv.id = `formDiv${cvExampleForms.length}`;
    parent.appendChild(formDiv);

    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    formDiv.appendChild(rowDiv);

    const colDiv = document.createElement("div");
    colDiv.className = "col-sm";
    rowDiv.appendChild(colDiv);

    createInputField("input", true, "text", "TitleField", titleLabel, colDiv);
    
    const colDiv2 = document.createElement("div");
    colDiv2.className = "col";
    rowDiv.appendChild(colDiv2);

    createInputField("input", true, "text", "ProjectName", projectNameLabel, colDiv2);
    createInputField("input", true, "text", "TimePeriod", timePeriodLabel, formDiv);
    
    const skillTasksDiv = document.createElement("div");
    skillTasksDiv.id = "SkillTasks";
    formDiv.appendChild(skillTasksDiv);

    createInputField("textarea", false, "", "Task0", "Zadanie", skillTasksDiv);

    return {
        skillTasksDiv: skillTasksDiv,
        formDiv: formDiv
    };
}
/**
 * @param {string} formName
 * @param {number} id 
 * @param {HTMLDivElement} skillFieldsDiv 
*/
function createTaskField(formName, id, skillFieldsDiv)
{
    let form = cvExampleForms[formName][id];
    
    if (form.taskFieldsCount >= 2) return;
    
    createInputField("textarea", false, "", `Skill${form.taskFieldsCount}`, "Zadanie", skillFieldsDiv);
    
    form.taskFieldsCount++;
}
function createSkillField()
{
    if (skillFieldsCount >= 3) return;

    createInputField("textarea", false, "", `Skill${skillFieldsCount}`, "Umiejętność", skills);

    skillFieldsCount++;
}
/**
 * @param {string} element html element
 * @param {boolean} useType
 * @param {string} type 
 * @param {number} id 
 * @param {string} placeholder 
 * @param {HTMLElement} parent 
 */
function createInputField(element, useType, type, id, placeholder, parent)
{
    const div = document.createElement("div");
    div.className = "form-floating mb-3";
    parent.appendChild(div);

    const input = document.createElement(element);
    if (useType)input.type = type;
    input.id = id;
    input.className = "form-control"
    input.placeholder = placeholder;
    div.appendChild(input);

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerText = placeholder;
    div.appendChild(label);
}