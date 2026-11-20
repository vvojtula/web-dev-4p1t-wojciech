import express from "express";
import path from "node:path";
import { gry } from "./dane.js";

const app = express();

const logger = (req, res, next) => {
  req.czasZadania = new Date().toLocaleTimeString("pl-PL");
  console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/gry", (req, res) => {
    res.json(gry);
});

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
