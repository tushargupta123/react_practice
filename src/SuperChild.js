import React,{useContext} from 'react';
import { GlobalInfo } from './App';

const SuperChild = () => {

    const {appColor, getDay} = useContext(GlobalInfo);
    console.log('in superchild',appColor);
    const day = "sunday";

  return (
    <div>
        SuperChild
        <button onClick={() => getDay(day)}>get day</button>
    </div>

  )
}

export default SuperChild