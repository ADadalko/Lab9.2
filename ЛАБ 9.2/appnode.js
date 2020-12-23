// C:\Users\mp167\OneDrive\Рабочий стол\САИПИС 5 СЕМ\ЛАБ 9 ЖЕНЕК

const delete1 = require("./js/delete");
const edit = require("./js/edit");
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const app = express();
const jsonParser = express.json();
const mongoClient = new MongoClient("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "pug");
let dbClient;
app.use(express.static(__dirname + "/html"));
app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/resource"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));
let a = "";
let aud = "";
mongoClient.connect(function (err, client) {
  if (err) return console.log(err);
  dbClient = client;
  app.locals.collection = client.db("sheduledb").collection("subject");
  const db = client.db("sheduledb");
  db.collection("subject")
    .find({ class: "1" })
    .toArray(function (err, doc) {
      console.log("Предметы, занятия по которым будут проводится в 1й аудитории: ");
      for(let i = 0; i < doc.length; i++){
      console.log(doc[i].lesson);
      }
    });
  db.collection("subject")
    .find()
    .toArray(function (err, doc) {
      a = {
        result: doc,
      };
      console.log(doc);
    });
  app.listen(3001, function () {
    console.log("Сервер запущен");
  });
});

app.use("/orders", function (req, res) {
  res.render("orders", a);
});

app.get("/api/users", function (req, res) {
  const collection = req.app.locals.collection;
  collection.find({}).toArray(function (err, users) {
    if (err) return console.log(err);
    res.send(users);
  });
});
app.get("/api/users/:id", function (req, res) {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOne({ _id: id }, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.post("/api/users", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const userName = req.body.name;
  const sheduleLesson = req.body.lesson;
  const sheduleTime = req.body.time;
  const sheduleTeacher = req.body.teacher;
  const sheduleClass = req.body.class;
  const user = {
    name: userName,
    lesson: sheduleLesson,
    time: sheduleTime,
    teacher: sheduleTeacher,
    class: sheduleClass,
  };
  const collection = req.app.locals.collection;
  collection.insertOne(user, function (err, result) {
    if (err) return console.log(err);
    res.send(user);
  });
});

app.delete("/api/users/:id", function (req, res) {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  collection.findOneAndDelete({ _id: id }, function (err, result) {
    if (err) return console.log(err);
    let user = result.value;
    res.send(user);
  });
});

app.put("/api/users", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const id = new objectId(req.body.id);
  const userName = req.body.name;
  const sheduleLesson = req.body.lesson;
  const sheduleTime = req.body.time;
  const sheduleTeacher = req.body.teacher;
  const sheduleClass = req.body.class;

  const collection = req.app.locals.collection;
  collection.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        lesson: sheduleLesson,
        name: userName,
        time: sheduleTime,
        teacher: sheduleTeacher,
        class: sheduleClass,
      },
    },
    { returnOriginal: false },
    function (err, result) {
      if (err) return console.log(err);
      const user = result.value;
      edit = result.value;
      res.send(user);
    }
  );
});

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});
