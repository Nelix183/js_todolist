const trash_ico = "<svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z'/></svg>";
const task_input =  document.querySelector("#task_input");
const task_add = document.querySelector("#task_add");
const task_now = document.querySelector("#task_now");
const task_done = document.querySelector("#task_done");
const task_sometime = document.querySelector("#task_sometime");
if (localStorage.getItem('tasks_now') !== null) {
    var tasks_now = JSON.parse(localStorage.tasks_now);
} else {
    var tasks_now = [];
}
if (localStorage.getItem('tasks_done') !== null) {
    var tasks_done = JSON.parse(localStorage.tasks_done);
} else {
    var tasks_done = [];
}
if (localStorage.getItem('tasks_sometime') !== null) {
    var tasks_sometime = JSON.parse(localStorage.tasks_sometime);
} else {
    var tasks_sometime = [];
}

task_add_function = () => {
    let new_task_value = task_input.value;
    if(new_task_value != ""){
        tasks_now.push(new_task_value);
        task_display_function();
    }
}
task_done_function = (name_to_done, from) => {
    if(from == 'now'){
        let name_to_done_id = tasks_now.indexOf(name_to_done, 0);
        tasks_now.splice(name_to_done_id, 1);
        tasks_done.push(name_to_done);
        task_display_function();
    }else if(from == 'sometime'){
        let name_to_done_id = tasks_sometime.indexOf(name_to_done, 0);
        tasks_sometime.splice(name_to_done_id, 1);
        tasks_done.push(name_to_done);
        task_display_function();
    }else if(from == 'done'){
        let name_to_done_id = tasks_done.indexOf(name_to_done, 0);
        tasks_done.splice(name_to_done_id, 1);
        task_display_function();
    }
}
task_move_function = (name_to_move, from) => {
    if(from == 'now'){
        let name_to_move_id = tasks_now.indexOf(name_to_move, 0);
        tasks_now.splice(name_to_move_id, 1);
        tasks_sometime.push(name_to_move);
        task_display_function();
    }else if(from == 'sometime'){
        let name_to_move_id = tasks_sometime.indexOf(name_to_move, 0);
        tasks_sometime.splice(name_to_move_id, 1);
        tasks_now.push(name_to_move);
        task_display_function();
    }else if(from == 'done'){
        let name_to_move_id = tasks_done.indexOf(name_to_move, 0);
        tasks_done.splice(name_to_move_id, 1);
        tasks_now.push(name_to_move);
        task_display_function();
    }
}
task_display_function = () => {
    task_now.innerHTML = "";
    task_done.innerHTML = "";
    task_sometime.innerHTML = "";
    task_input.value = "";
    tasks_now.forEach(element => {
        let div = document.createElement('div');
        let txt = document.createElement('p');
        let trash = document.createElement('button');
        div.appendChild(txt);
        div.appendChild(trash);
        div.classList.add('task');
        txt.innerHTML = element;
        trash.innerHTML = trash_ico;
        task_now.appendChild(div);
        trash.addEventListener('click', () =>{
            task_done_function(element, 'now');
        });
        txt.addEventListener('click', () =>{
            task_move_function(element, 'now');
        });
    });
    tasks_done.forEach(element => {
        let div = document.createElement('div');
        let txt = document.createElement('p');
        let trash = document.createElement('button');
        div.appendChild(txt);
        div.appendChild(trash);
        div.classList.add('task');
        txt.innerHTML = element;
        trash.innerHTML = trash_ico;
        task_done.appendChild(div);
        trash.addEventListener('click', () =>{
            task_done_function(element, 'done');
        });
        txt.addEventListener('click', () =>{
            task_move_function(element , 'done');
        });
    });
    tasks_sometime.forEach(element => {
        let div = document.createElement('div');
        let txt = document.createElement('p');
        let trash = document.createElement('button');
        div.appendChild(txt);
        div.appendChild(trash);
        div.classList.add('task');
        txt.innerHTML = element;
        trash.innerHTML = trash_ico;
        task_sometime.appendChild(div);
        trash.addEventListener('click', () =>{
            task_done_function(element, 'sometime');
        });
        txt.addEventListener('click', () =>{
            task_move_function(element, 'sometime');
        });
    });
    localStorage.tasks_now = JSON.stringify(tasks_now);
    localStorage.tasks_done = JSON.stringify(tasks_done);
    localStorage.tasks_sometime = JSON.stringify(tasks_sometime);
}
task_add.addEventListener('click', task_add_function);
window.addEventListener('load', () => {
    task_display_function();
})
