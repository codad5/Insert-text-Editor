// this is function i created to aid easy call of dom elements
/**
 * 
 * @param {*} selector
 * this is the selector value (element, className, id, data Attribute) of the  element to be selected
 * @returns DOMElement
 */
const $ = (selector) => document.querySelector(selector),
noRootNode = ['p', 'div']
const editorTemplate = `
    <!-- Some action button -->
    <button type="button" data-btn-bold>Bold</button>
    <button type="button" data-btn-itl>Italic</button>
    <button type="button" data-btn-und>Underline</button>
    <button type="button" data-btn-prg>Paragraph</button>
    <button type="button" data-btn-align="left">Text align left</button>
    <button type="button" data-btn-align="right">Text align right</button>
    <button type="button" data-btn-align="center">Text align center</button>
    <input type="color" data-btn-color value="#000000" />
    <!-- The editor -->
	<div contenteditable="true" data-editor-block oncontextmenu="return false" style="background:#8d8;width:200px;aspect-ratio: 1;">
		 
	</div>
`;

// inserting the editor into the right frame 
$('[data-editor-frame]').innerHTML = editorTemplate


//boldStatus tell the application if bold is currently active or not
//italicStatus tell the application if italic is currently active or not
//underLineStatus tell the application if underLine is currently active or not

let i = 0, boldStatus = false, italicStatus = false, underLineStatus = false

/**
 * This is a function that add a  new bold tag to the editor
 * @param {*} e
 * this is the event data of the action that is fired 
 */
const newBold = (e) => {
    e.preventDefault()
    const { selector, newStatus } = newInlineNodeCreator(boldStatus, 'b')
    boldStatus = newStatus
    setCaret(selector == null ? null : `#${selector}`);
}
/**
 * This is a function that add a  new italic tag to the editor
 * @param {*} e
 * this is the event data of the action that is fired 
 */
const newItalic = (e) => {
    e.preventDefault()
    const { selector, newStatus  } = newInlineNodeCreator(italicStatus, 'i')
    italicStatus = newStatus
    setCaret(selector == null ? null : `#${selector}`);
}
/**
 * This is a function that add a  new italic tag to the editor
 * @param {*} e
 * this is the event data of the action that is fired 
 */
const newUnderLine = (e) => {
    e.preventDefault()
    const { selector, newStatus, parentNode } = newInlineNodeCreator(underLineStatus, 'u')
    underLineStatus = newStatus
    setCaret(selector == null ? null : `#${selector}`);
} 
/**
 * This is a function that add a  new paragraph tag to the editor
 * @param {*} e
 * this is the event data of the action that is fired 
 */
const newParagraph = (e) => {
    e.preventDefault()
    const { selector, newStatus, parentNode } = newInlineNodeCreator(null, 'p')
    // underLineStatus = newStatus
    setCaret(selector == null ? null : `#${selector}`);
} 
const alignText = (e) => {
    let position = e.target.getAttribute('data-btn-align')
    console.log(position)
    let currentNodeActive = window.getSelection()?.anchorNode.parentNode
    console.log(currentNodeActive)
    addStyle(currentNodeActive, {
        textAlign: position,
        display: "inline-block",
        width:"100%"
    })
}

const addColor = (e) => {
    let color = e.target.value;
    let highlighted = false, _selector
    console.log(color)
    console.log(window.getSelection().toString().trim().length)
    if (window.getSelection().toString().trim() !== "" || window.getSelection().toString().trim().length > 0) highlighted = true 
    console.log(highlighted)
    if(!highlighted) {
        const { selector, newStatus, parentNode } = newInlineNodeCreator(null, 'span')
        _selector = selector
    }
    else{
        let parentNode = window.getSelection().anchorNode.parentNode
        let childNode = window.getSelection().anchorNode,
        _text = childNode.textContent,
            id = new Date().valueOf()
        para = document.createElement('span');
        para.setAttribute('id', `s${id}`)
        // const { selector, newStatus } = newInlineNodeCreator(null, 'span')
        _selector = `s${id}`
        childNode.replaceWith(para)
        para.innerHTML = _text
        
    }
    addStyle($(`#${_selector}`),{
        color: color
    })
    highlighted ? setCaret() : setCaret(`#${_selector}`)
}
// for adding styling 
const addStyle = (domElement, style) => {
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

const createHighlighedParentNode = () => {
    let highlightedNode = window.getSelection().anchorNode
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
const newInlineNodeCreator = (NodeBol, NodeTypeModel = 'span') => {
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
    if (noRootNode.includes(NodeType)) currentNodeActive = $('[data-editor-block]')
    console.log(NodeType);
    id = new Date().valueOf();
    para = document.createElement(NodeType);
    para.setAttribute("id", `${NodeType.charAt(0)}${id}`)
    // para.appendChild(document.createTextNode("&nbsp;"))
    if (noRootNode.includes(NodeType)) currentNodeActive = $('[data-editor-block]')
    currentNodeActive.appendChild(para);
    // currentNodeActive.innerHTML += para
    console.log(currentNodeActive)
    para.innerHTML = "&nbsp; <span></span>"
    console.log(para, currentNodeActive)
    return { selector: `${NodeType.charAt(0)}${id}`, parentNode: currentNodeActive, node: para, newStatus: NodeBol}
}
/**
 * 
 * @param {String} selector
 * This is the Node elemnt in which the cursor is meant to be at 
 */
const  setCaret = (selector = null) => {
    // console.log(document.querySelector(selector))
    let startNode = selector == null ? $('[data-editor-block]') : $('[data-editor-block]').querySelector(selector)
    startNode = startNode == null ? $('[data-editor-block]').lastChild : startNode
    console.log(startNode, document.querySelector(selector), selector)
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

function getSelectionStart() {
    var node = document.getSelection().anchorNode;
    console.log(node, window.getSelection().baseNode)
    // console.log(node?.nodeType)
    return (node?.nodeType !== 3 ? node?.parentNode : node);
}



window.addEventListener('load', () => {
   
})

// Creating auto focus on the editor
setCaret()
// added event listener for the bold btn 
$('[data-btn-bold]').addEventListener('click', newBold)
//  Event listener for the italic button
$('[data-btn-itl]').addEventListener('click', newItalic)
//  Event listener for the underline button
$('[data-btn-und]').addEventListener('click', newUnderLine)
//  Event listener for the new paragraph button
$('[data-btn-prg]').addEventListener('click', newParagraph)
//  Event listener for the align button
// $('[data-btn-align]').addEventListener('click', alignText)
document.querySelectorAll('[data-btn-align]').forEach(item => {
    item.addEventListener('click', alignText)
})

$('[data-btn-color]').addEventListener('change', addColor)
// Event listener to keep track of default / built in commands like `Ctrl+B`
$('[data-editor-block]').addEventListener('keydown', (event) => {
    // event.preventDefault();
    var name = event.key;
    var code = event.code;
    // console.log(event)
    // Alert the key name and key code on keydown
    if (code == 'KeyB' && event.ctrlKey) boldStatus = !boldStatus
    if (code == 'KeyI' && event.ctrlKey) italicStatus = !italicStatus
    if (code == 'KeyU' && event.ctrlKey) underLineStatus = !underLineStatus
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);

