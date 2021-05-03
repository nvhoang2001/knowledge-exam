import { KnowledgleTest } from "./question.js";
import { CountDownClock as Clock } from "./count-down-clock.js";

class Marking {
	static submitted = false;
	constructor() {
		this.exam = new KnowledgleTest();
		this.questions = this.exam.questions;
		this.usrAnswer = this.exam.userAnswers;
		this.exam.init();
	}

	mark(element, clock) {
		if (Marking.submitted) {
			return;
		}

		// stop count-down clock
		clock.stop();

		Marking.submitted = true;
		let numTrue = [];
		for (const ans in this.usrAnswer) {
			let indx = Number(ans);
			if (this.usrAnswer[ans] === this.questions[indx - 1].answer) {
				numTrue.push(indx - 1);
			}
		}

		let btnQues = document.querySelectorAll(".questions__num");
		btnQues.forEach((btn, index) => {
			btn.className = "questions__num";

			if (numTrue.includes(index)) {
				btn.classList.add("questions__question--true");
			} else {
				btn.classList.add("questions__question--false");
			}
		});

		let score = Math.trunc((numTrue.length * 100) / btnQues.length);

		const showMarkModal = document.querySelector(".mark-shower");
		showMarkModal.style.display = "flex";
		showMarkModal.innerHTML = `<div><h2>Kết quả</h2><p>Điểm: ${score} / 100</p><p>Đúng: ${numTrue.length}/ ${btnQues.length} câu</p><button class="mark__close">Đóng</button></div>`;

		let content = showMarkModal.querySelector("div");

		showMarkModal.onclick = (event) => {
			// If button was clicked
			if (event.target.classList.contains("mark__close")) {
				showMarkModal.style.display = "none";
				return;
			}

			// If grey area was clicked
			if (!content.contains(event.target)) {
				showMarkModal.style.display = "none";
				return;
			}
		};

		let quesList = document.querySelector(".questions__list");
		let quesArea = document.querySelector(".questions__question");
		quesList.addEventListener("click", (event) => {
			let quesBtn = event.target.closest("button");
			if (quesList.contains(quesBtn)) {
				let id = quesBtn.textContent;
				try {
					this.questions[Number(id) - 1].renderNote();
				} catch (errMess) {
					console.log(errMess);
					KnowledgleTest.noQuestionHandler();
					// hide question area
					quesArea.style.display = "none";
				}
			}
		});

		element.style.display = "none";
	}

	init(time) {
		let clock = new Clock(time, ".count-down-timer");
		clock.init();
		const submitBtn = document.querySelector(".submit");
		submitBtn.onclick = this.mark.bind(this, submitBtn, clock);
		const header = document.querySelector(".header");
		header.ondblclick = Marking.resetSubmit.bind(null, submitBtn);
	}

	static resetSubmit(element) {
		Marking.submitted = false;
		element.style.display = "";
	}
}

export { Marking, KnowledgleTest };
