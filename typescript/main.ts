import type { EditorSettings, action_buttons, element_tagName } from "./components/types.js";
// import $ from 'jquery'  
class InsertEditor{
    readonly frame : Element|null = document.querySelector(`[data-editor-frame]`);
    readonly form_name : String|null = null;
    readonly settings : EditorSettings = {
        
    }
    readonly button_selectors: action_buttons<String> = {
        bold: "data-btn-bold",
        italic: "data-btn-italic",
        underline: "data-btn-underline",
        paragraph: "data-btn-paragraph",
    }
    readonly action_tags: action_buttons<String> = {
        bold: 'b',
        italic: 'i',
        underline: 'u',
        paragraph: 'p',
    }
    readonly action_status: action_buttons<Boolean> = {
        bold: false,
        italic: false,
        underline: false,
        paragraph: false,
    }
    editor : Element|null = document.querySelector(`[data-editor-block]`);
    action_has_on_off : String[] = ['bold', 'italic', 'underline'].map(v => v.toLowerCase())
    action_buttons : action_buttons<Element|null>  = {
        bold: document.querySelector(`[${this.button_selectors.bold}]`),
        italic: document.querySelector(`[${this.button_selectors.italic}]`),
        underline: document.querySelector(`[${this.button_selectors.underline}]`),
        paragraph: document.querySelector(`[${this.button_selectors.paragraph}]`),
    }
    
    constructor(settings : EditorSettings){
        if(settings.editor_class) this.frame= document.querySelector(`.${settings.editor_class}`)
        if(settings.form_name) this.form_name = settings.form_name
        if(!this.frame) throw new Error('No Editor Found')
        this.settings = {...this.settings, ...settings}
        
    }
    printEditorHTML() {
       let html = !this.frame ? null : this.frame.innerHTML = 
       `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <style>
                .Insert-props .insert-control-panel button{
                    position:relative;
                }
                .Insert-props .insert-control-panel button:hover::after{
                    content:attr(data-info)" ";
                    position:absolute;
                    background:#555;
                    display:inline-block;
                    color:#eee;
                    padding:2px;
                    font-size:0.6rem;
                    z-index:1000;
                    width:clamp(20px, 35px, 100px);
                    text-overflow:word-break;
                    overflow-wrap:anywhere;

                    
                }
            </style>
            <div class="Insert-props" >
            <div class="insert-control-panel">
            <!-- Some action button -->
            <button type="button" title="bold" class="fa fa-bold" aria-hidden="true" ${this.button_selectors.bold} data-info="bold"></button>
            <button type="button" title="italic" class="fa fa-italic" aria-hidden="true" ${this.button_selectors.italic} data-info="italic"></button>
            <button type="button" title="underline" class="fa fa-underline" aria-hidden="true" ${this.button_selectors.underline} data-info="underline"></button>
            <button type="button" title="new paragraph" class="fa fa-paragraph" aria-hidden="true" ${this.button_selectors.paragraph} data-info="paragraph"></button>
            <button type="button" title="align left" class="fa fa-align-left" aria-hidden="true" data-btn-align="left" data-info="text-align:left"></button>
            <button type="button" class="fa fa-align-right" aria-hidden="true" data-btn-align="right" data-info="text-align:right"></button>
            <button type="button" class="fa fa-align-center" aria-hidden="true" data-btn-align="center" data-info="text-align:center"></button>
            <button type="button" class="fa fa-list-ul" aria-hidden="true" data-btn-list="ul"  data-info="list:unordered"></button>
            <button type="button" class="fa fa-list-ol" aria-hidden="true" data-btn-list="ol" data-info="list:ordered"></button>
            <button type="button" class="fa fa-table" aria-hidden="true" data-btn-table data-info="table"></button>
            <input type="color" data-btn-color value="#000000" />
            </div>
            <!-- The editor -->
            <style>
                
            </style>
            <div contenteditable="true" id="deditorBox1245" data-editor-block oncontextmenu="return false" style="background:#8d8;width:200px;aspect-ratio: 1;">
                
            </div>
            <!-- this is the input tag required for your form upload. it carries the data in the editor -->
            <input type="text" value="" style="visibility:hidden" name="${this.form_name || ''}" />
            </div>
        ` ;
        return this.assignActionButton()
        .addEventListners()
        .setCaret()
    }

    assignActionButton(){
        this.editor = document.querySelector(`[data-editor-block]`);
        this.action_buttons   = {
        bold: document.querySelector(`[${this.button_selectors.bold}]`),
        italic: document.querySelector(`[${this.button_selectors.italic}]`),
        underline: document.querySelector(`[${this.button_selectors.underline}]`),
        paragraph: document.querySelector(`[${this.button_selectors.paragraph}]`),
        }
        return this;
    }
    
    addEventListners(){
        return this.setBoldListners()
        .setItalicListners()
        .setUnderlineListners()
        .setParagraphListners()
    }

