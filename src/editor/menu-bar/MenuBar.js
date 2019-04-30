import React, { Component } from 'react';
import "./menubar.css";
import Menu from "../menu/Menu";
import PreLoader from "../preloader/PreLoader";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

const SweetAlert = withSwalInstance(swal);


class MenuBar extends Component{

    componentWillMount(){

        this.setState({isShowLoader : false, size : 20, text : "loading..."});
        const menus = [];

        //Menu component initial API call
        // Type JSON

        menus.push({
            name : "font",
            image : "https://img.icons8.com/metro/26/000000/generic-text.png",
            contextMenu : [{name : "Noto Sans", onClick : "", parameters : []}, {name : "Times New Roman", onClick : "", parameters : []}, {name : "Helvetica", onClick : "", parameters : []}],
            defaultParameters : [],
            defaultAction : 'console.log("준비중..");'
        });

        const fontSizeDefaultAction = 'document.execCommand("fontSize", false, arguments[0]);';
        menus.push({
            name : "font_size",
            image : "https://img.icons8.com/metro/26/000000/increase-font.png",
            contextMenu : [{name : "1", onClick : fontSizeDefaultAction, parameters : ["1"]},
                {name : "2", onClick : fontSizeDefaultAction, parameters : ["2"]},
                {name : "3", onClick : fontSizeDefaultAction, parameters : ["3"]},
                {name : "4", onClick : fontSizeDefaultAction, parameters : ["4"]},
                {name : "5", onClick : fontSizeDefaultAction, parameters : ["5"]},
                {name : "6", onClick : fontSizeDefaultAction, parameters : ["6"]},
                {name : "7", onClick : fontSizeDefaultAction, parameters : ["7"]}],
            defaultParameters : [],
            defaultAction : ""
        });

        //const fontSizeDefaultAction = "let range=window.getSelection().getRangeAt(0); if(!range.collapsed){let newSpan=document.createElement(\"span\");newSpan.innerText=range.toString();  newSpan.style.fontSize=arguments[0]; newSpan.appendChild(range.extractContents()); range.insertNode(newSpan); }";


        menus.push({
            name : "under_bar",
            image : "https://img.icons8.com/metro/26/000000/text-color.png",
            contextMenu : [],
            defaultParameters : [],
            defaultAction : 'document.execCommand("underline", false, null);'
        });

        //"let range=window.getSelection().getRangeAt(0) if(!range.collapsed){let newSpan=document.createElement(\"span\");newSpan.innerText=range.toString();let ancestorNode=range.commonAncestorContainer;if(ancestorNode.nodeType===3){let newAncestor=document.createElement(\"span\");newAncestor.appendChild(ancestorNode.innerText);ancestorNode=ancestorNode.parentElement;} if(getComputedStyle(ancestorNode)[\"textDecorationLine\"]!==\"underline\"){console.log(\"얘는 밑줄없음\");newSpan.style.textDecoration=\"underline\";}else{console.log(\"얘는 밑줄있음\");newSpan.style.textDecoration=\"none\"};newSpan.appendChild(range.extractContents());range.insertNode(newSpan);}"

        menus.push({
            name : "text_weight",
            image : "https://img.icons8.com/metro/26/000000/bold.png",
            contextMenu : [],
            defaultParameters : [],
            defaultAction : 'document.execCommand("bold", false, null);'
        });

        menus.push({
            name : "italic",
            image : "https://img.icons8.com/metro/26/000000/italic.png",
            contextMenu : [],
            defaultParameters : [],
            defaultAction : 'document.execCommand("italic", false, null);'
        });

        const alignSizeDefaultAction = "let pos=arguments[0]; (()=>{ document.execCommand(pos); })(pos)";
        menus.push({
            name : "align",
            image : "https://img.icons8.com/metro/26/000000/align-right.png",
            contextMenu : [{name : "left",onClick : alignSizeDefaultAction, parameters : ["justifyLeft"]},
                {name : "center", onClick : alignSizeDefaultAction, parameters : ["justifyCenter"]},
                {name : "right", onClick : alignSizeDefaultAction, parameters : ["justifyRight"]}],
            defaultParameters : [],
            defaultAction : ""
        });

        //let pos=arguments[0]; (()=>{ let range=document.getSelection().getRangeAt(0); if(!range.isCollapsed){let parent=range.commonAncestorContainer; console.log(parent.classList); if(parent.nodeType===Node.ELEMENT_NODE&&parent.classList['menu'])return;if(parent.nodeType===Node.TEXT_NODE){parent=parent.parentElement; console.log('부모? ');} if(parent.nodeType===Node.ELEMENT_NODE){if(!parent.style||!parent.style.textAlign){let newContainer=document.createElement('div');newContainer.innerHTML=parent.innerHTML;newContainer.style.textAlign=pos;parent.innerHTML='';parent.appendChild(newContainer);}else{parent.style.textAlign=pos; }}}})(pos);"

        menus.push({
            name : "image",
            image : "https://img.icons8.com/metro/26/000000/picture.png",
            contextMenu : [],
            defaultParameters : [],
            defaultAction : ""
        });

        menus.push({
            name : "video",
            image : "https://img.icons8.com/metro/26/000000/documentary.png",
            contextMenu : [],
            defaultParameters : [],
            defaultAction : ""
        });

        menus.push({
            name : "link",
            image : "https://img.icons8.com/metro/26/000000/link.png",
            contextMenu : [],
            defaultParameters : [],
            defaultAction : ""
        });

        this.menuContainer = [];
        menus.map((v, i) => {
           this.menuContainer.push({menu : v, hasContextMenu : v.contextMenu.length > 0 ,isSpreadContextMenu : false, key : i + 1})
        });

        this.setSpreadState = (uniqueKey, subMenuObj) => {

            let newContainer = this.toggleSpreadState(uniqueKey, subMenuObj);
            this.setState({_menus : newContainer});


        }

        this.setState({_menus : this.menuContainer});
        this.setState({showingContextMenu : undefined});
        this.setState({showingImageUploadPopUp : false});
        this.setState({showingLinkPopUp : false});
        this.setState({showingVideoUploadPopUp : false});


        this.setPopUpState = (obj) => {
            this.setState(obj);
        }

     }



