class Question {
	constructor(id, question, answer, ...answers) {
		this.#id = id;
		this.#question = question;
		this.#answer = answer;
		this.#answers = new Array(...answers);
	}
}

class UserAnswer {
	constructor(quesID, usrAns) {
		this.#questionID = quesID;
		this.#usrAnswer = usrAns;
	}

	getUserAnswer() {
		let questionArea = document.querySelector(".questions__question");
	}
}

class KnowledgleTest {
	questions = [];
	userAnswers = [];
	constructor() {
		this.questions.push(
			new Question(
				0,
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam necessitatibus sint aut harum dignissimos temporibus quos reprehenderit iure numquam? Assumenda saepe sit beatae asperiores dolorum itaque nemo dolor aperiam cumque.",
				"A",
				"A",
				"B",
				"C",
				"D"
			)
		);
	}
}
