import React,{useContext} from 'react';
import { GlobalInfo } from './App';

const OtherChild = () => {

    const {appColor} = useContext(GlobalInfo);
    console.log('in Otherchild',appColor);

  return (
    <div>OtherChild</div>
  )
}

export default OtherChild