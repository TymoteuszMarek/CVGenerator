import Mathf from "./Mathf";
import FontData from "./FontData";
import HTMLText from "./HTMLText";
import jsPDF from "jspdf";
import StyleData from "./StyleData";
import PDFWrite from "./PDFWrite";

export default class Rect
{
    /**@type {number} */
    #x = 0;
    /**@type {number} */
    #y = 0;
    /**@type {number} */
    #width = 0;
    /**@type {number} */
    #height = 0;

    /**@type {Rect}*/
    #parent;
    /**@type {boolean} */
    hasParent = true;

    /**@type {jsPDF} */
    doc;
    /**@type {StyleData} */
    styleData = new StyleData();
    /**@type {FontData} */
    fontData = new FontData();
    /**@type {HTMLText} */
    htmlText = new HTMLText();
    /**@type {number} */
    linesHeight = 0;
    /**@type {number} */
    textWidth = 0;

    /**
     * @param {jsPDF} doc
     * @param {Rect} parent
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(doc, hasParent = true, parent = 0, x, y, width, height){
        this.doc = doc;
        this.hasParent = hasParent;
        this.setParent(parent);
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
    }

    /**
     * Sets x component considering parent's parameters
     * @param {number} x 
     */
    setX(x){
        if (!this.hasParent)
        {
            this.#x = x;
            return;
        }

        let minX = this.#parent.getX();
        let maxX = this.#parent.getX() + this.#parent.getWidth(); 
        this.#x = Mathf.clamp(minX, maxX, x);
    }
    getX(){
        return this.#x;
    }

    /**
     * Sets y component considering parent's parameters
     * @param {numbber} y
     */
    setY(y){
        if (!this.hasParent)
        {
            this.#y = y;
            return;
        }

        let minY = this.#parent.getY();
        let maxY = this.#parent.getY() + this.#parent.getWidth(); 
        this.#y = Mathf.clamp(minY, maxY, y);
    }
    getY(){
        return this.#y;
    }

    /**
     * Sets width considering the parent's width
     * @param {number} width 
     */
    setWidth(width){
        if (!this.hasParent)
        {
            this.#width = width;
            return;
        }

        let maxWidth = this.#parent.getX() + this.#parent.getWidth() - this.#x; 
        this.#width = Mathf.clamp(0, maxWidth, width);
    }
    getWidth(){
        return this.#width;
    }

    /**
     * Sets height considering the parent's height
     * @param {number} height 
     */
    setHeight(height){
        if (!this.hasParent)
        {
            this.#height = height;
            return;
        }

        let maxHeight = this.#parent.getY() + this.#parent.getHeight() - this.#y;
        this.#height = Mathf.clamp(0, maxHeight, height);
    }
    getHeight(){
        return this.#height;
    }

    /**
     * Sets parent
     * @param {Rect} parent 
     */
    setParent(parent){
        if (this.hasParent){
            this.#parent = parent;
            this.styleData = StyleData.clone(parent.styleData);
            this.fontData = FontData.clone(parent.fontData);
        }
    }

    /**
     * Returns rect's width that's awailable to write
     */
    getWritingWidth(){
        return this.#width + this.styleData.leftPadding + this.styleData.rightPadding;
    }
    /**
     * Returns rect's height that's awailable to write
     */
    getWritingHeight(){
        return this.#height + this.styleData.topPadding + this.styleData.downPadding;
    }
    /**
     * Returns rect's x that's suitable for writing
     */
    getWritingX(){
        return this.#x + this.styleData.leftPadding + this.textWidth;
    }
    /**
     * Returns rect's y that's suitable for writing
     */
    getWritingY(){
        return this.#y + this.styleData.topPadding + this.linesHeight;
    }

    /**
     * Sets the content of rect
     * @param {HTMLText} htmlText 
     */
    setHTMLText(htmlText){
        htmlText.setDoc(this.doc);
        htmlText.setRect(this);
        this.htmlText = htmlText;
    }

    getLineHeight(){
        return this.fontData.fontSize * 25.4 / 96 + 1;
    }
    /**
     * Calculates lines value considering the font margin property
     * @param {number} amount 
     * @returns height in px
     */
    getLinesHeight(amount){
        return ((this.fontData.fontSize * amount) + (this.fontData.fontMargin * amount - 1)) * 25.4 / 96 + 1;
    }

    /**
     * Draws rect onto the doc - order of calling is crucial
     */
    draw(){
        /**@type {PDFWrite} */
        let pdfWrite = new PDFWrite(this.doc);

        pdfWrite.drawRect(this, this.styleData.backgroundColor);
        if (this.styleData.border)
        {
            let border = this.styleData.getBorderObject()
            pdfWrite.drawRectOutline(this, border.color);
        }

        this.htmlText.writeText();
    }
}