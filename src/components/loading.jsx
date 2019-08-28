import React from 'react';
import {Spinner} from 'reactstrap'

class Loading extends React.Component {
    state = {  }
    render() { 
        return (
            <div style={{marginTop:'23%',marginLeft:'45%'}}>
                <Spinner  color='primary'/>
        
            </div>
          );
    }
}
 
export default Loading;