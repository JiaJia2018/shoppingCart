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

class Appcopy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mockdata: mockdatasss,
            checkAll: false,
            TotalPrice: 0
        };
        this.selecteSingel=this.selecteSingel.bind(this);
        this.selecteAll = this.selecteAll.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    selecteSingel = (item) =>(e)=> {
        const { mockdata} = this.state;
        const {id}=item;
        mockdata.map((data) => {
            if (data.id === id) {
             data.checks=e.target.checked
            }
            return data;  
        });
        this.setState({ mockdata,
            checkAll: !mockdata.some((data) => !data.checks) })
        this.getTotalPrice()
    }

    buttonClick = (item, type) =>()=> {
        const { id } = item;
        const { mockdata} = this.state;
        mockdata.map((data) => {
            if (data.id === id) {
                if (type === "add") {
                    data.amount += 1;
                }
                else {
                    data.amount -= 1;
                }
            }
            return data;  
        });
        this.setState({ mockdata })
        this.getTotalPrice()
    }

    selecteAll = (e) => {
        const { mockdata, checkAll } = this.state;
        let { TotalPrice } = this.state;
        mockdata.map((data) => {
            if (checkAll === "false") {
                data.checks = !e.target.checked;
            }
            else data.checks = e.target.checked;
            return data;
        });
        this.setState({
            mockdata, TotalPrice,
            checkAll: e.target.checked
        })

        this.getTotalPrice();
    }

    getTotalPrice() {
        const { mockdata} = this.state;
        const TotalPrice = mockdata.reduce((prev, cur) => {
            if (cur.checks) return prev + cur.price * (cur.amount - 0);
            return prev;
        }, 0);

        this.setState({ TotalPrice })
    }

    render() {
        const { mockdata } = this.state;
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
                                    <div className="item" style={{ width: "10%" }}><Checkbox onChange={this.selecteSingel(item)} checked={item.checks} value={item.id}></Checkbox></div>
                                    <div className="item" style={{ width: "15%" }}>{item.name}</div>
                                    <div className="item" style={{ width: "20%" }}>{item.price}元/斤</div>
                                    <div className="item" style={{ width: "35%" }}><Button onClick={this.buttonClick(item, 'reduce')} disabled={item.amount <= 0} type="primary" shape="circle" icon="minus" size='small' style={{ marginRight: "5px" }}></Button><span>{item.amount}</span><Button onClick={this.buttonClick(item, 'add')} type="primary" shape="circle" icon="plus" size='small' style={{ marginLeft: "5px" }}></Button></div>
                                    <div className="item" style={{ width: "20%" }}> 共{item.price * (item.amount - 0)}元</div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <footer className="App-footer"><Checkbox onChange={this.selecteAll} checked={this.state.checkAll}></Checkbox>总计{this.state.TotalPrice}</footer>
            </div>

        );
    }
}

export default Appcopy;