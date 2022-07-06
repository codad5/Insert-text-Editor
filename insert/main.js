// this is function i created to aid easy call of dom elements
// import { $ } from './modules/selector.js'
// import { $, jQuery } from 'jquery';
const addNewTableRow = (firstRow, noOfColumn = 3) => {
    let i = 0, columnParams = {}
    while (i < noOfColumn) {
        console.log(i)
        let columnID = new Date().valueOf()
        let column = document.createElement('td')
        columnParams[`fr${i}`] = `td${columnID}`
        column.setAttribute('id', `td${columnID}`)
        // column.appendChild(document.createTextNode(''))
        firstRow.appendChild(column)
        column.innerHTML = '&nbsp;'
        i++

    }
    return { ...columnParams }
}
/**
 * 
 * @param {*} selector
 * this is the selector value (element, className, id, data Attribute) of the  element to be selected
 * @returns DOMElement
 */

const $ = (selector) => document.querySelector(selector)

/**
 * 
 * @param {*} editorNode This is the Overall Parent Node in which the editor companent are inserted into
 */
function InsertEditor(editorNode) {
    /**
     * This is list of all dom elememt
     */
    this.domNodeTemplate = {
        p:'p',
        div:'div',
        i:'i',
        italic:'i',
        b:'b',
        bold:'b'
    }
    /**
     * this is the to know the status of the bold 
     */
    this.boldStatus = false
    /**
     * This is to know the status of the editor italic
     */
    this.italicStatus = false
    /**
     * This is to  know the status of the underline
     */
    this.underLineStatus = false
    /**
     * This are element which require no root Node 
     */
    this.noRootNode = ['p', 'div', 'table'].map(i => i.toLowerCase())
    /**
     * this are element that must be created with a child appended to  it
     */
    this.mustHaveChild = ['ul', 'ol', 'table', 'tr'].map(i => i.toLowerCase())
    /**
     * This is a json containg the child for each element  in mustHaveChild
     */
    this.childNeeded = {
        'ul':'li',
        'ol':'li',
        'table': 'tr',
        'tr':'td'
    }
    /**
     * This is overall parentNode which all the editor features are apppended to
     */
    this.editorNode = $(editorNode)
    
    /**
     * This is the method used to insert the text Editor to the parent element
     * @param {HTMLElement} RootNode This is overall parentNode which all the editor features are apppended to
     * 
     */
    this.inserteditorTemplate = (RootNode = $('[data-editor-frame]')) => {
        RootNode.innerHTML =  `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <div class="Insert-props" >
            <div class="insert-control-panel">
            <!-- Some action button -->
            <button type="button" class="fa fa-bold" aria-hidden="true" data-btn-bold></button>
            <button type="button" class="fa fa-italic" aria-hidden="true" data-btn-itl></button>
            <button type="button" class="fa fa-underline" aria-hidden="true" data-btn-und></button>
            <button type="button" class="fa fa-paragraph" aria-hidden="true" data-btn-prg></button>
            <button type="button" class="fa fa-align-left" aria-hidden="true" data-btn-align="left"></button>
            <button type="button" class="fa fa-align-right" aria-hidden="true" data-btn-align="right"></button>
            <button type="button" class="fa fa-align-center" aria-hidden="true" data-btn-align="center"></button>
            <button type="button" class="fa fa-list-ul" aria-hidden="true" data-btn-list="ul"></button>
            <button type="button" class="fa fa-list-ol" aria-hidden="true" data-btn-list="ol"></button>
            <button type="button" class="fa fa-table" aria-hidden="true" data-btn-table></button>
            <input type="color" data-btn-color value="#000000" />
            </div>
            <!-- The editor -->
            <style>
                
            </style>
            <div contenteditable="true" id="deditorBox1245" data-editor-block oncontextmenu="return false" style="background:#8d8;width:200px;aspect-ratio: 1;">
                
            </div>
            <!-- this is the input tag required for your form upload. it carries the data in the editor -->
            <input type="text" value="" style="visibility:hidden" name="${RootNode.dataset?.editorFormname || ''}" />
            </div>
        `;
        // console.log(RootNode.dataset)
        this.addStyle($('.Insert-props'), {
            width:'200px',
            overflow:'hidden'
        })
        this.addStyle($('[data-editor-block]'), {
            background:'#ddd',
            caretColor: '#333',
            border:'none'
        })
        
        this.setCaret()
    }
    /**
     * This is a function that add a  new bold tag to the editor
     * @param {*} e
     * this is the event data of the action that is fired 
     */
    this.newBold = (e) => {
        e.preventDefault()
        const { selector, newStatus } = this.newInlineNodeCreator(this.boldStatus, 'b')
        this.boldStatus = newStatus
        this.setCaret(selector == null ? null : `#${selector}`);
    }
    /**
     * This is a function that add a  new italic tag to the editor
     * @param {*} e
     * this is the event data of the action that is fired 
     */
    this.newItalic = (e) =>{
        e.preventDefault()
        const { selector, newStatus } = this.newInlineNodeCreator(this.italicStatus, 'i')
        this.italicStatus = newStatus
        this.setCaret(selector == null ? null : `#${selector}`);
    }
    /**
     * This is a function that add a  new italic tag to the editor
     * @param {*} e
     * this is the event data of the action that is fired 
     */
    this.newUnderLine = (e) => {
        e.preventDefault()
        const { selector, newStatus, parentNode } = this.newInlineNodeCreator(this.underLineStatus, 'u')
        this.underLineStatus = newStatus
        this.setCaret(selector == null ? null : `#${selector}`);
    } 
    /**
     * This is a function that add a  new paragraph tag to the editor
     * @param {*} e
     * this is the event data of the action that is fired 
     */
    this.newParagraph = (e) => {
        e.preventDefault()
        const { selector, newStatus, parentNode } = this.newInlineNodeCreator(null, 'p')
        // underLineStatus = newStatus
        this.setCaret(selector == null ? null : `#${selector}`);
    } 
    this.newTable = (e) => {
        e.preventDefault()
        const { tableNodeId, fr0 } = this.tableNodeCreation()
        this.setCaret(`#${fr0}`)
        console.log($(`#${tableNodeId}`))
        console.log($(`#${tableNodeId}`).querySelectorAll('td'))

        $(`#${tableNodeId}`).querySelectorAll('td').forEach(i => this.addStyle(i, {border:'solid', borderWidth:'1px', borderColor:"#000"}))
        this.addStyle($(`#${tableNodeId}`), { border: 'solid', borderWidth: '2px', borderColor: "#000", borderCollapse :'collapse', maxWidth:'100%' })

    }
    /**
     * This is a method used for text alignment
     * @param {event} e This is the default event passed in to the function by eventListener
     */
    this.alignText = (e) => {
        let position = e.target.getAttribute('data-btn-align')
        console.log(position)
        let currentNodeActive = window.getSelection()?.anchorNode.parentNode
        console.log(currentNodeActive)
        this.addStyle(currentNodeActive, {
            textAlign: position,
            display: "inline-block",
            width:"100%"
        })
    }
    /**
     * This is a method use to add color to text
     * @param {event} e This is the default event passed in to the function by eventListener
     */
    this.addColor = (e) => {
        let color = e.target.value;
        let highlighted = false, _selector
        console.log(color)
        console.log(window.getSelection().toString().trim().length)
        if (window.getSelection().toString().trim() !== "" || window.getSelection().toString().trim().length > 0) highlighted = true
        console.log(highlighted)
        if (!highlighted) {
            const { selector, newStatus, parentNode } = this.newInlineNodeCreator(null, 'span')
            _selector = selector
        }
        else {
            let { newNodeSelector } = this.createHighlighedParentNode()
            _selector = newNodeSelector;
        }
        this.addStyle($(`#${_selector}`), {
            color: color
        })
        highlighted ? this.setCaret() : this.setCaret(`#${_selector}`)
    }
    /**
     * This is a methid for adding list 
     * @param {event} e This is the default event passed in to the function by eventListener
     * @returns 
     */
    this.addList = (e) => {
        const list_tags = ['ul', 'ol'].map(i => i.toLowerCase())
        let color = e.target.value;
        let highlighted = false, _selector, parentNode = window.getSelection().anchorNode.parentNode,
        wantedtag = e.target.getAttribute('data-btn-list').toLowerCase()
        console.log(wantedtag)
        console.log(parentNode, parentNode.tagName)
        if (list_tags.includes(parentNode.tagName.toLowerCase())){
            let replaceNode = document.createElement(wantedtag)
            replaceNode.innerHTML = parentNode.innerHTML
            parentNode.parentNode.replaceChild(replaceNode, parentNode)
            console.log('welcome')
            return;
        }
        // document.createElement(wantedtag)
        const { selector } = this.newInlineNodeCreator(null, wantedtag)
        this.setCaret(`#${selector}`)
    }
    this.tableNodeCreation = (noOfColumn = 3, noOfRow = 2) => {
        let currentNodeActive = window.getSelection()?.anchorNode?.parentElement ?? $('[data-editor-block]'),
        insertTableNode = currentNodeActive
        let tablePrep = document.createElement('table')
        let firstRow = document.createElement('tr'), i = 0, columnParams = {}
        columnParams = addNewTableRow(firstRow, noOfColumn)
        // while(i < noOfColumn){
        //     console.log(i)
        //     let columnID = new Date().valueOf()
        //     let column = document.createElement('td') 
        //     columnParams[`fr${i}`] = `td${columnID}`
        //     column.setAttribute('id', `td${columnID}`)
        //     // column.appendChild(document.createTextNode(''))
        //     firstRow.appendChild(column)
        //     column.innerHTML = '&nbsp;'
        //     i++
            
        // }
        i = 0
        console.log(columnParams)
        let tablePropPanel = `

        `
        tablePrep.innerHTML += tablePropPanel
        if (!this.noRootNode.includes(currentNodeActive.tagName.toLowerCase()) || ['table', 'tr', 'td'].includes(currentNodeActive.tagName.toLowerCase())){
            insertTableNode = $('[data-editor-block]')

        }
        let id = new Date().valueOf()
        id = `t${id}`
        tablePrep.setAttribute('id', id)
        tablePrep.appendChild(firstRow)
        insertTableNode.append(tablePrep)
        tablePrep.addEventListener('input', (e) => {
            console.log('hi')
            this.tableFuction(e.target)
        })
        return { tableNodeId: id, ...columnParams }
    }
    this.tableFuction = (tableNode) => {
        // tableNode = tableNode
        let lastRow = tableNode.querySelectorAll('tr'), noOfColumn;
        lastRow = lastRow[lastRow.length - 1]
        let firstCellLastRow = lastRow.querySelctorAll('td')
        noOfColumn = firstCellLastRow.length
        firstCellLastRow = lastRow.querySelctorAll('td')
        if(firstCellLastRow.split(' ').length > 1){
            // tableNode.
            addNewTableRow(lastRow, noOfColumn)
        }
    }
    /**
     * This is a method for adding inline style to the editor and its elements
     * @param {HTMLElement} domElement This is the HTMLElement in which a style need to be added to 
     * @param {Json} style This is a json of the style properties to be added to the element
     */
    this.addStyle = (domElement, style = {}) => {
        let prevStyle = domElement.style
        // console.log(prevStyle)
        // console.log(style)
        
        
        for (var key in style) {
            prevStyle[key] = style[key];
        
            // console.log(prevStyle[key])
            // prevStyle[key] = value
        }
        // domElement.style = prevStyle;
        // console.log(domElement.style)
        return domElement.style
    }
    /**
     * 
     * @param {String} NodeType This is a string containing the tagName of the element needed to be created
     * @returns {}
     */
    this.createHighlighedParentNode = (NodeType = "span") => {
            // let highlightedNode = window.getSelection().anchorNode
            let parentNode = window.getSelection().anchorNode.parentNode
            let highlightedNode = window.getSelection().anchorNode,
                _text = highlightedNode.textContent,
                id = new Date().valueOf()
            para = document.createElement(NodeType);
            para.setAttribute('id', `s${id}`)
            // const { selector, newStatus } = newInlineNodeCreator(null, 'span')
            _selector = `s${id}`
            highlightedNode.replaceWith(para)
            para.innerHTML = _text

            return { newNode: para, newNodeSelector: `s${id}`, parentNode: parentNode }
        }
    /**
     * 
     * @param {Boolean} NodeBol
     * This is a boolean vealue to tell if the status of a given command (bold, italic , unserline) is to be turned on or off 
     * @param {String} NodeTypeModel 
     * This is a string of the new DOMELEMENT type
     * @returns Json
     */
    this.newInlineNodeCreator = (NodeBol, NodeTypeModel = 'span') => {
        //This is to get the node where the editor cursor is on
        let currentNodeActive = window.getSelection()?.anchorNode?.parentElement ?? editorNode
        // console.log(currentNodeActive)

        NodeBol = !NodeBol
        // Initializing the variable for the id of the new node to be created
        let id = null
        // e.preventDefault()
        // console.log('hello')
        $('[data-editor-block]').innerHTML = $('[data-editor-block]')?.innerHTML.trim()
        // This is to filter and correct any type from the passed param 
        NodeTypeModel = NodeTypeModel.toLowerCase().trim();
        // This is a default node type
        let NodeType = "div", para
        // this is the default node type if the NodeBol is null meaning it is a block element
        if (NodeBol !== null) NodeType = "span"
        // Creating the Node element This can be changed later on this funtion is some param are met up with 
        para = document.createElement(NodeType);
        // setting the node type to the given param 
        if (NodeBol || NodeBol == null) {
            NodeType = NodeTypeModel
        }
        else{
        // else{
            let jj = 0
            // console.log('hello', currentNodeActive.tagName.toLowerCase(), `== ${NodeTypeModel}`)
            while (currentNodeActive.tagName.toLowerCase() == NodeTypeModel && jj < 10){
                console.log(jj, currentNodeActive.parentElement, currentNodeActive)
                if (currentNodeActive.parentElement == null) {
                    currentNodeActive = $('[data-editor-block]')
                    continue;
                }
                console.log(currentNodeActive.parentElement.tagName)
                if (currentNodeActive.tagName.toLowerCase() == currentNodeActive.parentElement.tagName.toLowerCase()){
                    // currentNodeActive = 
                    console.log(currentNodeActive.parentElement.tagName.toLowerCase(), `>> ${currentNodeActive.tagName.toLowerCase()}`)
                    currentNodeActive = $(`#${currentNodeActive.parentElement?.id}`)
                    console.log("---------")
                    continue;
                } 
                
                jj++
                // if (jj > 10) continue
            }
        }
        console.log(`The Node boolean for ${NodeTypeModel} is ${NodeBol} given end result as ${NodeType}`)
        // checking if the given node type is allowed to have aby root node aside the main editor ( this can be tags like 'p')
        if (this.noRootNode.includes(NodeType)) currentNodeActive = $('[data-editor-block]')
        // console.log(NodeType);
        // creating an id for the new node
        id = new Date().valueOf();
        // creating the new node
        para = document.createElement(NodeType);
        // setting the id 
        para.setAttribute("id", `${NodeType.charAt(0)}${id}`)
        // para.appendChild(document.createTextNode("&nbsp;"))
        // just a duplicate Code
        if (this.noRootNode.includes(NodeType)) currentNodeActive = $('[data-editor-block]')
        
    
        // currentNodeActive.appendChild(para);
        // if bool is false that means the node has to be turned off and create a new span tag under the parent node of the node to be turn off
        // if(NodeBol == false){
        //     // console.log(currentNodeActive.parentElement)
        //     // incase the parent Node does not exist it will append the new node under the main editor
        //     if (currentNodeActive.parentElement == null) {
        //         $('[data-editor-block]').appendChild(para)
        //     }else{

        //         currentNodeActive.parentElement.appendChild(para) 
        //     }
        // }else{
        //     // incase the node is not to be turn off
        //     currentNodeActive.appendChild(para)
            
        // }
        // currentNodeActive.appendChild(para);
        currentNodeActive.id ? $(`#${currentNodeActive.id}`).appendChild(para) :  currentNodeActive.appendChild(para);
        // console.log(currentNodeActive)
        // this is incase a node must have a default default child node like 'ol for orderlist' must have a child node 'li'
        if (this.mustHaveChild.includes(NodeType)) {
            para.appendChild(document.createElement(this.childNeeded[NodeType]))
        } else {

            para.innerHTML = "&nbsp;"
        }
        // console.log(para, currentNodeActive)
        return { selector: `${NodeType.charAt(0)}${id}`, parentNode: currentNodeActive, node: para, newStatus: NodeBol }
    }

    /**
     * This is a method use for controlling of the cursor
     * @param {String} selector
     * This is the Node elemnt in which the cursor is meant to be at 
     */
    this.setCaret = (selector = null) => {
        // console.log(document.querySelector(selector))
        let startNode = selector == null ? $('[data-editor-block]') : $('[data-editor-block]').querySelector(selector)
        startNode = startNode == null ? $('[data-editor-block]').lastChild : startNode
        // console.log(startNode, document.querySelector(selector), selector)
        let range = document.createRange(),
        sel = window.getSelection() 
        range.setStart(startNode, 0)
        range.setEnd(startNode, 1)
        range.collapse(false)
        // console.log(range.toString())
        sel.removeAllRanges()
        sel.addRange(range)
        // sel.removeAllRanges()


    }
}
const sum = (x, y) => x + y

export {InsertEditor, $, sum}