    toggleSpreadState = (itemKey, subMenuObj) => {

        let findIndex = -1;
        if(itemKey) {
            findIndex = this.menuContainer.findIndex(el => {
                return el.key === itemKey
            });
        }

         this.setState({showingContextMenu : undefined});

         const newMenuContainer = this.menuContainer.map((v, i) => {

        if(findIndex > -1 && v.hasContextMenu && i === findIndex){
              v.isSpreadContextMenu = !v.isSpreadContextMenu;
              if(v.isSpreadContextMenu){
                  this.setState({showingContextMenu : subMenuObj});
              }else{
                  this.setState({showingContextMenu : undefined});
              }
        }else{
              v.isSpreadContextMenu = false;
        }
            return v;

        });

        return newMenuContainer;

     }

    _render = () => {

            const _menus = this.state._menus.map((v, i) =>
            {
                return <Menu {...this.props} {...v} index = {v.key} key={i} setSpreadState = {this.setSpreadState} setPopUpState={this.setPopUpState}/>

            });

            return _menus;

    }

    _renderContextMenu = () =>{

        this.contextMenuObj = this.state.showingContextMenu;
        return (
        <div className="context-menu-container"  style={{top : this.contextMenuObj.y, left : this.contextMenuObj.x}}>
            <ul className ="context-menu">
                {
                    (this.contextMenuObj.contextMenu).map( (v, i) => {
                        return <li className="context-menu-item"
                                   key={i}
                                   onMouseDown={(e) => {
                                       e.preventDefault();
                                       new Function(v.onClick)(...v.parameters);
                                       this.setState({showingContextMenu : undefined});

                                   }}>{v.name}<hr/></li>
                    })

                }

            </ul>
        </div>
        )
    }

