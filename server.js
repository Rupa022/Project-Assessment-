const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = 'data.json';

// SAFE READ
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.log("READ ERROR:", err);
    return { users: [], members: [], transactions: [] };
  }
}

// SAFE WRITE
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log("WRITE ERROR:", err);
  }
}

// LOGIN
app.post('/login', (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { username, password } = req.body;

    const data = readData();

    const user = data.users.find(
      u => u.username === username && u.password === password
    );

    if(user){
      res.json({ success: true, role: user.role });
    } else {
      res.json({ success: false });
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).send("Server error");
  }
});

// ADD MEMBER
app.post('/addMember', (req, res) => {
  try {
    const data = readData();
    data.members.push(req.body);
    writeData(data);
    res.send("Added");
  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).send("Error");
  }
});

// GET MEMBERS
app.get('/members', (req, res) => {
  try {
    const data = readData();
    res.json(data.members);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).send("Error");
  }
});

// UPDATE MEMBER
app.post('/updateMember', (req, res) => {
  try {
    const data = readData();
    let index = data.members.findIndex(m => m.id == req.body.id);

    if(index !== -1){
      data.members[index] = req.body;
      writeData(data);
      res.send("Updated");
    } else {
      res.send("Not found");
    }
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).send("Error");
  }
});

// TRANSACTION
app.post('/transaction', (req, res) => {
  try {
    const data = readData();
    data.transactions.push(req.body);
    writeData(data);
    res.send("Saved");
  } catch (err) {
    console.log("TRANS ERROR:", err);
    res.status(500).send("Error");
  }
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});