import express from "express";
import path from "node:path";
import { gry } from "./dane.js";
import routerGier from "./trasy/gry.js";

const app = express();

const logger = (req, res, next) => {
  req.czasZadania = new Date().toLocaleTimeString("pl-PL");
  console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/gry", routerGier);

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
    najdrozsza: najdrozsza.nazwa,
    wygenerowano: req.czasZadania
  });
});

app.post("/echo", (req, res) => {
  console.log(req.body);
  res.json({ odebrano: req.body });
});

app.listen(3000, () => {
  console.log("Serwer działa: http://localhost:3000");
});
