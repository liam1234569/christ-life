// Alle 66 Bücher der Bibel mit den exakten IDs für die Online-Abfrage
const bibelBuecher = {
    "Altes Testament": [
        { name: "1. Mose (Genesis)", id: "GEN", chapters: 50 },
        { name: "2. Mose (Exodus)", id: "EXO", chapters: 40 },
        { name: "3. Mose (Levitikus)", id: "LEV", chapters: 27 },
        { name: "4. Mose (Numeri)", id: "NUM", chapters: 36 },
        { name: "5. Mose (Deuteronomium)", id: "DEU", chapters: 34 },
        { name: "Josua", id: "JOSH", chapters: 24 },
        { name: "Richter", id: "JUDG", chapters: 21 },
        { name: "Rut", id: "RUTH", chapters: 4 },
        { name: "1. Samuel", id: "1SAM", chapters: 31 },
        { name: "2. Samuel", id: "2SAM", chapters: 24 },
        { name: "1. Könige", id: "1KGS", chapters: 22 },
        { name: "2. Könige", id: "2KGS", chapters: 25 },
        { name: "1. Chronik", id: "1CHR", chapters: 29 },
        { name: "2. Chronik", id: "2CHR", chapters: 36 },
        { name: "Esra", id: "EZRA", chapters: 10 },
        { name: "Nehemia", id: "NEH", chapters: 13 },
        { name: "Ester", id: "ESTH", chapters: 10 },
        { name: "Hiob", id: "JOB", chapters: 42 },
        { name: "Psalmen", id: "PSA", chapters: 150 },
        { name: "Sprüche", id: "PROV", chapters: 31 },
        { name: "Prediger", id: "ECCL", chapters: 12 },
        { name: "Hoheslied", id: "SONG", chapters: 8 },
        { name: "Jesaja", id: "ISA", chapters: 66 },
        { name: "Jeremia", id: "JER", chapters: 52 },
        { name: "Klagelieder", id: "LAM", chapters: 5 },
        { name: "Hesekiel", id: "EZEK", chapters: 48 },
        { name: "Daniel", id: "DAN", chapters: 12 },
        { name: "Hosea", id: "HOS", chapters: 14 },
        { name: "Joel", id: "JOEL", chapters: 3 },
        { name: "Amos", id: "AMOS", chapters: 9 },
        { name: "Obadja", id: "OBAD", chapters: 1 },
        { name: "Jona", id: "JON", chapters: 4 },
        { name: "Micha", id: "MIC", chapters: 7 },
        { name: "Nahum", id: "NAH", chapters: 3 },
        { name: "Habakuk", id: "HAB", chapters: 3 },
        { name: "Zefanja", id: "ZEPH", chapters: 3 },
        { name: "Haggai", id: "HAG", chapters: 2 },
        { name: "Sacharja", id: "ZECH", chapters: 14 },
        { name: "Maleachi", id: "MAL", chapters: 4 }
    ],
    "Neues Testament": [
        { name: "Matthäus", id: "MATT", chapters: 28 },
        { name: "Markus", id: "MARK", chapters: 16 },
        { name: "Lukas", id: "LUKE", chapters: 24 },
        { name: "Johannes", id: "JOHN", chapters: 21 },
        { name: "Apostelgeschichte", id: "ACTS", chapters: 28 },
        { name: "Römer", id: "ROM", chapters: 16 },
        { name: "1. Korinther", id: "1COR", chapters: 16 },
        { name: "2. Korinther", id: "2COR", chapters: 13 },
        { name: "Galater", id: "GAL", chapters: 6 },
        { name: "Epheser", id: "EPH", chapters: 6 },
        { name: "Philipper", id: "PHIL", chapters: 4 },
        { name: "Kolosser", id: "COL", chapters: 4 },
        { name: "1. Thessalonicher", id: "1THESS", chapters: 5 },
        { name: "2. Thessalonicher", id: "2THESS", chapters: 3 },
        { name: "1. Timotheus", id: "1TIM", chapters: 6 },
        { name: "2. Timotheus", id: "2TIM", chapters: 4 },
        { name: "Titus", id: "TITU", chapters: 3 },
        { name: "Philemon", id: "PHILEM", chapters: 1 },
        { name: "Hebräer", id: "HEB", chapters: 13 },
        { name: "Jakobus", id: "JAS", chapters: 5 },
        { name: "1. Petrus", id: "1PET", chapters: 5 },
        { name: "2. Petrus", id: "2PET", chapters: 3 },
        { name: "1. Johannes", id: "1JOHN", chapters: 5 },
        { name: "2. Johannes", id: "2JOHN", chapters: 1 },
        { name: "3. Johannes", id: "3JOHN", chapters: 1 },
        { name: "Judas", id: "JUDE", chapters: 1 },
        { name: "Offenbarung", id: "REV", chapters: 22 }
    ]
};

let aktivesBuch = null;

