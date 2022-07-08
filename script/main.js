
var editor=document.getElementById('realeditor');

const addheading=document.getElementById('heading');
const addpara=document.getElementById('paragraph');
const addtable=document.getElementById('table');
const addlist=document.getElementById('list');
const addImage=document.getElementById('image');
const addvideo=document.getElementById('addvideo');
const adddiv=document.getElementById('div');
const addselect=document.getElementById('select');
const addup=document.getElementById('up');
const adddown=document.getElementById('down');
const addtrash=document.getElementById('trash');
const addundo=document.getElementById('undo');
const addredo=document.getElementById('redo');
function love(){
    [addImage,adddiv,adddown,addheading,addlist,addpara,addredo,addselect,addtable,addtrash,addundo,addup,addvideo].map((i)=>i.addEventListener('click',(event)=>  hope(event.target.id)));
    
    
    
};

function hope (vae){
    return vae
};





// const greet = (who) => {
//     return `Hello, ${who}!`;
//   };
// console.log(love())

  





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

    addFirstLevel(){
        [addImage,adddiv,adddown,addheading,addlist,addpara,addredo,addselect,addtable,addtrash,addundo,addup,addvideo].map((i)=>i.addEventListener('click',(event)=>this.generateFirstLevelNode(event.target.id,0)));

        
        
    };
    addlastnode(){
        [addImage,adddiv,adddown,addheading,addlist,addpara,addredo,addselect,addtable,addtrash,addundo,addup,addvideo].map((i)=>i.addEventListener('click',(event)=>this.insertlast(event.target.id,0)));


    };
    
    addinsertbefore(){
        [addImage,adddiv,adddown,addheading,addlist,addpara,addredo,addselect,addtable,addtrash,addundo,addup,addvideo].map((i)=>i.addEventListener('click',(event)=>this.insertBefore(event.target.id,0)));
    }

    addchoice(no){
        [addImage,adddiv,adddown,addheading,addlist,addpara,addredo,addselect,addtable,addtrash,addundo,addup,addvideo].map((i)=>i.addEventListener('click',(event)=>this.insertChoice(no,event.target.id,0)));

    }

    

    addEventListen(){
        // document.getElementById('genfirstnode').addEventListener('click',()=>this.generateFirstLevelNode('containerTags',0))

        // document.getElementById('insertlast').addEventListener('click',()=>this.insertlast('tableTags',0))

        // document.getElementById('insertfirst').addEventListener('click',()=>this.insertBefore('containerTags',0))

        // document.getElementById('insertchoice').addEventListener('click',()=>this.insertChoice(3,'containerTags',0))

        

    }


}

let launcher=new Editor(editor)
launcher.addEventListen()










import { Table,List,NodeCreation} from "./myobject.js"

