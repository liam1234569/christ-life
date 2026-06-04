// HIER KANNST DU NEUE FEED-ELEMENTE REINSCHREIBEN
const feedInhalte = [
    {
        type: "verse",
        bgClass: "bg-gradient-1",
        text: "Alles vermag ich durch den, der mich stärkt: Christus.",
        author: "Philipper 4,13"
    },
    {
        type: "quiz",
        bgClass: "bg-gradient-2",
        question: "In welcher Stadt wurde Jesus geboren?",
        options: [
            { text: "Nazareth", correct: false },
            { text: "Bethlehem", correct: true },
            { text: "Jerusalem", correct: false }
        ]
    },
    {
        type: "verse",
        bgClass: "bg-gradient-3",
        text: "Der HERR ist mein Hirte, mir wird nichts mangeln.",
        author: "Psalm 23,1"
    }
];

// Automatische Generierung des Feeds
const feedContainer = document.getElementById('screen-feed');
feedInhalte.forEach((item, index) => {
    let html = "";
    if(item.type === "verse") {
        html = `
            <div class="feed-item ${item.bgClass}">
                <p class="feed-verse">„${item.text}“</p>
                <p class="feed-author">${item.author}</p>
                ${index === 0 ? '<div class="scroll-hint"></div>' : ''}
            </div>`;
    } else if(item.type === "quiz") {
        let optionsHtml = item.options.map(opt => 
            `<button class="quiz-option" onclick="checkQuiz(this, ${opt.correct})">${opt.text}</button>`
        ).join('');
        
        html = `
            <div class="feed-item ${item.bgClass}">
                <h2 style="margin-bottom: 20px;">💡 Quiz-Time!</h2>
                <p style="font-size: 1.2rem; margin-bottom: 20px;">${item.question}</p>
                ${optionsHtml}
            </div>`;
    }
    feedContainer.innerHTML += html;
});

function checkQuiz(button, isCorrect) {
    let options = button.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.disabled = true);
    if (isCorrect) {
        button.style.backgroundColor = "#4caf50";
        button.innerText += " (Richtig! 🎉)";
    } else {
        button.style.backgroundColor = "#f44336";
        button.innerText += " (Falsch ❌)";
        options.forEach(opt => {
            if (opt.getAttribute('onclick').includes('true')) opt.style.backgroundColor = "#4caf50";
        });
    }
}
