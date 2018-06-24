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
    
    var countryTemplate = document.getElementById('template').innerHTML;
    Mustache.parse(countryTemplate);
    
    resp.forEach(function(item) {
        var liElement = document.createElement('li');
        
        var dataCountry = {
            name: item.name,
            capital: item.capital,
            area: item.area, 
            population: item.population, 
            region: item.region,
            alpha3Code: item.alpha3Code
        };
        
        liElement.innerHTML = Mustache.render(countryTemplate, dataCountry);
        countriesList.appendChild(liElement);
    });
}

