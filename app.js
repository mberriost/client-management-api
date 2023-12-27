const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.json());

// Get all clients
app.get("/clients", (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new client
app.post("/clients", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Client added successfully", id: result.insertId });
    }
  );
});

// Get a client by id
app.get("/clients/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM clients WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update a client
app.put("/clients/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  db.query(
    "UPDATE clients SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Client updated successfully" });
    }
  );
});

// Delete a client by id
app.delete("/clients/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM clients WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "Client deleted successfully" });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
