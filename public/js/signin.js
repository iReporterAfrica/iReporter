const basePath = "../";

if (localStorage.userToken) {
  window.location = `userp.html?id=${localStorage.id}` || `admin.html?id=${localStorage.id}`;
}

function submitLogin(e) {
   e.preventDefault()
  const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }

  fetch('https://ireporterafrica.herokuapp.com/api/v1/users/signin', {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json"
    }
    
  })
  .then((res) => {
      return res.json();
    })
  .then(async (r) => {
    console.log('hhhhhhhhhhhhhhhhhhhhhhh', r, r.users.id, r.users.email)
  if(!r.token) throw('token not recieved')
   await window.localStorage.setItem('userToken', r.token)
   await window.localStorage.setItem('id', r.users.id)
   //window.reload.location;
    // const decoded =  JSON.parse(atob(r.token.split('.')[1]));
    if(r.users.isadmin) {
      window.location.href = `${basePath}admin.html?id=${r.users.id}`
    } else {
      window.location.href = `${basePath}userp.html?id=${r.users.id}`
    }
  })
  .catch(error => {
    console.log("error message:", error)
  });
};

document.getElementById("signInForm").addEventListener("submit", submitLogin);