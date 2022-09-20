const Guide = () => {
  return (
    <div>
      <p>암튼 가이드 임</p>
      <button onClick={() => localStorage.setItem('guide', true)}>as</button>
    </div>
  )
}

export default Guide
