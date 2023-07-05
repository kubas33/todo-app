class ToDoList {
	
	constructor() {
		const data = this.loadFromLocalStorage();
		this.tasks = data.tasks;
		this.tasksCounter = data.counter;
	};

	addTask(text) {
		const task = new Task(text, this.tasksCounter);
		this.tasks.push(task)
		this.tasksCounter++;
		this.saveToLocalStorage();
		return task;
	};

	toggleCompleted(id) {
		const index = this.findIndexOfTask(id);
		console.log("entering toggleCompleted with " + id);
		if (index !== -1) {
			this.tasks[index].completed = !this.tasks[index].completed;
			this.saveToLocalStorage();
		} else {
			console.log("Brak zadania o takim id");
		}
	}

	findIndexOfTask(id) {
		return this.tasks.findIndex(task => task.id === parseInt(id));
	}

	removeTask(id) {
		const index = this.findIndexOfTask(id);
		if (index !== -1) {
			this.tasks.splice(index, 1);
			this.saveToLocalStorage();
		} else {
			console.log("Brak zadania o takim id");
		}
	}


	saveToLocalStorage() {
		localStorage.setItem('tasks', JSON.stringify(this.tasks));
		localStorage.setItem('tasksCounter', JSON.stringify(this.tasksCounter));
	}

	loadFromLocalStorage() {
		const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
		const tasksCounterStorage = parseInt(localStorage.getItem('tasksCounter'));
		return {'tasks': tasksStorage || [], 'counter': tasksCounterStorage || 1};
	}

}
