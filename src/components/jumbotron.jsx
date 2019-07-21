import React from 'react';


class Jumbotron extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="row">
                <div className=" col-7 p-0">
                   <img src="https://blog.marginmedia.com.au/hubfs/shutterstock_1064618435%20%281%29.jpg" alt="" width='100%' height='350px'/>
                </div>
                <div className=" col-5 p-0">
                    <img src="https://blog.marginmedia.com.au/hubfs/shutterstock_1064618435%20%281%29.jpg" alt="" width='100%' height='350px'/>
                </div>
            </div>
          );
    }
}
 
export default Jumbotron