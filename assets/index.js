// Http Request General Function
function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    json = JSON.parse(xmlHttp.responseText)
    return json;
}

//  BannerHtml respective Weather data
function appendBannerWheaterHtml(cardId,json,type){
    
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

// 3Forecast respective Weather data
function appendForecastWheaterHtml(cardId,json,type){
    let html = ``;
    let card = document.getElementById(cardId);
    let city = json.city.name;
    json.list.forEach(element => {
        
        let temp =  parseInt(element.main.temp);
        let data = element.weather[0];
        let date = element.dt_txt;
         
        let main = data.main;
        let description = data.description;
        let icon = data.icon;
         html += `
        <div class="card-transparent padding-small">
            <div id="main-weather-card" class="grid-section">


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
                        `;
          
    });
    card.innerHTML = html;
    
}

appendBannerWheaterHtml('main-weather-card',httpGet('https://api.openweathermap.org/data/2.5/weather?q=bogota&appid=2c689ad51f75b6467af0c2069385327d&units=metric'),1);
appendForecastWheaterHtml('forecast',httpGet('https://api.openweathermap.org/data/2.5/forecast?q=bogota&appid=2c689ad51f75b6467af0c2069385327d&cnt=3&units=metric'),1);
