
  document.getElementById('myviewSale').addEventListener('click', viewSales);
      
  function viewSales(){

      let salesList = document.getElementById('mysales-body')
      let token = localStorage.getItem('token')

  fetch('http://127.0.0.1:5000/api/v2/attsales',{
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
      if (data.message =="The sales list is empty"){
          document.getElementById("message").style.color = 'red';             
          document.getElementById('message').innerHTML = data.message;
         } 
          if (data.message =="success"){
              data.sales.forEach((sale)=>{
                  salesList.innerHTML += `<tr>
                          <td>${sale.id}</td>
                          <td>${sale.attendant_name}</td>
                          <td>${sale.product_name}</td>
                          <td>${sale.quantity}</td>
                          <td>${sale.price}</td>                     
                          <td>${sale.total_price}</td> 
                      </tr>`;
              });
          
          }       
      })
      .catch((err) => console.log(err))   
  }
