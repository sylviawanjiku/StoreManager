function userFilter() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("userInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("users-table");
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

document.getElementById('viewAllUsers').addEventListener('click', viewUsers);
    
    function viewUsers(){

      let userList = document.getElementById('users-body')
      let token = localStorage.getItem('token')

      fetch('http://127.0.0.1:5000/api/v2/users',{
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
      if (data.message =="The users list is empty"){
      document.getElementById("message").style.color = 'red';             
      document.getElementById('message').innerHTML = data.message;
      }
      if(data.message =="Users retrieved successfully"){
          data.users.forEach((user,index) => {
              userList.innerHTML += `<tr>
                      <td>${user.id}</td>
                      <td>${user.username}</td>                      
                      <td> ${user.first_name}</td>
                      <td> ${user.last_name}</td>
                      <td> ${user.password}</td>                     
                      <td> ${user.email}</td>                      
                      <td> ${user.is_admin}</td>
                      <td>
                          <button  onclick="editRole(${user.id})">Edit Role</button>
                      </td> 
                    </tr>`;       
            
          });
          
        }
    })
    .catch((err) => console.log(err))
   }
// allusers----------------------------------------------------------------------------------------------------------------------------------------------

function editRole(id){

  let user_id =id
  let token = localStorage.getItem('token')

  fetch(`http://127.0.0.1:5000/api/v2/attendant/${user_id}`,{
    method: 'POST',
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
    if (data.message =='Store attendant cannot be found'){

    }
    if (data.message =='Store attendant status changed to admin!'){
      window.location ='http://127.0.0.1:5500/UI/html/employee.html';
    }
    
  })
  }
