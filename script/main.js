var editor= document.getElementById('editor');
// var textNode= document.createTextNode();
// var editorevent=editor.addEventListener("keypress",getInnerHtml);
// function getInnerHtml(){
//     var editorarray=[]
//     editorarray.push(editor.innerHTML)
//     return editorarray
// }
var heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
var texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
// var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
var ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
var listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
var TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
var formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
var scripTag=['script','noscript'].map((i)=>document.createElement(i))


const features={
    headingTag:heading,
    textTags:texttags,
    // linkTags:linkTag,
    ImageAndVideoTags:ImagObjTag,
    listTags:listtag,
    tableTags:TableTag,
    formTags:formTag,
    scriptTags:scripTag
}


let format= new function(){
    
    this.bold=()=>editor.style.fontWeight='bold';
    this.italic=()=>editor.style.textDecoration='italics';
    this.underline=()=>editor.style.textDecoration='underline';
    this.strikethrough=()=>editor.style.textDecoration='line-through';
    this.superscript=()=>editor.style.verticalAlign='sup';
    this.subscript=()=>editor.style.verticalAlign='sub';
    this.base=()=>editor.style.verticalAlign='base'
    this.alignR=()=>editor.style.textAlign='right';
    this.alignL=()=>editor.style.textAlign='left';
    this.alignC=()=>editor.style.textAlign='center';
    this.Increaseindent=()=>editor.style.textIndent='50px';
    this.decreaseindent=()=>editor.style.textIndent='-50px'
    // this.color=()=>editor.style.color=colorValue
    // this.backgroundColor=()=>editor.style.backgroundColor=backgroundColor
}




var parag=document.createElement('p')
parag.className='jerry'
var parac=document.createTextNode([stuffs? stuffs:'.'])
parag.appendChild(parac)
var stuffs=editor.innerHTML

editor.addEventListener('keypress',()=>editor.appendChild(parag))
document.getElementById('bold').addEventListener('click',console.log(editor.childNodes[1]))

let nodeCreation=new function(){

        this.generateNode=(name,Number)=>editor.appendChild(features[name][Number]);
        
        

}
// document.getElementById('bold').addEventListener('click',nodeCreation.generateNode('headingTag',2))
// console.log(nodeCreation.generateNode('heading',2))

// console.log(features['heading'])

// function bold(){
//     var result=getInnerHtml()
//     var resultinarray=document.createTextNode(result[0])
//     var boldNode=document.createElement("b")
    

//     boldNode.appendChild(resultinarray)
//     console.log(boldNode)
//     editor.appendChild(boldNode)
// }


