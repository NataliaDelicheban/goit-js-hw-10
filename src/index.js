import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  clearInput();
  const inputCountry = e.target.value;
  inputCountry.trim();
  if (inputCountry === '') {
    return;
  }
  fetchCountries(inputCountry)
    .then(renderCountries)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountries(countries) {
  const countriesLength = countries.length;

  if (countriesLength > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countriesLength === 1) {
    const markup = renderSearchCountry(countries);
    countryInfo.innerHTML = markup;
  } else {
    const markupUl = renderCountryList(countries);
    countryList.innerHTML = markupUl;
  }
}

function renderSearchCountry(countries) {
  return countries
    .map(({ name, capital, population, languages, flags }) => {
      return `
      <img src = "${flags.svg}" alt = "flags" width = "60px" height=30px>
      <h1 class="title">${name.official}</h1 >
      </img>
<p class="text">Capital: ${capital} </p>
<p class="text">Population: ${population} </p>
<p class="text">Languages: ${Object.values(languages)} </p>`;
    })
    .join('');
}

function renderCountryList(countries) {
  return countries
    .map(({ name, flags }) => {
      return `
      <img src = "${flags.svg}" alt = "flags" width = "60px" height=30px>
      <h1 class="title">${name.official}</h1 >
      </img>`;
    })
    .join('');
}

function clearInput() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
