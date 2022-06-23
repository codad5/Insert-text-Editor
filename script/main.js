var editor= document.getElementById('editor');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
var texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
// var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
var ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
var listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
var TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
var formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
var scripTag=['script','noscript'].map((i)=>document.createElement(i))
let containerTags=['div'].map((i)=>document.createElement(i))


const features={
    headingTag:heading,
    textTags:texttags,
    // linkTags:linkTag,
    ImageAndVideoTags:ImagObjTag,
    listTags:listtag,
    tableTags:TableTag,
    formTags:formTag,
    scriptTags:scripTag,
    containerTags:containerTags
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateNode(name,number){

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
    var texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
    // var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
    var ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
    var listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
    var TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
    var formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
    var scripTag=['script','noscript'].map((i)=>document.createElement(i))
    let containerTags=['div'].map((i)=>document.createElement(i))
    







    
    const feature={
        headingTag:heading,
        textTags:texttags,
        // linkTags:linkTag,
        ImageAndVideoTags:ImagObjTag,
        listTags:listtag,
        tableTags:TableTag,
        formTags:formTag,
        scriptTags:scripTag,
        containerTags:containerTags
    }






    var id=Math.random()
    var node=feature[name][number]
    node.setAttribute('id',id)
    editor.append(node)
    console.log('yes')
    


}
function blow(){
    editor.append(document.createElement('div'))
}

function generateOtherNodes(name,number){
    var id=Math.random()
    var node=features[name][number]
    node.setAttribute('id',id)
    var last_element_index=editor.childNodes.length-1
    var last_node=editor.childNodes[last_element_index]
    var grab_the_last_node=document.getElementById(`${last_node.id}`)
    node=grab_the_last_node.appendChild(node) //appending to the last node in the first level.
    return node

}

function insertlast(){
    var last_element_index=editor.childNodes.length-1
    var last_node=editor.childNodes[last_element_index]
    var grab_the_last_node=document.getElementById(`${last_node.id}`)
    var createTheNOde=document.createElement('p')
    grab_the_last_node.appendChild(createTheNOde)  //appending to the last node in the first level.
    console.log(grab_the_last_node.childNodes)

}
function insertBefore(name,index){
 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
    var texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
    // var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
    var ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
    var listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
    var TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
    var formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
    var scripTag=['script','noscript'].map((i)=>document.createElement(i))
    let containerTags=['div'].map((i)=>document.createElement(i))
    







    
    const feature={
        headingTag:heading,
        textTags:texttags,
        // linkTags:linkTag,
        ImageAndVideoTags:ImagObjTag,
        listTags:listtag,
        tableTags:TableTag,
        formTags:formTag,
        scriptTags:scripTag,
        containerTags:containerTags
    }

    var first_node=editor.childNodes[1]
    console.log(first_node)
    var grab_the_first_node=document.getElementById(`${first_node.id}`)
    var createTheNOde=feature[name][index]
    //appending to the first node in the first level.
    grab_the_first_node.appendChild(createTheNOde)
    console.log(grab_the_first_node.childNodes)
}

function insertChoice(number){
    if (-1<number<editor.childNodes.length-1){
    var choice_node=editor.childNodes[number]
    var grab_the_choice_node=document.getElementById(`${choice_node.id}`)
    var createTheNOde=document.createElement('a')
    grab_the_choice_node.appendChild(createTheNOde)  //appending to the choice node in the first level.
    }

}


document.getElementById('bold').addEventListener('click',()=>generateNode('containerTags',0))
document.getElementById('bolda').addEventListener('click',()=>insertBefore('headingTag',0))
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// let nodeCreation=new function(){
//         this.rootNode=generateNode;
//         this.otherNode=generateOtherNodes;
// }

// a=nodeCreation
// a.rootNode('containerTags',0)
// a.rootNode('headingTag',0)
// a.rootNode('scriptTags',0)

// a.otherNode('headingTag',0)
// generateNode('containerTags',0)
// generateNode('headingTag',0)
// generateNode('containerTags',0)
// insertlast()
// insertlast()
// insertlast()
// insertlast()
// insertBefore()
// insertlast()
// insertChoice(number=Number(2))
// insertlast()
// insertlast()
// insertlast()
// // console.log(nodeCreation.parameters)
// document.getElementById('bold').addEventListener('click',nodeCreation.generateNode('containerTags',0))
// console.log(features[containerTags][0])
// console.log(nodeCreation.generateNode('heading',2)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Editor{

    constructor(editor,features,format){
        this.editor=editor
        this.features=features
        this.format=format
}

    generateFirstLevelNode(name,index){
        var id=new Date().valueOf()
        var node=this.features[name][index]
        node.setAttribute('id',id)
        var node=editor.appendChild(node)
    
    return node

}
    insertlast(name,index){
        var last_element_index=this.editor.childNodes.length-1
        var last_node=editor.childNodes[last_element_index]
        var grab_the_last_node=document.getElementById(`${last_node.id}`)
        var createTheNOde=this.features[name][index]
        grab_the_last_node.appendChild(createTheNOde)  
    return

}
    insertBefore(name,index){
        var first_node=this.editor.childNodes[1]
        var grab_the_first_node=document.getElementById(`${first_node.id}`)
        var createTheNOde=this.features[name][index]
        grab_the_first_node.appendChild(createTheNOde)  //
    return
}
    insertChoice(number,name,index){
        if (-1<number<editor.childNodes.length-1){
            var choice_node=this.editor.childNodes[number]
            var grab_the_choice_node=document.getElementById(`${choice_node.id}`)
            var createTheNOde=this.features[name][index]
            grab_the_choice_node.appendChild(createTheNOde) 
    }

}

}