var rev_btn = document.querySelector("#btn_rev");
var all_btn = document.querySelector("#btn_all");
var yes_btn = document.querySelector("#btn_yes");
var no_btn = document.querySelector("#btn_no");
var sth_input = document.querySelector("#input_sth"); 
var sth_ul = document.querySelector("#ul_sth");
var items_li = sth_ul.children;
var all_items = [];
var yes_items = [];
var no_items = [];


//点击“保存”按钮保存输入框里已输入的内容
function revInput(){
    if(sth_input.value == ""){
        alert("请先在输入框里输入内容哟！");
    }else {
        addItem();
        sth_input.value = "";
    }
}


//增加待办事项
function addItem(){
    //将输入内容装入“全部”数组
    all_items.push(sth_input.value);
    //将输入内容写入li标签并在页面显示
    var item = `<li>${sth_input.value} &nbsp;&nbsp; <span>X<span></li>`;
    sth_ul.innerHTML+=item;
    //遍历待办事项绑定点击事件
    for(let i = 0;i < items_li.length;i++){
        //单击待办事项，将待办事项状态由未完成变为已完成
        items_li[i].addEventListener("click",(alterItem)); 
    }
    
}


//删除待办事项
function subItem(){
    sth_ul.innerHTML = "";
    var show_all=null;
    var temp = all_items[0];
    for(let i=0; i<all_items.length; i++){    
        all_items[i]=all_items[i+1];
        if(all_items[i] != ""){
            show_all =`<li>${all_items[i]} &nbsp;&nbsp; <span>X<span><li>`;
            sth_ul.innerHTML+=show_all;  
        }  
     } 
     all_items[all_items.length] = temp;
}
     

//改变待办事项状态
function alterItem(){ 
    //给每个li标签加上“li_item”类样式
      this.classList.add('li_item'); 
      const arr =document.getElementsByClassName("li_item");
      for(let i=0; i<arr.length; i++){
            yes_items.push(arr[i].textContent);
        } 
      for(let i=0; i<yes_items.length; i++){
            for(let j=0; j<all_items.length; j++){
                if(all_items[j] != yes_items[i]){
                  no_items.push(all_items[j]);
                }       
            } 
        }
      var items_span = document.querySelectorAll("span");
      for(let i=0; i<items_span.length; i++){
        items_span[i].addEventListener("click",()=>{
            subItem();
        });
    }

}

//显示全部的待办事项
function showAll(){
    sth_ul.innerHTML = "";
    var show_all=null;
    for(let i=0; i<all_items.length; i++){
        show_all =`<li>${all_items[i]} &nbsp;&nbsp; <span>X<span><li>`;
        sth_ul.innerHTML+=show_all;    
     } 
}

//显示所有已完成的待办事项
function showYes(){
    sth_ul.innerHTML = "";
    var show_yes=null;
    for(let i=0; i<yes_items.length; i++){
       show_yes =`<li>${yes_items[i]} &nbsp;&nbsp; <span>X<span><li>`;
       sth_ul.innerHTML+=show_yes;    
    } 
   
}


//显示所有未完成的待办事项
function showNo(){
    sth_ul.innerHTML = "";
    var show_no=null;
    for(let i=0; i<no_items.length; i++){
       show_no =`<li>${no_items[i]} &nbsp;&nbsp; <span>X<span><li>`;
       sth_ul.innerHTML+=show_no;    
    } 
}






rev_btn.addEventListener("click",revInput);
all_btn.addEventListener("click",showAll);
yes_btn.addEventListener("click",showYes);
no_btn.addEventListener("click",showNo);

