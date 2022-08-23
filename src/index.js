import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderListMarkup, renderInfoMarkup } from './renderMarkup';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputCountry: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputCountry.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

function onInputCountry(e) {
  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue)
    // .then(response => response.json())
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }
      renderMarkup(data);
    })
    .catch(err => {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkup(data) {
  if (data.length === 1) {
    refs.countryList.innerHTML = '';
    const markupInfo = renderInfoMarkup(data);
    refs.countryInfo.innerHTML = markupInfo;
  } else {
    refs.countryInfo.innerHTML = '';
    const markupList = renderListMarkup(data);
    refs.countryList.innerHTML = markupList;
  }
}
