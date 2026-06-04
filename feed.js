// Der große Inhalts-Pool für den Feed (Verse & Quizzes gemischt)
const standardFeedInhalt = [
    {
        type: "verse",
        text: "Gott ist unsere Zuversicht und Stärke, eine Hilfe in den großen Nöten, die uns getroffen haben.",
        title: "Psalm 46,2",
        author: "Hoffnung & Halt"
    },
    {
        type: "quiz",
        question: "Wer besiegte den Riesen Goliath mit einer Steinschleuder?",
        options: ["König Saul", "David", "Simson", "Salomo"],
        correct: 1,
        explanation: "Richtig! Der junge Hirtenjunge David vertraute auf Gott und besiegte den Riesen."
    },
    {
        type: "verse",
        text: "Alles vermag ich durch den, der mich stark macht: Christus.",
        title: "Philipper 4,13",
        author: "Mutmacher"
    },
    {
        type: "quiz",
        question: "In welcher Stadt wurde Jesus Christus geboren?",
        options: ["Nazareth", "Jerusalem", "Bethlehem", "Kapernaum"],
        correct: 2,
        explanation: "Genau! Jesus wurde in Bethlehem in einem Stall geboren, wie es prophezeit war."
    },
    {
        type: "verse",
        text: "Lass dich nicht vom Bösen überwinden, sondern überwinde das Böse mit Gutem.",
        title: "Römer 12,21",
        author: "Nächstenliebe"
    },
    {
        type: "quiz",
        question: "Wie viele Jünger hatte Jesus während seines Wirkens auf der Erde?",
        options: ["7 Jünger", "10 Jünger", "12 Jünger", "40 Jünger"],
        correct: 2,
        explanation: "Exakt! Er erwählte zwölf Apostel, um das Evangelium in alle Welt zu tragen."
    },
    {
        type: "verse",
        text: "Die Liebe ist langmütig und freundlich, die Liebe eifert nicht, sie treibt nicht Mutwillen, sie bläht sich nicht auf.",
        title: "1. Korinther 13,4",
        author: "Das Hohelied der Liebe"
    },
    {
        type: "quiz",
        question: "Welches Zeichen setzte Gott nach der Sintflut als Versprechen in den Himmel?",
        options: ["Einen Regenbogen", "Eine brennende Wolke", "Einen Sternenregen", "Eine weiße Taube"],
        correct: 0,
        explanation: "Richtig! Der Regenbogen ist das ewige Bundeszeichen des Friedens zwischen Gott und der Erde."
    },
    {
        type: "verse",
        text: "Denn ich weiß wohl, was ich für Gedanken über euch habe, spricht der HERR: Gedanken des Friedens und nicht des Leides, dass ich euch gebe Zukunft und Hoffnung.",
        title: "Jeremia 29,11",
        author: "Zusage Gottes"
    },
    {
        type: "quiz",
        question: "Wer baute im Alten Testament die Arche, um Mensch und Tier vor der Flut zu retten?",
        options: ["Mose", "Abraham", "Noah", "Metuschelach"],
        correct: 2,
        explanation: "Noah baute die Arche im Gehorsam und Glauben an Gott."
    }
];

let angezeigteItemsZaehler = 0;

// Funktion zum Laden und Rendern des Feeds
function initialisiereFeed() {
    const stream = document.getElementById('feed-stream-container');
    if (!stream) return;
    
    stream.innerHTML = ""; // Leeren
    angezeigteItemsZaehler = 0;

    // 1. Hole zuerst selbst erstellte Einträge aus dem LocalStorage
    let userPosts = JSON.parse(localStorage.getItem('userFeedPosts')) || [];
    userPosts.forEach(post => {
        stream.innerHTML += erstelleVerseHTML(post, true);
    });

    // 2. Lade die ersten Standard-Inhalte
    baueFeedBeitraegeAn(15);
}

// Generiert neue Beiträge und hängt sie unten an (Infinite Scroll)
function baueFeedBeitraegeAn(anzahl) {
    const stream = document.getElementById('feed-stream-container');
    
    for (let i = 0; i < anzahl; i++) {
        // Nutzt Modulo, um den Pool unendlich oft zu wiederholen
        let datenIndex = angezeigteItemsZaehler % standardFeedInhalt.length;
        let item = standardFeedInhalt[datenIndex];
        let gradIndex = (angezeigteItemsZaehler % 3) + 1; // Wechselt Hintergründe 1, 2, 3 ab

        if (item.type === "verse") {
            stream.innerHTML += erstelleVerseHTML({
                title: item.title,
                text: item.text,
                author: item.author,
                gradientClass: `bg-gradient-${gradIndex}`
            }, false);
        } else if (item.type === "quiz") {
            stream.innerHTML += erstelleQuizHTML(item, angezeigteItemsZaehler, `bg-gradient-${gradIndex}`);
        }
        
        angezeigteItemsZaehler++;
    }
}

