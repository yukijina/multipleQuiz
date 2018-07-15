var questions = [
	{
		question : "What HTML tags are needed for a basic HTML file structure?",
		answers  : [" html, head, body", " html, toe, body", " html, head, hand", " What is a HTML file?"],
		correct  : "html, head, body"
	},
	{
		question : "What is the paragraph tag used for?",
		answers  : [" to create paragraph text on a CSS page", " to create heading text on a HTML page", " to create heading text on a CSS page", " to create paragraph text on a HTML page"],
		correct  : " to create paragraph text on a HTML page"
	},
	{
		question : "What are 3 ways to write CSS?",
		answers  : [" External Style Sheet, External Style Tag & Inline Style", " External Style Sheet, Internal Style Tag & Inline Style", " Inline Style Sheet, Internal Style Tag & Inline Style", " External Style Sheet, Internal Style Tag & Inline Style Sheet"],
		correct  : " External Style Sheet, Internal Style Tag & Inline Style"
	},
	{
		question : "How to declare an HTML file type?",
		answers  : [" <!CSS doctype>", " <!HTML doctype>", " <!DOCTYPE CSS>", " <!DOCTYPE html>"],
		correct  : " <!DOCTYPE html>"
	},
	{
		question : "Where in your HTML file do you link to your CSS file?",
		answers  : [" What is CSS?", " In between the opening and closing head tags", " In between the opening and closing body tags", " In between the opening and closing heading tags"],
		correct  : " In between the opening and closing head tags"
	},
	{
		question : "How many different heading tags are there?",
		answers  : [" 6", " 5", " 7", " 2"],
		correct  :  " 6"
	},
	{
		question : "What does CSS stand for?",
		answers  : [" Cascading Smile Sheets", " Cascading Style Stuff", " Cascading Style Sheets", " Hypertext Markup Language"],
		correct  : " Cascading Style Sheets"
	}
];

var questionForm = document.getElementById("questionForm");

//begin the game when the user hits the start button
function startGame() {
	//clar any previous html
	questionForm.innerHTML = "";

	//update style of form to center elements
	questionForm.style.margin  = "12% auto";

 	//load the 1st question
	createQuestion();
};

//load questions
function createQuestion() {
	//clear any previous html
	questionForm.innerHTML = "";

	//loop through questions hen page loads
	for (var i = 0; i < 1; i++) { //one question in one page, so i < 1
		//create elements when page loads
		var formGroup   = document.createElement("div");
		var questionEl  = document.createElement("h2");

		//Add attributes to Elements
		formGroup.className = "formGroup";
		questionEl.id       = "questions" + [i];

		//Create text for question
		var questionText = document.createTextNode(questions[i].question);

		//Add question text to Element
		questionEl.appendChild(questionText);

		//add element to dom
		formGroup.appendChild(questionEl);

		//add formgroup to questionForm
		questionForm.appendChild(formGroup);

 		//add answers to the dom
		for (var j = 0; j < questions[i].answers.length; j++) {
			//create possible answers
			var answerDiv  = document.createElement("div");
			var answerEl   = document.createElement("input");

			//create text node for question
			var answerText = document.createTextNode(questions[i].answers[j]);

			//add question to div
			answerDiv.appendChild(answerEl);
			answerDiv.appendChild(answerText);

			//add attributes
			answerDiv.className = "questionWrap";
			answerEl.type       = "radio";
			answerEl.name       = "radio" + [i];
			answerEl.value      = questions[i].answers[j];

			//add questions to formGroup
			formGroup.appendChild(answerDiv);
		};
	};

	//create submit button
	var submitBtn = document.createElement("button");

	//add attributes
	submitBtn.className   = "btn btn-lg btn-primary";
	submitBtn.textContent = "Submit Answer";
	submitBtn.type        = "button";
	submitBtn.onclick     = submitAnswer;

	//add button to form group
	questionForm.appendChild(submitBtn);
} // end of createQuestion function


function submitAnswer() {
	//get all input tags with possible answers
	var els = document.getElementsByTagName("input");

	//loop through those inputs
	for (var i = 0; i < els.length; i++) {
		//check which radio is checked and if the user answer is correct
		if (els[i].checked && els[i].value.trim() == questions[0].correct.trim()) {
			console.log("Correct Answer", els[i]);

			// remove the current question from the questions array
			questions.shift();

			//find parent and add class of right
			els[i].parentElement.className = "questionWrap right";

			//check to see if there are any more questions, if 0 then Game Over
			if(questions.length == 0) {
				//clear any previous html
				questionForm.innerHTML = "";

				//update styles of questionFrom
				questionForm.style.textAlign = "center";
				questionForm.style.margin  = "0 auto";

				//Display GAME OVER to user
				questionForm.innerHTML = "<h1>Good Job, You Completed the Quiz!<h1>" + "<br>" +  "<img src='img/success.jpg'>";

				//stop the funcction when the user wins
				return;
			};

			//if the user is correct and more questions exist, move to the next question
			setTimeout(function(){
				createQuestion();
			}, 2000);

			//stop the function, user got it correct
			return;
		};
	};

	//confirm for developer that the user got the question incorrect
	console.log("Incorrect Answer");

	//find the parent of the input element and add a class of wrong to it
	for (var i = 0; i < els.length; i++) {
		//find current radio checked
		if (els[i].checked) {
			//find parent and add class of wrong
			els[i].parentElement.className = "questionWrap wrong"
		};
	};
};
