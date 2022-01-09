const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));


const scheduler = require("./handlers/scheduler/scheduler");
const { validate } = require('./handlers/validation/validator');
const { loginHandler } = require('./handlers/login/login')

//=======TEST ENDPOINTS=======//

app.get("/", validate(["admin"]), (req, res) => { res.send("the server is running properly") });

//=======LOGIN endpoints=======//  

app.post("/login", validate(["public"]), loginHandler)

//=======CRUD endpoints=======//  

//  CRUD kelas
app.get(auth(["admin","petugas"]),"/api/crud/kelas");
app.post("/api/crud/kelas");
app.put("/api/crud/kelas");
app.delete("/api/crud/kelas");

//  CRUD pembayaran
app.get("/api/crud/pembayaran");
app.post("/api/crud/pembayaran");
app.put("/api/crud/pembayaran");
app.delete("/api/crud/pembayaran");

//  CRUD petugas
app.get("/api/crud/petugas");
app.post("/api/crud/petugas");
app.put("/api/crud/petugas");
app.delete("/api/crud/petugas");

//  CRUD siswa
app.get("/api/crud/siswa");
app.post("/api/crud/siswa");
app.put("/api/crud/siswa");
app.delete("/api/crud/siswa");

//  CRUD spp  
app.get("/api/crud/spp");
app.post("/api/crud/spp");
app.put("/api/crud/spp");
app.delete("/api/crud/spp");



app.listen(3000, () => { console.log("server is running at port : 3000") });