    private setCaret(selector ?: String){
        try{

            let startNode : Element|null|undefined|ChildNode  = selector == null ? this.editor : this.editor?.querySelector(selector.toLowerCase())
            startNode = !startNode  ? this.editor?.lastChild : startNode
            // console.log(startNode, document.querySelector(selector), selector)
            let range = document.createRange(),
            sel = window.getSelection() 
            if(!startNode) throw new Error('Start Node Error')
            range.setStart(startNode, 0)
            range.setEnd(startNode, 1)
            range.collapse(false)
            sel?.removeAllRanges()
            sel?.addRange(range)
        }
        catch(e: Error|any){
            console.error(e?.getMessage())
            console.error(e)
        }
        finally{
            return this
        }
    }

    private getCurrentNode(): Element|null{
        let currentNodeActive : Element|null = window.getSelection()?.anchorNode?.parentElement ?? this.editor
        if (!this.editor?.contains(currentNodeActive)) currentNodeActive = this.editor
        return currentNodeActive
    }
    private setBoldListners() {
        this.action_buttons.bold?.addEventListener('click', () => {
            console.log("I am bold")
            this.handleNodeCreation('bold')
        })
        return this
    }
    private setItalicListners() {
        this.action_buttons.italic?.addEventListener('click', () => {
            console.log("I am Italic")
            this.handleNodeCreation('italic')

        })
        return this
    }
    private setUnderlineListners() {
        this.action_buttons.underline?.addEventListener('click', () => {
            console.log("I am Underline")
            this.handleNodeCreation('underline')
        })
        return this
    }
    private setParagraphListners() {
        this.action_buttons.paragraph?.addEventListener('click', () => {
            console.log("I am paragraph")
            this.handleNodeCreation('paragraph')
        })
        return this
    }
    private handleNodeCreation(NodeType : element_tagName){
        let TAG = this.getNodeTag(NodeType).toLowerCase()
        let parent: Element|null = this.getCurrentNode()
        let highlighted = false
        if (window?.getSelection()?.toString().trim() !== "" || window?.getSelection()?.toString()?.trim()?.length) highlighted = true
        if(highlighted){
            return this.handleHighlighted(NodeType)
        }
        if(this.action_status[`${NodeType}`]) TAG = "span".toLowerCase()
        const newElement : Element = document.createElement(TAG),
        id =  `${TAG}${new Date().valueOf()}`.toLowerCase()
        newElement.setAttribute("id", id)
        if(this.action_status[`${NodeType}`]){
            let count = 0
            while(parent?.tagName.toLowerCase() != TAG.toLowerCase() && count < 15){
                console.log('trying to find parent element')
                parent = !parent?.parentNode ? parent : parent?.parentElement
                count++
            }
            if(parent?.tagName.toLowerCase() != TAG.toLowerCase() && count > 15) parent = this.editor
        }
        const range = window.getSelection()?.getRangeAt(0)
        range ? range.insertNode(newElement) : parent?.appendChild(newElement)
        
        newElement.innerHTML = "&nbsp;";
        console.log(newElement)
        this.action_status[`${NodeType}`] = !this.action_status[`${NodeType}`]
        return this.setCaret(`#${id}`).turnButton(NodeType)
        
        
    }
    handleHighlighted(NodeType: element_tagName) {
        let TAG = this.getNodeTag(NodeType).toLowerCase()
        let parentNode = window.getSelection()?.anchorNode?.parentNode
        let highlightedNode : HTMLElement|Node|null|undefined = window.getSelection()?.anchorNode  
        const range = window.getSelection()?.getRangeAt(0) ?? document.getSelection()?.getRangeAt(0)
        if(highlightedNode?.parentNode?.nodeName?.toLowerCase() == TAG) TAG = "span";
        let _text = window.getSelection()?.toString() ?? '',
            id =  `${TAG}${new Date().valueOf()}`.toLowerCase()
        const newElement = document.createElement(TAG);
        newElement.setAttribute('id', `${id}`)
        window.getSelection()?.deleteFromDocument()
        console.log(highlightedNode?.parentNode?.nodeName , TAG)
        //this is to reverse currenct state i.e from bold to unbold
        if(highlightedNode?.parentNode?.nodeName?.toLowerCase() == this.getNodeTag(NodeType).toLowerCase()){
            console.log('running this now')
            range?.commonAncestorContainer?.parentElement?.replaceWith(newElement)
        }else{
            console.log('running')
            range?.surroundContents(newElement);
        }
        newElement.innerHTML = _text
        this.setCaret(`#${id}`)
    }
    private turnButton(NodeType: element_tagName){
        let bg_color = this.action_status[`${NodeType}`] ? '#554' : '#f0f0f0'
        let text_color = this.action_status[`${NodeType}`] ? '#f0f0f0' : '#554' 
        if(!this.action_has_on_off.includes(NodeType.toLowerCase())) return this
        return this.addStyle(this.action_buttons[`${NodeType}`], `
            background:${bg_color};
            color:${text_color}
        `)
        
    }
    addStyle(domElement : Element|null, style: string){
        console.log(style)
        domElement?.setAttribute('style', style)
        return this
    }
    private getNodeTag(NodeType : element_tagName){
        return this.action_tags[`${NodeType}`];
    }
}


export {InsertEditor}