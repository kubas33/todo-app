const toDoForm = document.querySelector('#todo-form');
const toDoInput = document.querySelector('#todo-input');
const tasksLeft = document.querySelector('#tasks-left');
const toDoListHTMLElement = document.querySelector('#todo-list');
const filters = document.querySelectorAll("[type='radio']");
const clearCompletedBtn = document.querySelector("#clear-completed")
const tasksList = new ToDoList();

clearCompletedBtn.addEventListener("click", () => {
	tasksList.removeCompleted();
	createTasksList();

});


const createNewTask = (text) => {
	const task = tasksList.addTask(text);
	console.log(task);
	createTaskElement(task);
}


const createTaskElement = (task) => {
	const li = document.createElement('li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	const span = document.createElement('span');
	const removeBtn = document.createElement('button');
	const taskText = document.createTextNode(task.text);
	console.log(task);
	
	label.classList.add('form-control');
	label.dataset.id = task.id;

	checkbox.type = 'checkbox';
	checkbox.name = 'checkbox'
	checkbox.checked = task.completed;
	checkbox.addEventListener('change', toggleCompleted);

	removeBtn.innerHTML = '<img src="../images/icon-cross.svg" alt="cross" />';
	removeBtn.type = 'button';
	removeBtn.dataset.id = task.id;
	removeBtn.addEventListener("click", removeTask);
	removeBtn.classList.add('remove-btn');
	li.dataset.completed = task.completed;
	checkIfCompleted(li);
	//li.addEventListener("click", toggleCompleted);

	li.appendChild(label);
	li.appendChild(removeBtn);
	label.appendChild(checkbox);
	label.appendChild(taskText);
	label.appendChild(span);
	span.appendChild(taskText);
	toDoListHTMLElement.appendChild(li);
	toDoListHTMLElement.appendChild(document.createElement("hr"));
	updateTasksLeft();
}

const removeTask = (event) => {
	const id = event.target.parentElement.dataset.id;
	console.log(id);
	tasksList.removeTask(id);
	createTasksList();
}

const uncompletedTasks = () => {
	const data = tasksList.loadFromLocalStorage();
	let counter = 0;
	data.tasks.forEach((task) => {
		if (!task.completed) {
			counter++;
		}
	})
	return counter;
}
const clearAllTasks = () => {
	const tasks = tasksList.loadFromLocalStorage();
	tasks.forEach((task) => {
		tasksList.removeTask(task.id);
	})
	createTasksList();
}

function updateTasksLeft() {
	tasksLeft.innerText = uncompletedTasks();
}
const createTasksList = () => {
	toDoListHTMLElement.innerHTML = "";
	const data = tasksList.loadFromLocalStorage();
	data.tasks.forEach((task) => {
		createTaskElement(task);
	});
	updateTasksLeft();
}

function toggleCompleted(event) {
	const parent = event.target.parentElement;
	const grandParent = parent.parentElement;
	const id = parent.dataset.id;
	event.stopPropagation();
	grandParent.classList.toggle('completed');
	// console.log('target: ', event.target);
	// console.log('parentElement: ', event.target.parentElement);
	// console.log(tasksList);
	tasksList.toggleCompleted(id);
	createTasksList();
}

const checkIfCompleted = (task) => {
	if (task.dataset.completed === "true") { // !!!  data-completed === 'true' !== data-completed === true !!!
 		task.classList.add('completed');
	} 
	 else {
		task.classList.remove('completed');
	}
};

toDoForm.addEventListener('submit', (e) => {
	e.preventDefault();
	createNewTask(toDoInput.value);
	console.log("dodawanie: " + toDoInput.value);
	toDoInput.value = '';
})

const hideCompleted = task => {
	if (task.dataset.completed === "true") { // !!!  data-completed === 'true' !== data-completed === true !!!
		task.classList.add('hidden');
 } 
	else {
	 task.classList.remove('hidden');
 }
}


const hideActive = task => {
	if (task.dataset.completed === "false") { // !!!  data-completed === 'true' !== data-completed === true !!!
		task.classList.add('hidden');
 } 
	else {
	 task.classList.remove('hidden');
 }
}

const showAll = task => {
	task.classList.remove('hidden');
}

const checkFilters = (event) => {
	
	let activeFilter;
	
	filters.forEach(filter => {
		if (filter.checked) {
			activeFilter = filter.id;
		}
	})

	const tasksElements = toDoListHTMLElement.querySelectorAll('li');
	console.log(tasksElements);

	switch (activeFilter) {
		case 'all':
			tasksElements.forEach(task => showAll(task));
			break;
		case 'active':
			tasksElements.forEach(task => hideCompleted(task));
			break;
		case 'completed':
			tasksElements.forEach(task => hideActive(task));
			break;
	}

}

filters.forEach(filter => 
	filter.addEventListener('change', checkFilters));

createTasksList();
checkFilters();