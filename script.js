const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
wordsPerMinuteTag = document.querySelector(".wpm span"),
charPerMinuteTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button"),
mistakeTag = document.querySelector(".mistake span");

let timer, 
maxTime = 60,
timeLeft = maxTime,
accuracy = 0;
charIndex = mistakes = isTyping = 0;


function randomParagraph() {
    //This will randomly put the paragraph in the UI
    let randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    }); //This whole thing will first get the random paragraph on the screen 
    //then it will split all the characters then add each char to the span tag and then add this span to p tag.
    
    document.addEventListener("keydown" , () => inpField.focus());
    typingText.addEventListener("click" , () => inpField.focus());
    //Focus on input field when click anywhere in given paragraph
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    }

    if (typedChar == null) { //When backspace is used both character Index and mistakes count will decrease
        charIndex--;
        if(characters[charIndex].classList.contains("Incorrect")) {
            mistakes--; //Decrease the mistakes only if span clas contains incorrect
        }
        characters[charIndex].classList.remove("Correct","Incorrect");
    } 
    else {
        if(characters[charIndex].innerText === typedChar) {
            // console.log("Correct");
            //If user typed character and shown character is same then it will add the correct class to span otherwise incorrect
            characters[charIndex].classList.add("Correct");
        }
        else {
            mistakes++;
            //console.log("Incorrect");
            characters[charIndex].classList.add("Incorrect");
        }
        charIndex++;
    }
    //This function will first store all the span tags in characters variable 
    // then all the value of input field will split into each letters starting from 0
    // if the character in the paragraph will match the typed character then it will 
    //count as correct else increment the mistakes or otherwise incorrect class and increase the  character index everytime by 1.

    mistakeTag.innerText = mistakes; //initially mistakes is 0 then if typed character does not matches then mistake count will increase
    //and store the value in mistakes
    charPerMinuteTag.innerText = charIndex; //It will count every character

}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else {
        clearInterval(timer);
    }
}

function resetbtn() {
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);                                        
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    charPerMinuteTag.innerText = 0;
    mistakeTag.innerText = mistakes;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetbtn);