import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';


const Main = () => {


    const language = useSelector(state => state.language);


    return (
        <div>
            <h1>{language}</h1>
        </div>
    );

}

export default Main;
