const userTab=document.querySelector("[data-userWeather]")
const searchTab=document.querySelector("[data-searchWeather]")
const userContainer=document.querySelector(".weather-container")

const grantAccessContainer=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[data-searchForm]")
const loadingScreen=document.querySelector(".loading-container")
const userInfoContainer=document.querySelector(".user-info-container")

const notFound = document.querySelector('.errorContainer');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');

//initially variables needed

let currentTab=userTab;
const API_KEY = "348029294bb2b4bb72cc6f74c087b202";
currentTab.classList.add("current-tab")  // css se color aya

//abhi ek kam baki hai //from starage we take the lat and lon
getfromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab"); //bg color usertab  se hata
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");    // bg color user se hatkar search tab pe laga
        notFound.classList.remove('active');

        if(!searchForm.classList.contains("active")){  // agar active nhi pada hua hai to add karo aur baki sare active remove karo from UI
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            // i was on search tab but ,now i have to visible weather tab
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            //now we R in your weather section then we have to display ,lets check the local storage first
            //for coordinates ,if we have  saved them there
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=>{
    //pass clicked tab as input parameter
    switchTab(userTab);
})


searchTab.addEventListener("click",()=>{
    //pass clicked tab as input parameter
    switchTab(searchTab);
})



//check if coordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //if we can't get local coordinates
        grantAccessContainer.classList.add("active");

    }else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


async function fetchUserWeatherInfo(coordinates){
    const{lat,lon}=coordinates;
    //first make invisible grantlocation container
    grantAccessContainer.classList.remove("active");

    loadingScreen.classList.add("active");
    

    //now API CALL
    try{

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (!data.sys) {
            throw data;
        }

        //ab data agya hai api se to loader hata denge 
        loadingScreen.classList.remove("active");

        //ab user conatiner ko visible karao
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
        notFound.classList.add('active');
        errorImage.style.display = 'block';
        errorText.innerText = `Error: ${err?.message || "Unable to fetch weather!"}`;
        errorBtn.style.display = 'block';
        // errorBtn.addEventListener("click", fetchUserWeatherInfo);
        
    }

}



function renderWeatherInfo(weatherInfo){

    //first we have to fetch the element

    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherInfo object and put it in UI elements
    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp} °C`;
    windspeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all}%`;


}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition); // location lene ke liye ek tarah se api hai 
    }
    else{
        //show na alert for no geiolocation support available
        grantAccessButton.style.display = 'none';
        notFound.classList.add("active");
        errorImage.style.display = "block";
        errorText.innerText = "Geolocation not supported in this browser.";
        errorBtn.style.display = "none";
        console.log("No geolocation support");
    }
}

function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));

    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton=document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);


const searchInput=document.querySelector("[data-searchInput]")

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;

    if(cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
    cityName="";
})


async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (!data.sys) {
            throw data;
        }

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = "block"; 
        errorText.innerText = `${err?.message || "City not found!"}`;
        errorBtn.style.display = "none";
        //hw
        console.log("Error found:"+err);

    }

 }

