import Sheet from 'react-modal-sheet'
import { useNavigate } from 'react-router-dom'
import {
  FaExclamationCircle
} from 'react-icons/fa'
import { useRef, useState } from 'react'
const AroundSpaceModal = ({ spaces, onClick }) => {
  const sorted = spaces ? spaces.sort((a, b) => a.defaultCost > b.defaultCost ? 1 : -1) : []
  const [close, setClose] = useState(true)
  const sheetRef = useRef()
  const snapTo = (i) => sheetRef.current?.snapTo(i);

  const onMove = (v) => {
    snapTo(1)
    onClick(v)
  }

  return (
    <>
      <Sheet
        ref={sheetRef}
        isOpen={close}
        snapPoints={[650, 105]}
        initialSnap={1}
        onCloseEnd={() => setClose(true)}
        style={{ zIndex: -100, position: 'relative' }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#8254C4' }}>내 주변 주차장</h2>
            <div className='searchmodal'>
              {!sorted.length && (
                <div className='notfound'>
                  <div className='icon'>
                    <FaExclamationCircle />
                  </div>
                  <div>주변에 주차 구역이 없습니다.</div>
                </div>
              )}
              {sorted.map((v) => (
                <div className='result'>
                  <div className='info'>
                    <div className='name'>{v.name}</div>
                    <div className='price'>
                      <strong>{v.defaultCost}</strong>원/30분
                    </div>
                  </div>

                  <button onClick={() => onMove(v)}>이동하기</button>
                </div>
              ))}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default AroundSpaceModal
