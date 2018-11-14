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
                            <button onclick="editProduct()" >Edit</button>
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
  // document.getElementById('editproduct').addEventListener('click', editProduct);

      function editProduct(){
        document.getElementById('editail-card').style.visibility='visible';
        var table_products =document.getElementById("products-table");
        for (var i = 0; i<table_products.rows.length; i++){
          table_products.rows[i].onclick = function(){
            product_id = this.cells[0].innerHTML;
            // document.getElementById('test').value = this.cells[0].innerHTML;
            document.getElementById('editid').value = this.cells[0].innerHTML;
            document.getElementById('editname').value = this.cells[1].innerHTML;
            document.getElementById('editbrand').value = this.cells[2].innerHTML;
            document.getElementById('editquantity').value = this.cells[3].innerHTML;
            document.getElementById('editprice').value = this.cells[4].innerHTML;
            document.getElementById('editavailstock').value = this.cells[5].innerHTML;
            document.getElementById('editminstock').value = this.cells[6].innerHTML;
            document.getElementById('edituom').value = this.cells[7].innerHTML;
            document.getElementById('editcategory').value = this.cells[8].innerHTML;

            

          }
        }
      }
      var modifyproduct = document.getElementById('form-editproduct')
    if (modifyproduct){
      modifyproduct.addEventListener('submit', modifyProduct);

    function modifyProduct(e){
      e.preventDefault();
    
    let token = localStorage.getItem('token')
    let id =document.getElementById('editid').value
    let product_name = document.getElementById('editname').value;   
    let brand = document.getElementById('editbrand').value;
    let quantity = document.getElementById('editquantity').value;
    let price = document.getElementById('editprice').value;
    let avail_stock = document.getElementById('editavailstock').value; 
    let min_stock = document.getElementById('editminstock').value;
    let uom = document.getElementById('edituom').value;
    let category = document.getElementById('editcategory').value;

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
    fetch(`http://127.0.0.1:5000/api/v2/products/${id}`, {
      method: 'PUT',
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
      // .then((data) => console.log(data))
      .then((data)=>{
        console.log(data)
        if(data.message == "Product not found"){
          document.getElementById("message").style.color = 'red';             
          document.getElementById('message').innerHTML = data.message;
        }
        if(data.message == "Product updated successfully updated"){
          window.location ='http://127.0.0.1:5500/UI/html/inventory.html';
          viewProducts()
        }
       
      })
      .catch((err) => console.log(err))
    }
  }
      
