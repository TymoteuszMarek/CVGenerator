import { ShadingPattern, TilingPattern, jsPDF } from "jspdf";
import PDFWrite from "./PDFWrite";
import Rect from "./Rect";
import HTMLText from "./HTMLText";

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

    let pdfWrite = new PDFWrite(doc, A4Widht, A4Height);

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
    
    /**@type {Rect} */
    let pdfRect = new Rect(false, undefined, 0, 0, A4Widht, A4Height);
    
    /**@type {Rect} */
    let headerRect = new Rect(true, pdfRect, 0, 0, A4Widht, 65);
    pdfWrite.drawRect(headerRect, "#0783a4");
    
    /**@type {HTMLText} */
    let text = new HTMLText(
        pdfRect,
        doc,
        `elbozo<h1>kysnegro</h1>2137<br>
        i shall kill you fagot<br>
        top ten amogus<br>
        nope<br>
        el nigerro`
    );

    text.writeText(doc);



    pdfWrite.textColor = "white";

    /**@type {Rect} */
    let nameRect = new Rect(true, headerRect, 20, 15, 115, 50);
    pdfWrite.drawRectOutline(nameRect, "red");
    pdfWrite.WriteH1(name, nameRect);
    pdfWrite.WriteH1(lastName, nameRect);
    pdfWrite.fontSize = 21;
    pdfWrite.Write(position, nameRect);

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