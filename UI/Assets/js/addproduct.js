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

