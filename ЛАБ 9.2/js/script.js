
$("body").on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetUser(id);
})


$("body").on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteUser(id);
})


$("#open").click(function (e) {
    document.location.href = "http://localhost:3000/shedule";
})


$("#reset").click(function (e) {

    e.preventDefault();
    reset();
})

$("form").submit(function (e) {
    e.preventDefault();
    let id = this.elements["id"].value;
    let name = this.elements["region"].value;
    let lesson = this.elements["lesson"].value;
    let time = this.elements["time"].value;
    let teacher = this.elements["teacher"].value;
    let class1 = this.elements["class"].value;
    if (id == 0)
        CreateUser(name, lesson, time, teacher, class1);
    else
        EditUser(id, name, lesson, time, teacher, class1);
});

