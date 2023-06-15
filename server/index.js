const express = require("express");
const app = express();
const mysql = require("mysql2");

const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "rent",
});

//////////////////////////////// USERS REGISTRATION ////////////////////////////////

app.post("/create", (req, res) => {
  const username = req.body.username;
  const age = req.body.age;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  db.query(
    "INSERT INTO users (username, age, email, password, phoneNumber) VALUES (?,?,?,?,?)",
    [username, age, email, password, phoneNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length > 0) {
          res.send({ message: "Login successful", user: result[0] });
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/user-exists", (req, res) => {
  const email = req.body.email;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Database error" });
      } else {
        if (results.length > 0) {
          res.send({ exists: true });
        } else {
          res.send({ exists: false });
        }
      }
    }
  );
});


app.put("/update", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//////////////////////////////// APARTMENTS ////////////////////////////////

app.post("/createApart", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const email = req.body.email;
  const description = req.body.description;
  const price = req.body.price;
  const beds = req.body.beds;
  const baths = req.body.baths;
  const image = req.body.image;

  db.query(
    "INSERT INTO rentals (name, address, description, price, beds, baths, image, email) VALUES (?,?,?,?,?,?,?,?)",
    [name, address, description, price, beds, baths, image, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/aparts", (req, res) => {

  db.query("SELECT * FROM rentals", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updatePrice", (req, res) => {
  const id = req.body.id;
  const price = req.body.price;
  db.query(
    "UPDATE rentals SET price = ? WHERE id = ?",
    [price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deleteAparts/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM rentals WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/loginAparts", (req, res) => {
  const email = req.body.email;

  db.query(
    "SELECT * FROM rentals WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Database error" });
      } else {
        res.send({ aparts: results });
      }
    }
  );
});


app.get("/aparts/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM rentals WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Database error" });
    } else {
      if (result.length > 0) {
        res.send(result[0]);
      } else {
        res.status(404).send({ message: "Apartment not found" });
      }
    }
  });
});

app.get("/apartsFilter", (req, res) => {
  const { price, beds, baths, search } = req.query;
  let query = "SELECT * FROM rentals WHERE 1=1";

  if (price) {
    query += ` AND price <= ${price}`;
  }

  if (beds) {
    query += ` AND beds = ${beds}`;
  }

  if (baths) {
    query += ` AND baths = ${baths}`;
  }

  if (search) {
    query += ` AND (name LIKE '%${search}%' OR description LIKE '%${search}%')`;
  }

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(result);
    }
  });
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
