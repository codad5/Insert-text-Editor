
const $ = (selector) => document.querySelector(selector)
let i = 0, boldStatus = false

const  setCaret = () => {
    var el = $('[data-editor-block]')
    var range = document.createRange()
    var sel = window.getSelection()
    console.log(el.childNodes[el.childNodes.length - 1])
    range.setStart(el.childNodes[el.childNodes.length - 1], el.childNodes[el.childNodes.length - 1].length + 2)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}
$('[data-bold-btn]').addEventListener('click', (e) => {
    boldStatus = !boldStatus
    e.preventDefault()
    console.log('hello')
    $('[data-editor-block]').innerHTML = $('[data-editor-block]').innerHTML.trim()
    if(boldStatus) {

        $('[data-editor-block]').innerHTML += `<b>&nbsp </b>`
        $('[data-editor-block]').innerHTML += `<b>&nbsp </b>`
    } 
    setCaret();
})