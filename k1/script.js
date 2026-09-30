const budujliste = (tablica) => {
    return tablica.map(({ model, cena }) => {
        let klasa = cena < 2700 ? "wyrozniony" : "";
        return `<li class="${klasa}">${model} - ${cena} zł</li>`;
    }).join("");
};

const wynik = rowery.filter(({ elektryczny }) => {
    return elektryczny === false;
});

document.querySelector("#lista").innerHTML = budujliste(wynik);

const suma = wynik.reduce((suma, { cena }) => {
    return suma + cena;
}, 0);

document.querySelector("#podsumowanie").textContent =
    `Liczba elementow: ${wynik.length} laczna cena: ${suma} zl`;
