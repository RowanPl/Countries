

let countries;
let indexByName;

const searchResult = document.getElementById('search-result');
const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit', searchCountry);

function searchCountry(e){
    e.preventDefault();
    const searchValue = document.getElementById('search-value');

fetchCountries(searchValue.value);
searchValue.value = '';
}
fetchCountries()
    async function fetchCountries(name) {
        try {
            const response = await fetch(`https://restcountries.com/v2/name/${name}`)
            .then(response => response.json())
            countries = response.data[0]
            showCountry()


        } catch (e) {
            console.error(e);
        }

    }


function showCountry() {
    const country = document.getElementById('Specific_Country')
    country.innerHTML =
        `<div id="DivContainer"> 
       
            <span id="flag-and-text"><p id="wiki">click the flag to go to the wikipedia page</p>  
           <a href="https://en.wikipedia.org/wiki/${countries.name}" target="_blank"> <img src="${countries.flag}" alt="The national flag of ${countries.name}" id="flag"></a>
           </span>
            <div id="text">
            <p> ${countries.name} is situated in ${countries.subregion}.</p>
            <p> The capital of ${countries.name} is ${countries.capital}</p>
            <p>It has a population of ${reverse()} people.</p>
           <p>You can pay with ${currency()}</p>
           <p>In ${countries.name} they speak : ${getLanguages()}</p></div>
           <div id="nationalAnthem">
           <p>National Anthem</p>
            <audio controls id="anthem" src='https://nationalanthems.info/${countries.topLevelDomain[0].substring(1)}.mp3'></audio>  
          </div>
          </div>`

}

function currency(){

        let output = '';
        for (let j = 0; j < countries.currencies.length; j++) {
            const currency1  = countries.currencies[j].name + "'s";
            output = output + currency1;

            if (j < countries.currencies.length -1) {
                output = `${output} and `;
            }
        }
        return output;
    }

function getLanguages(){
    let output = '';
    for (let j = 0; j < countries.languages.length ; j++){
        const language1 = countries.languages[j].name;
        output = output + language1;

        if (j < countries.languages.length -2){
            output = `${output} , `;
        }
        else if (j < countries.languages.length -1){
            output = `${output} and `
        }
    }
    return output
}



const randomButton = document.getElementById('random')
randomButton.addEventListener('click',randomCountries);

async function randomCountries() {
    try {
        const response = await axios.get(`https://restcountries.com/v2/all`)
        countries = response.data
      randomCountry()

    } catch (e) {
        console.error(e);
    }

}

function randomCountry(){
    let index = Math.floor(Math.random() * (countries.length -1));
    console.log(countries[index].name)
    console.log(index)
    fetchCountries(countries[index].name)
}

function reverse() {
   let reversedString = countries.population.toLocaleString();
   return reversedString
}
