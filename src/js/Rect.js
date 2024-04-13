import Mathf from "./Mathf";

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
    /**@type {Rect[]}*/
    #children = [];
    /**@type {Rect}*/
    #parent;
    /**@type {boolean} */
    hasParent = true;

    /**@type {number} */
    topPadding = 0;
    /**@type {number} */
    leftPadding = 0;
    /**@type {number} */
    rightPadding = 0;
    /**@type {number} */
    downPadding = 0;
    /**@type {number} */
    linesHeight = 0;

    /**
     * @param {Rect} parent
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(hasParent = true, parent = 0, x, y, width, height){
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
        this.#parent = parent;
    }
    /**
     * Adds child rect
     * @param {Rect} child 
     */
    addChild(child){
        this.#children.push(child);
    }

    /**
     * Sets padding in all four dimentions
     * @param {number} padding 
     */
    setPadding(padding){
        this.topPadding = padding;
        this.leftPadding = padding;
        this.rightPadding = padding;
        this.downPadding = padding;
    }
    /**
     * Sets padding in x axis
     * @param {number} padding 
     */
    setHorizontalPadding(padding){
        this.leftPadding = padding;
        this.rightPadding = padding;
    }
    /**
     * Sets padding in y axis
     * @param {number} padding 
     */
    setVericalPadding(padding){
        this.topPadding = padding;
        this.downPadding = padding;
    }

    /**
     * Returns rect's width that's awailable to write
     */
    getWritingWidth(){
        return this.#width + this.leftPadding + this.rightPadding;
    }
    /**
     * Returns rect's height that's awailable to write
     */
    getWritingHeight(){
        return this.#height + this.topPadding + this.downPadding;
    }
    /**
     * Returns rect's x that's suitable for writing
     */
    getWritingX(){
        return this.#x + this.leftPadding;
    }
    /**
     * Returns rect's y that's suitable for writing
     */
    getWritingY(){
        return this.#y + this.topPadding + this.linesHeight;
    }
}