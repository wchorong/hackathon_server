//  MODAL 관련




// // 현재 위치로 지도 생성
// navigator.geolocation.getCurrentPosition(function (position) {
//   var lat = position.coords.latitude, // 위도
//     lon = position.coords.longitude; // 경도

//   var locPosition = new kakao.maps.LatLng(lat, lon);

//   map.setCenter(locPosition);
// });
function moveLocation(id,time,lo,con) {
  // 카카오 맵 관련
  var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  

   //지도 생성 및 객체 리턴
  const element1 = document.getElementById('contentbox');
  element1.innerHTML = '<div class="contentbox" id = "contentbox">본문내용 '+con+'<div>';
  const element2 = document.getElementById('nanTime-right');
  element2.innerHTML = '<div class="nanTime-right" id = "nanTime-right"> >난민 요청 시간 :'+time+'<div>';
  const element3 = document.getElementById('nanLocation-right');
  element3.innerHTML = '<div class="nanLocation-right" id = "nanLocation-right">>난민 위치 정보 :'+lo+'<div>';
  $('a[id=help]').attr('href',id);

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(lo, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: coords, //지도의 초기 위치를 설정한다. 현 위도 경도는 제주도의 카카오 본사
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      var map = new kakao.maps.Map(container, options);
      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="width:150px;text-align:center;padding:6px 0;">장소</div>',
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      // map.setCenter(coords);
      
    }
  });
}

$(function () {
  $('#close').click(function (event) {
    event.preventDefault();
    modalClose(); //모달 닫기 함수 호출
    //컨펌 이벤트 처리
  });
  $('#modal-open').click(function (event) {
    event.preventDefault();
    $('#rightBox').css('display', 'flex').hide().fadeIn();
    $('.dittoComputer').css('display', 'none');
    //팝업을 flex속성으로 바꿔준 후 hide()로 숨기고 다시 fadeIn()으로 효과
  });

  function modalClose() {
    $('#rightBox').fadeOut();
    $('.dittoComputer').css('display', 'flex').fadeIn(); //페이드아웃 효과
  }
});
  // $('#help').click(function (event) {
  //   event.preventDefault();
  //   modalClose(); //모달 닫기 함수 호출
  // });
// var nanLocation1 = $('#modal-open')
//   .children()
//   .eq(0)
//   .find('#nanLocation')
//   .text();
// var nanLocation2 = $('#modal-open')
//   .children()
//   .eq(1)
//   .find('#nanLocation')
//   .text(); // list의 첫 번째 자식 요소를 선택합니다.
// var nanLocation3 = $('#modal-open')
//   .children()
//   .eq(2)
//   .find('#nanLocation')
//   .text();
// var nanLocation4 = $('#modal-open')
//   .children()
//   .eq(3)
//   .find('#nanLocation')
//   .text();
// var nanLocation5 = $('#modal-open')
//   .children()
//   .eq(4)
//   .find('#nanLocation')
//   .text();
// var nanLocation6 = $('#modal-open')
//   .children()
//   .eq(5)
//   .find('#nanLocation')
//   .text();
// var nanLocation7 = $('#modal-open')
//   .children()
//   .eq(6)
//   .find('#nanLocation')
//   .text();
// var nanLocation8 = $('#modal-open')
//   .children()
//   .eq(7)
//   .find('#nanLocation')
//   .text();

// $('#moveLocation-1').on('click', { element: nanLocation1 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-2').on('click', { element: nanLocation2 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-3').on('click', { element: nanLocation3 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-4').on('click', { element: nanLocation4 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-5').on('click', { element: nanLocation5 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-6').on('click', { element: nanLocation6 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-7').on('click', { element: nanLocation7 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });

// $('#moveLocation-8').on('click', { element: nanLocation8 }, function (event) {
//   moveLocation(event.data.element); // moveLocation 함수를 호출하면서 자식 요소를 인자로 전달합니다.
// });
