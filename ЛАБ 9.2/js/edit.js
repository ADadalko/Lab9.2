function EditUser(userId, userName, sheduleLesson, sheduleTime, sheduleTeacher, sheduleClass) {
    $.ajax({
        url: "api/users",
        contentType: "application/json",
        method: "PUT",
        data: JSON.stringify({
            id: userId,
            name: userName,
            lesson: sheduleLesson,
            time: sheduleTime,
            teacher: sheduleTeacher,
            class: sheduleClass
        }),
        success: function (user) {
            reset();
            console.log(user);
            $("tr[data-rowid='" + user._id + "']").replaceWith(row(user));
        }
    })
}

