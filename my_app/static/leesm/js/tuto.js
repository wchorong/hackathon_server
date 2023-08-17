/**
 * 
 * @param {지금 div의 주소} nowid 
 * @param {다음div주소} nextid 
 * 다음페이지로 이동하는 함수 onclick으로 사용할 예정임
 */
function next(nowid,nextid) {
    $("#" + nowid).hide()
    $("#" + nextid).show()
}
function previous(nextid,nowid){
    $("#" + nextid).hide()
    $("#" + nowid).show()
}

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
                        $('#address').val(result[0].road_address.address_name);
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
            $('input[name=inputValue]').attr('value',addin);
            
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
  
  return {
    year: year,
    month: month,
    day: day
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
        if (currentDate.year === year && currentDate.month === month && currentDate.day === date) 
        {
          className = 'current-date';
          year1 = year;
          month1 = month;
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

function clickdate(year,month,date) {
  var btndate = new Date(year,month-1,date+1).toISOString().substring(0, 10);
  $('input[name=inputValue2]').attr('value',btndate); 
  $("#pop_info_1").hide()  

}

var target = document.querySelectorAll('.btn_open');
var btnPopClose = document.querySelectorAll('.date_month_bd .current-date');
var targetID;

// 팝업 열기
for(var i = 0; i < target.length; i++){
  target[i].addEventListener('click', function(){
    targetID = this.getAttribute('href');
    document.querySelector(targetID).style.display = 'block';
  });
}

function clicktime(time) {
  $('input[name=inputValue3]').attr('value',time); 
  $("#pop_info_2").hide()  
}

