import express from "express";
import { gry } from "./dane.js";

const app = express();

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

app.get("/gry", (req, res) => {
    res.json(gry);
});

app.get("/gry/:id", (req, res) => {
    // Pobieramy parametr i zamieniamy go na liczbę
    const idGry = parseInt(req.params.id, 10);

    // Wyszukiwanie gry za pomocą metody find
    const znalezionaGra = gry.find(g => g.id === idGry);

    // Gdy gry nie ma w tablicy (lub wpisano np. tekst zamiast id)
    if (!znalezionaGra) {
        return res.status(404).json({
            blad: `Nie znaleziono gry o podanym identyfikatorze: ${req.params.id}`
        });
    }

    // Jeśli gra istnieje, zwracamy ją ze statusem 200 (domyślny)
    res.json(znalezionaGra);
});

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
