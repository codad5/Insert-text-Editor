
let editor= document.getElementById('editor');


class Editor{



    constructor(editor){
        this.editor=editor
        console.log(this.editor)
        
}

    generateFirstLevelNode(name,index){
let heading=['h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
let texttags=['p','b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i)=>document.createElement(i) )
var linkTag=['a','base'].map((i)=>document.createElement(i))
let ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
let listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
let TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
let formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
let scripTag=['script','noscript'].map((i)=>document.createElement(i))
let containerTags=['div'].map((i)=>document.createElement(i))


let features={
    headingTag:heading,
    textTags:texttags,
    linkTags:linkTag,
    ImageAndVideoTags:ImagObjTag,
    listTags:listtag,
    tableTags:TableTag,
    formTags:formTag,
    scriptTags:scripTag,
    containerTags:containerTags
}








        let id=new Date().valueOf()
        let node=features[name][index]
        node.setAttribute('id',id)
        editor.appendChild(node)
    
    return node

}
    insertlast(name,index){


        let heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
        let texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
        // var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
        let ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
        let listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
        let TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
        let formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
        let scripTag=['script','noscript'].map((i)=>document.createElement(i))
        let containerTags=['div'].map((i)=>document.createElement(i))


    let features={
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




        
        let id=new Date().valueOf()
        let last_element_index=this.editor.childNodes.length-1
        let last_node=editor.childNodes[last_element_index]
        let grab_the_last_node=document.getElementById(`${last_node.id}`)
        let createTheNOde=features[name][index]
        if(name=='headingTag'){
            var mytext=document.createTextNode('.')
            createTheNOde.setAttribute('id',id)
            createTheNOde.appendChild(mytext)
            grab_the_last_node.appendChild(createTheNOde)  
        }
        elif(name=='listTags'){


        }
        elif(name=='tableTags'){


        }
    
       
        
    return

}
    insertBefore(name,index){
        let heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
        let texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
        // var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
        let ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
        let listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
        let TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
        let formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
        let scripTag=['script','noscript'].map((i)=>document.createElement(i))
        let containerTags=['div'].map((i)=>document.createElement(i))


    let features={
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





        
        let id=new Date().valueOf()
        let first_node=this.editor.childNodes[1]
        let grab_the_first_node=document.getElementById(`${first_node.id}`)
        let createTheNOde=features[name][index]
        createTheNOde.setAttribute('id',id)
        grab_the_first_node.appendChild(createTheNOde)  
    return
}


    insertChoice(number,name,index){
        let heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
        let texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
        // var linkTag=['a','base'].map((i)=>document.createElement(i).appendChild(textNode))
        let ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
        let listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
        let TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
        let formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
        let scripTag=['script','noscript'].map((i)=>document.createElement(i))
        let containerTags=['div'].map((i)=>document.createElement(i))
        
        
        let features={
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
        

        if (-1<number<editor.childNodes.length-1){
            
            let id=new Date().valueOf()
            let choice_node=this.editor.childNodes[number]
            let grab_the_choice_node=document.getElementById(`${choice_node.id}`)
            let createTheNOde=features[name][index]
            createTheNOde.setAttribute('id',id)
            grab_the_choice_node.appendChild(createTheNOde) 
    }

}
    addEventListen(){
        document.getElementById('bold').addEventListener('click',()=>this.generateFirstLevelNode('containerTags',0))
        document.getElementById('bolda').addEventListener('click',()=>this.insertlast('headingTag',0))
        // alert('hello')
        // alert(this.b)
    }


}

let launcher=new Editor(editor)
launcher.addEventListen()




function pointAndKill(event){
    editor.addEventListener('click',()=>console.log(event.target))
}

pointAndKill()