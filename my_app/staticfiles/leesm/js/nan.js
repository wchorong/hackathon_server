//지도 초기설청및 생성
var container = document.getElementById('map'); //지도를 표시할 div 지정  id로 지정이 가능하다
var options = {//지도의 초기 옵션을 지정한다.
  center: new kakao.maps.LatLng(33.450701, 126.570667),//지도의 초기 위치를 설정한다. 현 위도 경도는 제주도의 카카오 본사이다
  level: 3 // 지도의 확대 레벨
};
var map = new kakao.maps.Map(container, options); // 지도 생성

navigator.geolocation.getCurrentPosition(function(position) {
        
    var lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도
    
    var locPosition = new kakao.maps.LatLng(lat, lon);
        
    map.setCenter(locPosition);
});


$('#searchBtn').click(function(){
    // 버튼을 click했을때
    

    
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch($('#address').val(), function(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            
            // 추출한 좌표를 통해 도로명 주소 추출
            let lat = result[0].y;
            let lng = result[0].x;
            getAddr(lat,lng);

            function getAddr(lat,lng){
                let geocoder = new kakao.maps.services.Geocoder();

                let coord = new kakao.maps.LatLng(lat, lng);
                let callback = function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        // 추출한 도로명 주소를 해당 input의 value값으로 적용
                        //$('#address').val(result[0].road_address.address_name);
                    }
                }
                geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
            }
            
            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">원하시는 장소가 여기 인가요?</div>'
            });
            infowindow.open(map, marker);

            var addin = result[0].road_address.address_name
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            $('input[name=address]').attr('value',addin);
            
            map.setCenter(coords);
            
        } 
    });  
});






    // 현재 날짜를 가져오는 함수
function getCurrentDate() {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hour = currentDate.getHours();
  var min = currentDate.getMinutes();
  var time = currentDate.setTime();
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    min: min,
    time:time
  };
}

// 선택한 월의 달력을 만드는 함수
function createCalendar(year, month) {
  var startDate = new Date(year, month - 1, 1);
  var endDate = new Date(year, month, 0);
  var startDay = startDate.getDay();
  var endDay = endDate.getDate();
  
  var calendarHTML = '<table>';
  var date = 1;
  var currentDate = getCurrentDate();

  for (var week = 0; week < 6; week++) 
  {
    calendarHTML += '<tr>';
    for (var day = 0; day < 7; day++) 
    {
      if ((week === 0 && day < startDay) || date > endDay)  
      {
        calendarHTML += '<td></td>'; //empty space
      } 
      else 
      {
        var className = '';
        var year1 = year;
        var month1 = month;
        if (currentDate.year > year) 
        {
          className = 'current-date';
        } else if (currentDate.year === year && currentDate.month > month) {
          className = 'current-date';
        } else if(currentDate.year === year && currentDate.month === month && currentDate.day > date) {
          className = 'current-date';
        }
        // alert(cun.year);
        calendarHTML += '<td>' +'<div class ="' + className + '" onclick="clickdate('+year1+"," + month1 + ","+date+')">' + date + '</div >'+'</td>';
        date++;
      }
    }
    calendarHTML += '</tr>';
    if (date > endDay) {
      break;
    }
  }
  
  calendarHTML += '</table>';
  
  return calendarHTML;
}

// 달력을 표시하는 함수
function displayCalendar(year, month) 
  {
  document.getElementById('yearMonth').innerHTML = year + "."+ month; 
  var calendarContainer = document.getElementById('tbl-month');
  calendarContainer.innerHTML = createCalendar(year, month);
}

// 현재 날짜로 달력을 표시
var currentDate = getCurrentDate();
var currentYear = currentDate.year;
var currentMonth = currentDate.month;
displayCalendar(currentYear, currentMonth);

// 다음 달로 이동하는 함수
function nextMonth() {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  displayCalendar(currentYear, currentMonth);
}

// 이전 달로 이동하는 함수
function prevMonth() {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  displayCalendar(currentYear, currentMonth);
}

// 다음 달, 이전 달 버튼 클릭 이벤트 처리
var nextBtn = document.getElementById('month-next');
nextBtn.addEventListener('click', nextMonth);

var prevBtn = document.getElementById('month-prev');
prevBtn.addEventListener('click', prevMonth);



// var target = document.querySelectorAll('.btn_open');
// var btnPopClose = document.querySelectorAll('.date_month_bd .current-date');
// var targetID;

// 팝업 열기
// for(var i = 0; i < target.length; i++){
//   target[i].addEventListener('click', function(){
//     targetID = this.getAttribute('href');
//     document.querySelector(targetID).style.display = 'block';
//   });
// }



// function doAction() {
//   let addressinput = document.getElementById("inputValue");
//   let contentinput = document.getElementById("content");
//   let dateinput = document.getElementById("date");
//   let timeinput = document.getElementById("time");


//   if (addressinput.value.length == 0) {
//     alert("주소가 입력되지 않았습니다.");
//     return false;
//   }
//   if (contentinput.value.length == 0) {
//     alert("요청내용이 입력되지 않았습니다.");
//     return false;
//   }
//   if (dateinput.value.length == 0) {
//     alert("요청날짜이 입력되지 않았습니다.");
//     return false;
//   }
//   if (timeinput.value.length == null) {
//     alert("요청시간이 입력되지 않았습니다.");
//     return false;
//   }
//   // alert(addressinput);
//   // alert(contentinput);
//   // alert(dateinput);
//   // alert(timeinput);
//   return true;
// }

