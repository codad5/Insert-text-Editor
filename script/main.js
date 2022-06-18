
const $ = (selector) => document.querySelector(selector)
let i = 0, boldStatus = false

const  setCaret = (selector = null) => {
    var el = selector == null ? $('[data-editor-block]') : $('[data-editor-block]')
    var range = document.createRange()
    var sel = window.getSelection()
    console.log(el.childNodes[el.childNodes.length - 1])
    range.setStart(el.childNodes[el.childNodes.length - 1].childNodes[0] || el.childNodes[el.childNodes.length - 1], 0)
    range.setEnd(el.childNodes[el.childNodes.length - 1].childNodes[0] || el.childNodes[el.childNodes.length - 1], 0)
    console.log(range)
    range.collapse()
    

    sel.removeAllRanges()
    sel.addRange(range)
}
$('[data-bold-btn]').addEventListener('click', (e) => {
    boldStatus = !boldStatus
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    if(boldStatus) {

        $('[data-editor-block]').innerHTML += `<b> </b>`
        // $('[data-editor-block]').innerHTML += `<b>&nbsp </b>`
    } 
    setCaret();
})