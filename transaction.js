function pay(){
  let id = document.getElementById("memberId").value;
  let amount = document.getElementById("amount").value;

  if(id === "" || amount === ""){
    alert("All fields required");
    return;
  }

  let transaction = {
    id,
    amount,
    date: new Date().toLocaleString()
  };

  let list = JSON.parse(localStorage.getItem("transactions")) || [];
  list.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(list));

  alert("Payment Done");

  showHistory();
}

function showHistory(){
  let list = JSON.parse(localStorage.getItem("transactions")) || [];

  let output = "";

  list.forEach(t => {
    output += `<p>ID: ${t.id} | ₹${t.amount} | ${t.date}</p>`;
  });

  document.getElementById("history").innerHTML = output;
}

showHistory();