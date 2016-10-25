/**
 *   on 2016-09-29.
 */

import React from 'react';

import RefreshIndicator from 'material-ui/RefreshIndicator';

export default function Throbber(){
    return <div style={{ height:50, position:'relative' }}>
        <div style={{position:'absolute', height:'100%', width:0, left:'50%'}}>
            <RefreshIndicator
                size={50}
                left={-25}
                top={0}
                loadingColor="#fac033"
                status="loading"
            />
        </div>
    </div>
}