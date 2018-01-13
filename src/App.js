import React from "react";
import Employer from "./Employer.js";
import Employee from "./Employee.js";
import {Toggle, Paper, TextField, RaisedButton } from "material-ui";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        isAdmin: false,
        nightMode: false,
        isAuth: false,
        isEmployer: false,
        account: "",
        password: "",
    }
};
AuthForm = ()=>{
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <Paper zDepth={5} style={{ padding: 10, width: 400, height: 250,display: "flex",alignItems: "center",justifyContent: "center" ,flexDirection: "column"}}>
      <TextField
        value={this.state.account}
        style={{width: "100%"}}
        onChange={(event, newValue) => {
          this.setState({
            account: newValue,
          });
        }}
        hintText="Адрес кошелька"
      />
      <TextField
        type={"password"}
        style={{width: "100%"}}
        value={this.state.password}
        onChange={(event, newValue) => {
          this.setState({
            password: newValue,
          });
        }}
        hintText="Пароль"
      />
        <Toggle
                    style={{marginTop: "20px"}}
                    label={this.state.isEmployer?"Работодатель":"Работник"}
                    labelPosition="right"
  onToggle={()=>{this.setState({isEmployer:!this.state.isEmployer})}}
/>
<RaisedButton
        label="Войти"
        primary={true}
        style={{marginTop: 10}}
        onClick={()=>{this.setState({isAuth:true})}}
        />
    </Paper>
  </div>
}
    render() {
        const {account,password,nightMode,isEmployer} = this.state;
        let view;
        if (!this.state.isAuth)
            view = this.AuthForm();
        else if (this.state.isEmployer)
            view = <Employer account={account} password={password}  />;
        else 
            view = <Employee nightMode={nightMode} account={account} password={password} />;
        return (
            <div className={this.state.nightMode?"nightMode":"dayMode"}>
                     {isEmployer ||   <Toggle
                        style={{position: "absolute",top:0,left:0}}
                        hidden={this.state.isEmployer}
                        label="Night mode"
                        labelPosition="right"
                        labelStyle={{color: this.state.nightMode?"white":"black"}}
      onToggle={()=>{this.setState({nightMode:!this.state.nightMode})}}
    />}
        {view}
            </div>
        );
    }
}

export default App;