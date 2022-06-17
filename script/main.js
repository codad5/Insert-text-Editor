class Editor {
    constructor(){
        this.states = {
            bold:false,
            italic:false,
            underline:false
        }
        this.editorFrame = document.querySelector('[data-editor-frame]')
        this.editorBlock = this.editorFrame.querySelector('[data-editor-block]')
        this.boldBtn = this.editorFrame.querySelector('[data-editor-btn]')
        this.underLineBtn = this.editorFrame.querySelector('[data-editor-btn]')
        this.editorElement = {
            bold:'b',
            italic:'i',
            underline:'u'
        }
    }

    boldAction(){
        
    }
    setCaret() {
        
        var range = document.createRange()
        var sel = window.getSelection()

        range.setStart(this.editorBlock.childNodes[this.editorBlock.childNodes.length -1 ], 5)
        range.collapse(true)

        sel.removeAllRanges()
        sel.addRange(range)
    }
}