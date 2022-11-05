// import $ from 'jquery'  
class InsertEditor {
    constructor(settings) {
        this.frame = document.querySelector(`[data-editor-frame]`);
        this.form_name = null;
        this.settings = {};
        this.button_selectors = {
            bold: "data-btn-bold",
            italic: "data-btn-italic",
            underline: "data-btn-underline",
            paragraph: "data-btn-paragraph",
            destroy: "data-btn-destroy",
            refresh: 'data-btn-refresh'
        };
        this.action_tags = {
            bold: 'b',
            italic: 'i',
            underline: 'u',
            paragraph: 'p',
            destroy: '',
            refresh: ''
        };
        this.action_status = {
            bold: false,
            italic: false,
            underline: false,
            paragraph: false,
            destroy: false,
            refresh: false
        };
        this.editor = document.querySelector(`[data-editor-block]`);
        this.input = document.querySelector(`[data-editor-input]`);
        this.action_has_on_off = ['bold', 'italic', 'underline'].map(v => v.toLowerCase());
        this.action_buttons = {
            bold: document.querySelector(`[${this.button_selectors.bold}]`),
            italic: document.querySelector(`[${this.button_selectors.italic}]`),
            underline: document.querySelector(`[${this.button_selectors.underline}]`),
            paragraph: document.querySelector(`[${this.button_selectors.paragraph}]`),
            destroy: document.querySelector(`[${this.button_selectors.destroy}]`),
            refresh: document.querySelector(`[${this.button_selectors.refresh}]`)
        };
        if (settings.editor_class)
            this.frame = document.querySelector(`.${settings.editor_class}`);
        if (settings.form_name)
            this.form_name = settings.form_name;
        if (!this.frame)
            throw new Error('No Editor Found');
        this.settings = Object.assign(Object.assign({}, this.settings), settings);
    }
    refresh() {
        return this.printEditorHTML();
    }
    delete() {
        var _a;
        const clone = this.frame;
        (_a = this.frame) === null || _a === void 0 ? void 0 : _a.remove();
        this.frame = clone;
        return this;
    }
    printEditorHTML() {
        let html = !this.frame ? null : this.frame.innerHTML =
            `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <style>
                .Insert-props .insert-control-panel button{
                    position:relative;
                }
                .Insert-props .insert-control-panel button:hover::after{
                    content:attr(data-info)" ";
                    position:absolute;
                    background:#555;
                    display:inline-block;
                    color:#eee;
                    padding:2px;
                    font-size:0.6rem;
                    z-index:1000;
                    width:clamp(20px, 35px, 100px);
                    text-overflow:word-break;
                    overflow-wrap:anywhere;

                    
                }
            </style>
            <div class="Insert-props" >
            <div class="insert-control-panel">
            <!-- Some action button -->
            <button type="button" title="bold" class="fa fa-bold" aria-hidden="true" ${this.button_selectors.bold} data-info="bold"></button>
            <button type="button" title="italic" class="fa fa-italic" aria-hidden="true" ${this.button_selectors.italic} data-info="italic"></button>
            <button type="button" title="underline" class="fa fa-underline" aria-hidden="true" ${this.button_selectors.underline} data-info="underline"></button>
            <button type="button" title="new paragraph" class="fa fa-paragraph" aria-hidden="true" ${this.button_selectors.paragraph} data-info="paragraph"></button>
            <button type="button" title="new paragraph" class="fa fa-refresh" aria-hidden="true" ${this.button_selectors.refresh} data-info="Refresh Editor"></button>
            <button type="button" title="align left" class="fa fa-align-left" aria-hidden="true" data-btn-align="left" data-info="text-align:left"></button>
            <button type="button" class="fa fa-align-right" aria-hidden="true" data-btn-align="right" data-info="text-align:right"></button>
            <button type="button" class="fa fa-align-center" aria-hidden="true" data-btn-align="center" data-info="text-align:center"></button>
            <button type="button" class="fa fa-list-ul" aria-hidden="true" data-btn-list="ul"  data-info="list:unordered"></button>
            <button type="button" class="fa fa-list-ol" aria-hidden="true" data-btn-list="ol" data-info="list:ordered"></button>
            <button type="button" class="fa fa-table" aria-hidden="true" data-btn-table data-info="table"></button>
            <input type="color" data-btn-color value="#000000"/>
            </div>
            <!-- The editor -->
            <style>
                
            </style>
            <div contenteditable="true" id="deditorBox1245" data-editor-block oncontextmenu="return false" style="background:#8d8;width:200px;aspect-ratio: 1;">
                
            </div>
            <!-- this is the input tag required for your form upload. it carries the data in the editor -->
            <input type="text" value="" style="visibility:hidden" name="${this.form_name || ''}" data-editor-input />
            </div>
        `;
        return this.assignActionButton()
            .addEventListners()
            .setCaret();
    }
    assignActionButton() {
        this.editor = document.querySelector(`[data-editor-block]`);
        this.input = document.querySelector(`[data-editor-input]`);
        this.action_buttons = Object.assign(Object.assign({}, this.action_buttons), { bold: document.querySelector(`[${this.button_selectors.bold}]`), italic: document.querySelector(`[${this.button_selectors.italic}]`), underline: document.querySelector(`[${this.button_selectors.underline}]`), paragraph: document.querySelector(`[${this.button_selectors.paragraph}]`), destroy: document.querySelector(`[${this.button_selectors.destroy}]`), refresh: document.querySelector(`[${this.button_selectors.refresh}]`) });
        return this;
    }
    setDeleteButton(Element_) {
        this.action_buttons = Object.assign(Object.assign({}, this.action_buttons), { destroy: document.querySelector(Element_) });
        return this.setDestroyListners();
    }
    addEventListners() {
        return this.setBoldListner()
            .setItalicListner()
            .setUnderlineListners()
            .setParagraphListners()
            .setDestroyListners()
            .setRefreshListners()
            .saveToInputListner();
    }
    setCaret(selector) {
        var _a, _b;
        try {
            let startNode = selector == null ? this.editor : (_a = this.editor) === null || _a === void 0 ? void 0 : _a.querySelector(selector.toLowerCase());
            startNode = !startNode ? (_b = this.editor) === null || _b === void 0 ? void 0 : _b.lastChild : startNode;
            // console.log(startNode, document.querySelector(selector), selector)
            let range = document.createRange(), sel = window.getSelection();
            if (!startNode)
                throw new Error('Start Node Error');
            range.setStart(startNode, 0);
            range.setEnd(startNode, 1);
            range.collapse(false);
            sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
            sel === null || sel === void 0 ? void 0 : sel.addRange(range);
        }
        catch (e) {
            console.error(e === null || e === void 0 ? void 0 : e.getMessage());
            console.error(e);
        }
        finally {
            return this;
        }
    }
    getCurrentSelectedNode() {
        var _a, _b, _c;
        let currentNodeActive = (_b = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.anchorNode) !== null && _b !== void 0 ? _b : this.editor;
        if (!((_c = this.editor) === null || _c === void 0 ? void 0 : _c.contains(currentNodeActive)))
            currentNodeActive = this.editor;
        return currentNodeActive;
    }
    setBoldListner() {
        var _a;
        (_a = this.action_buttons.bold) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            console.log("I am bold");
            this.handleNodeCreation('bold');
        });
        return this;
    }
    saveToInputListner() {
        var _a;
        (_a = this.editor) === null || _a === void 0 ? void 0 : _a.addEventListener('input', () => {
            return this.updateInput();
        });
        return this;
    }
    setDestroyListners() {
        var _a;
        (_a = this.action_buttons.destroy) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            console.log("Destroyed! thanks for using Insert Editor");
            this.delete();
        });
        return this;
    }
    setRefreshListners() {
        var _a;
        (_a = this.action_buttons.refresh) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            console.log("Refresh Start");
            console.time("Refresh Ended");
            this.refresh();
            console.timeEnd("Refresh Ended");
        });
        return this;
    }
    setItalicListner() {
        var _a;
        (_a = this.action_buttons.italic) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            console.log("I am Italic");
            this.handleNodeCreation('italic');
        });
        return this;
    }
    setUnderlineListners() {
        var _a;
        (_a = this.action_buttons.underline) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            console.log("I am Underline");
            this.handleNodeCreation('underline');
        });
        return this;
    }
    setParagraphListners() {
        var _a;
        (_a = this.action_buttons.paragraph) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            console.log("I am paragraph");
            this.handleNodeCreation('paragraph');
        });
        return this;
    }
    handleNodeCreation(NodeType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let TAG = this.getNodeTag(NodeType).toLowerCase();
        let parent = (_b = (_a = this.getCurrentSelectedNode()) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : this.editor;
        parent = ((_c = this.editor) === null || _c === void 0 ? void 0 : _c.parentElement) == parent ? this.editor : parent;
        let highlighted = false;
        if (((_d = window === null || window === void 0 ? void 0 : window.getSelection()) === null || _d === void 0 ? void 0 : _d.toString().trim()) !== "" || ((_g = (_f = (_e = window === null || window === void 0 ? void 0 : window.getSelection()) === null || _e === void 0 ? void 0 : _e.toString()) === null || _f === void 0 ? void 0 : _f.trim()) === null || _g === void 0 ? void 0 : _g.length))
            highlighted = true;
        if (highlighted) {
            return this.handleHighlighted(NodeType);
        }
        if (this.action_status[`${NodeType}`])
            TAG = "span".toLowerCase();
        const newElement = document.createElement(TAG), id = `${TAG}${new Date().valueOf()}`.toLowerCase();
        newElement.setAttribute("id", id);
        if (this.action_status[`${NodeType}`]) {
            parent = this.getParentOfDiffrentType(parent, NodeType);
        }
        const range = (_h = window.getSelection()) === null || _h === void 0 ? void 0 : _h.getRangeAt(0), range_element = this.getParentOfDiffrentType((_j = range === null || range === void 0 ? void 0 : range.commonAncestorContainer) !== null && _j !== void 0 ? _j : null, NodeType);
        this.action_status[`${NodeType}`] ? range === null || range === void 0 ? void 0 : range.surroundContents(newElement) : range_element === null || range_element === void 0 ? void 0 : range_element.appendChild(newElement);
        // range && range?.commonAncestorContainer?.parentElement == this.editor ? range?.surroundContents(newElement) : parent?.appendChild(newElement)
        // console.log(this.getParentOfDiffrentType(range.commonAncestorContainer.parentElement, NodeType))
        console.log(range_element, range === null || range === void 0 ? void 0 : range.commonAncestorContainer, range, range_element != this.editor);
        newElement.innerHTML = "&nbsp;";
        this.action_status[`${NodeType}`] = !this.action_status[`${NodeType}`];
        return this.updateInput().turnButton(NodeType).setCaret(`#${id}`);
    }
    getParentOfDiffrentType(parent, NodeType) {
        let count = 0, to_be_returned = parent !== null && parent !== void 0 ? parent : this.editor;
        console.log('NodeName => ' + (to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.nodeName.toLowerCase()), to_be_returned);
        if ('#text' == (to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.nodeName.toLowerCase()))
            to_be_returned = to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.parentElement;
        console.log('NodeName => ' + (to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.nodeName.toLowerCase()));
        while ((to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.nodeName.toLowerCase()) == this.getNodeTag(NodeType).toLowerCase() && count < 15 && this.editor != to_be_returned) {
            // console.log(`${parent?.nodeName.toLowerCase()} === ${this.getNodeTag(NodeType).toLowerCase()}`)
            // console.log('trying to find parent element => ', parent?.nodeName.toLowerCase())
            // console.log(`Are they same ? : ${this.editor != parent}`)
            to_be_returned = !(parent === null || parent === void 0 ? void 0 : parent.parentElement) ? this.editor : parent === null || parent === void 0 ? void 0 : parent.parentElement;
            // console.log(`Are they same ? : ${this.editor != parent}`)
            // console.log(`${parent?.nodeName.toLowerCase()} === ${this.getNodeTag(NodeType).toLowerCase()}`)
            console.log(`it is to be unbold ${count}`);
            count++;
        }
        console.log(count, this.editor == parent, to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.innerHTML);
        return ((to_be_returned === null || to_be_returned === void 0 ? void 0 : to_be_returned.nodeName.toLowerCase()) == this.getNodeTag(NodeType).toLowerCase() && count > 15) ? this.editor : to_be_returned;
    }
    handleHighlighted(NodeType) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        console.log('highlighting');
        let TAG = this.getNodeTag(NodeType).toLowerCase();
        let parentNode = (_b = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.anchorNode) === null || _b === void 0 ? void 0 : _b.parentNode;
        let highlightedNode = (_c = window.getSelection()) === null || _c === void 0 ? void 0 : _c.anchorNode;
        const range = (_e = (_d = window.getSelection()) === null || _d === void 0 ? void 0 : _d.getRangeAt(0)) !== null && _e !== void 0 ? _e : (_f = document.getSelection()) === null || _f === void 0 ? void 0 : _f.getRangeAt(0);
        if (((_h = (_g = highlightedNode === null || highlightedNode === void 0 ? void 0 : highlightedNode.parentNode) === null || _g === void 0 ? void 0 : _g.nodeName) === null || _h === void 0 ? void 0 : _h.toLowerCase()) == TAG)
            TAG = "span";
        let _text = (_k = (_j = window.getSelection()) === null || _j === void 0 ? void 0 : _j.toString()) !== null && _k !== void 0 ? _k : '', id = `${TAG}${new Date().valueOf()}`.toLowerCase();
        const newElement = document.createElement(TAG);
        newElement.setAttribute('id', `${id}`);
        (_l = window.getSelection()) === null || _l === void 0 ? void 0 : _l.deleteFromDocument();
        console.log((_m = highlightedNode === null || highlightedNode === void 0 ? void 0 : highlightedNode.parentNode) === null || _m === void 0 ? void 0 : _m.nodeName, TAG);
        //this is to reverse currenct state i.e from bold to unbold
        if (((_p = (_o = highlightedNode === null || highlightedNode === void 0 ? void 0 : highlightedNode.parentNode) === null || _o === void 0 ? void 0 : _o.nodeName) === null || _p === void 0 ? void 0 : _p.toLowerCase()) == this.getNodeTag(NodeType).toLowerCase()) {
            console.log('running this now');
            (_r = (_q = range === null || range === void 0 ? void 0 : range.commonAncestorContainer) === null || _q === void 0 ? void 0 : _q.parentElement) === null || _r === void 0 ? void 0 : _r.replaceWith(newElement);
        }
        else {
            console.log('running');
            range === null || range === void 0 ? void 0 : range.surroundContents(newElement);
        }
        newElement.innerHTML = _text;
        this.updateInput().setCaret(`#${id}`);
    }
    turnButton(NodeType) {
        let bg_color = this.action_status[`${NodeType}`] ? '#554' : '#f0f0f0';
        let text_color = this.action_status[`${NodeType}`] ? '#f0f0f0' : '#554';
        console.log(NodeType);
        if (!this.action_has_on_off.includes(NodeType.toLowerCase()))
            return this;
        return this.addStyle(this.action_buttons[`${NodeType}`], `
            background:${bg_color};
            color:${text_color}
        `);
    }
    updateInput() {
        var _a, _b, _c;
        (_a = this.input) === null || _a === void 0 ? void 0 : _a.setAttribute("value", (_c = (_b = this.editor) === null || _b === void 0 ? void 0 : _b.innerHTML) !== null && _c !== void 0 ? _c : '');
        return this;
    }
    addStyle(domElement, style) {
        console.log(style);
        domElement === null || domElement === void 0 ? void 0 : domElement.setAttribute('style', style);
        return this;
    }
    getNodeTag(NodeType) {
        return this.action_tags[`${NodeType}`];
    }
}
export { InsertEditor };
