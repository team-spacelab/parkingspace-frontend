import React from 'react'
import Sheet from 'react-modal-sheet'
import { BsCircle, BsCheckCircle } from 'react-icons/bs'
import '../style/MethodModal.scss'
const ParkingspaceInfoModal = ({ methods, setShowModal, showModal, setMethod, selectedMethod }) => {
  const onClick = (id) => {
    setMethod(id)
    setShowModal(false)
  }
  
  if (!showModal || !methods) return <></>
  return (
    <>
      <Sheet
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        snapPoints={[600]}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className='container'>
              <div className='title'>
                <h2>결제 수단 선택</h2>
              </div>
              <div className='method-container'>
                { !showModal || !methods ? <></> : (<>
                  { methods.accounts.length < 1 && methods.cards.length < 1 && <p>등록된 결제 수단이 없습니다.</p> }
                  { methods.accounts.map((method, i) => (
                    <div className='method' onClick={() => onClick(method.id)} key={i} style={{ backgroundColor: method.color.background, color: method.color.text, boxShadow: selectedMethod === method.id ? '5px 5px 15px 5px rgba(0,0,0,0.35)' : 'none' }}>
                      <div className='method-flex'>
                        <img className='method-icon' src={method.iconUrl} alt={method.accountName} />
                        <div className='method-text'>
                          <p className='method-name'>{method.alias ? `${method.alias}(${method.accountName})` : method.accountName }</p>
                          <p>{method.accountNumber}</p>
                        </div>
                      </div>
                      <div className='method-select'>
                        { selectedMethod === method.id ? <BsCheckCircle /> : <BsCircle /> }
                      </div>
                    </div>
                  ))}
                  { methods.cards.map((method, i) => (
                    <div className='method' onClick={() => onClick(method.id)} key={i} style={{ backgroundColor: method.color.background, color: method.color.text, boxShadow: selectedMethod === method.id ? '5px 5px 15px 5px rgba(0,0,0,0.35)' : 'none' }}>
                      <div className='method-flex'>
                        <img className='method-icon' src={method.iconUrl} alt={method.cardName} />
                        <div className='method-text'>
                          <p className='method-name'>{method.alias ? `${method.alias}(${method.cardName})` : method.cardName }</p>
                          <p>{method.cardNumber}</p>
                        </div>
                      </div>
                      <div className='method-select'>
                        { selectedMethod === method.id ? <BsCheckCircle /> : <BsCircle /> }
                      </div>
                    </div>
                  ))}
                </>)}
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default React.memo(ParkingspaceInfoModal)
