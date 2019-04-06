import React, { Component } from "react";
import PDF from 'react-pdf-js';

export default class RenderPdf extends Component {
    constructor(props) {
        super(props);
        console.log("props :", JSON.parse(props.template));
        const templateData = JSON.parse(props.template);
        const firstPdfId = templateData.templatePdfs[0].id;
        // console.log('firstPdfId: ', firstPdfId);
        const firstPdf = templateData.templatePdfs[0].pdf_name;
        // console.log('firstPdf: ', firstPdf);
        this.state = {
            template: templateData.template,
            templatePdfs: templateData.templatePdfs,
            currentPdf:firstPdf,
            currentPdfId:firstPdfId,
            x: 0,
            y: 0,
            display: 'none',
            templateForms :[]
        };
        this.onDocumentComplete = this.onDocumentComplete.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.renderPdfList = this.renderPdfList.bind(this);

    }

    _getCursorPosition(e) {
        let container = document.querySelector("#cursorPosition");
        let theThing = document.querySelector("#thing");
        const {page, currentPdfId, currentPdf} = this.state;

        container.addEventListener("click", function (event) {
            let xPosition = event.clientX - container.getBoundingClientRect().left - (theThing.clientWidth / 2);
            let yPosition = event.clientY - container.getBoundingClientRect().top - (theThing.clientHeight / 2);
            // in case of a wide border, the boarder-width needs to be considered in the formula above
            theThing.style.left = xPosition + "px";
            theThing.style.top = yPosition + "px";
        });
        const data = {};
        data['pdfId'] = currentPdfId;
        data['xPosition'] = e.nativeEvent.offsetX;
        data['yPosition'] = e.nativeEvent.offsetY;
        data['pageNo'] = page;
        data['pdfName'] = currentPdf;
        console.log('data: ', data);

       
        this.setState({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            display: '',
            templateForms: [...this.state.templateForms, data]
        })
    }
    changePdf(id, pdfName){
        console.log('id, pdfName: ', id, pdfName);
        this.setState({
            currentPdf:pdfName,
            currentPdfId:id
        })
    }

    onDocumentComplete(pages) {
        console.log('pages: ', pages);
        this.setState({
            page: 1,
            pages
        });
    }

    handlePrevious() {
        this.setState({
            page: this.state.page - 1
        });
    }

    handleNext() {
        this.setState({
            page: this.state.page + 1
        });
    }
     
    renderPagination(page, pages) {
        let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
        if (page === 1) {
          previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
        }
        let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        if (page === pages) {
          nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
        }
        return (
          <nav>
            <ul className="pager">
              {previousButton}
              {nextButton}
            </ul>
          </nav>
        );
    }

    renderPdfList(){
        const {templatePdfs} = this.state;
        if(Object.keys(templatePdfs).length !== 0){
            templatePdfs.forEach(e => {
                console.log('e: ', e);
            });
        }
    }

    remove(index) {
        return function () {
            this.setState(function (prevState) {
                console.log('prevState: ', prevState);
                return {
                    templateForms: prevState.templateForms.filter(function (data) {
                        return data[index] !== index;
                    })
                };
            });
        };
    };

    // remove(e){
    //     console.log('index: ', index);
    //     var array = [...this.state.templateForms]; // make a separate copy of the array
    //         var index = array.indexOf(e.target.value)
    //         if (index !== -1) {
    //             array.splice(index, 1);
    //             this.setState({templateForms: array});
    //         }
    // }

  

  render() {
    const {templatePdfs, template, x, y,page, display, currentPdf, currentPdfId, templateForms} = this.state;
    console.log('templateForms: ', templateForms);
    console.log('templatePdfs, template, x, y,page, display, currentPdf, currentPdfId: ', templatePdfs, template, x, y,page, display, currentPdf, currentPdfId);
    let pagination = null;
        console.log('display: ', display);
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    
    const listItems = templatePdfs.map((e) =>
        <li onClick={this.changePdf.bind(this, e.id, e.pdf_name)}><a>{e.pdf_name}</a></li>
    );

    const renderForm = templatePdfs.map((e) =>
        <li>dfdfdfd</li>
    );
    return (
        <div className="container" style={{maxWidth: '100%'}}>
            <div className="header clearfix">
                <nav>
                    <ul className="nav nav-pills pull-right">
                        <li role="presentation" className="active"><a href="/templates/view">Home</a></li>
                        <li role="presentation"><a href="#">About</a></li>
                        <li role="presentation"><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <h3 className="text-muted">Docpull.biz</h3>
            </div>
            <div className="jumbotron">
                <h1>{template.temp_name}</h1>
            </div>
            <div className="row marketing">
                <p>{`Cursor Position X : ${x},  Y: ${y},  Page No: ${page}, pdfId: ${currentPdfId}, pdfName : ${currentPdf}`}</p>
                <div className="col-md-3">
                    <form action="/templates/edit-info-save" method="post">
                        <div id="formId" style={{display:display}}>
                            {
                                templateForms.map((e, i) =>
                                    <div>
                                        <p>{`Cursor Position of x ${e.xPosition} and y ${e.yPosition}`}</p>
                                        <input type="hidden" className="form-control" name="xposition" value={`${e.xPosition}`} id=""/>
                                        <input type="hidden" className="form-control" name="yposition" value={`${e.yPosition}`} id=""/>
                                        <input type="hidden" className="form-control" name="pdfId" value={`${e.pdfId}`} id=""/>
                                        <input type="hidden" className="form-control" name="page" value={`${e.pageNo}`} id=""/>
                                        <input type="hidden" className="form-control" name="pdfName" value={`${e.pdfName}`} id=""/>
                                        <div className="form-group">
                                            <label for="">Label</label>
                                            <input type="text" className="form-control" name="label" />
                                        </div>
                                        <div className="form-group">
                                            <label for="">Name</label>
                                            <input className="form-control" name="name" min="0" />
                                        </div>
                                        <a className="pull-right" onClick={this.remove.bind(this, i)}>Remove</a>
                                    </div>
                                )
                            }
                            <div className="form-group">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-7">
                    <div id="cursorPosition" onClick={this._getCursorPosition.bind(this)} style={{position: 'relative', border:'1px solid red'}}>
                        <div id="thing" title={`${x} x ${y}`} style={{border:'2px solid red', position: 'absolute', background:'red', height:'2px', width:'2px', display:`${display}`}}></div>
                        <PDF
                            file={`/${currentPdf}`}
                            onDocumentComplete={this.onDocumentComplete}
                            page={this.state.page}
                        />
                        {pagination}
                    </div>
                </div>

                <div className="col-md-2">
                    <ul>
                        {listItems}
                    </ul>
                </div>
            </div>
            
        </div>
    );
  }
}
