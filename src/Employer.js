import React from 'react';
import axios from "axios";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import { FlatButton, TextField, RaisedButton} from "material-ui";
import Checkbox from 'material-ui/Checkbox';
class Employer extends React.Component {
  state = {
    open: false,
    sliderValue: 0,
    employees: [],
    checked: false,
    contractID: null,
    timeAmount: 0,
    payAmount: 0,
    cleanAmount: 0,
  };
  pos=0;
  handleOpen = (emp,i) => {
    this.setState({ open: true, unpaidTime: emp.unpaidTime });
    this.pos=i;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getContractID() {
    axios
      .get("http://localhost:8000/get_contract_data", {
        params: {
          contractID: this.state.contractID
        }
      })
      .then((response) => {
        console.log(response)
        this.setState({ employees: response.data })
      });
  }

  sendPayment(){
    axios
    .post("http://localhost:8000/send_payment", {
      contractID: this.state.contractID,   
      toID: this.state.employees[this.pos].id,
      fromID: this.props.account,
      password: this.props.password,
      position: this.pos,
      checked: this.state.checked,
      payAmount: this.state.payAmount,
      timeAmount: this.state.timeAmount,
      cleanAmount: this.state.cleanAmount,
    })
    .then(function (response) {
      console.log(response);
    });
  }
  render() {
    const rows = [];

    for (let i = 0; i < this.state.employees.length; i++) {
      let m = this.state.employees[i];
      rows.push(
        <TableRow>
          <TableRowColumn>{m.id}</TableRowColumn>
          <TableRowColumn>{m.unpaidTime}</TableRowColumn>
          <TableRowColumn><FlatButton label="Оплатить" primary={true} onClick={() => this.handleOpen(m,i)} /></TableRowColumn>
        </TableRow>
      );
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>{
                    this.handleClose();
                    this.sendPayment();
        }
        }
      />,
    ];
    return ([
      <Dialog
        title="Выберите количество часов для оплаты"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div><Checkbox
          label="Оплатить всё рабочее время"
          checked={this.state.checked}
          onCheck={()=>{this.setState({checked: !this.state.checked})}}
          style={{maxWidth: 450,marginBottom: 16}}
        /><br /></div>
      <div hidden={this.state.checked}>       
              <TextField
              hintText="Введите количество часов"
              onChange={(event, newValue) => this.setState({ timeAmount: newValue })}
               /><br />
               <TextField
              hintText="Введите количество Ethiriumа"
              onChange={(event, newValue) => this.setState({ payAmount: newValue })}
               /><br />
      </div>      
      <TextField
              hintText="Списать время без оплаты"
              onChange={(event, newValue) => this.setState({ cleanAmount: newValue })}
               />
      </Dialog>,
      <div  style={{padding: 20}}>
        <TextField
        style={{marginRight: 20}}
         hintText="Введите id контракта"
          onChange={(event, newValue) => this.setState({ contractID: newValue })} 
          />
        <RaisedButton
        primary={true}
          label="Загрузить контракт"
          onClick={()=>{this.getContractID()}}
        />
      </div>,
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Employee address</TableHeaderColumn>
            <TableHeaderColumn>Unpaid hours</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}>
          {rows}
        </TableBody>
      </Table>
    ]);
  }
}

export default Employer;