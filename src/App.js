import React, { Component } from 'react';
import { Checkbox, Button } from 'antd';
import '../node_modules/antd/dist/antd.css';

import './App.css';

const mockdatasss = [
  { name: "apple", price: 4, id: 1, checks: false, amount: 1 },
  { name: "mango", price: 5, id: 2, checks: false, amount: 1 },
  { name: "orange", price: 6, id: 3, checks: false, amount: 1 },
  { name: "pear", price: 7, id: 4, checks: false, amount: 1 }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockdata: mockdatasss,
      checkAll: false,
      Total: 0
    }
    this.checkClick = this.checkClick.bind(this);
    this.selecteAll = this.selecteAll.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  checkClick = (item) => (e) => {
    const { id } = item;
    const { mockdata } = this.state
    mockdata.map((data) => {
      if (data.id === id) {
        data.checks = e.target.checked
      }
      return data
    })
    this.setState({
       mockdata,
       checkAll: !mockdata.some((data) => !data.checks)
      })
    this.getTotal()
  }

  buttonClick = (item, type) => () => {
    const { id } = item
    const { mockdata } = this.state
    mockdata.map((data) => {
      if (data.id === id) {
        if (type === 'reduce') data.amount -= 1;
        else data.amount += 1;
      }
      return data
    })
    this.setState({ mockdata })
    this.getTotal()
  }

  selecteAll = (e) => {
    const { mockdata, checkAll } = this.state;
    let { Total } = this.state;
    mockdata.map((data) => {
      if (checkAll === 'false') {
        data.checks = !e.target.checked;
      }
      else {
        data.checks = e.target.checked;
      }
      return data;
    });

    this.setState({
      mockdata, Total,
      checkAll:e.target.checked
    })
    this.getTotal();
  }

  getTotal() {
    const { mockdata } = this.state;
    const Total = mockdata.reduce((prev, cur) => {
      if (cur.checks) return prev + cur.price * cur.amount;
      return prev
    }, 0);
    this.setState({Total});
  }

  render() {
    const { mockdata } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">购物车</h1>
        </header>
        <div className="App-content">
          {
            mockdata.map((item, index) => {
              return (
                <div className="itembox" key={index}>
                  <div className="item" style={{ width: "10%" }}><Checkbox onChange={this.checkClick(item)} checked={item.checks} value={item.id}></Checkbox></div>
                  <div className="item" style={{ width: "15%" }}>{item.name}</div>
                  <div className="item" style={{ width: "20%" }}>{item.price}元/斤</div>
                  <div className="item" style={{ width: "35%" }}><Button onClick={this.buttonClick(item, 'reduce')} disabled={item.amount <= 0} type="primary" shape="circle" icon="minus" size='small' style={{ marginRight: "5px" }}></Button><span>{item.amount}</span><Button onClick={this.buttonClick(item, 'add')} type="primary" shape="circle" icon="plus" size='small' style={{ marginLeft: "5px" }}></Button></div>
                  <div className="item" style={{ width: "20%" }}> 共{item.price*(item.amount-0)}元</div>
                </div>
              )
            }
            )
          }
        </div>
        <footer className="App-footer"><Checkbox onChange={this.selecteAll} checked={this.state.checkAll}></Checkbox>总计{this.state.Total}</footer>
      </div>
    );
  }
}

export default App;
