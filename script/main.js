// this is function i created to aid easy call of dom elements
/**
 * 
 * @param {*} selector
 * this is the selector value (element, className, id, data Attribute) of the  element to be selected
 * @returns DOMElement
 */
const $ = (selector) => document.querySelector(selector)

const editorTemplate = `
    <!-- Some action button -->
    <button type="button" data-btn-bold>Bold</button>
    <button type="button" data-btn-itl>Italic</button>
    <button type="button" data-btn-und>Underline</button>
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
    const { selector, newStatus } = newNodeCreator(boldStatus, 'b')
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
    const { selector, newStatus  } = newNodeCreator(italicStatus, 'i')
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
    const { selector, newStatus, parentNode } = newNodeCreator(underLineStatus, 'u')
    underLineStatus = newStatus
    console.log(parentNode)
    setCaret(selector == null ? null : `#${selector}`);
    console.log(parentNode)
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
const newNodeCreator = (NodeBol, NodeTypeModel = 'span') => {
    const currentNodeActive = window.getSelection().baseNode.parentNode
    console.log(currentNodeActive)
    NodeBol = !NodeBol
    let id = null
    // e.preventDefault()
    // console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    NodeTypeModel = NodeTypeModel.toLowerCase().trim();
    let NodeType = "span",
    para = document.createElement(NodeType);
    if (NodeBol) {
        NodeType = NodeTypeModel
    }
    console.log(NodeType);
    id = new Date().valueOf();
    para = document.createElement(NodeType);
    para.setAttribute("id", `${NodeType.charAt(0)}${id}`)
    // para.appendChild(document.createTextNode("&nbsp;"))
    currentNodeActive.appendChild(para);
    console.log(currentNodeActive)
    para.innerHTML = "&nbsp;"
    console.log(para, currentNodeActive)
    return { selector: `${NodeType.charAt(0)}${id}`, parentNode: currentNodeActive, node: para, newStatus: NodeBol}
}
/**
 * 
 * @param {String} selector
 * This is the Node elemnt in which the cursor is meant to be at 
 */
const  setCaret = (selector = null) => {
    console.log(document.querySelector(selector))
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

