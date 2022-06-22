// this is function i created to aid easy call of dom elements
/**
 * 
 * @param {*} selector
 * this is the selector value (element, className, id, data Attribute) of the  element to be selected
 * @returns DOMElement
 */
const $ = (selector) => document.querySelector(selector)
function InsertEditor(editorNode) {
    
    this.domNodeTemplate = {
        p:'p',
        div:'div',
        i:'i',
        italic:'i',
        b:'b',
        bold:'b'
    }
    this.boldStatus = false
    this.italicStatus = false
    this.underLineStatus = false
    this.noRootNode = ['p', 'div']
    this.editorNode = $(editorNode)
    
    
    

this.inserteditorTemplate = (RootNode = $('[data-editor-frame]')) => {
    RootNode.innerHTML =  `
        <!-- Some action button -->
        <button type="button" data-btn-bold>Bold</button>
        <button type="button" data-btn-itl>Italic</button>
        <button type="button" data-btn-und>Underline</button>
        <button type="button" data-btn-prg>Paragraph</button>
        <button type="button" data-btn-align="left">Text align left</button>
        <button type="button" data-btn-align="right">Text align right</button>
        <button type="button" data-btn-align="center">Text align center</button>
        <!-- The editor -->
        <div contenteditable="true" data-editor-block oncontextmenu="return false" style="background:#8d8;width:200px;aspect-ratio: 1;">
            
        </div>
    `;
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
this.addStyle = (domElement, style) => {
    let prevStyle = domElement.style
    console.log(prevStyle)
    console.log(style)
    
    
    for (var key in style) {
        prevStyle[key] = style[key];
    
        console.log(prevStyle[key])
        // prevStyle[key] = value
    }
    // domElement.style = prevStyle;
    // console.log(domElement.style)
}
// const getNodeType
/**
 * 
 * @param {Boolean} NodeBol
 * This is a boolean vealue to tell if the status of a given command (bold, italic , unserline) is to be turned on or off 
 * @param {String} NodeTypeModel 
 * This is a string of the new DOMELEMENT type
 * @returns Json
 */
this.newInlineNodeCreator = (NodeBol, NodeTypeModel = 'span') => {
    let currentNodeActive =  window.getSelection()?.anchorNode.parentNode
    console.log(currentNodeActive)
    NodeBol = !NodeBol
    let id = null
    // e.preventDefault()
    // console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    NodeTypeModel = NodeTypeModel.toLowerCase().trim();
    let NodeType = "div",
    para = document.createElement(NodeType);
    if (NodeBol || NodeBol == null) {
        NodeType = NodeTypeModel
    }
    if (this.noRootNode.includes(NodeType)) currentNodeActive = $('[data-editor-block]')
    console.log(NodeType);
    id = new Date().valueOf();
    para = document.createElement(NodeType);
    para.setAttribute("id", `${NodeType.charAt(0)}${id}`)
    // para.appendChild(document.createTextNode("&nbsp;"))
    if (this.noRootNode.includes(NodeType)) currentNodeActive = $('[data-editor-block]')
    currentNodeActive.appendChild(para);
    // currentNodeActive.innerHTML += para
    console.log(currentNodeActive)
    para.innerHTML = "&nbsp; <span></span>"
    console.log(para, currentNodeActive)
    if (!this.noRootNode.includes(NodeType)) this.addStyle(para, {display: "inline-block"})
    return { selector: `${NodeType.charAt(0)}${id}`, parentNode: currentNodeActive, node: para, newStatus: NodeBol}
}

/**
 * 
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

const AutoEditor = new InsertEditor('[data-editor-block]')
// inserting the editor into the right frame 
// $('[data-editor-frame]').innerHTML = InsertEditor.InserteditorTemplate();
AutoEditor.inserteditorTemplate()
$('[data-btn-bold]').addEventListener('click', AutoEditor.newBold)
//  Event listener for the italic button
$('[data-btn-itl]').addEventListener('click', AutoEditor.newItalic)
//  Event listener for the underline button
$('[data-btn-und]').addEventListener('click', AutoEditor.newUnderLine)
//  Event listener for the new paragraph button
$('[data-btn-prg]').addEventListener('click', AutoEditor.newParagraph)
//  Event listener for the align button
// $('[data-btn-align]').addEventListener('click', alignText)
document.querySelectorAll('[data-btn-align]').forEach(item => {
    item.addEventListener('click', AutoEditor.alignText)
})
// Event listener to keep track of default / built in commands like `Ctrl+B`
$('[data-editor-block]').addEventListener('keydown', (event) => {
    // event.preventDefault();
    var name = event.key;
    var code = event.code;
    // console.log(event)
    // Alert the key name and key code on keydown
    if (code == 'KeyB' && event.ctrlKey) AutoEditor.boldStatus = !AutoEditor.boldStatus
    if (code == 'KeyI' && event.ctrlKey) AutoEditor.italicStatus = !AutoEditor.italicStatus
    if (code == 'KeyU' && event.ctrlKey) AutoEditor.underLineStatus = !AutoEditor.underLineStatus
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);