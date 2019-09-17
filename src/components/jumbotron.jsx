import React from 'react';


class Jumbotron extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="row">
                <div className=" col-md-7 p-0">
                   <img src={this.props.jumbo1} alt="gambar jumbo1" width='100%' height='350px'/>
                </div>
                <div className=" col-md-5 p-0">
                    <img src={this.props.jumbo2} alt="jumbo2" width='100%' height='350px'/>
                </div>
            </div>
          );
    }
}
 
export default Jumbotron