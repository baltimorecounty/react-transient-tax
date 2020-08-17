// import "react-datepicker/dist/react-datepicker.css";
// import "./App.scss";

// import { Redirect, Route, HashRouter as Router } from "react-router-dom";

// import { Config } from "@baltimorecounty/javascript-utilities";
// import ConfirmationPage from "./pages/ConfirmationPage";
// import ErrorPage from "./pages/ErrorPage";
// import { GetError } from "./common/ErrorUtility";
// import { GetQueryParam } from "./common/Routing";
// import MultiPageForm from "./components/MultiPageForm";
import React, { Component } from "react";
// import TransientTaxStepList from "./steps/TransientTaxStepList";

// const { setConfig } = Config;

// const localApiRoot = "//localhost:54727/api";
// const testApiRoot = "http://testservices.baltimorecountymd.gov/api";
// const prodApiRoot = "https://services.baltimorecountymd.gov/api";

// const configValues = {
//   local: {
//     apiRoot: localApiRoot
//   },
//   development: {
//     apiRoot: testApiRoot
//   },
//   staging: {
//     apiRoot: testApiRoot
//   },
//   production: {
//     apiRoot: prodApiRoot
//   }
// };

// setConfig(configValues);

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null
      }
   
  }
  onChangeHandler=event=>{
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
    console.log(event.target.files[0])

}

onClickHandler = () => {
  const data = new FormData() 
  data.append('file', this.state.selectedFile)
}
  render() {
    return (
      <div className="App">
      <input type="file" name="file" onChange={this.onChangeHandler}/>
      <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
      </div>
    );
  }
}

export default App;
