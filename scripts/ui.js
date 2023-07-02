const toDoForm = document.querySelector('#todo-form');
const toDoInput = document.querySelector('#todo-input');
const tasksLeft = document.querySelector('#tasks-left');
const toDoListHTMLElement = document.querySelector('#todo-list');


const toDoList = new ToDoList();
const createNewTask = (text) => {
	const task = new Task(text);
	toDoList.addTask(text);
	createTaskElement(task);
}

const createTaskElement = (task) => {
	const li = document.createElement('li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	const span = document.createElement('span');
	const removeBtn = document.createElement('button');
	const taskText = document.createTextNode(task.text);

	li.appendChild(label);
	label.appendChild(checkbox);
	label.classList.add('form-control');
	checkbox.type = 'checkbox';
	checkbox.name = 'checkbox'
	checkbox.checked = task.completed;
	checkbox.addEventListener('change', () => {

	})
	label.appendChild(span);
	span.appendChild(taskText);
	removeBtn.innerHTML = '<img src="../images/icon-cross.svg" alt="cross" />';
	removeBtn.dataset.id = task.id;
	removeBtn.addEventListener("click", removeTask);
	li.appendChild(removeBtn);
	li.dataset.completed = task.completed;
	li.addEventListener("click", toggleCompleted);
	toDoListHTMLElement.appendChild(li);
	toDoListHTMLElement.appendChild(document.createElement("hr"));
	updateTasksLeft();
}

const removeTask = (event) => {
	const id = event.target.dataset.id;
	toDoList.removeTask(id);
	createTasksList();
}

const uncompletedTasks = () => {
	const tasks = toDoList.loadFromLocalStorage();
	let counter = 0;
	tasks.forEach((task) => {
		if (!task.completed) {
			counter++;
		}
	})
	return counter;
}
const clearAllTasks = () => {
	const tasks = toDoList.loadFromLocalStorage();
	tasks.forEach((task) => {
		toDoList.removeTask(task.id);
	})
	createTasksList();
}

function updateTasksLeft() {
	tasksLeft.innerText = uncompletedTasks();
}
const createTasksList = () => {
	toDoListHTMLElement.innerHTML = "";
	const tasks = toDoList.loadFromLocalStorage();
	tasks.forEach((task) => {
		createTaskElement(task);
	});
	updateTasksLeft();
}

function toggleCompleted(event) {
	const task = event.target;
	console.log(task);
	//task.toggleCompleted();
}

toDoForm.addEventListener('submit', (e) => {
	e.preventDefault();
	createNewTask(toDoInput.value);
	console.log("dodawanie: " + toDoInput.value);
	toDoInput.value = '';
})



createTasksList();