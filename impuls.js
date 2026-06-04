// DEIN 10-TAGE-VORPLANUNGS-SPEICHER
// Du kannst hier pro Tag so viele Verse in die Liste schreiben, wie du möchtest!
const impulsDatenbank = [
    {
        stelle: "2. Timotheus 1,7 & Römer 8,15",
        verse: [
            "Denn Gott hat uns nicht einen Geist der Furcht gegeben, sondern der Kraft und der Liebe und der Besonnenheit.",
            "Denn ihr habt nicht einen Geist der Knechtschaft empfangen, dass ihr euch abermals fürchten müsstet; sondern ihr habt einen Geist der Kindschaft empfangen, durch den wir rufen: Abba, lieber Vater!"
        ]
    },
    {
        stelle: "Psalm 23,1-3",
        verse: [
            "Der HERR ist mein Hirte, mir wird nichts mangeln.",
            "Er weidet mich auf einer grünen Aue und führet mich zum frischen Wasser.",
            "Er erquicket meine Seele. Er führet mich auf rechter Straße um seines Namens willen."
        ]
    },
    {
        stelle: "Philipper 4,6-7",
        verse: [
            "Sorgt euch um nichts, sondern in allen Dingen lasst eure Bitten in Gebet und Flehen mit Danksagung vor Gott kundwerden!",
            "Und der Friede Gottes, der höher ist als alle Vernunft, wird eure Herzen und Sinne bewahren in Christus Jesus."
        ]
    },
    {
        stelle: "Jesaja 40,29 & 31",
        verse: [
            "Er gibt dem Müden Kraft und Stärke genug dem Unvermögenden.",
            "Aber die auf den HERRN harren, kriegen neue Kraft, dass sie auffahren mit Flügeln wie Adler, dass sie laufen und nicht matt werden, dass sie wandeln und nicht müde werden."
        ]
    },
    {
        stelle: "Matthäus 6,33-34",
        verse: [
            "Trachtet zuerst nach dem Reich Gottes und nach seiner Gerechtigkeit, so wird euch das alles zufallen.",
            "Darum sorgt nicht für morgen, denn der morgige Tag wird für das Seine sorgen. Es ist genug, dass jeder Tag seine eigene Plage hat."
        ]
    },
    {
        stelle: "Sprüche 3,5-6",
        verse: [
            "Verlass dich auf den HERRN von ganzem Herzen, und verlass dich nicht auf deinen Verstand,",
            "sondern gedenke an ihn in allen deinen Wegen, so wird er dich recht führen."
        ]
    },
    {
        stelle: "Josua 1,9",
        verse: [
            "Siehe, ich habe dir geboten, dass du getrost und unverzagt seist. Lass dir nicht grauen und entsetze dich nicht;",
            "denn der HERR, dein Gott, ist mit dir in allem, was du tun wirst."
        ]
    },
    {
        stelle: "Römer 12,12",
        verse: [
            "Seid fröhlich in Hoffnung, geduldig in Trübsal, beharrlich im Gebet."
        ]
    },
    {
        stelle: "Johannes 14,27",
        verse: [
            "Den Frieden lasse ich euch, meinen Frieden gebe ich euch. Nicht gebe ich euch, wie die Welt gibt.",
            "Euer Herz erschrecke nicht und fürchte sich nicht."
        ]
    },
    {
        stelle: "1. Korinther 13,4 & 7",
        verse: [
            "Die Liebe ist langmütig und freundlich, die Liebe eifert nicht, die Liebe treibt nicht Mutwillen, sie bläht sich nicht auf...",
            "Sie erträgt alles, sie glaubt alles, sie hofft alles, sie duldet alles."
        ]
    }
];

// AUTOMATISCHE DATUMS-BERECHNUNG
function ladeTagesImpuls() {
    const heute = new Date();
    
    // Wir nehmen den aktuellen Tag des Monats (z.B. den 14.) und rechnen "Modulo Anzahl der Impulse" (14 % 10 = 4).
    // Dadurch wandert der Index jeden Tag genau einen Schritt weiter und fängt nach Tag 10 wieder von vorne an!
    const tagerIndex = heute.getDate() % impulsDatenbank.length;
    const aktuellerImpuls = impulsDatenbank[tagerIndex];

    // Erstelle den HTML-Text für alle Verse dieses Tages
    let verseHTML = "";
    aktuellerImpuls.verse.forEach(vers => {
        verseHTML += `<p style="font-style: italic; font-size: 1.1rem; margin-bottom: 12px; line-height: 1.5;">„${vers}“</p>`;
    });

    // Füge die Verse und die Bibelstelle in die Card ein
    const impulsContainer = document.getElementById('impuls-card-content');
    if (impulsContainer) {
        impulsContainer.innerHTML = `
            ${verseHTML}
            <span class="card-title" style="color: #b388ff; font-weight: bold; margin-top: 10px; display: block;">${aktuellerImpuls.stelle}</span>
        `;
    }
}

// Führe die Funktion sofort aus, wenn die App startet
ladeTagesImpuls();
