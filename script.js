const input= document.getElementById("todo-input");
const addBtn= document.getElementById("add-btn");
const list= document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

//初期表示
render();

//追加ボタン
addBtn.addEventListener("click", ()=>{
    const text= input.value.trim();
    if(text === "") return;

    const newTodo={
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    save();
    render();

    input.value="";
    
});

//表示する関数
 function render(){
    list.innerHTML="";

    todos.forEach(todo => {
        const li= document.createElement("li");

        const span= document.createElement("span");
        span.textContent= todo.text;

        if(todo.completed){
            span.classList.add("completed");
        }

        //チェック機能
        span.addEventListener("click", ()=>{
            todo.completed= !todo.completed;
            save();
            render();
        });
        
        //削除機能
        const deleteBtn= document.createElement("button");
        deleteBtn.textContent="🚮"

        deleteBtn.addEventListener("click", ()=>{
            todos= todos.filter(t => t.id !==todo.id);
            save();
            render();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
}

//保存
function save(){
    localStorage.setItem("todos", JSON.stringify(todos));

}



