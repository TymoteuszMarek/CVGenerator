import jsPDF from "jspdf";
import PDFWrite from "./PDFWrite";

export default class HTMLText
{
    /**@type {string} */
    text;
    /**@type {Rect} */
    rect;
    /**@type {jsPDF} */
    doc;
    /**@type {PDFWrite} pdfWrite;*/
    #pdfWrite;

    /**
     * @param {Rect} rect
     * @param {jsPDF} doc
     * @param {string} text
     */
    constructor(rect, doc, text)
    {
        this.rect = rect;
        this.doc = doc;
        this.text = text;
        this.#pdfWrite = new PDFWrite(this.doc);
    }

    /**
     * Writes text into doc considering the specified HTML tags
     * @param {jsPDF} doc 
     */
    writeText()
    {
        let lines = this.text.split("<br>");
        lines.forEach(line => 
        {
            line = line.trim();
            console.log(line);

            let currentText = "";
            for(let i = 0; i < line.length; i++){
                let char = line[i];
                //console.log(char);
                

                let openTags = [];
    
                if (char == "<")
                {
                    let tag = '';
                    char = line[++i];
    
                    while (char != '>')
                    {
                        tag += char;
                        char = line[++i];
                    }

                    openTags.push(tag);
    
                    switch(tag){
                        case "h1":
                            if (currentText){
                                console.log(currentText);
                                this.#pdfWrite.Write(currentText, this.rect, "white");
                                currentText = "";
                            }
                            break;
                        case "/h1":
                            if(currentText){
                                console.log(currentText);
                                this.#pdfWrite.WriteH1(currentText, this.rect, "white");
                                currentText = "";
                            }
                    }

                    console.log(tag);
                }
                else
                {
                    currentText += char;
                }
            }

            if(currentText)
            {
                this.#pdfWrite.Write(currentText, this.rect, 12, "white");
            }
        });
    }
}