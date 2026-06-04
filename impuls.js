// HIER EINFACH DEN TEXT FÜR DEN IMPULS DES TAGES ANPASSEN
const tagesVers = "Denn Gott hat uns nicht einen Geist der Furcht gegeben, sondern der Kraft und der Liebe und der Besonnenheit.";
const tagesStelle = "2. Timotheus 1,7";

// Diese Zeilen sorgen dafür, dass der Text in der App landet
document.getElementById('impuls-card-content').innerHTML = `
    <p style="font-style: italic; font-size: 1.1rem;">„${tagesVers}“</p>
    <span class="card-title">${tagesStelle}</span>
`;