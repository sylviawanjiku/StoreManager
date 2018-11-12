let login = document.getElementById('login_form')
      if (login){
        login.addEventListener('submit', Login);
      
      function Login(e){
        e.preventDefault();
      
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
      
        fetch('http://127.0.0.1:5000/api/v2/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({email:email, password:password})
        })
        .then((res)=> res.json())
        .then((data)=>{
              console.log(data)
              
              if (data.message == "User not found"){  
                //  document.getElementById("message").style.color = 'red';             
                //  document.getElementById('message').innerHTML = data.message
                alert('User not found')
              }
              if (data.message =="Successfully logged In"){  
                alert('Successfully logged In')
                window.location ='http://127.0.0.1:5500/UI/html/dashboard.html';
              }
              window.localStorage.setItem('token',data.token);
            })
       }
      }
// Login.......................................................................
document.getElementById('logout-user').addEventListener('click', logoutUsers);

function logoutUsers(){
  let token = localStorage.getItem('token')

  fetch('http://127.0.0.1:5000/api/v2/logout',{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json', 
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Method': '*',
          "Authorization": 'Bearer ' + token
        }
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem('access_token');
        if(data.message ==  "Successfully logged out"){
          
      }
      window.location ='http://127.0.0.1:5500/UI/html/index.html';
           })
}

//logout.........................................................................

var signup = document.getElementById('register')
if (signup){
signup.addEventListener('submit', Signup);

function Signup(e){
  e.preventDefault();

  let token = localStorage.getItem('token')

  let username = document.getElementById('username').value;   
  let first_name = document.getElementById('first_name').value;
  let last_name = document.getElementById('last_name').value;
  let password = document.getElementById('password').value;
  let email = document.getElementById('email').value; 
  let is_admin = document.getElementById('admin').value;

  // const signup_data= {
  //   "username": username,
  //   "email": email,
  //   "firstname": firstname,
  //   "lastname": lastname,
  //   "password": password,     
  //   "is_admin": is_admin
  // }

  fetch('http://127.0.0.1:5000/api/v2/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json', 
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Request-Method': '*',
      "Authorization": 'Bearer ' + token
    },
    body: JSON.stringify({username:username,first_name:first_name,last_name:last_name,
                          password:password, email:email,is_admin:is_admin})
  })
  .then((res)=> res.json())
  // .then((data)=>console.log(data))
  .then((data)=>{
    console.log(data)
    // let message =document.getElementById('message')
    if(data.message == "enter valid email"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "username must be a string"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "Firstname must be a string"){
      document.getElementById("message").style.color = 'red';             
      ocument.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "Lastname must be a string"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;;
    }
    if(data.message == "Password should start with a capital letter and include a number"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "User already exists"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "user created successfully"){  
                          
      window.location ='http://127.0.0.1:5500/UI/html/employee.html';
    }
  })
  .catch((err) => console.log(err))
}  
} 

// signup------------------------------------------------------------------------------------------
