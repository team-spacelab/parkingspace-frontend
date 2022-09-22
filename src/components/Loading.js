import '../style/loading.scss'
import { Oval } from 'react-loader-spinner'
const Loading = () => {
  return (
    <div className='loadingPage'>
      <Oval
        height={50}
        width={50}
        color="#8254C4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='Loading...'
        secondaryColor="#ad8ed8"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}

export default Loading