// Rendert die Liste aller Bücher auf dem Screen
function renderBibel() {
    const container = document.getElementById('bible-books-view');
    if(!container) return;
    container.innerHTML = "";

    for (let sektion in bibelBuecher) {
        container.innerHTML += `<div class="bible-section-title">${sektion}</div>`;
        bibelBuecher[sektion].forEach(buch => {
            container.innerHTML += `
                <div class="list-item" onclick="waehleBuch('${buch.name}', '${buch.id}', ${buch.chapters})">
                    <span>${buch.name}</span><span>➔</span>
                </div>`;
        });
    }
}

// Initialer Start beim Laden der Datei
renderBibel();

function waehleBuch(name, id, chapters) {
    aktivesBuch = { name: name, id: id };
    currentBibleLevel = "chapters";
    
    document.getElementById('bible-books-view').style.display = "none";
    document.getElementById('bible-chapters-view').style.display = "block";
    document.getElementById('bible-back-btn').style.display = "block";
    document.getElementById('selected-book-title').innerText = name;

    let grid = document.getElementById('chapter-grid-container');
    grid.innerHTML = "";
    for (let i = 1; i <= chapters; i++) {
        grid.innerHTML += `<div class="chapter-box" onclick="ladeKapitel(${i})">${i}</div>`;
    }
}

// Holt das ausgewählte Kapitel live über das Internet
function ladeKapitel(kapitelNummer) {
    currentBibleLevel = "text";
    document.getElementById('bible-chapters-view').style.display = "none";
    document.getElementById('bible-text-view').style.display = "block";
    document.getElementById('bible-passage-title').innerText = `${aktivesBuch.name} - Kapitel ${kapitelNummer}`;
    
    let textContainer = document.getElementById('bible-text-container');
    textContainer.innerText = "Lade Kapitel...";

    fetch(`https://bible-api.com/${aktivesBuch.id}+${kapitelNummer}`)
        .then(response => response.json())
        .then(data => {
            if(data.verses && data.verses.length > 0) {
                textContainer.innerHTML = data.verses.map(v => 
                    `<span style="color: #b388ff; font-size: 0.8rem; font-weight: bold; margin-right: 6px; vertical-align: super;">${v.verse}</span>${v.text}`
                ).join('<br><br>');
            } else {
                textContainer.innerText = "Kapitel konnte nicht geladen werden.";
            }
        })
        .catch(err => {
            textContainer.innerText = "Fehler beim Online-Abruf. Sobald die App auf GitHub hochgeladen ist, lädt der Text hier vollautomatisch!";
        });
}

// Durchsucht die gesamte Online-Datenbank nach einem Begriff
function searchBible() {
    let query = document.getElementById('bible-search-input').value.trim();
    if(!query) return;

    let resultsContainer = document.getElementById('search-results-container');
    resultsContainer.innerText = "Suche läuft...";
    
    document.getElementById('bible-search-results').style.display = "block";
    document.getElementById('bible-main-views').style.display = "none";

    fetch(`https://bible-api.com/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = "";
            if(data.results && data.results.length > 0) {
                // Zeige die ersten 15 Treffer an
                let anzeigen = data.results.slice(0, 15);
                anzeigen.forEach(res => {
                    resultsContainer.innerHTML += `
                        <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin-bottom: 10px; text-align: left;">
                            <strong style="color: #b388ff;">${res.reference}</strong>
                            <p style="font-size: 0.95rem; font-style: italic; margin-top: 4px;">"${res.text.trim()}"</p>
                        </div>`;
                });
                if(data.results.length > 15) {
                    resultsContainer.innerHTML += `<p style="color: #aaa; font-size: 0.85rem; text-align: center; margin-top: 10px;">...und ${data.results.length - 15} weitere Treffer gefunden.</p>`;
                }
            } else {
                resultsContainer.innerText = "Keine Verse zu diesem Suchbegriff gefunden.";
            }
        })
        .catch(err => {
            resultsContainer.innerText = "Suche online fehlgeschlagen. Auf GitHub Pages wird die Suche aktiv sein!";
        });
}

function clearSearch() {
    document.getElementById('bible-search-input').value = "";
    document.getElementById('bible-search-results').style.display = "none";
    document.getElementById('bible-main-views').style.display = "block";
}

function resetBibleView() {
    currentBibleLevel = "books";
    document.getElementById('bible-books-view').style.display = "block";
    document.getElementById('bible-chapters-view').style.display = "none";
    document.getElementById('bible-text-view').style.display = "none";
    document.getElementById('bible-back-btn').style.display = "none";
    document.getElementById('app-bar-title').innerText = "Die Bibel";
    clearSearch();
}

function goBackInBible() {
    if(currentBibleLevel === "text") {
        currentBibleLevel = "chapters";
        document.getElementById('bible-text-view').style.display = "none";
        document.getElementById('bible-chapters-view').style.display = "block";
    } else if(currentBibleLevel === "chapters") {
        resetBibleView();
    }
}
