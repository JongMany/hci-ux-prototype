// import {Loader} from 'react-loader-spinner';

import {Oval} from "react-loader-spinner";

const Loading = ({isVisible}) => {
  // return <Loader type="Oval" color="#3d66ba" height={30} width={30} timeout={3000}/>
  return <>
    {isVisible && <span>답변을 생성 중 입니다...</span>}
    <Oval color="#3d66ba" secondaryColor="white" height={45} width={45} visible={isVisible}/>
  </>
}

export default Loading;