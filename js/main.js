let inputEL = document.getElementById('addTaskFI')
let tasksSectionEL = document.getElementById('tasksSection')
inputEL.value = "";
let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

updateDom(tasks);

function addTaskFbtn() {
    if (inputEL.value === "") {
        return alert("Task was not found, Please add task.");
    }

    let task = {
        action: inputEL.value,
        status: false
    };
    tasks.push(task);
    updateDom(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputEL.value = "";

}

function updateDom(data) {
    tasksSectionEL.innerHTML = "";
    data.forEach((t, i) => {
        let domElement = document.createElement('div');
        domElement.classList.add('col-11', 'mt-3');
        domElement.innerHTML = `
        <div class="card">
            <div class = "d-flex p-3" >
                <div class = "mr-auto ${t.status?'line':''}"> ${t.action} </div> 
                <div class = " pr-3">
                    <button type="button" class="btn btn-success updateStatus" onclick="updateStatus(this)" data-status="${t.status}" data-index='${i}'>
                    <i class = "fa fa-check" ></i>
                    </button>
                </div>
                <div>
                    <button type="button" class="btn btn-danger deleteTask" onclick="deleteTask(${i})" data-status="${t.status}" data-index='${i}'>
                    <i class = "fa fa-trash" ></i>
                    </button>
                </div>
            </div>
        </div>
        `;
        tasksSectionEL.appendChild(domElement);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateDom(tasks);
}

function updateStatus(e) {
    let index = e.dataset.index;
    let status = e.dataset.status;

    if (status === 'true') {
        e.dataset.status = 'false';
        tasks[index].status = false;

    } else {
        e.dataset.status = 'true';
        tasks[index].status = true;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateDom(tasks);
}