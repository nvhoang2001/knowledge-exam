class Question {
	constructor(question, answer, note, ...answers) {
		this.question = question;
		this.answer = answer;
		this.note = note;
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
			label.htmlFor = input.id;

			let i = document.createElement("li");
			i.appendChild(input);
			i.appendChild(label);
			quesList.append(i);
		}

		return ques;
	}

	renderNote() {
		let buffer = document.createElement("div");
		buffer.className = "buffer";
		let cmt = document.querySelector(".questions__note");
		cmt.innerHTML = `<h2>Lời giải</h2><p>${this.note}</p>`;
		cmt.style.display = "block";
	}
}

class KnowledgleTest {
	questions = [];
	userAnswers = {};
	questionID;
	constructor() {
		this.questions.push(
			new Question(
				"Tiến trình là gì?",
				"B",
				"Đáp án: B. Là chương trình máy tính đang chạy. \nTiến trình hiểu đơn giản là chương trình đang chạy trong máy tính.",
				"Là chương trình máy tính",
				"Là chương trình máy tính đang chạy",
				"Là chương trình máy tính đã được nạp vào bộ nhớ",
				"Là mã lệnh được thực thi của chương trình"
			),
			new Question(
				"Tiến trình sở hữu những thành phần nào?",
				"C",
				"Đáp án: C. Bộ các thanh ghi, con trỏ lệnh, biến chương trình và các tài nguyên hệ thống.\nNó sở hữu bộ các thanh ghi, con trỏ lệnh và các biến của chương trình. Để hoàn thành tác vụ của mình, một tiến trình có thể cần đến một số tài nguyên – như CPU, bộ nhớ, các tập tin và thiết bị nhập/xuất.",
				"Bộ các thanh ghi, con trỏ lệnh, biến chương trình",
				"Con trỏ lệnh và các tài nguyên hệ thống",
				"Bộ các thanh ghi, con trỏ lệnh, biến chương trình và các tài nguyên hệ thống",
				"Mã định danh tiến trình (PID) và vùng nhớ của nó"
			),
			new Question(
				"Tiến trình có những trạng thái nào?",
				"A",
				"Đáp án: A. New, Ready, Waiting, Running, Terminated \nTiến trình có các trạng thái sau:\n\t1) New: Tiến trình trong giai đoạn được tạo.\n\t2) Ready: Tiến trình chờ CPU thực thi lệnh.\n\t3) Waiting: Tiến trình chờ một sự kiện nào đó xảy ra (chẳng hạn như chờ nhập/ xuất dữ liệu).\n\t4) Running: Các lệnh của tiến trình đang được thực thi.\n\t5) Terminated: Kết thúc tiến trình.",
				"New, Ready, Waiting, Running, Terminated",
				"New, Running, Terminated",
				"Ready, Waiting, Running, Terminated",
				"New, Waiting, Terminated"
			),
			new Question(
				"Tiến trình gồm có mấy loại? Gồm những loại nào?",
				"A",
				"Đáp án A. 2 loại: tiến trình độc lập và tiến trình hợp tác",
				"2 loại: tiến trình độc lập và tiến trình hợp tác",
				"2 loại: tiến trình bế tắc và tiến trình không bế tắc",
				"3 loại: tiến trình mới tạo, tiến trình đang chạy và tiến trình đang chờ",
				"3 loại: tiến trình bình thường, tiến trình mồ côi, tiến trình thây ma"
			),
			new Question(
				"Có mấy điều kiện của bế tắc tài nguyên?",
				"A",
				"Đáp án: A. 4 điều kiện: điều kiện loại trừ lẫn nhau, điều kiện giữ và chờ, điều kiện không ưu tiên, điều kiện chờ vòng tròn\nCó bốn điều kiện phải có để xảy ra bế tắc tài nguyên:\n\t+ Điều kiện loại trừ lẫn nhau. Mỗi tài nguyên hoặc được cấp cho chỉ một tiến trình hoặc chưa được cấp. \n\t+ Điều kiện giữ và chờ. Các tiến trình hiện đang nắm giữ các tài nguyên đã được cấp từ trước có thể yêu cầu tài nguyên mới. \n\t+ Điều kiện không ưu tiên. Các tài nguyên đã được cấp từ trước không thể bị cưỡng chế thu hồi khỏi tiến trình. Chúng phải được giải phóng bởi chính tiến trình đang giữ chúng.\n\t+ Điều kiện đợi vòng tròn. Phải có một danh sách vòng tròn gồm hai tiến trình trở lên, mỗi tiến trình trong đó đều đang chờ tài nguyên bị tiến trình tiếp theo sở hữu. \nĐể xảy ra bế tắc tài nguyên, cả bốn điều kiện trên đều phải được thỏa mãn. Nếu một điều kiện trong số chúng không được thỏa mãn, sẽ không xảy ra bế tắc tài nguyên.",
				"4 điều kiện: điều kiện loại trừ lẫn nhau, điều kiện giữ và chờ, điều kiện không ưu tiên, điều kiện chờ vòng tròn.",
				"3 điều kiện: điều kiện giữ và chờ, điều kiện chờ vòng tròn và xuất hiện tài nguyên găng",
				"2 điều kiện: điều kiện chờ vòng tròn, điều kiện giữ và chờ.",
				"4 điều kiện: sở hữu tài nguyên găng, điều kiện hàng chờ vòng tròn, điều kiện cùng loại của tiến trình và điều kiện về trạng thái của các tiến trình"
			),
			new Question(
				"Tại sao cần phải lập lịch cho tiến trình?",
				"C",
				"Đáp án: C. Vì CPU là tài nguyên quan trọng của máy tính, nên cần tổ chức hàng đợi các tiến trình hợp lý",
				"Để gọn gàng hơn",
				"Để tối ưu bộ nhớ",
				"Vì CPU là tài nguyên quan trọng của máy tính, nên cần tổ chức hàng đợi các tiến trình hợp lý"
			),
			new Question(
				"Đâu là tiêu chuẩn lập lịch CPU?",
				"A",
				"Đáp án: A. Thời gian phản hồi càng nhỏ càng tốt\nTiêu chuẩn lập lịch:\n\tCPU utilization – sử dụng CPU (giữ cho CPU càng bận càng tốt).\n\tThroughput – số lượng công việc mà hệ thống hoàn thành trong một khoảng thời gian nhất định (hoàn thành được càng nhiều càng tốt).\n\tTurnaround time – là thời gian trung bình theo thống kê từ thời điểm gửi công việc hàng loạt cho đến khi hoàn thành. Nó đo lường thời gian trung bình người dùng phải chờ đợi cho đầu ra. (thời quay vòng càng nhỏ càng tốt).\n\tWaiting time – lượng thời gian mà một tiến trình chờ đợi ở trong ready queue (thời gian chờ cần càng nhỏ càng tốt)\n\tResponse time – là thời gian từ khi đọc lệnh cho đến khi nhận được kết quả (giảm thiểu thời gian phản hồi càng nhỏ càng tốt).",
				"Thời gian phản hồi càng nhỏ càng tốt",
				"Giữ CPU càng nhàn rỗi càng tốt",
				"Lượng công việc hoàn thành càng nhiều càng tốt",
				"Có càng nhiều tiến trình hoạt động song song càng tốt"
			),
			new Question(
				"User là gì?",
				"B",
				"Đáp án: B. Là một thực thể có thể chạy tiến trình và sở hữu tệp tin\nUser quan trọng nhất là user root, user root không bị giới hạn bởi các quy định của user thông thường, nó có thể ngừng hay can thiệp vào tiến trình của user khác, vì lý do này, mà nó còn được gọi là superuser.",
				"Là một thực thế bên trong máy tính",
				"Là một thực thể có thể chạy tiến trình và sở hữu tệp tin",
				"Là người sử dụng máy tính"
			),
			new Question(
				"Luồng gồm những thành phần nào?",
				"C",
				"Đáp án: C. Gồm phân vùng code, phân vùng data, bộ các thanh ghi và một bộ đếm chương trình.",
				"Một bộ đếm chương trình, một ngăn xếp, một bộ thanh ghi và một mã định danh.",
				"Một bộ đếm chương trình, một mã định dang và các tào nguyên của hệ điều hành.",
				"Gồm phân vùng code, phân vùng data, bộ các thanh ghi và một bộ đếm chương trình."
			),
			new Question(
				"Một bản phân phối Linux hoàn chỉnh gồm những phần nào?",
				"C",
				"Đáp án: C. Hạt nhân Linux + các công cụ quản trị + một số chương trình của bên thứ 3",
				"Hạt nhân Linux",
				"Hạt nhân Linux + các công cụ quản trị",
				"Hạt nhân Linux + các công cụ quản trị + một số chương trình của bên thứ 3",
				"Hạt nhân Linux + các công cụ quản trị + một số chương trình của bên thứ 3 + driver hệ thống"
			),
			new Question(
				"PID là gì?",
				"A",
				"Đáp án: A. Mã định danh tiến trình.\nPID là “số chứng minh thư/ căn cước” của tiến trình, mỗi một tiến trình đều được gán cho 1 mã định danh duy nhất, mã đó chính là PID.",
				"Mã định danh tiến trình",
				"Là giá trị trả về của hàm getpid()",
				"Là giá trị trả về của hàm fork()",
				"Là mã định danh của user"
			),
			new Question(
				"Tiến trình có mấy chế độ vận hành?",
				"B",
				"Đáp án: B. 2 chế độ\nĐể hệ điều hành hoạt động tốt, các nhà phát triển đã tạo ra hai chế độ vận hành: chế độ user và chế độ kernel.\n\t+ Chế độ user: hệ thống ở trong chế độ user khi hệ điều hành chạy ứng dụng của user như trình soạn thảo word, nhưng khi ứng dụng sử dụng lệnh gọi hệ thống, nó sẽ chuyển sang chế độ kernel để thực thi lệnh gọi hệ thống đó, rồi sau đó, sẽ quay trở lại chế độ user.\n\t+ Chế độ kernel: máy tính sẽ ở trong chế độ kernel khi nó được khởi động, nạp hệ điều hành và thực thi lệnh gọi hệ thống. Chế độ kernel có những đặc quyền mà chế độ user không có như xử lý ngắt, quản lý các thiết bị nhập xuất.... Tuy nhiên, những lỗi xảy ra ở chế độ kernel lại rất nghiêm trọng, có thể dẫn đến sập toàn hệ thống, vậy nên, chế độ kernel chỉ được sử dụng khi thực sự cần đến.",
				"1 chế độ",
				"2 chế độ",
				"3 chế độ",
				"4 chế độ"
			),

			new Question(
				"Quá trình chạy tiến trình trong Linux gồm mấy thao tác?",
				"C",
				`Đáp án: C. 2 thao tác: lệnh fork() + lệnh exec()
				Để tương thích với các hệ thống UNIX khác, Linux sử dụng mô hình tiến trình tương tự với những phiên bản UNIX khác. Nguyên lý chạy tiến trình cơ bản trong UNIX được chia ra làm 2 thao tác, nhưng chúng lại thường bị gộp lại làm một: tạo tiến trình mới - fork() và chạy chương trình mới exec().`,
				"1 thao tác: lệnh exec()",
				"1 thao tác: lệnh system()",
				"2 thao tác: lệnh fork() + lệnh exec()",
				"2 thao tác: lệnh fork() + lệnh system()"
			),
			new Question(
				"Phân cấp tiến trình là gì?",
				"A",
				`Đáp án: A. Tập hợp các tiến trình có chung một ‘tổ tiên’
			Khi một tiến trình tạo ra một tiến trình khác, tiến trình cha và tiến trình con sẽ được liên kết với nhau theo một cách nào đó. Tiến trình con có thể tạo ra các tiến trình khác, rồi cứ như vậy, chúng tạo nên một hệ thống phân cấp các tiến trình.`,
				"Tập hợp các tiến trình có chung một ‘tổ tiên’",
				"Tập hợp các tiến trình có chung PID",
				"Tập hợp các tiến trình có chung UID",
				"Tập hợp các tiến trình có chung ‘tiến trình cha’"
			),
			new Question(
				"Khi tiến trình cha tạo ra tiến trình con, tồn tại mấy khả năng thực thi?",
				"C",
				`Đáp án: C. 2 khả năng: tiến trình cha chạy song song hoặc đợi tiến trình con
				Khi tiến trình cha tạo ra một tiến trình con, tồn tại hai khả năng thực thi:
				1) Tiến trình cha tiếp tục thực thi song song với các tiến trình con.
				2) Tiến trình cha đợi cho đến khi một số hoặc tất cả các tiến trình con kết thúc.`,
				"1 khả năng: tiến trình cha chạy song song với tiến trình con",
				"1 khả năng: tiến trình cha đợi tiến trình con",
				"2 khả năng: tiến trình cha chạy song song hoặc đợi tiến trình con",
				"2 khả năng: tiến trình cha chạy song song hoặc giám sát tiến trình con"
			),
			new Question(
				"Không gian địa chỉ của tiến trình mới được tạo có mấy khả năng?",
				"B",
				`Đáp án: B. 2 khả năng: tiến trình con là bản sao của tiến trinh cha hoặc là một chương trình hoàn toàn mới.
				Không gian địa chỉ cho tiến trình mới sẽ có hai khả năng:
				1. Tiến trình con là một bản sao của tiến trình cha (nó có cùng chương trình và dữ liệu như tiến trình cha).
				2. Tiến trình con sẽ là một chương trình hoàn toàn mới.`,
				"2 khả năng: tiến trình con là bản sao của tiến trình cha hoặc là một dùng chung không gian nhớ với tiến trình cha.",
				"2 khả năng: tiến trình con là bản sao của tiến trinh cha hoặc là một chương trình hoàn toàn mới.",
				"3 khả năng: tiến trình con là bản sao của tiến trình cha, hoặc dùng chung không gian nhớ với tiến trình cha, hoặc là một chương trình hoàn toàn mới."
			),
			new Question(
				"Tiến trình thây ma là gì?",
				"B",
				`Đáp án: B. Là tiến trình mà tiến trình cha không gọi lệnh wait() cho nó.
			Khi một tiến trình cha bị kết thúc trước tiến trình con thì tiến trình con sẽ trở thành tiến trình mồ côi (orphan process), lúc này systemd sẽ nhận tiến trình mồ côi, thực hiện lệnh wait() để kết thúc tiến trình mồ côi.
			Khi tiến trình con đang cố gắng kết thúc nhưng vì lí do nào đó mà tiến trình cha chưa gọi lệnh wait() thì tiến trình con sẽ trở thành tiến trình thây ma (zombie process). Các tài nguyên mà nó chiếm giữ sẽ được giải phóng để cho các tiến trình khác sử dụng nhưng nó vẫn có mặt trong bảng tiến trình.
			`,
				"Là tiến trình mà tiến trình cha của nó kết thúc trước nó.",
				"Là tiến trình mà tiến trình cha không gọi lệnh wait() cho nó.",
				"Là tiến trình bị tiến trình cha của nó kết thúc.",
				"Là tiến trình sử dụng quá nhiều tài nguyên của tiến trình cha."
			),
			new Question(
				"Giao tiếp liên tiến trình được chia thành mấy loại?",
				"A",
				`Đáp án: A.  2 loại: giao tiếp bằng gửi tín hiệu và giao tiếp truyền dữ liệu
				Giao tiếp liên tiến trình có thể chia thành 2 loại: giao tiến bằng tín hiệu – không truyền dữ liệu, và giao tiếp có truyền dữ liệu.`,
				"2 loại: giao tiếp bằng gửi tín hiệu và giao tiếp truyền dữ liệu.",
				"2 loại: giao tiếp bằng vùng nhớ chung và giao tiếp bằng hàng đợi tin nhắn.",
				"3 loại: giao tiếp bằng gửi tín hiệu, bằng vùng nhớ chung và bằng hàng đợi tin nhắn.",
				"3 loại: giao tiếp bằng vùng nhớ chung, bằng đèn hiệu và bằng tệp tin."
			),
			new Question(
				"Kernel có thể truyền tín hiệu không?",
				"A",
				`Đáp án: A. Có.
			Không chỉ có một mình tiến trình là có thể truyền tín hiệu, mà kernel cũng có thể tạo ra tín hiệu. Ví dụ như khi tiến trình con kết thúc, kernel sẽ gửi tín hiệu cho tiến trình cha.`,
				"Có.",
				"Không."
			),
			new Question(
				"Với những tiến trình ở trong chế độ kernel, kernel giao tiếp với chúng bằng phương thức nào?",
				"D",
				`Đáp án: D. Bằng bộ lập lịch và wait_queue.
				Đối với những tiến trình đang ở trong chế độ kernel, kernel sẽ không giao tiếp với chúng bằng tín hiệu. Mà thay vào đó, kernel sẽ thông báo cho chúng bằng bộ lập lịch và cấu trúc dữ liệu wait_queue. Khi một tiến trình muốn chờ đến khi một sự kiện nào đó xảy ra, nó sẽ tham gia vào hàng đợi tương ứng với sự kiện đó và báo với bộ lập lịch rằng nó sẽ tạm dừng thực thi, khi sự kiện mà nó chờ xảy ra, các tiến trình đang chờ bên trong hàng đợi đó sẽ được đánh thức. Cơ chế này cho phép nhiều tiến trình cùng đợi một sự kiện.`,
				"Bằng tín hiệu.",
				"Bằng đèn hiệu.",
				"Bằng bộ lập lịch.",
				"Bằng bộ lập lịch và wait_queue."
			),
			new Question(
				"Trong đường ống, dữ liệu được truyền theo mấy chiều?",
				"A",
				`Đáp án: A. 1 chiều: từ tiến trình trước đường ống => tiến trình sau đường ống.
				Trong đường ống, dữ liệu chỉ có thể chuyển đi theo một chiều, dữ liệu vào đường ống tương đương với thao tác ghi, dữ liệu lấy ra từ đường ống tương đương với thao tác đọc, một tiến trình kết nối với một đường ống chỉ có thể thực hiện một trong hai thao tác đọc hoặc ghi, nhưng không thể thực hiện cả hai.`,
				"1 chiều: từ tiến trình trước đường ống => tiến trình sau đường ống.",
				"2 chiều: cả 2 tiến trình có thể truyền dữ liệu cho nhau.",
				"3 chiều: 2 tiến trình cho thể truyền dữ liệu cho nhau và chúng có thể truyền dữ liệu cho kernel nữa."
			),
			new Question(
				"Kỹ thuật bộ nhớ chia sẻ có nhược điểm là gì?",
				"C",
				`Đáp án: C. Không có khả năng đồng bộ.
				Linux cung cấp một kỹ thuật khác để truyền dữ liệu có kích thước lớn, hoặc nhỏ, đó là bộ nhớ dùng chung. Bất cứ dữ liệu nào được một tiến trình viết lên bộ nhớ chia sẻ có thể được các tiến trình khác có kết nối với vùng đó đọc ngay lập tức. Hạn chế của kỹ thuật này đó là nó không cung cấp khả năng đồng bộ, tức một tiến trình sẽ không biết dữ liệu bên trong vùng nhớ chia sẻ đã được cập nhật hay chưa, cũng như không thể dừng hoạt động cho đến khi dữ liệu trong vùng nhớ chia sẻ được viết lên.`,
				"Hạn chế về kích thước dữ liệu.",
				"Dữ liệu chỉ có thể truyền theo 1 chiều.",
				"Không có khả năng đồng bộ.",
				"Hiệu suất kém."
			),
			new Question(
				"Tiến trình có thể chia làm mấy loại?",
				"A",
				`Đáp án:  A. 2 loại: Real-time process và Normal process
			Tiến trình có thể chia ra làm 2 loại: Real-time process (tiến trình thời gian thực) và Normal process (tiến trình bình thường).
			Normal process được chia thành 2 loại: Interactive Process và Batch Process.`,
				"2 loại: Real-time process và Normal process",
				"2 loại: Interactive Process và Batch Process",
				"3 loại: Real-time process, Normal process và Batch Process",
				"3 loại: Real-time process, Interactive Process và Batch Process"
			),
			new Question(
				"Hệ điều hành Linux cùng cấp mấy loại hệ số ưu tiên?",
				"C",
				`Đáp án: C. 2 loại: nice value và real-time priority.
				Hệ điều hành Linux cung cấp 2 loại hệ số ưu tiên: nice value cho các normal process và real-time priority cho các real-time process.`,
				"1 loại: nice value.",
				"1 loại: factor priority.",
				"2 loại: nice value và real-time priority.",
				"2 loại: factor priority và real-time priority."
			),
			new Question(
				"Nice value có giá trị nằm trong khoảng nào dưới đây?",
				"A",
				`Đáp án: A. [-20; 19]
				Mỗi tiến trình có một thuộc tính là nice value, nằm trong khoảng từ -20 (ưu tiên cao nhất) đến 19 (ưu tiên thấp nhất), nice value mặc định của mỗi tiến trình là 0.`,
				"[-20; 19]",
				"[-20; 20]",
				"[-10; 9]",
				"[-20; 15]"
			),
			new Question(
				"Real-time priority có giá trị nằm trong khoảng nào dưới đây?",
				"B",
				`Đáp án: B. [0; 139]
				Real-time priority được dùng cho real-time process và có dải từ 0 (độ ưu tiên cao nhất) đến 99 (độ ưu tiên thấp nhất). Trong Linux, tiến trình real-time có priority thấp hơn (độ ưu tiên cao hơn) sẽ được chạy trước.`,
				"[0; 99]",
				"[0; 139]",
				"[-20; 19]",
				"[0; 19]"
			),
			new Question(
				"Có mấy loại thuật toán lập lịch cho tiến trình trong Linux?",
				"B",
				`Đáp án: B. 2 loại: Thuật toán lập lịch cho real-time process và normal process.`,
				"2 loại: Thuật toán lập lịch cho Batch process và Interactive process.",
				"2 loại: Thuật toán lập lịch cho real-time process và normal process.",
				"3 loại: Thuật toán lập lịch cho real-time process, batch process và interative process.",
				"3 loại: Thuật toán lập lịch cho real-time process có độ ưu tiên cao (real-time priority < 20), cho real-time process có độ ưu tiên thấp(real-time priority > 20) và cho normal process."
			)
		);
	}

