class Question {
	constructor(question = "", answer = "A", ...answers) {
		// Get current question's number

		this.question = question;
		this.answer = answer;
		this.answers = new Array(...answers);
	}

	render() {
		this.id = document.querySelector(
			".questions__num--selecting"
		).textContent;

		let template = document.getElementById("empty-question");
		let ques = document.importNode(template.content, true);

		ques.querySelector("legend").textContent = `Câu hỏi ${this.id}`;
		ques.querySelector("p").textContent = this.question;
		let quesList = ques.querySelector("ol");
		for (let ans = 0; ans < this.answers.length; ans++) {
			let templateAnswer = document.getElementById("empty-answer");
			let item = document.importNode(templateAnswer.content, true);
			let input = item.querySelector("input");
			input.id += ans + 1;
			input.value = String.fromCodePoint("A".codePointAt(0) + ans);

			let label = item.querySelector("label");
			label.textContent = this.answers[ans];

			let i = document.createElement("li");
			i.appendChild(input);
			i.appendChild(label);
			quesList.append(i);
		}

		return ques;
	}
}

class KnowledgleTest {
	questions = [];
	userAnswers = {};
	questionID;
	constructor() {
		this.questions.push(
			new Question(
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam necessitatibus sint aut harum dignissimos temporibus quos reprehenderit iure numquam? Assumenda saepe sit beatae asperiores dolorum itaque nemo dolor aperiam cumque.",
				"A",
				"asjnafnasfafa",
				"asfdkamfaslfma",
				"asfmafmafad",
				"ajsamfsafmaalsas"
			)
		);
	}

	noQuestionHandler() {
		let noti = document.querySelector(".no-have-noti");
		noti.style.display = "";

		let content = noti.querySelector(".no-have-noti__content");

		noti.onclick = (event) => {
			// If button was clicked
			if (event.target.classList.contains("no-have-noti__close")) {
				noti.style.display = "none";
				return;
			}

			// If grey modal was clicked
			if (!content.contains(event.target)) {
				noti.style.display = "none";
				return;
			}
		};
	}

	init() {
		let quesList = document.querySelector(".questions__list");
		let selectedQuestion, selectQuestion;

		let quesArea = document.querySelector(".questions__question");

		// Later handling
		/* quesArea.innerHTML = "";
		quesArea.style.position = "fixed"; */

		quesList.addEventListener("click", (event) => {
			if (quesList.contains(event.target.closest("button"))) {
				selectedQuestion = selectQuestion;
				selectQuestion = event.target;

				if (selectedQuestion) {
					selectedQuestion.classList.remove(
						"questions__num--selecting"
					);
					selectedQuestion.classList.add("questions__num--done");
				}

				if (selectQuestion.classList.contains("questions__num--done")) {
					selectQuestion.classList.remove("questions__num--done");
				}
				selectQuestion.classList.add("questions__num--selecting");

				this.questionID = selectQuestion.textContent;

				// console.log(this.questions[Number(this.questionID) - 1]);

				// Later handling
				// quesArea.style.position = "static";
				quesArea.innerHTML = "";

				try {
					quesArea.appendChild(
						this.questions[Number(this.questionID) - 1].render()
					);
				} catch (errMess) {
					this.noQuestionHandler();
					console.log(errMess);
				}
			}
		});

		quesArea.addEventListener("click", (event) => {
			if (!selectQuestion) return;
			if (event.target.tagName.toLowerCase() !== "input") return;
			console.log(event.target);
			this.questionID = selectQuestion.textContent;
			this.userAnswers[this.questionID] = event.target.value;
		});
	}
}

const page = new KnowledgleTest();
page.init();
