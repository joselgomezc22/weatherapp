// Http GET Request General Function
function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    json = JSON.parse(xmlHttp.responseText)
    return json;
}

//  Html Current 'Weather' data ById
function appendCurrentWheaterHtml(cardId,json){
    
    let card = document.getElementById(cardId);
    let city = json.name;
    let temp =  parseInt(json.main.temp);
    let data = json.weather[0];
    console.log(data);
    let main = data.main;
    let description = data.description;
    let icon = data.icon;
    let html = `
    <div class="padding-small">
        <h3>Today's weather in <span class="">${city}</span> </h3>
        <h3><span class="main">${main}</span></h3>
        <h1><span class="temperature">${temp}</span>°</h1>
        <h3><span class="description">${description}</span> </h3>
    </div>
    <div class="padding-small">
        <div class="icon">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt=""> 
        </div> 
    </div>`;
    card.innerHTML = html;
    
}
//////////////////////////////////////////////
// Html '3 DAYS FORECAST Weather' data ById //
/////////////////////////////////////////////
function appendForecastWheaterHtml(cardId,json){
    let html = ``;
    let forecast = ``;
    let parentCard = document.getElementById(cardId);
    let city = json.city.name;
    // id children generatie
    let childid = Math.random();

    html = `
        <div class="text-header">
            <h1>3 DAYS FORECAST  FOR ${city} </h1>
        </div>
        <div id="${childid}" class="grid-section">

        </div>  
    
    `;
    // Html on parent card
    parentCard.innerHTML = html ;

    let cardson = document.getElementById(cardId);
    // List iteration
    json.list.forEach(element => {
        
        let temp =  parseInt(element.main.temp);
        let data = element.weather[0];
        let date = element.dt_txt;
         
        let main = data.main;
        let description = data.description;
        let icon = data.icon;
        // Adding the Forecast day Card
         forecast += `
         <div class="padding-small">
         <div class="card-transparent ">
                <div class="padding-small">
                    <h3>${date} weather in <span class="">${city}</span> </h3>
                    <h3><span class="main">${main}</span></h3>
                    <h1><span class="temperature">${temp}</span>°</h1>
                    <h3><span class="description">${description}</span> </h3>
                </div>
                <div class="padding-small">
                    <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt=""> 
                    </div> 
                </div>
            </div>
        </div>
        </div>`;
          
    });
    // Wheather Cards Html 
    let childdiv = document.getElementById(childid);
    childdiv.innerHTML = forecast;
    
}

// openweathermap.org Url base and Token
const ApiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiToken = '2c689ad51f75b6467af0c2069385327d';

////////////////////////////////////
// Global Weather Search Function //
////////////////////////////////////
function globalSearch(city,apiuri,apitkn){
    appendCurrentWheaterHtml('main-weather-card',httpGet(apiuri+'weather?appid='+apitkn+'&units=metric&q='+city));
    appendForecastWheaterHtml('forecast-main',httpGet(apiuri+'forecast?appid='+apitkn+'&cnt=3&units=metric&q='+city));
}
// First Seach (1st Bogota)
globalSearch('bogota',ApiUrl,apiToken);
// Extra Search for Current paris weather
appendCurrentWheaterHtml('paris-wheader',httpGet(ApiUrl+'weather?q=paris&appid='+apiToken+'&units=metric'));

///////////////////
// Custom Search //
///////////////////
function CustomSearch(){
    let searchTerm = document.getElementById("customsearch-input").value;
    searchTerm = searchTerm.replace(/[^A-Z0-9]/ig, "");
    if(searchTerm){
        globalSearch(searchTerm,ApiUrl,apiToken);
    }else{
        alert('Write a city to search :)');
    }
}
document.getElementById("customsearch-button").addEventListener("click", CustomSearch);

