export default function fetchCountries(name) {
  console.log(name);
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`;
  return fetch(url).then(responce => {
    return responce.json();
  });
}
