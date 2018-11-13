
 function salesFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("saleInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("sales-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
 document.getElementById('viewSale').addEventListener('click', viewSales);
      
  function viewSales(){

      let salesList = document.getElementById('sales-body')
      let token = localStorage.getItem('token')

  fetch('http://127.0.0.1:5000/api/v2/sales',{
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
          if (data.message =="sales successfully retrieved"){
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
