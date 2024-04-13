import jsPDF from "jspdf";
import PDFWrite from "./PDFWrite";
import FontData from "./FontData";

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
    constructor(rect, doc, text)
    {
        this.rect = rect;
        this.doc = doc;
        this.text = text;
        this.#pdfWrite = new PDFWrite(this.doc);
    }

    /**
     * Writes text into doc considering the specified HTML tags
     */
    writeText()
    {
        let lines = this.text.split("<br>");
        lines.forEach(line => 
        {
            line = line.trim();
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
                                this.#handleH(this.#currentText, tag, new FontData());
                                break;

                            case tag.match(/^h\d$/)?.input: // h{number}
                                this.#handleText(this.#currentText, new FontData());
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

            if(this.#currentText)
            {
                this.#handleText(this.#currentText, new FontData());
            }
        });
    }
    /**
     * @param {string} text
     * @param {string} hType heading tag (/h1, /h2, ..., /h6)
     * @param {FontColor} fontData 
     */
    #handleH(text, hType, fontData)
    {
        console.log(`write: text: ${text}, tag: ${hType}, ${fontData.toString()}`);
        this.#pdfWrite.WriteH(text, this.rect, hType, fontData);
        this.#currentText = "";
    }
    /**
     * @param {string} text 
     * @param {FontData} fontData 
     */
    #handleText(text, fontData)
    {
        console.log(`write: text: ${text}, tag: none, ${fontData.toString()}`);
        this.#pdfWrite.Write(text, this.rect, fontData);
        this.#currentText = "";
    }
}