	static noQuestionHandler() {
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

	questionListRender(quesList) {
		let numQues = this.questions.length;
		for (let num = 1; num <= numQues; num++) {
			const btn = document.createElement("button");
			btn.className = "questions__num";
			btn.innerText = num < 10 ? "0" + num : num;
			quesList.appendChild(btn);
		}
	}

	init() {
		let quesArea = document.querySelector(".questions__question");
		let cmt = document.querySelector(".questions__note");
		let quesList = document.querySelector(".questions__list");
		this.questionListRender(quesList);
		let selectedQuestion, selectQuestion;

		// hide question area
		quesArea.style.display = "none";
		// hide note
		cmt.style.display = "none";
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

				// Show question
				quesArea.style.display = "block";
				quesArea.innerHTML = "";

				try {
					quesArea.appendChild(
						this.questions[Number(this.questionID) - 1].render()
					);
				} catch (errMess) {
					Marking.noQuestionHandler();
					// hide question area
					quesArea.style.display = "none";
				}
			}
		});

		quesArea.addEventListener("click", (event) => {
			if (event.target.tagName.toLowerCase() !== "input") return;
			this.questionID = selectQuestion.textContent;
			this.userAnswers[this.questionID] = event.target.value;
		});
	}
}

export { KnowledgleTest };
