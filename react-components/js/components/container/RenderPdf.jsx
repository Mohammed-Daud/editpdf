import React, { Component } from "react";

export default class RenderPdf extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Docpull</h1>
      </div>
    );
  }
}
