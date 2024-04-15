import { ShadingPattern, TilingPattern, jsPDF } from "jspdf";
import Rect from "../pdfFramework/Rect";
import HTMLText from "../pdfFramework/HTMLText";
import CVExample from "./CVExample";

const generateButton = document.getElementById("Generate");
generateButton.onclick = () =>
{
    generate();
};

const A4Height = 297;
const A4Width = 210;

let doc = new jsPDF();

// Default export is a4 paper, portrait, using millimeters for units
function generate()
{
    doc = new jsPDF({
        unit: "mm"
    });

    console.log("kys");
    let name = document.getElementById("Name").value;
    let lastName = document.getElementById("LastName").value;
    let position = document.getElementById("Position").value;
    let phoneNumber = document.getElementById("PhoneNumber").value;
    //let email = document.getElementById("Email").value;
    let address = document.getElementById("Address").value;
    let aboutMyself = document.getElementById("AboutMyself").value;
    name = "TYMOTEUSZ";
    lastName = "MAREK";
    phoneNumber = "728 145 241";
    let email = "tymekmarek2@gmail.com";
    address = "ul. Sokola 10, Ceradz Koscielny";
    position = "Senior Developer";
    aboutMyself = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora odit ducimus aut. Delectus, quam officia dicta reiciendis corporis voluptatibus molestiae possimus sequi. Exercitationem unde explicabo amet quae veniam facere nihil.
    Quia, illo eius. Provident, recusandae ut nisi dolore, esse voluptatibus.`;
    /**@type {CVExample[]} */
    let expirience = [
        new CVExample(
            "Gra RTS",
            "Grunwald RTS",
            "październik 2023 - teraz",
            [
                "Implementacja proceduralnej generacji",
                "Tworzenie modeli 3D w programie blender",
                "Pisanie shaderów w języku HLSL"
            ]
        ),
        new CVExample(
            "Sklep internetowy",
            "inventcraft.online",
            "czerwiec - sierpień 2023",
            [
                "Implementacja proceduralnej generacji",
                "Tworzenie modeli 3D w programie blender",
                "Pisanie shaderów w języku HLSL"
            ]
        ),
        new CVExample(
            "Gra RTS",
            "Grunwald RTS",
            "październik 2023 - teraz",
            [
                "Implementacja proceduralnej generacji",
                "Tworzenie modeli 3D w programie blender",
                "Pisanie shaderów w języku HLSL"
            ]
        )
    ];
    let skills = [
        "Tworzenie stron internetowych używając technologi DotNet oraz Symfony",
        "Tworzenie gier komputerowych w silniku Unity",
        "Projektowanie i adnimistracja baz danych w języku MySQL"
    ]
    /**@type {CVExample[]} */
    let education = [
        new CVExample(
            "Zespół Szkół Łączności",
            "Technik programista",
            "2021 - teraz",
            [
                "Programownie obiektowe",
                "Tworzenie stron internetowych",
                "Praca zespołowa w ramach kilku projektów zespołowych"
            ]
        ),
        new CVExample(
            "Zespół Szkół Łączności",
            "Technik programista",
            "2021 - teraz",
            [
                "Programownie obiektowe",
                "Tworzenie stron internetowych",
                "Praca zespołowa w ramach kilku projektów zespołowych"
            ]
        ),
        new CVExample(
            "Zespół Szkół Łączności",
            "Technik programista",
            "2021 - teraz",
            [
                "Programownie obiektowe",
                "Tworzenie stron internetowych",
                "Praca zespołowa w ramach kilku projektów zespołowych"
            ]
        )
    ];
    
    /**@type {Rect} */
    let pdfRect = new Rect(doc, false, undefined, 0, 0, A4Width, A4Height);
    
    /**@type {Rect} */
    let headerRect = new Rect(doc, true, pdfRect, 0, 0, A4Width, 65);
    headerRect.styleData.backgroundColor = "#0783a4";
    headerRect.fontData.fontColor = "white";
    headerRect.draw();

    /**@type {Rect} */
    let nameRect = new Rect(doc, true, headerRect, 20, 15, 115, 30);
    nameRect.styleData.border = "2 red";
    nameRect.setHTMLText(new HTMLText(
        `<h2>${name}</h2>
        <h2>${lastName}</h2>`
    ));
    nameRect.draw();

    /**@type {Rect} */
    let positionRect = new Rect(doc, true, headerRect, 20, 50, 115, 0);
    positionRect.styleData.border = "2 blue";
    positionRect.fontData.fontSize = 21;
    positionRect.setHeight(positionRect.getLineHeight());
    positionRect.setHTMLText(new HTMLText(
        `${position}`
    ));
    positionRect.draw();

    /**@type {Rect} */
    let contactRect = new Rect(doc, true, headerRect, 120, 30, 115, 0);
    contactRect.styleData.border = "2 green";
    contactRect.fontData.fontSize = 10;
    contactRect.setHeight(positionRect.getLinesHeight(3));
    contactRect.setHTMLText(new HTMLText(
        `Telefon: ${phoneNumber}<br>
        Email: ${email}<br>
        Adres: ${address}`
    ));
    contactRect.draw();

    /**@type {Rect} */
    let bodyRect = new Rect(doc, true, pdfRect, 0, 65, A4Width, A4Height - headerRect.getHeight());
    bodyRect.styleData.border = "2 red";
    //bodyRect.draw();

    /**@type {Rect} */
    let aboutMyselfRect = new Rect(doc, true, bodyRect, 20, 15, A4Width / 2 - 30, 45);
    aboutMyselfRect.styleData.border = "2 green";
    aboutMyselfRect.fontData.fontSize = 9;
    aboutMyselfRect.setHTMLText(new HTMLText(
        `<h5>O MNIE</h5>
        ${aboutMyself}`
    ));
    aboutMyselfRect.draw();

    /**@type {Rect} */
    let expirienceRect = new Rect(doc, true, bodyRect, 20, 60, aboutMyselfRect.getWidth(), 125);
    expirienceRect.styleData.border = "2 blue";
    expirienceRect.setHTMLText(new HTMLText(
        `<h5>DOSWIADCZENIE</h5>`
    ));
    expirienceRect.draw();

    {
        /**@type {Rect} */
        let rect = new Rect(doc, true, expirienceRect, 0, 0, expirienceRect.getWidth(), 38.3);
        rect.styleData.border = "2 red";
        rect.fontData.fontSize = 9;

        let rectContent = [];
        expirience.forEach(ele => 
        {
            rectContent.push(ele.toString());
        });

        renderRects(3, 0, 10, 0, 38.3, rect, rectContent);
    }

    let skillsRect = new Rect(doc, true, bodyRect, A4Width - aboutMyselfRect.getWidth() - 20, 15, aboutMyselfRect.getWidth(), aboutMyselfRect.getHeight());
    skillsRect.styleData.border = "2 orange";
    skillsRect.fontData.fontSize = 9;

    let skillsRectContent = "<h5>KWALIFIKACJE</h5>";
    skills.forEach(skill => 
    {
        skillsRectContent += `\u2022 ${skill}<br>`;
    });

    skillsRect.setHTMLText(new HTMLText(skillsRectContent));
    skillsRect.draw();

    /**@type {Rect} */
    let educationRect = new Rect(doc, true, bodyRect, skillsRect.getX(), expirienceRect.getY(), skillsRect.getWidth(), expirienceRect.getHeight());
    educationRect.styleData.border = "2 yellow";
    educationRect.fontData.fontSize = 9;
    educationRect.setHTMLText(new HTMLText(
        `<h5>WYKSZTALCENIE</h5>`
    ));
    educationRect.draw();

    {
        /**@type {Rect} */
        let rect = new Rect(doc, true, educationRect, 0, 0, educationRect.getWidth(), 38.3);
        rect.styleData.border = "2 red";
        rect.fontData.fontSize = 9;

        let rectContent = [];
        education.forEach(ele => 
        {
            rectContent.push(ele.toString());
        });

        renderRects(3, 0, 10, 0, 38.3, rect, rectContent);
    }

    doc.save("pdf.pdf");
}
/**
 * Renders specified rect certain amount of times
 * @param {number} amount 
 * @param {number} startX 
 * @param {number} startY 
 * @param {number} xIncrement 
 * @param {number} yIncrement 
 * @param {Rect} rect rect to render (every property matters except x, y coordinates and htmlText)
 * @param {string[]} content array of contents in every rect (index: 0, 1, ..., amount-1)
 */
function renderRects(amount, startX, startY, xIncrement, yIncrement, rect, content)
{
    for(let i = 0; i < amount; i++){
        rect.setX(startX);
        console.log(startY);
        rect.setY(startY);
        rect.styleData.border = "2 red";
        rect.fontData.fontSize = 9;
        rect.setHTMLText(new HTMLText(
            content[i]
        ));
        rect.draw();

        startX += xIncrement;
        
        startY += yIncrement;
    }
}