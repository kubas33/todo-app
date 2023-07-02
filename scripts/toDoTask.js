class Task {
	static counter = 0;
	constructor(text) {
		this.id = ++Task.counter;
		this.text = text;
		this.completed = false;
	}

	toggleCompleted() {
		this.completed = !this.completed;
	}

}