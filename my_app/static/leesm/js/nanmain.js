function next(nowid,nextid) {
    $("#" + nowid).hide()
    $("#" + nextid).show()
}
function previous(nextid,nowid){
    $("#" + nextid).hide()
    $("#" + nowid).show()
}

function ch(){
    alert("정상")
}