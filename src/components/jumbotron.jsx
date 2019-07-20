import React from 'react';


class Jumbotron extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="row">
                <div className="col-md-7 p-0">
                   <img src="https://blog.marginmedia.com.au/hubfs/shutterstock_1064618435%20%281%29.jpg" alt="" width='100%' height='250px'/>
                </div>
                <div className="col-md-5 p-0">
                    <img src="https://blog.marginmedia.com.au/hubfs/shutterstock_1064618435%20%281%29.jpg" alt="" width='100%' height='250px'/>
                </div>
            </div>
          );
    }
}
 
export default Jumbotron