// function previous(nextid,nowid){
//   $("#" + nextid).hide()
//   $("#" + nowid).show()
// }

// function myFunction() {
//   const element = document.getElementById("contentbox");
//   element.scrollIntoView();
// }

// $(document).ready(function(){
//   const element1 = document.getElementById("contentbox");
//   element1.scrollIntoView();
// })

// window.onload = function () {
//   const element1 = document.getElementById("body");
//   element1.scrollIntoView();
// }

var daytime = 0;
function settime() {
  daytime = 1
  return daytime;
}
function showdate() {
  $("#pop_info_1").show();
}

function showtime() {
  $("#pop_info_2").show()
  // var ti = getCurrentDate();
  // alert(ti.min)
  displaytime();
  
}

function clicktime(time) {
  let words = time.split(':');
  var checktime = getCurrentDate();
  // alert(words[0]);
  // alert(words[1]);
  time1 = words[0]+words[1];
  var x = String(checktime.hour);
  if (daytime == 0){
    $('input[name=time]').attr('value',time);
    $("#pop_info_2").hide();
  }else{
    if(checktime.min < 10){
      var y = String(checktime.min);
      y = 0 + y
      
    }else{
      var y = String(checktime.min);
    }
    time2 = x+y;
    if (time2 < time1) {
      $('input[name=time]').attr('value',time);
      $("#pop_info_2").hide();
    }
  }

}

function clickdate(year,month,date) {
  var currentDate = getCurrentDate();
  var btndate = new Date(year,month-1,date+1).toISOString().substring(0, 10);
  if (currentDate.year > year) {
    alert("df")
  } else if (currentDate.year === year && currentDate.month > month) {
    alert("df")
  } else if(currentDate.year === year && currentDate.month === month && currentDate.day > date) {
    alert("df")
  }else{
    $('input[name=date]').attr('value',btndate);
    $("#pop_info_1").hide()
  }
  if (currentDate.year === year && currentDate.month === month && currentDate.day === date){
    settime();
  }else{
    daytime = 0;
  }
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


function createtime() {
  
  var timehtml = "<div>";
  var crhour = 6;
  var crmin = 0
  var currenttime = getCurrentDate()

  for (let a = 0; a < 9; a++) {
    timehtml += '<div class="timebtnbox">';
    if (daytime == 0) {
      for (let b = 0; b < 2; b++) {
        if (crhour<10) {
          timehtml += "<div class=" + "timebtn"+ " onclick=" +"clicktime('0"+crhour+":00:00')" + ">"+ crhour+":00</div>";
          timehtml += "<div class=" + "timebtn"+ " onclick=" +"clicktime('0"+crhour+":30:00')" + ">"+ crhour+":30</div>";
        } else {
          timehtml += "<div class=" + "timebtn"+ " onclick=" +"clicktime('"+crhour+":00:00')" + ">"+ crhour+":00</div>";
          timehtml += "<div class=" + "timebtn"+ " onclick=" +"clicktime('"+crhour+":30:00')" + ">"+ crhour+":30</div>";
        }
        crhour++;
      }
    }else{
      for (let b = 0; b < 4; b++) {
        var timebtnclass = "timebtn"

        if(currenttime.hour > crhour){
          timebtnclass = "timebtn2"
          // if (currenttime.hour > 30) {
          //   timebtnclass = "timebtn2"
          // } && currenttime.min < 30 && crmin ==0
        }else if (currenttime.hour == crhour && currenttime.min <= 30 && crmin ==0) {
          timebtnclass = "timebtn2"
        }else if (currenttime.hour == crhour && currenttime.min >= 30 ) {
          timebtnclass = "timebtn2"
        }
        if (crhour<10) {
          timehtml += "<div class=" + timebtnclass+ " onclick=" +"clicktime('0"+crhour+":"+crmin+"0:00')" + ">"+ crhour+":"+crmin+"0</div>";
          // timehtml += "<div class=" + timebtnclass+ " onclick=" +"clicktime('0"+crhour+":30:00')" + ">"+ crhour+":30</div>";
        } else {
          timehtml += "<div class=" + timebtnclass+ " onclick=" +"clicktime('"+crhour+":"+crmin+"0:00')" + ">"+ crhour+":"+crmin+"0</div>";
          // timehtml += "<div class=" + timebtnclass+ " onclick=" +"clicktime('"+crhour+":30:00')" + ">"+ crhour+":30</div>";
        }
        if(crmin == 0){
          crmin = 3;
        }else{
          crhour++;
          crmin = 0;
        }
        
      }
    }
    
    timehtml += '</div>';
  }
  timehtml += "</div>";
  
  return timehtml;
}

function displaytime() 
{
  var timeContainer = document.getElementById('timeinputboxiner');
  timeContainer.innerHTML = createtime();
}



// var target = document.querySelectorAll('.btn_open');
// var btnPopClose = document.querySelectorAll('.date_month_bd .current-date');
// var targetID;

// // 팝업 열기
// for(var i = 0; i < target.length; i++){
//   target[i].addEventListener('click', function(){
//     targetID = this.getAttribute('href');
//     document.querySelector(targetID).style.display = 'block';
//   });
// }