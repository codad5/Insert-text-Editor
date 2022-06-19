// this is function i created to aid easy call of dom elements
/**
 * 
 * @param {*} selector
 * this is the selector value (element, className, id, data Attribute) of the  element to be selected
 * @returns DOMElement
 */
const $ = (selector) => document.querySelector(selector)

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
    boldStatus = !boldStatus
    let id = null
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    let NodeType = "span",
    para = document.createElement(NodeType);
    if (boldStatus) {
        NodeType = "b"
        
        // $('[data-editor-block]').innerHTML += `<b>&nbsp </b>`
    }
    id = new Date().valueOf();
    para = document.createElement(NodeType);
    para.setAttribute("id", `b${id}`)
    para.appendChild(document.createTextNode("."))
    $('[data-editor-block]').appendChild(para);
    setCaret(id == null ? null : `#b${id}`);
}
/**
 * This is a function that add a  new italic tag to the editor
 * @param {*} e
 * this is the event data of the action that is fired 
 */
const newItalic = (e) => {
    italicStatus = !italicStatus
    let id = null
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    let NodeType = "span",
    para = document.createElement(NodeType);
    if (italicStatus) {
        NodeType = "i"
    }
    id = new Date().valueOf();
    para = document.createElement(NodeType);
    para.setAttribute("id", `i${id}`)
    para.appendChild(document.createTextNode("."))
    $('[data-editor-block]').appendChild(para);
    setCaret(id == null ? null : `#i${id}`);
}
/**
 * This is a function that add a  new italic tag to the editor
 * @param {*} e
 * this is the event data of the action that is fired 
 */
const newUnderLine = (e) => {
    underLineStatus = !underLineStatus
    let id = null
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    let NodeType = "span",
    para = document.createElement(NodeType);
    if (underLineStatus) {
        NodeType = "u"
    }
    id = new Date().valueOf();
    para = document.createElement(NodeType);
    para.setAttribute("id", `i${id}`)
    para.appendChild(document.createTextNode("."))
    $('[data-editor-block]').appendChild(para);
    setCaret(id == null ? null : `#i${id}`);
}
/**
 * 
 * @param {String} selector
 * This is the Node elemnt in which the cursor is meant to be at 
 */
const  setCaret = (selector = null) => {
    // var el = selector == null ? $('[data-editor-block]') : $('[data-editor-block]')
    var range = document.createRange()
    var sel = window.getSelection(), 
        startNode = selector == null ? $('[data-editor-block]') : $('[data-editor-block]').querySelector(selector)
    // startNode = selector == null ? $('[data-editor-block]') : startNode[startNode.length - 1]
    // console.log(startNode.childNodes, startNode.childNodes.length, startNode)
    range.setStart(startNode, 0)
    range.setEnd(startNode, 1)
    console.log(range)
    // range.setStartAfter($('[data-editor-block]').childNodes[$('[data-editor-block]').childNodes.length - 1])
    
    // range.setEnd(el.childNodes[el.childNodes.length - 1], 0)
    console.log(range.toString())
    range.collapse(false)
    console.log(range.toString())
    sel.removeAllRanges()
    sel.addRange(range)
}
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
    if(code == 'KeyB' && event.ctrlKey) boldStatus = !boldStatus
    if (code == 'KeyI' && event.ctrlKey) italicStatus = !italicStatus
    if (code == 'KeyU' && event.ctrlKey) underLineStatus = !underLineStatus
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);

// event lsitener to set focus to teh editor
window.addEventListener('load', setCaret())