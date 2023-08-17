function logindoAction() {
    let idinput = document.getElementById("username");
    let passwordinput = document.getElementById("password");

    if (idinput.value.length == 0) {
        alert("id가 입력되지 않았습니다.");
        return false;
    }
    if (passwordinput.value.length == 0) {
        alert("비밀번호가 입력되지 않았습니다.");
        return false;
    }   

    return true;
    }
    
function signupdoAction() {
    let idinput = document.getElementById("email");
    let password1input = document.getElementById("password1");
    let password2input = document.getElementById("password2");
    let nameinput = document.getElementById("name");
    let numinput = document.getElementById("phone_num");
    if (idinput.value.length == 0) {
        alert("id가 입력되지 않았습니다.");
        return false;
    }
    if (password1input.value.length == 0) {
        alert("비밀번호가 입력되지 않았습니다.");
        return false;
    }   
    if (password2input.value.length == 0) {
        alert("재확인 비밀번호가 입력되지 않았습니다.");
        return false;
    } 
    if (nameinput.value.length == 0) {
        alert("이름이 입력되지 않았습니다.");
        return false;
    } 
    if (numinput.value.length == 0) {
        alert("전화번호가 입력되지 않았습니다.");
        return false;
    } 
    
    return true;

}

function next1(nowtutoid,nexttutoid,nowboxid,nextboxid,inputid) {
    let inputcheck = document.getElementById(inputid);
    // alert(inputid)
    // alert(inputcheck.value)
    if (inputcheck.value.length != 0) {
      
      $("#" + nowtutoid).hide()
      $("#" + nexttutoid).show()
      // myFunction()
      document.getElementById(nowboxid).style.zIndex = 1;
      document.getElementById(nowboxid).style.boxShadow = "none";
      document.getElementById(nexttutoid).style.zIndex = 2;
      document.getElementById(nextboxid).style.zIndex = 2;
      document.getElementById(nextboxid).style.boxShadow = " 0 0 0 9999px rgba(0,0,0,0.5)";
    } else{
      alert("도움말에 따라 값을 입력하거나 선택하세요");
    }
}
function next(nowtutoid,nexttutoid,nowboxid,nextboxid) {
    $("#" + nowtutoid).hide()
      $("#" + nexttutoid).show()
      // myFunction()
      document.getElementById(nowboxid).style.zIndex = 1;
      document.getElementById(nowboxid).style.boxShadow = "none";
      document.getElementById(nexttutoid).style.zIndex = 2;
      document.getElementById(nextboxid).style.zIndex = 2;
      document.getElementById(nextboxid).style.boxShadow = " 0 0 0 9999px rgba(0,0,0,0.5)";
}
function previous(nowtutoid,nexttutoid,nowboxid,nextboxid){
    $("#" + nowtutoid).hide()
    $("#" + nexttutoid).show()
    // myFunction()
    document.getElementById(nextboxid).style.zIndex = 1;
    document.getElementById(nextboxid).style.boxShadow = "none";
    document.getElementById(nowboxid).style.zIndex = 2;
    document.getElementById(nowboxid).style.zIndex = 2;
    document.getElementById(nowboxid).style.boxShadow = " 0 0 0 9999px rgba(0,0,0,0.5)";
}