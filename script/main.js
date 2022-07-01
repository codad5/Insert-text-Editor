var editor=document.getElementById('editor')


class Editor{

    constructor(editor){
        this.editor=editor
        console.log(this.editor)
        
    }

    generateFirstLevelNode(name,index){
        var nodeclass=new NodeCreation(name,index)
        let id=new Date().valueOf()
        let node=nodeclass.createNodes()
        node.setAttribute('id',id)
        editor.appendChild(node)
    
    return node

    }
    insertlast(name,index){
        var nodeclass=new NodeCreation(name,index)

        
        let id=new Date().valueOf()
        let last_element_index=this.editor.childNodes.length-1
        let last_node=editor.childNodes[last_element_index]
        let grab_the_last_node=document.getElementById(`${last_node.id}`)
        let createTheNOde=nodeclass.createNodes()
        if(name=='headingTag'){
            var mytext=document.createTextNode('.')
            createTheNOde.setAttribute('id',id)
            createTheNOde.appendChild(mytext)
            grab_the_last_node.appendChild(createTheNOde)  
        }
        if(name=='listTags'){
            var list=new List(6)
            list.createListTag()
            


        };
        if(name=='tableTags'){
            var table=new Table(3,3)
            table.createTable()

        }
    
        
        return

    }
    insertBefore(name,index){
        
        var nodeclass=new NodeCreation(name,index)
        
        let id=new Date().valueOf()
        let first_node=this.editor.childNodes[0]
        let grab_the_first_node=document.getElementById(first_node.id)
        let createTheNOde=nodeclass.createNodes()
        createTheNOde.setAttribute('id',id)
        grab_the_first_node.appendChild(createTheNOde)  
        return
    }


    insertChoice(number,name,index){
        

        if (-1<number<editor.childNodes.length-1){
            var nodeclass=new NodeCreation(name,index)
            let id=new Date().valueOf()
            let choice_node=this.editor.childNodes[number]
            let grab_the_choice_node=document.getElementById(choice_node.id)
            let createTheNOde=nodeclass.createNodes()
            createTheNOde.setAttribute('id',id)
            grab_the_choice_node.appendChild(createTheNOde) 
        }

    }

    // insertAnywhere(node,number,name,index){
    //     let node=document.getElementById(node)

    //     if (-1<number<node.childNodes.length-1){
    //         var nodeclass=new NodeCreation(name,index)
    //         let id=new Date().valueOf()
    //         let choice_node=this.node.childNodes[number]
    //         let grab_the_choice_node=document.getElementById(choice_node.id)
    //         let createTheNOde=nodeclass.createNodes()
    //         createTheNOde.setAttribute('id',id)
    //         grab_the_choice_node.appendChild(createTheNOde) 
    //     }

    // }
    addEventListen(){
        document.getElementById('genfirstnode').addEventListener('click',()=>this.generateFirstLevelNode('containerTags',0))

        document.getElementById('insertlast').addEventListener('click',()=>this.insertlast('tableTags',0))

        document.getElementById('insertfirst').addEventListener('click',()=>this.insertBefore('containerTags',0))

        document.getElementById('insertchoice').addEventListener('click',()=>this.insertChoice(3,'containerTags',0))

        

    }


}

let launcher=new Editor(editor)
launcher.addEventListen()



/*
function pointAndKill(event){
    editor.addEventListener('click',()=>console.log(event.target))
}

pointAndKill()
*/

class NodeCreation{

    constructor(tag_category,index) {
        this.tag_category=tag_category
        this.index=index
    }

    createNodes(){
        let heading=['h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))
        let texttags=['p','b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i)=>document.createElement(i) )
        var linkTag=['a','base'].map((i)=>document.createElement(i))
        let ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
        let listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
        let TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
        let formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
        let containerTags=['div'].map((i)=>document.createElement(i))

        let features={
            headingTag:heading,
            textTags:texttags,
            linkTags:linkTag,
            ImageAndVideoTags:ImagObjTag,
            listTags:listtag,
            tableTags:TableTag,
            // formTags:formTag,
            // scriptTags:scripTag,
            containerTags:containerTags
        }

        return features[this.tag_category][this.index]

    }


}


class List{
    constructor(no_of_li){
        this.no_of_li=no_of_li
    }

        createListTag(){
            let id=new Date().valueOf()
          
            let b=document.createElement('ul')
            b.setAttribute('id',id)
            editor.appendChild(b)
            this.li(id,this.no_of_li)
    }


    li(id,no){
        var grab_the_node=document.getElementById(id)
        for(let i=0;i<no;i++){
            var created_element=document.createElement('li')
            grab_the_node.appendChild(created_element)
        }
        
        
        }



}


class Table{

    constructor(columns,rows){
        this.columns=columns
        this.rows=rows
    }

    createTable(){
        let id=new Date().valueOf()
        var editor=document.getElementById('editor')
        let mytable=document.createElement('table')
        mytable.setAttribute('id',id)
        editor.append(mytable)
        this.tr(this.rows,id)
       
    }

    tr(no,id){
        let myarrayid=[]
        for(let i=0;i<no;i++){
            let myid=new Date().valueOf()
            var mytr=document.createElement('tr')
            mytr.setAttribute('id',myid)
            document.getElementById(id).append(mytr)
            myarrayid.push(myid)
            
        }
        this.td(this.columns,no,myarrayid)
    }


    td(no_of_td,no_of_tr,id){
        for(let y=0;y<no_of_tr;y++){
     
        
                 for(let i=0;i<no_of_td;i++){
                     let myid=new Date().valueOf()
                     var mytd=document.createElement('td')
                     mytd.setAttribute('id',myid)
                    document.getElementById(id[y]).append(mytd)
                 }
     
     }
     }

}
