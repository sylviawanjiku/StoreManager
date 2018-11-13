
var sellproduct = document.getElementById('makesale')
if (sellproduct){
  sellproduct.addEventListener('submit', ProductSale);

  function ProductSale(e){
    e.preventDefault();


  let token = localStorage.getItem('token')
  let product_name = document.getElementById('product_name').value;  
  let quantity = document.getElementById('quantity').value; 

  const sales_data= {
                      "product_name": product_name,
                      "quantity": quantity,
                       }
  fetch('http://127.0.0.1:5000/api/v2/sales',{
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type': 'application/json', 
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Request-Method': '*',
        "Authorization": 'Bearer ' + token
      },
      body: JSON.stringify(sales_data)
        })
      .then((res)=> res.json())
      .then((data)=>{
      console.log(data)
      if(data.message == "Product is out of stock"){
        document.getElementById("message").style.color = 'red';             
        document.getElementById('message').innerHTML = data.message;
        }
      if(data.message == "Sale successful"){
        window.location ='http://127.0.0.1:5500/UI/html/inventory.html';
        }
      })
    }

  }

// sellproduct----------------------------------------------------------------------------------------------------------------------------------------------------

