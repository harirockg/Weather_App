// console.log('hello harivansh jee');

// const API_KEY = "348029294bb2b4bb72cc6f74c087b202"; //its my api key

// function renderWeatherInfo(data){
//     let newPara=document.createElement('P');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} °C` //nhi samjh aya

//     document.body.appendChild(newPara);
// }

// async function fetchWeatherdetails() {
//     try{
//         let city = "goa";

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//         const data = await response.json();
//         console.log("Weather data: -> " , data);

//         renderWeatherInfo(data);
//     }
//     catch(err){
//         //handle the error here

//     }

//     // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// }


// async function getCustomWeatherDetails(){

//     try{
//         let lat=17.6333;
//         let lon=18.3333;

//         let result =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         let data=await result.json();

//         console.log(data);
//     }

//     catch(err){
//         console.log("Error found:"+err);
//     }

    
// }



// function switchTab(clickedTab) {

//     apiErrorContainer.classList.remove("active");

//     if (clickedTab !== currentTab) {
//         currentTab.classList.remove("current-tab");
//         currentTab = clickedTab;
//         currentTab.classList.add("current-tab");

//         if (!searchForm.classList.contains("active")) {
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         } 
//         else {
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             // getFromSessionStorage();
//         }
//     }

//     // console.log("Current Tab", currentTab);
// }



// // ye browser se popup request ayegi for allow of location then it will fetch the latitude nad longitude of the user

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No geolocation support");
//     }
// }


// function showPosition(position){
//     let lat=position.coords.latitude;
//     let lon=position.coords.longitude;

//     console.log(lat);
//     console.log(lon);
// }





