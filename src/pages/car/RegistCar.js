import Component from '../../components/Component'
import Header from '../../components/Header'
const RegistCar = () => {
  const fetchRegistCar = async () => {
    // const fetchData = await
  }

  return (
    <>
      <Component title={`자동차를 등록하여${'\n'}주차장을 대여하세요`}>
        <h2></h2>
        <div>
          <p>자동차 차종</p>
          <input placeholder='자동차의 종류를 입력하세요.' />
          <p>자동차 번호</p>
          <input placeholder='자동차 번호를 입력하세요.' />
          <button>자동차 등록</button>
        </div>
      </Component>
    </>
  )
}

export default RegistCar
