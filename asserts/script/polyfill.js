(function (elem) {
	// Check if element is a node
	// https://github.com/Financial-Times/polyfill-service
	var isNode = function (object) {
		// DOM, Level2
		if (typeof Node === "function") {
			return object instanceof Node;
		}

		// Older browsers, check if it looks like a Node instance)
		return (
			object &&
			typeof object === "object" &&
			object.nodeName &&
			object.nodeType >= 1 &&
			object.nodeType <= 12
		);
	};

	// Add append() method to prototype
	for (var i = 0; i < elem.length; i++) {
		if (!window[elem[i]] || "append" in window[elem[i]].prototype) continue;
		window[elem[i]].prototype.append = function () {
			var argArr = Array.prototype.slice.call(arguments);
			var docFrag = document.createDocumentFragment();

			for (var n = 0; n < argArr.length; n++) {
				docFrag.appendChild(
					isNode(argArr[n])
						? argArr[n]
						: document.createTextNode(String(argArr[n]))
				);
			}

			this.appendChild(docFrag);
		};
	}
})(["Element", "CharacterData", "DocumentType"]);

/* if ('content' in document.createElement('template')) {

    // Instantiate the table with the existing HTML tbody
    // and the row with the template
    var tbody = document.querySelector("tbody");
    var template = document.querySelector('#productrow');

    // Clone the new row and insert it into the table
    var clone = template.content.cloneNode(true);
    var td = clone.querySelectorAll("td");
    td[0].textContent = "1235646565";
    td[1].textContent = "Stuff";

    tbody.appendChild(clone);

    // Clone the new row and insert it into the table
    var clone2 = template.content.cloneNode(true);
    td = clone2.querySelectorAll("td");
    td[0].textContent = "0384928528";
    td[1].textContent = "Acme Kidney Beans 2";

    tbody.appendChild(clone2);

} else {
  // Find another way to add the rows to the table because
  // the HTML template element is not supported.
} */
