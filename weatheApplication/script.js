let cityName =  document.querySelector(".weather_cityName");
        let date_Time =  document.querySelector(".weather_date_time");
        let w_forecast = document.querySelector('.weather_forecast');
        let w_icon =  document.querySelector(".weather_icon");
        let w_temperature= document.querySelector('.weather_temperature'),
            w_minTemp = document.querySelector(".weather_min"),
            w_maxTemp = document.querySelector(".weather_max");
       
        let w_fellsLike =document.querySelector(".weather_fellsLike"),
        w_humidity = document.querySelector('.weather_humidity') ,
        w_wind = document.querySelector('.weather_wind')
        w_pressure = document.querySelector('.weather_pressure');

        let weather_search = document.querySelector(".weather_search");

    const getcountryName = (code)=>{
        return new Intl.DisplayNames([code], { type: 'region' }).of(code);
    };

    const getTimeDate =(dtt)=>{
            let currDate = new Date(dtt * 1000);
         
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              };

          const formatter = new Intl.DateTimeFormat("en-US", options);
          console.log(formatter);
          return formatter.format(currDate);
    }

    let city ="Dhaka";
    // search place = ==
     weather_search.addEventListener("submit",(e)=>{
        e.preventDefault();
        let cityN = document.querySelector(".city_name");
        //console.log(cityName.value);
        city = cityN.value;
        getWeatherData();
        city = "";
        
     })
const getWeatherData = async ()=>{
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=302224e700b7142065cdc93310a46bf6`;

    try{
        let res = await fetch(weatherurl);
        let data = await res.json();
        //console.log(data);
        const { main,name,weather,wind,sys,dt }=data;

        cityName.innerHTML=`${name},${getcountryName(sys.country)}`;
        date_Time.innerHTML = getTimeDate(dt);
        w_forecast.innerHTML = weather[0].main;
        w_temperature.innerHTML = `Temp : ${main.temp.toFixed()}&#176 K`;
        w_minTemp.innerHTML = `Min : ${main.temp_min}&#176`;
        w_maxTemp.innerHTML = `Max : ${main.temp_max}&#176`;

        w_fellsLike.innerHTML =  `${main.feels_like}&#176`;    
        w_humidity.innerHTML = `${main.humidity}`;
        w_wind.innerHTML = `${wind.speed} km/h`;
        w_pressure.innerHTML = `${main.pressure} pa`;
        w_icon.innerHTML = `<img src=" https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`
    }catch(err){
        console.log(err);
        
    }
}

document.body.addEventListener("load",getWeatherData())