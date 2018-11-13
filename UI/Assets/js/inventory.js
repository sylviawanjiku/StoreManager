function productFilter() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("productInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("products-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  // search product--------------------------------------------------------------------
  document.getElementById('viewProd').addEventListener('click', viewProducts);
      
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
                        <td>${product.id}</td>
                        <td>${product.product_name}</td>                      
                        <td> ${product.brand}</td>
                        <td> ${product.quantity}</td>
                        <td> ${product.price}</td>                     
                        <td> ${product.avail_stock}</td>                      
                        <td> ${product.min_stock}</td>
                        <td> ${product.uom}</td>
                        <td> ${product.category}</td>
                        <td>
                            <button  onclick="editProduct()">Edit</button>
                            <button  onclick="deleteSingleProduct(${product.id})">Delete</button>
                            <button  class="button" id="sellProduct"><a href="sale.html">Sell</button>
                            </td> 
                      </tr>`;       
              
            });
           
          }
      })
      .catch((err) => console.log(err))
     }
    //  getallproducts--------------------------------------------------------------------------
    // document.getElementById("delete-product").addEventListener('click', deleteSingleProduct);
   
    
    function deleteSingleProduct(id){
      let product_id =id
   
    let token = localStorage.getItem('token')
  
    fetch(`http://127.0.0.1:5000/api/v2/products/${product_id}`,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json', 
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Method': '*',
          "Authorization": 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then((data)=>{
        if (data.message =='Product not found'){
        //     document.getElementById("message").style.color = 'red';             
        //     document.getElementById('message').innerHTML = data.message;
        }
        if (data.message =="Product successfully deleted"){
            // document.getElementById("message").style.color = 'red';             
            // document.getElementById('message').innerHTML = data.message;
        }
        window.location ='http://127.0.0.1:5500/UI/html/inventory.html';
    })
       
  }
  // delete------------------------------------------------------------------------------
  