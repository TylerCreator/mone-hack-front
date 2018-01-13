import React, { Component } from "react";
import axios from "axios";
import { Paper, RaisedButton, TextField } from "material-ui";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      startTime: 0,
      workStarted: false,
    };
  }
  toggleTimer() {
    let t = Date.now();
    const { workStarted } = this.state;
    if (workStarted) {
      clearInterval(this.timer);
      this.setState({ workStarted: !workStarted });
      axios
        .post("http://localhost:8000/add_end_time", {
          account: this.props.account,
          password: this.props.password,
          contractID: this.state.contractID,
          secondTime: t,
        })
        .then(function (response) {
          console.log(response);
        });
    } else {
      this.timer = setInterval(() => {
        this.setState({ time: Date.now() });
      }, 100);
      this.setState({ workStarted: !workStarted, startTime: t, time: t });
      axios
        .post("http://localhost:8000/add_start_time", {
          account: this.props.account,
          password: this.props.password,
          contractID: this.state.contractID,     
          firstTime: t,
        })
        .then(function (response) {
          console.log(response);
        });
    }
  }
  render() {
    const {nightMode} = this.props;
    let { workStarted, time, startTime } = this.state;
    let t = time - startTime;
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
      }}>
        <Paper zDepth={5} style={{ padding: 10, width: 400, height: 250, display: "flex",alignItems: "center",justifyContent: "center" ,flexDirection: "column"}}>
          <TextField
          style={{marginRight: 20}}
          hintText="Введите id контракта"
            onChange={(event, newValue) => this.setState({ contractID: newValue })} 
            />
          <RaisedButton
            primary={nightMode}
            secondary={!nightMode}
            onClick={() => this.toggleTimer()}
            label={workStarted ? "Закончить работу" : "Начать работу"}
          />
          <h1 style={{fontSize: '48pt'}}>
            {`0${Math.floor(t/(1000*3600))}:0${Math.floor((t/(1000*60))%3600)}:${Math.floor((t/1000)%60)<10?0:""}${Math.floor((t/1000)%60)}`}
            </h1>
        </Paper>
      </div>
    );
  }
}



export default Employee;
