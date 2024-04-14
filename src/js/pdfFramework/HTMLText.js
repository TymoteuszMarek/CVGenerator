import jsPDF from "jspdf";
import PDFWrite from "./PDFWrite";
import FontData from "./FontData";
import Rect from "./Rect";

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
    /**@type {string} */
    #currentText = "";

    /**
     * @param {Rect} rect
     * @param {jsPDF} doc
     * @param {string} text
     */
    constructor(text = "")
    {
        this.text = text;
    }

    /**
     * Setting jsDoc is required for HTMLText to work!
     * @param {jsPDF} doc 
     */
    setDoc(doc){
        this.doc = doc;
        this.#pdfWrite = new PDFWrite(this.doc);
    }
    /**
     * Setting rect is required for HTMLText to work!
     * @param {Rect} rect 
     */
    setRect(rect){
        this.rect = rect;
    }


    /**
     * Writes text into doc considering the specified HTML tags
     */
    writeText()
    {
        if (!this.text) return;

        let lines = this.text.split("<br>");
        console.log(lines);

        lines.forEach(line => 
        {
            line = this.#clearLine(line);
            console.log(line);

            for(let i = 0; i < line.length; i++){
                let char = line[i];
    
                if (char == "<")
                {
                    let tag = '';
                    char = line[++i];
    
                    while (char != '>')
                    {
                        tag += char;
                        char = line[++i];
                    }
                    
                    if(this.#currentText)
                    {
                        switch(tag){

                            case tag.match(/^\/h\d$/)?.input: // /h{number}
                                this.#handleH(this.#currentText, tag);
                                break;

                            case tag.match(/^h\d$/)?.input: // h{number}
                                if (!this.#currentText.match(/^\s+$/)?.input){
                                    this.#handleText(this.#currentText);
                                }
                                break;

                            // case tag.match(/^h\d$/)?.input: // h{number}
                            //     this.#handleText(this.#currentText, new FontData());
                            //     break;
                            
                        }
                    }
                }
                else
                {
                    this.#currentText += char;
                }
            }

            if(this.#currentText && !this.#currentText.match(/^\s+$/)?.input)
            {
                this.#handleText(this.#currentText);
            }
        });
    }

    /**
     * Clears string out of double whitespaces and tabulators
     * @param {string} text 
     */
    #clearLine(text){
        console.log(`clear: ${text}`);
        let trimmed = text.replace(/\n+/g, "");
        trimmed = trimmed.replace(/\s{2,}/g, "");
        return trimmed;
    }

    /**
     * @param {string} text
     * @param {string} hType heading tag (/h1, /h2, ..., /h6)
     * @param {boolean} createNewLine
     */
    #handleH(text, hType, createNewLine = true)
    {
        console.log(`write: text: ${text}, tag: ${hType}, ${this.rect.fontData.toString()}`);
        this.#pdfWrite.WriteH(text, this.rect, hType, this.rect.fontData, createNewLine);
        this.#currentText = "";
    }
    /**
     * @param {string} text
     * @param {boolean} createNewLine
     */
    #handleText(text, createNewLine = true)
    {
        console.log(`write: text: ${text}, tag: none, ${this.rect.fontData.toString()}`);
        this.#pdfWrite.Write(text, this.rect, this.rect.fontData, createNewLine);
        this.#currentText = "";
    }
}