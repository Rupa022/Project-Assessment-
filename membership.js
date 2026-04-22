// 1. ADD MEMBERSHIP
function save(){
  let name = document.getElementById("name").value;

  if(name === ""){
    alert("All fields required");
    return;
  }

  let duration = document.querySelector('input[name="duration"]:checked').value;

  let data = {
    id: Date.now(),
    name,
    duration
  };

  let list = JSON.parse(localStorage.getItem("members")) || [];
  list.push(data);

  localStorage.setItem("members", JSON.stringify(list));

  alert("Saved Successfully");
}

// 2. LOAD DATA (for update)
function loadData(){
  let id = document.getElementById("id").value;

  let list = JSON.parse(localStorage.getItem("members")) || [];

  let member = list.find(m => m.id == id);

  if(!member){
    alert("Member not found");
    return;
  }

  document.getElementById("name").value = member.name;

  document.querySelector(`input[value="${member.duration}"]`).checked = true;
}

// 3. UPDATE MEMBERSHIP
function update(){
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let duration = document.querySelector('input[name="duration"]:checked').value;

  let list = JSON.parse(localStorage.getItem("members")) || [];

  let index = list.findIndex(m => m.id == id);

  if(index === -1){
    alert("Member not found");
    return;
  }

  list[index].name = name;
  list[index].duration = duration;

  localStorage.setItem("members", JSON.stringify(list));

  alert("Updated successfully");
}