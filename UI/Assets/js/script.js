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
var createproduct = document.getElementById('addproduct')
    if (createproduct){
    createproduct.addEventListener('submit', CreateProduct);
    
    function CreateProduct(e){
    e.preventDefault();

    let token = localStorage.getItem('token')

    let product_name = document.getElementById('product_name').value;   
    let brand = document.getElementById('brand').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;
    let avail_stock = document.getElementById('avail_stock').value; 
    let min_stock = document.getElementById('min_stock').value;
    let uom = document.getElementById('uom').value;
    let category = document.getElementById('category').value;

    const product_data= {
                        "product_name": product_name,
                        "brand": brand,
                        "quantity": quantity,
                        "price": price,
                        "avail_stock": avail_stock,     
                        "min_stock": min_stock,
                        "uom": uom,
                        "category": category
                      }
    
    fetch('http://127.0.0.1:5000/api/v2/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json', 
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Request-Method': '*',
      "Authorization": 'Bearer ' + token
    },
    body: JSON.stringify(product_data)
  })
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data)
    if(data.message == "Enter valid Product Name"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "Enter valid Brand"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "Enter valid Unit of Measure"){
      document.getElementById("message").style.color = 'red';             
      ocument.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "Enter valid Category"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;;
    }
    if(data.message == "Product already exists"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
    }
    if(data.message == "Product added successfully"){  
                          
      window.location ='http://127.0.0.1:5500/UI/html/inventory.html';
    }
  })
  .catch((err) => console.log(err))
}  
}
// addproduct----------------------------------------------------------------------------------------------
document.getElementById('viewProducts').addEventListener('click', viewProducts);
    
    function viewProducts(){

      let productList = document.getElementById('prod-body')
      let token = localStorage.getItem('token')

      fetch('http://127.0.0.1:5000/api/v2/products',{
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json', 
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Method': '*',
          "Authorization": 'Bearer ' + token
        }
      })
     .then((res)=> res.json())
     .then(data => {
      if (data.message =="The product list is empty"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
      }
      if(data.message =="Products retrieved successfully"){
          data.products.forEach((product,index) => {
              productList.innerHTML += `<tr>
                      
                      <td>${product.product_name}</td>                      
                      <td> ${product.brand}</td>
                      <td> ${product.quantity}</td>
                      <td> ${product.price}</td>                     
                      <td> ${product.avail_stock}</td>                      
                      <td> ${product.min_stock}</td>
                      <td> ${product.v}</td>
                      <td> ${product.category}</td>
                      <td><button>view</button>
                          <button>Edit</button>
                          <button>Delete</button>
                      </td> 
                    </tr>`;       
            
          });
          
        }
    })
    .catch((err) => console.log(err))
   }
  // get all products--------------------------------------------------------
