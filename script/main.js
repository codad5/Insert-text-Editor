
const $ = (selector) => document.querySelector(selector)
let i = 0, boldStatus = false, italicStatus = false, underLineStatus = false

const newBold = (e) => {
    boldStatus = !boldStatus
    let id = null
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    if (boldStatus) {
        id = new Date().valueOf();
        const para = document.createElement("b");
        para.setAttribute("id", `b${id}`)
        $('[data-editor-block]').appendChild(para);
        // $('[data-editor-block]').innerHTML += `<b>&nbsp </b>`
    }
    setCaret(id == null ? null : `#b${id}`);
}

const newItalic = (e) => {
    italicStatus = !italicStatus
    let id = null
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    if (boldStatus) {
        id = new Date().valueOf();
        const para = document.createElement("i");
        para.setAttribute("id", `i${id}`)
        $('[data-editor-block]').appendChild(para);
        // $('[data-editor-block]').innerHTML += `<b>&nbsp </b>`
    }
    setCaret(id == null ? null : `#i${id}`);
}
const  setCaret = (selector = null) => {
    // var el = selector == null ? $('[data-editor-block]') : $('[data-editor-block]')
    var range = document.createRange()
    var sel = window.getSelection(), 
        startNode = selector == null ? $('[data-editor-block]') : $(selector)
    // startNode = selector == null ? $('[data-editor-block]') : startNode[startNode.length - 1]
    console.log(startNode.childNodes, startNode.childNodes.length, startNode)
    range.setStart($('[data-editor-block]'), 0)
    range.setStartAfter($('[data-editor-block]').childNodes[$('[data-editor-block]').childNodes.length - 1])
    
    // range.setEnd(el.childNodes[el.childNodes.length - 1], 0)
    console.log(range.toString())
    range.collapse(true)
    console.log(range.toString())
    sel.removeAllRanges()
    sel.addRange(range)
}
$('[data-bold-btn]').addEventListener('click', newBold)
$('[data-bold-itl]').addEventListener('click', newItalic)

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


window.addEventListener('load', setCaret())