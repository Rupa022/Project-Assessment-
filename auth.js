function login(){
  let role = document.getElementById("role").value;

  localStorage.setItem("role", role);

  window.location.href = "dashboard.html";
}