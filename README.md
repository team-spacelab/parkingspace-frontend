# Parking Space팀 프론트엔드 입니다...

코드 시청에 따른 안구피해는 책임지지 않습니다. 아마도..?

## 할 일 ( 2022/09/06 )

1. [ ] 마커 스타일 바꿔야 하는데 너무 귀찮다 누가 에셋 주겠지? ㅎㅎ
2. [ ] 마커 클릭시주차장 정보 뜨게 해야함 (이벤트 등록)
3. [ ] 아 검색 구현해야 하는데
4. [ ] 마이페이지, 주차장 관리 페이지 디자인 & 상세페이지 구성
5. [ ] 지도 중심값으로 계산해서 벗어나면 주차장 정보 우효~ 겟또다제~☆
6. [ ] 주차장 대여 페이지 해야됨
7. [ ] 로그인 회원가입
8. [ ] 주차장 등록 절차 생성

## 할 일 ( 2022/09/19 )

1. [ ] 가이드 페이지
2. [ ] 실시간 위치 추적
3. [ ] 페이먼트 서버 연동

[https://parking.spacelab.work/](https://parking.spacelab.work/)

//import 부분
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import {
DesktopDateTimePicker,
LocalizationProvider,
} from '@mui/x-date-pickers'

import { TextField } from '@mui/material'

// jsx 부분
<LocalizationProvider dateAdapter={AdapterMoment}>
<br />

        <DesktopDateTimePicker
          label='대여 시작 시간'
          value={startAt}
          onChange={(value) => setStartAt(value)}
          renderInput={(params) => <TextField {...params} />}
        ></DesktopDateTimePicker>
        <br />
        <br />
        <DesktopDateTimePicker
          label='대여 종료 시간'
          value={endAt}
          onChange={(value) => setSEndAt(value)}
          renderInput={(params) => <TextField {...params} />}
        ></DesktopDateTimePicker>
      </LocalizationProvider>
