/* global kakao */
import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(()=>{
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.301944076747795, 128.58436918356392),
      level: 4
    }

    const map = new kakao.maps.Map(container, options);
    const markerPosition  = new kakao.maps.LatLng(36.301944076747795, 128.58436918356392); 
    const marker = new kakao.maps.Marker({
      position: markerPosition
    })
  marker.setMap(map);

    }, [])


    return (
      <div className="kakaomap">
        <div id="map" style={{width:"100%", height:"1200px", zIndex:"0"}}></div>
      </div>
    )
}

export default React.memo(KakaoMap)