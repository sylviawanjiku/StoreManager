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
