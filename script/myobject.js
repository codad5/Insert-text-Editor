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

