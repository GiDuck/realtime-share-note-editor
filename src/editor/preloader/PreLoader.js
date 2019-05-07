import React, {Component} from 'react';
import "./preloader.css";

class PreLoader extends Component {


    render() {
        return (
            <div className="loader-container">
                <div className="loader-set">
                    <div className="loader" style={{width: this.props.size + "px", height: this.props.size + "px"}}/>
                    <span style={{fontSize: this.props.size}}>{this.props.text}</span>
                </div>
            </div>
        )
    }

}

export default PreLoader;
