import React, { useContext } from 'react';
import { GlobalInfo } from './App';
import SuperChild from './SuperChild';

const Child = () => {

    const { appColor } = useContext(GlobalInfo);
    console.log(appColor);

    return (
        <div>
            Child
            <SuperChild />
        </div>
    )
}

export default Child