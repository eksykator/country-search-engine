var url = 'https://restcountries.eu/rest/v1/name/';

var countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries() {
    var countryName = document.getElementById('country-name').value;
    if(!countryName.length){
        countryName = 'Poland';
    }
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    countriesList.innerHTML = '';
    resp.forEach(function(item) {
        var liElement = document.createElement('li');
        var countryTemplate = document.getElementById('template').innerHTML;
        Mustache.parse(countryTemplate);
        var dataCountry = {name: item.name, capital: item.capital, area: item.area, currency: item.currencies[0], population: item.population, region: item.region};
        liElement.innerHTML = Mustache.render(countryTemplate, dataCountry);
        countriesList.appendChild(liElement);
    });
}

