class CountDownClock {
	aSecond = 1000;
	timeStamp;
	constructor(minutes, selector) {
		this.time = minutes * 60 * this.aSecond;
		this.shower = document.querySelector(selector);
	}

	show() {
		let time = new Date(this.time);
		this.shower.textContent = `Thời gian còn lại: ${time.getMinutes()} : ${time.getSeconds()}`;
	}

	init(step = 1) {
		step *= this.aSecond;
		let countDown = () => {
			this.time -= step;
			if (this.time <= 0) {
				this.show();
				document.querySelector(".submit").click();
			} else {
				this.show();
				this.timeStamp = setTimeout(countDown, step);
			}
		};
		this.timeStamp = setTimeout(countDown, step);
	}

	stop() {
		clearTimeout(this.timeStamp);
	}
}

export { CountDownClock };
