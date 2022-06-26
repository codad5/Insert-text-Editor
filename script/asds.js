// var heading=['p','h1','h2','h3','h4','h5','h6'].map((i)=>document.createElement(i))

// var texttags=['b','u','i','br','hr','strong','em','pre','acronym','samp','var','cite','address','blockquote','bdo','ins','del','dfn','kdb','footer','header','frameset','frame','html'].map((i,z)=>document.createElement )
// var linkTag=['a','base'].map((i)=>document.createElement(i))
// var ImagObjTag=['img','area','map','param','object','video'].map((i)=>document.createElement(i))
// var listtag=['ul','ol','li','dl','dt','dd'].map((i)=>document.createElement(i))
// var TableTag=['table','tr','td','th','tbody','thead','tfoot','col','colgroup','caption'].map((i)=>document.createElement(i))
// var formTag=['form','input','textarea','select','option','optgroup','button','label','fieldset','legend'].map((i)=>document.createElement(i))
// var scripTag=['script','noscript'].map((i)=>document.createElement(i))


// const features={
//     headingTag:heading,
//     textTags:texttags,
//     linkTags:linkTag,
//     ImageAndVideoTags:ImagObjTag,
//     listTags:listtag,
//     tableTags:TableTag,
//     formTags:formTag,
//     scriptTags:scripTag
// }
// function featuresHandler(name='',number=Number){
//     console.log(features['textTags'][number]);

// }
// // features[headingTag][21]
// console.log(texttags)
// var editor=document.getElementById('editor');
// var root=TreeNode

// class TreeNode{

//     constructor(data){
//     this.data=data
//     this.children=[]
    
//     this.parent=null
    
//     }
    
//     add_child(child){
//         child.parent=this
//         this.children.push(child)
//     }
    
//     print_tree(){
//         console.log(this.data)
//     if(this.children){
//         for(var i=0;i<this.children.length;i++){
//             this.children[i].print_tree()
//         }
//     }
//     }
// }












// class Editor{
//     constructor(editor){
//         this.editor=editor
//     }

//     add_nodes(name='',number=Number){
//         this.editor.appendChild(featuresHandler(name,number))
//     }

//     delete_nodes(){
//         this.editor.remove()
//     }


//     replace_child(replacement,child){
//         this.editor.replaceChild(replacement,para)
//     }

// }


// class TreeNode{

//     constructor(key,value=key,parent=null){
//             this.key=key;
//             this.value=value;
//             this.parent=parent;
//             this.children=[];
//     }


//     get isLeaf(){
//         return this.children.length===0;
//     }

//     get hasChildren(){
//         return !this.isLeaf;
//     }
// }


// class Tree{
//     constructor(key,value=key){
//         this.root=new TreeNode(key,value);
//     }

//     *preOrderTraversal(node=this.root){
//         yield node;
//         if(node.children.length){
//             for(let child of node.children){
//                 yield * this.preOrderTraversal(child);
//             }
//         }
//     }

//     *postOrderTraversal(node=this.root){
//         if(node.children.length){
//             for(let child of node.children){
//                 yield * this.postOrderTraversal(child);
//             }
//         }
//         yield node;
//     }

//     insert(parentNodeKey,key,value=key){
//         for(let node of this.preOrderTraversal()){
//             if(node.key===parentNodeKey){
//                 node.children.push(new TreeNode(key,value,node));
//                 return true;
//             }
//         }
//         return false;
//     }
//     remove(key){
//         for(let node of this.preOrderTraversal()){
//             const filtered=node.children.filter(c=>c.key !==key);
//             if(filtered.length!==node.children.length){
//                 node.children=filtered;
//                 return true;
//     }

// }

// return false;
//     }

//     find(key){
//         for(let node of this.preOrderTraversal()){
//             if(node.key===key) return node;

//         }
//         return undefined;
//     }
// }


// const tree=new Tree(1,'ultimate')   ;
// tree.insert(1,11,'ab') 
// console.log(tree)




// class TreeNode{

//     constructor(data){
//     this.data=data
//     this.children=[]
//     this.parent=null
    
//     }
    
//     add_child(child){
//         child.parent=this
//         this.children.push(child)
//     }
    
//     print_tree(){
//         console.log(this.data)
//     if(this.children){
//         for(var i=0;i<this.children.length;i++){
//             this.children[i].print_tree()
//         }
//     }
//     }
// }
// const root=new TreeNode(editor)
// const nw=new TreeNode(featuresHandler('headingTag',1))
// a=root.add_child(nw)
// console.log(root.print_tree())
var a='b'
var ba=document.getElementById('editor')
function bla(){
   
  ba.innerHTML='jerry'
    
}
document.getElementById('bold').addEventListener('click',bla)








// function createTable(){
//   let id=new Date().valueOf()
//   var editor=document.getElementById('editor')
//   let mytable=document.createElement('table')
//   mytable.setAttribute('id',id)
//   editor.append(mytable)
//   tr(5,id)
 
// }
// function tr(no,id){
//   let myarrayid=[]
//   for(let i=0;i<no;i++){
//       let myid=new Date().valueOf()
//       var mytr=document.createElement('tr')
//       mytr.setAttribute('id',myid)
//       document.getElementById(id).append(mytr)
//       myarrayid.push(myid)
      
//   }
//   td(2,no,myarrayid)
// }
// function td(no_of_td,no_of_tr,id){
//  for(let y=0;y<no_of_tr;y++){

 
//           for(let i=0;i<no_of_td;i++){
//               let myid=new Date().valueOf()
//               var mytd=document.createElement('td')
//               mytd.setAttribute('id',myid)
//              document.getElementById(id[y]).append(mytd)
//           }

// }
// }

// // createTable()



// function createListTag(){
//   let id=new Date().valueOf()

//   let b=document.createElement('ul')
//   b.setAttribute('id',id)
//   editor.appendChild(b)
//   li(id,3)






// }
// function li(id,no){
// var grab_the_node=document.getElementById(id)
// for(let i=0;i<no;i++){
// var created_element=document.createElement('li')
// grab_the_node.appendChild(created_element)
// }


// }
// createListTag()
// createListTag()