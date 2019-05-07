import React, { Component } from 'react';
import "./menu.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown);


    class Menu extends Component{


    render() {
        return(
            <li className="menu"
                id={this.props.menu.name}
                onMouseDown={(e)=>{
                    e.preventDefault();

                    this.subMenuObj = this.props.menu;
                    this.subMenuObj.x = e.currentTarget.offsetLeft;
                    this.subMenuObj.y = e.currentTarget.offsetTop + e.currentTarget.offsetHeight;
                    this.props.setSpreadState(this.props.index, this.subMenuObj);


                    if(e.currentTarget.id === "image") {
                        this.props.setPopUpState({showingImageUploadPopUp : true});
                        return;
                    }else if(e.currentTarget.id === "link"){
                        this.props.setPopUpState({showingLinkPopUp : true});
                        return;
                    }else if(e.currentTarget.id === "video"){
                        this.props.setPopUpState({showingVideoUploadPopUp : true});
                        return;
                    }

                    if(this.props.menu.defaultAction && this.props.menu.defaultAction.length > 0 ){

                        new Function(this.props.menu.defaultAction)(...this.props.menu.defaultParameters);
                    }
                }}>
                <img src={this.props.menu.image}/>
                { this.props.hasContextMenu ? <FontAwesomeIcon icon="caret-down"/> : ""}
            </li>
        );
    }
}

export default Menu;

