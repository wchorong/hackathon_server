//지도 초기설청및 생성
var container = document.getElementById('map'); //지도를 표시할 div 지정  id로 지정이 가능하다
var options = {
  //지도의 초기 옵션을 지정한다.
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 초기 위치를 설정한다. 현 위도 경도는 제주도의 카카오 본사이다
  level: 3, // 지도의 확대 레벨
};
var map = new kakao.maps.Map(container, options); // 지도 생성

//마커 생성및 커스텀 인포창
//var content = '<div class="box1"> <div class="box1-1">Lorem ipsum</div><div class="box1-2">Lorem ipsumtur</div></div>'
var content =
  '<div class="wrap">' +
  '    <div class="info">' +
  '        <div class="title">' +
  '            테스트' +
  '        </div>' +
  '        <div class="body">' +
  '            <div class="img">' +
  '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
  '           </div>' +
  '            <div class="desc">' +
  '                <div class="ellipsis">테스트</div>' +
  '                <div class="jibun ellipsis">테스트</div>' +
  '                <div><a href="https://github.com/Lion-Hackathon/hackathon_test/tree/master" target="_blank" class="link">테스트</a></div>' +
  '            </div>' +
  '        </div>' +
  '    </div>' +
  '</div>';

navigator.geolocation.getCurrentPosition(function (position) {
  var lat = position.coords.latitude, // 위도
    lon = position.coords.longitude; // 경도

  var locPosition = new kakao.maps.LatLng(lat, lon);

  // 마커와 인포윈도우를 표시합니다
  //displayMarker(locPosition, message);
  var marker = new kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  var customOverlay = new kakao.maps.CustomOverlay({
    position: marker.getPosition(),
    content: content,
    map: map,
  });

  customOverlay.setMap(map);
  map.setCenter(locPosition);
});
//
$('#searchBtn').click(function () {
  // 버튼을 click했을때

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch($('#address').val(), function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 추출한 좌표를 통해 도로명 주소 추출
      let lat = result[0].y;
      let lng = result[0].x;
      getAddr(lat, lng);
      function getAddr(lat, lng) {
        let geocoder = new kakao.maps.services.Geocoder();

        let coord = new kakao.maps.LatLng(lat, lng);
        let callback = function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            // 추출한 도로명 주소를 해당 input의 value값으로 적용
            $('#address').val(result[0].road_address.address_name);
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      }

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
      map.setCenter(coords);
    }
  });
});
