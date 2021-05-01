import { KnowledgleTest } from "./question.js";
import { CountDownClock as Clock } from "./count-down-clock.js";

class Marking {
	constructor() {
		this.test = new KnowledgleTest();
		this.questions = this.test.questions;
		this.usrAnswer = this.test.userAnswers;
		this.test.init();
	}

	mark() {
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
	}

	init() {
		const submitBtn = document.querySelector(".submit");
		submitBtn.onclick = this.mark.bind(this);
		let clock = new Clock(15, ".count-down-timer");
		clock.init();
	}
}

export { Marking };
