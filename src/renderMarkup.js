function renderListMarkup(data) {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="40" height="20">${name.official}</li>`
    )
    .join('');
}

function renderInfoMarkup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.svg}" alt="${
        name.official
      }" width="50" height="30">${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
}
export { renderListMarkup, renderInfoMarkup };