    render(){
        return(
            <div id="menuBar" className="menubar-container">

              <ul className="menubar-list">
                  {this._render()}
              </ul>
                {this.state.isShowLoader ? this.initLoader(this.state.size, this.state.text) : undefined }
                {this.state.showingContextMenu ? this._renderContextMenu() : undefined}
                {!swal.isVisible() && this.state.showingImageUploadPopUp ? this.imageUploadPopUp(this.setPopUpState) : undefined}
                {!swal.isVisible() && this.state.showingLinkPopUp ? this.linkPopUp(this.setPopUpState) : undefined}
                {!swal.isVisible() && this.state.showingVideoUploadPopUp ? this.videoUploadPopUp(this.setPopUpState) : undefined}
            </div>


        );
    };

    initLoader(size, text){
        if(typeof size !== "number" || size < 1)
            throw Error("loader에 지정하는 단위는 반드시 정수여야 합니다.");
        return <PreLoader size = {size} text = {text}/>
    }

    showLoader(size, text){

        this.setState({isShowLoader : true, size : size, text : text})

    }

    dismissLoader(){
        this.setState({isShowLoader : false})

    }


    videoUploadPopUp(setPopUpState){

        let range = window.getSelection().getRangeAt(0);

        (async()=>{
            const {value: text} = await swal.fire({
                input: 'textarea',
                inputPlaceholder: 'embed 할 수 있는 youtube 비디오 링크를 입력하십시오.',
                showCancelButton: true,
                onClose : () => { setPopUpState({showingVideoUploadPopUp: false}) }
            });

            if (range.collapsed && text) {
                console.log(text);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand("insertHTML", false, text);
            }


        })(range);

    }


    linkPopUp(setPopUpState){


            let range = window.getSelection().getRangeAt(0);
            (async () => {
                const {value: url} = await swal.fire({
                    input: 'url',
                    inputPlaceholder: 'Enter the URL',
                    onClose: () => {
                        setPopUpState({showingLinkPopUp: false})
                    }
                });

                if (url) {
                    if (!range.collapsed) {
                        console.dir(range);
                        console.log("create link %s", url);
                        window.getSelection().removeAllRanges();
                        window.getSelection().addRange(range);
                        document.execCommand("insertHTML", true, '<a href ="#" target="_blank" style="cursor:pointer" onclick="(()=> {window.location.href = \''+  url  + '\'; return false;})()" >' + range.toString() + '</a>');
                    }
                }

            })(range);

    }

    imageUploadPopUp(setPopUpState){
        let range = window.getSelection().getRangeAt(0);
        (async()=> {
            const {value: file} =
                await swal.fire({
                    title: 'Image Upload',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Upload your profile picture'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Upload',
                    showLoaderOnConfirm: true,
                    onClose: () => {
                        setPopUpState({showingImageUploadPopUp: false})
                    }

                });

            if (file) {
                console.dir(file);
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    swal.fire({
                        title: "이 파일을 올릴까요?",
                        imageUrl: e.currentTarget.result,
                        imageAlt: "올라온 파일",
                        showConfirmButton: true,
                        showCancelButton: true,
                        showLoaderOnConfirm: true,
                        preConfirm: () => {
                            alert("ajax 요청")
                        }
                    }).then((result) => {

                        if (range.collapsed && result) {
                            document.execCommand("insertImage", false, "https://pds.joins.com//news/component/htmlphoto_mmdata/201805/27/5a5d7258-bbff-406b-a7ae-48caf0bd192a.jpg");
                        }

                    })
                };

                fileReader.readAsDataURL(file);

            }

        })(range);

    }


}

export default MenuBar;