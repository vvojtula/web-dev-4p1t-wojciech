# Katalog gier – projekt Bootstrap (MB8)

Responsywna strona internetowa prezentująca katalog gier, zbudowana z wykorzystaniem frameworka Bootstrap 5.

## Uruchomienie

1. **Instalacja zależności:**
   Uruchom w terminalu w głównym folderze projektu polecenie:
   ```bash
   npm install
   ```
   *Krok ten jest konieczny, ponieważ folder `node_modules` nie znajduje się w repozytorium — bez jego pobrania strona otworzy się bez stylów Bootstrapa.*

2. **Otwarcie strony:**
   Otwórz plik `index.html` bezpośrednio w przeglądarce (poprzez dwukliknięcie pliku w eksploratorze).

## Struktura projektu

```text
├── docs/
│   └── zrzuty/
│       ├── waski.png      # zrzut ekranu dla szerokości 400 px
│       ├── sredni.png     # zrzut ekranu dla szerokości 800 px
│       └── szeroki.png    # zrzut ekranu dla szerokości 1400 px
├── node_modules/          # pakiety npm (pojawia się po wykonaniu npm install)
├── index.html             # główny plik HTML strony
├── package.json           # konfiguracja projektu i zależności (Bootstrap)
└── README.md              # dokumentacja projektu
```

## Użyte klasy

| Element | Klasy | Po co |
|---|---|---|
| nagłówek strony | `bg-primary text-white py-5` | niebieskie tło, biały tekst, duże odstępy |
| układ strony | `col-12 col-lg-3` i `col-12 col-lg-9` | menu i gry w jednym rzędzie od `lg` |
| główny kontener | `container my-4` | wyśrodkowanie treści na stronie i dodanie marginesów górnego oraz dolnego |
| karty z grami | `card h-100 shadow-sm` | estetyczne ramki dla gier o równej wysokości w rzędzie z delikatnym cieniem |
| przyciski akcji | `btn btn-outline-primary w-100` | stylizacja przycisków na pełną szerokość karty z obramowaniem w kolorze głównym |

## Zrzuty ekranu

![Widok wąski 400 px](docs/zrzuty/waski.png)
*Widok mobilny (szerokość 400 px) – układ jednokolumnowy.*

![Widok średni 800 px](docs/zrzuty/sredni.png)
*Widok tabletowy (szerokość 800 px) – układ pośredni.*

![Widok szeroki 1400 px](docs/zrzuty/szeroki.png)
*Widok desktopowy (szerokość 1400 px) – menu boczne i siatka gier w jednym rzędzie.*

## Autor

* **Imię i nazwisko:** [Wpisz swoje imię i nazwisko]
* **Klasa / Grupa:** [Wpisz klasę lub grupę]