// HTML Vorlage für einen Vers
function erstelleVerseHTML(data, isUserPost) {
    let bg = isUserPost ? 'bg-gradient-user' : data.gradientClass;
    let badge = isUserPost ? '<div style="background:rgba(255,255,255,0.2); font-size:0.75rem; padding:4px 8px; border-radius:20px; margin-bottom:15px; display:inline-block;">Community Beitrag</div><br>' : '';
    return `
        <div class="feed-item ${bg}">
            <div>
                ${badge}
                <p class="feed-verse">„${data.text}“</p>
                <span class="feed-author">— ${data.title}</span>
                <p style="font-size:0.85rem; color:#aaa; margin-top:10px;">Gepostet von: ${data.author}</p>
            </div>
        </div>
    `;
}

// HTML Vorlage für ein Quiz
function erstelleQuizHTML(quiz, id, gradClass) {
    let optionenHTML = "";
    quiz.options.forEach((opt, index) => {
        optionenHTML += `
            <button class="quiz-option" onclick="werteQuizAus(this, ${index === quiz.correct}, '${quiz.explanation}', ${id})">
                ${opt}
            </button>
        `;
    });

    return `
        <div class="feed-item ${gradClass}" id="quiz-block-${id}">
            <div style="width: 100%;">
                <span style="font-size:0.8rem; letter-spacing:2px; color:#b388ff; font-weight:bold; display:block; margin-bottom:10px;">BIBEL-QUIZ</span>
                <h2 style="font-size:1.4rem; margin-bottom:20px; line-height:1.4;">${quiz.question}</h2>
                <div style="margin-bottom: 20px;">
                    ${optionenHTML}
                </div>
                <p class="quiz-feedback" style="display:none; font-size:0.95rem; margin-top:15px; padding:10px; background:rgba(0,0,0,0.3); border-radius:8px; line-height:1.4;"></p>
            </div>
        </div>
    `;
}

// Quiz Auswertung live im Feed
function werteQuizAus(button, istRichtig, erklaerung, quizId) {
    const parentBlock = document.getElementById(`quiz-block-${quizId}`);
    const alleButtons = parentBlock.querySelectorAll('.quiz-option');
    const feedbackText = parentBlock.querySelector('.quiz-feedback');

    // Deaktiviere alle Buttons im selben Quiz, damit man nur einmal tippen kann
    alleButtons.forEach(btn => btn.style.pointerEvents = "none");

    if (istRichtig) {
        button.style.backgroundColor = "#2e7d32"; // Grün für richtig
        button.style.borderColor = "#4caf50";
        feedbackText.style.color = "#81c784";
    } else {
        button.style.backgroundColor = "#c62828"; // Rot für falsch
        button.style.borderColor = "#ef5350";
        feedbackText.style.color = "#e57373";
    }

    feedbackText.innerText = erklaerung;
    feedbackText.style.display = "block";
}

// UNENDLICHES SCROLL-LOGIK (TikTok-Style Erkennung)
document.addEventListener('DOMContentLoaded', () => {
    initialisiereFeed();

    const streamContainer = document.getElementById('feed-stream-container');
    if (streamContainer) {
        streamContainer.addEventListener('scroll', () => {
            // Wenn der Nutzer fast am Ende der scrollbaren Fläche angekommen ist (200px Puffer)
            if (streamContainer.scrollTop + streamContainer.clientHeight >= streamContainer.scrollHeight - 200) {
                baueFeedBeitraegeAn(10); // Hänge direkt 10 neue Beiträge an!
            }
        });
    }
});

// INTERAKTIONEN FÜR DIE SCHREIBFLÄCHE (MODAL)
function openFeedModal() {
    document.getElementById('feed-upload-modal').style.display = "flex";
}

function closeFeedModal() {
    document.getElementById('feed-upload-modal').style.display = "none";
    document.getElementById('modal-feed-title').value = "";
    document.getElementById('modal-feed-text').value = "";
    document.getElementById('modal-feed-author').value = "";
}

function submitNewFeedItem() {
    const title = document.getElementById('modal-feed-title').value.trim();
    const text = document.getElementById('modal-feed-text').value.trim();
    let author = document.getElementById('modal-feed-author').value.trim();

    if (!title || !text) {
        alert("Bitte fülle mindestens die Bibelstelle und den Vers aus!");
        return;
    }
    if (!author) author = "Anonym";

    const neuerEintrag = { title, text, author };

    // Aus LocalStorage holen, neuen Eintrag ganz vorne anfügen, zurückspeichern
    let userPosts = JSON.parse(localStorage.getItem('userFeedPosts')) || [];
    userPosts.unshift(neuerEintrag);
    localStorage.setItem('userFeedPosts', JSON.stringify(userPosts));

    // Schließen und Feed neu aufbauen, damit das Eigene sofort ganz oben steht!
    closeFeedModal();
    initialisiereFeed();
    
    // Nach ganz oben scrollen, um den neuen Post direkt zu bewundern
    document.getElementById('feed-stream-container').scrollTop = 0;
}
