export default class FormUtil
{
    static buttonsCount = 0;
    static skillFieldsCount = 0;

    static createAddFormButton(cvExampleForms, buttonHolders, delegate)
    {
        const addCVExampleButton = document.createElement("button");
        addCVExampleButton.className = "btn btn-primary mb-3";
        addCVExampleButton.innerText = "Dodaj Element";
        addCVExampleButton.onclick = () => 
        {
            delegate(cvExampleForms);
        };
        buttonHolders[FormUtil.buttonsCount++].appendChild(addCVExampleButton);
    }
    static createAddFieldButton(cvExampleForms, formDiv, delegate)
    {
        const addTaskFieldButton = document.createElement("button");
        addTaskFieldButton.id = "AddTask";
        addTaskFieldButton.className = "btn btn-primary mb-3";
        addTaskFieldButton.innerText = "Dodaj Zadanie";
        addTaskFieldButton.onclick = () => 
        {
            delegate(cvExampleForms);
        };
        formDiv.appendChild(addTaskFieldButton);
    }
    static createExpirienceForm(cvExampleForms, expiriencesDiv)
    {
        let length = cvExampleForms["expirience"].length;
        if (length >= 3) return;

        const data = FormUtil.createCVExampleForm(cvExampleForms, "expirience", expiriencesDiv, "Tytuł", "Nazwa Projektu", "Przediał Czasu");

        FormUtil.createAddFieldButton(
            cvExampleForms,
            data.formDiv,
            () => {
                FormUtil.createTaskField(cvExampleForms, "expirience", length, data.skillTasksDiv);
            }
        );

        cvExampleForms["expirience"].push(
            { 
                taskFieldsCount: 1,
            }
        );
    }
    static createEducationForm(cvExampleForms, educationDiv)
    {
        let length = cvExampleForms["education"].length;
        if (length >= 3) return;

        const data = FormUtil.createCVExampleForm(cvExampleForms, "education", educationDiv, "Szkoła", "Kierunek", "Przediał Czasu");

        FormUtil.createAddFieldButton(
            cvExampleForms,
            data.formDiv,
            () => {
                FormUtil.createTaskField(cvExampleForms, "education", length, data.skillTasksDiv);
            }
        );

        cvExampleForms["education"].push(
            { 
                taskFieldsCount: 1,
            }
        );
    }
    /**
     * @param {string} formName
     * @param {HTMLElement} parent
     * @param {string} titleLabel 
     * @param {string} projectNameLabel 
     * @param {string} timePeriodLabel 
     */
    static createCVExampleForm(cvExampleForms, formName, parent, titleLabel, projectNameLabel, timePeriodLabel)
    {
        const id = cvExampleForms[formName].length;

        const formDiv = document.createElement("div");
        formDiv.id = `formDiv${id}`;
        parent.appendChild(formDiv);

        const rowDiv = document.createElement("div");
        rowDiv.className = "row";
        formDiv.appendChild(rowDiv);

        const colDiv = document.createElement("div");
        colDiv.className = "col-sm";
        rowDiv.appendChild(colDiv);

        FormUtil.createInputField("input", true, "text", `TitleField-${formName}-${id}`, titleLabel, colDiv);
        
        const colDiv2 = document.createElement("div");
        colDiv2.className = "col";
        rowDiv.appendChild(colDiv2);

        FormUtil.createInputField("input", true, "text", `ProjectNameField-${formName}-${id}`, projectNameLabel, colDiv2);
        FormUtil.createInputField("input", true, "text", `TimePeriodField-${formName}-${id}`, timePeriodLabel, formDiv);
        
        const skillTasksDiv = document.createElement("div");
        skillTasksDiv.id = "SkillTasks";
        formDiv.appendChild(skillTasksDiv);

        FormUtil.createInputField("textarea", false, "", `TaskField-${formName}-${id}-0`, "Zadanie", skillTasksDiv);

        return {
            skillTasksDiv: skillTasksDiv,
            formDiv: formDiv
        };
    }
    /**
     * @param {string} formName
     * @param {number} formId
     * @param {HTMLDivElement} skillFieldsDiv 
    */
    static createTaskField(cvExampleForms, formName, formId, skillFieldsDiv)
    {
        let form = cvExampleForms[formName][formId];
        
        if (form.taskFieldsCount >= 3) return;
        
        FormUtil.createInputField("textarea", false, "", `TaskField-${formName}-${formId}-${form.taskFieldsCount}`, "Zadanie", skillFieldsDiv);
        
        form.taskFieldsCount++;
    }
    static createSkillField(skillsField)
    {
        if (FormUtil.skillFieldsCount >= 3) return;

        FormUtil.createInputField("textarea", false, "", `SkillField-${FormUtil.skillFieldsCount}`, "Umiejętność", skillsField);

        FormUtil.skillFieldsCount++;
    }
    /**
     * @param {string} element html element
     * @param {boolean} useType
     * @param {string} type 
     * @param {number} id 
     * @param {string} placeholder 
     * @param {HTMLElement} parent 
     */
    static createInputField(element, useType, type, id, placeholder, parent)
    {
        const div = document.createElement("div");
        div.className = "form-floating mb-3";
        parent.appendChild(div);

        const input = document.createElement(element);
        if (useType) input.type = type;
        input.id = id;
        input.className = "form-control"
        input.placeholder = placeholder;
        div.appendChild(input);

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.innerText = placeholder;
        div.appendChild(label);
    }
}