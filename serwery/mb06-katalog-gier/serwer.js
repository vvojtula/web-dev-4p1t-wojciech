import express from "express";
import { gry } from "./dane.js";

const app = express();

/** GET / - strona powitalna z listą dostępnych adresów. */
app.get("/", (req, res) => {
    res.send(`
    <h1>Katalog gier planszowych</h1>
    <ul>
      <li><a href="/gry">/gry</a> – wszystkie gry</li>
      <li><a href="/gry/1">/gry/:id</a> – jedna gra</li>
      <li><a href="/szukaj?max=150">/szukaj</a> – wyszukiwanie</li>
      <li><a href="/statystyki">/statystyki</a> – podsumowanie</li>
    </ul>
  `);
});

/** GET /gry - pełna lista gier w katalogu. */
app.get("/gry", (req, res) => {
    res.json(gry);
});

/** GET /gry/:id - jedna gra o podanym numerze; 404, gdy takiej nie ma. */
app.get("/gry/:id", (req, res) => {
    const idGry = parseInt(req.params.id, 10);
    const znalezionaGra = gry.find(g => g.id === idGry);

    if (!znalezionaGra) {
        return res.status(404).json({
            blad: `Nie znaleziono gry o podanym identyfikatorze: ${req.params.id}`
        });
    }

    res.json(znalezionaGra);
});

/** GET /szukaj?wydawca=&max=&gracze= - filtrowanie katalogu; brak parametrów = cała lista. */
app.get("/szukaj", (req, res) => {
    const { wydawca, max, gracze } = req.query;
    let wynik = gry;

    if (max) {
        wynik = wynik.filter((g) => g.cena <= Number(max));
    }

    if (wydawca) {
        wynik = wynik.filter(
            (g) => g.wydawca.toLowerCase() === wydawca.toLowerCase()
        );
    }

    if (gracze) {
        wynik = wynik.filter((g) => g.gracze >= Number(gracze));
    }

    res.json(wynik);
});

/** GET /statystyki - liczba gier, średnia cena i nazwa najdroższej gry. */
app.get("/statystyki", (req, res) => {
    const sumaCen = gry.reduce((suma, g) => suma + g.cena, 0);
    const srednia = sumaCen / gry.length;
    const najdrozsza = gry.reduce((a, b) => (b.cena > a.cena ? b : a));

    res.json({
        liczbaGier: gry.length,
        sredniaCena: Math.round(srednia * 100) / 100,
        najdrozsza: najdrozsza.nazwa
    });
});

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
