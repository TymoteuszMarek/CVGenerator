const expiriences = document.getElementById("expiriences");
let cvForms = [];
createCVExampleForm();

function createCVExampleForm(){
    const formDiv = document.createElement("div");
    formDiv.id = `formDiv${cvExampleFormsCount}`;
    expiriences.appendChild(formDiv);

    const titleField = document.createElement("input")
    titleField.type = "text";
    titleField.id = "TitleField";
    titleField.placeholder = "Title";
    formDiv.appendChild(titleField);

    const projectNameField = document.createElement("input")
    projectNameField.type = "text";
    projectNameField.id = "ProjectName";
    projectNameField.placeholder = "ProjectName";
    formDiv.appendChild(projectNameField);

    const timePeriodField = document.createElement("input")
    timePeriodField.type = "text";
    timePeriodField.id = "TimePeriod";
    timePeriodField.placeholder = "TimePeriod";
    formDiv.appendChild(timePeriodField);
    
    const skillField = document.createElement("textarea")
    skillField.cols = 1;
    skillField.rows = 1;
    skillField.id = "Skill";
    skillField.placeholder = "Skill";
    formDiv.appendChild(skillField);

    cvExampleFormsCount++;

    cvForms.push({ skillFieldsCount: 1 });
        
}
function createSkillField(id){
    let skillFieldsCount = cvForms[id].skillFieldsCount;
    
}

