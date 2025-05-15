const card = document.querySelector(".card-container");
const thevalue = document.querySelector(".inputvalue");
const weather=document.querySelector(".weatherform");
const Apikey="ec04c0decdf37c0a4b7874339b93ffb9"


weather.addEventListener("submit",async event=>{
    event.preventDefault()
    const city = thevalue.value;
    if(city){
        try{
            const theweather = await getweatherdata(city)
            displaydata(theweather)

        }
        
        catch(error){
            console.error(error)
            displayerror(error)
        }
        
    }

    else{
        displayerror("Please Enter the City")
    }

    



})



async function getweatherdata(city){
    const apiadd =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}`;

    const response = await fetch(apiadd)

    if(!response.ok){
        throw new Error("Failed to process city")
    }
    return response.json();
}




function displaydata(displayelement){

    const {name:city,
           main:{temp,humidity},
           weather:[{description,id}]}=displayelement;

    card.textContent="";
    card.style.display="flex";




    const city_name=document.createElement("H1");
    const temp_display=document.createElement("p");
    const humid_display=document.createElement("p");
    const disc_display=document.createElement("p");
    const emoji_display=document.createElement("p");
    const wheatheremoji=emoji(id);



    city_name.textContent=`${city}`;
    city_name.classList.add("cityname");
    temp_display.textContent=`${(temp - 273.15 ).toFixed(1)}°C`;
    temp_display.classList.add("tempdisplay");
    humid_display.textContent=`Humidity: ${humidity}%`;
    humid_display.classList.add("humidisplay");
    disc_display.textContent=`${description}`;
    disc_display.classList.add("discdisplay");
    emoji_display.textContent=`${wheatheremoji}`
    emoji_display.classList.add("emojidisplay");



    card.appendChild(city_name);
    card.appendChild(temp_display);
    card.appendChild(humid_display);
    card.appendChild(disc_display);
    card.appendChild(emoji_display);

    
    
}


function emoji(value){
    switch(true){
        case (value>=200 && value<300):
            return "⛈️";

        case (value>=300 && value<500):
            return "🌧️";

        case (value>=500 && value<600):
            return "🌦️";
 
        case (value>=600 && value<701):
            return "🌨️";
 

        case (value>=701 && value<800):
            return "🌫️";


        case (value>=800 && value<801):
            return "☀️";
            
        case (value>=801 && value<804):
            return "⛅";
}
}





function displayerror(errorelement){
    const newelement = document.createElement("p");
    newelement.textContent=errorelement;
    newelement.classList.add("errordisplay");

    
    card.textContent="";
    card.style.display="flex"
    card.append(newelement);
}