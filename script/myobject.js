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


class List{
    constructor(no_of_li){
        this.no_of_li=no_of_li
    }

        createListTag(){
            let id=new Date().valueOf()
          
            let b=document.createElement('ul')
            b.setAttribute('id',id)
            editor.appendChild(b)
            li(id,this.no_of_li)
    }


    li(id,no){
        var grab_the_node=document.getElementById(id)
        for(let i=0;i<no;i++){
            var created_element=document.createElement('li')
            grab_the_node.appendChild(created_element)
        }
        
        
        }



}



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





