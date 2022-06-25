import {InsertEditor, $} from './main.js'

// const $ = (selector) => document.querySelector(selector)


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
$('[data-btn-color]').addEventListener('change', AutoEditor.addColor)

document.querySelectorAll('[data-btn-list]').forEach(i => { i.addEventListener('click', AutoEditor.addList) })
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