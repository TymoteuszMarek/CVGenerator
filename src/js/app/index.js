import { ShadingPattern, TilingPattern, jsPDF } from "jspdf";
import PDFWrite from "../pdfFramework/PDFWrite";
import Rect from "../pdfFramework/Rect";
import HTMLText from "../pdfFramework/HTMLText";

const generateButton = document.getElementById("Generate");
generateButton.onclick = () =>
{
    generate();
};

const A4Height = 297;
const A4Widht = 210;

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
    let content = document.getElementById("Content").value;
    name = "TYMOTEUSZ";
    lastName = "MAREK";
    phoneNumber = "728 145 241";
    let email = "tymekmarek2@gmail.com";
    address = "ul. Sokola 10, Ceradz Koscielny";
    position = "Senior Developer";
    content = "kys negro";
    let aboutMyself = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora odit ducimus aut. Delectus, quam officia dicta reiciendis corporis voluptatibus molestiae possimus sequi. Exercitationem unde explicabo amet quae veniam facere nihil.
    Quia, illo eius. Provident, recusandae ut nisi dolore, esse voluptatibus quaerat officia modi repudiandae nam et atque iusto quis quam dolores odio sed sit quia rerum magnam assumenda pariatur delectus.`;
    let expirience = [
        
    ]
    
    /**@type {Rect} */
    let pdfRect = new Rect(doc, false, undefined, 0, 0, A4Widht, A4Height);
    
    /**@type {Rect} */
    let headerRect = new Rect(doc, true, pdfRect, 0, 0, A4Widht, 65);
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
    //pdfWrite.fontSize = 21;
    //pdfWrite.Write(position, nameRect);

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

    // pdfWrite.topMargin = 30;
    // pdfWrite.leftMargin = 110;
    // pdfWrite.fontSize = 10;
    // pdfWrite.Write("Telefon: " + phoneNumber);
    // pdfWrite.Write("Email: " + email);
    // pdfWrite.Write("Adres: " + address);
    
    // doc.setTextColor("#01bcab");

    // pdfWrite.topMargin = 80;
    // pdfWrite.leftMargin = 10;
    // pdfWrite.WriteH4("OGOLNE INFORMACJE");

    doc.save("pdf.pdf");
}