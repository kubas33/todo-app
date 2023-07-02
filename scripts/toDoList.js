class ToDoList {
	constructor() {
		this.tasks = this.loadFromLocalStorage();
	};

	addTask(text) {
		this.tasks.push(new Task(text));
		this.saveToLocalStorage();
	};

	completeTask(index) {
		this.tasks[index].completed = true;
		this.saveToLocalStorage();
	}

	removeTask(index) {
		this.tasks.splice(index, 1);
		this.saveToLocalStorage();
	}

	saveToLocalStorage() {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}
	loadFromLocalStorage() {
		const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
		return tasksStorage || [];
	}

}
