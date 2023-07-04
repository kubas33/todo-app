class Task {
/* 	static counter = Task.loadCounter();

	static storeCounter() {
		localStorage.setItem("counter", Task.counter);
	}

	static loadCounter() {
		return JSON.parse(localStorage.getItem('counter')) || 0;
	} */

	constructor(text, id) {
		this.id = id;
		this.text = text;
		this.completed = false;
	}

}
//Task.loadCounter();
