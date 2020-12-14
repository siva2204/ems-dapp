import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function Spinner (){
    return( 
        <div style={{textAlign: "center", marginTop: "20px"}}>
            <ScaleLoader
                height={35}
                width={4}
                radius={2}
                margin={2}
                color={"#ff3333"}
                loading={true}
            />
        </div>
    );
};

export default Spinner;