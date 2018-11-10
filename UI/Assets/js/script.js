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
              }
              if (data.message =="Successfully logged In"){  
                          
                window.location ='http://127.0.0.1:5500/UI/html/dashboard.html';
              }
              window.localStorage.setItem('token',data.token);
            })
       }
      }
// Login.......................................................................
// var signup = document.getElementById('register')
// if (signup){
//   signup.addEventListener('submit', Signup);

//   function Signup(e){
//     e.preventDefault();

//     let token = localStorage.getItem('token')

//     const username = document.getElementById('username').value;
//     const firstname = document.getElementById('fname').value;
//     const lastname = document.getElementById('lname').value;
//     const password = document.getElementById('password').value;
//     const email = document.getElementById('email').value;
//     const is_admin = document.getElementById('admin').value;

//     const signup_data= {
//       "username": username,
//       "firstname": firstname,
//       "lastname": lastname,
//       "password": password,
//       "email": email,
//       "is_admin": is_admin
//     }

//     fetch('http://127.0.0.1:5000/api/v2/signup', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-type': 'application/json', 
//         'Access-Control-Allow-Origin':'*',
//         'Access-Control-Request-Method': '*',
//         "Authorization": token
//       },
//       body: JSON.stringify({email:email, password:password})
//     })
//     .then((res)=> res.json())
//     .then((data)=>{
//       let message =document.getElementById('message')
//       if(data.message == "enter valid email"){
//         message.style.color = 'red';
//         error_reg.innerHTML= data.message;
//       }
//       if(data.message == "username must be a string"){
//         message.style.color = 'red';
//         error_reg.innerHTML= data.message;
//       }
//       if(data.message == "Firstname must be a string"){
//         message.style.color = 'red';
//         error_reg.innerHTML= data.message;
//       }
//       if(data.message == "Lastname must be a string"){
//         message.style.color = 'red';
//         error_reg.innerHTML= data.message;
//       }
//       if(data.message == "Password should start with a capital letter and include a number"){
//         message.style.color = 'red';
//         error_reg.innerHTML= data.message;
//       }
//       if(data.message == "User already exists"){
//         message.style.color = 'red';
//         error_reg.innerHTML= data.message;
//       }
//       if(data.message == "user created successfully"){
//         message.style.color = 'green';
//         error_reg.innerHTML= data.message;
//       } 
//     })
//     .catch((err) => console.log(err))
//   }  
// } 
