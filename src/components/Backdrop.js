import React, { useState, useEffect } from 'react';

const Backdrop = (props) => { 
    const [backdrop, setBackdrop] = useState(null)

    useEffect(() => {
        setBackdrop(props.show ?
                <div className='backdrop' onClick={props.clicked}></div> : null
            );
    },[props.show])

    return  backdrop
}

export default Backdrop;