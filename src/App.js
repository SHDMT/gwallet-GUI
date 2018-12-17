import React, { Component } from "react";
import { Layout, Modal } from "antd";

import provider from './app/dataproviderclient';
import NavPage from "./app/page/nav/navpageview";
import PageContainer from "./app/page/container/pagecontainer";
import ToolbarPage from "./app/page/toolbar/toolbarpageview";
import StatebarPage from "./app/page/statebar/statebarpageview";

import HomePage from "./app/page/features/homepage/homepageview";
import TransactionPage from "./app/page/features/transactionpage/transactionpageview";
import SettingPage from "./app/page/features/settingpage/settingpageview";
import TestingPage from "./app/page/features/rpctestpage/rpctestpageview";

import HistoryPage from "./app/page/features/historypage/historypageview";
import AddressPage from "./app/page/features/addresspage/addresspageview";
import ContractPage from "./app/page/features/contractpage/contractpageview";


import LoginPage from "./app/page/loginpage/loginpageview";
import LoadingPage from "./app/page/loadingpage/loadingpageview";

import pipe from "./app/tools/pipe";
import pulseServer from "./app/pulseserver";
import pulse from "./app/tools/pulse";

import './theme/normalize.css';
import 'antd/dist/antd.css';
import './theme/App.css';
import './theme/default/layout.css';
import './theme/default/style.css';

const confirm = Modal.confirm;
const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.pages = new Map();
        this.currentID = 0;
        this.setupPages();

        this.state = {
            selected: 0,
            pages: this.pages,
            view: null
        };

        provider.requestWithResponse("getappview", null, (res) => {
            this.setState({
                view: res.view
            });
        });
        require('events').EventEmitter.prototype._maxListeners = 0;
    }

    setupPages() {
        this.addPage("Home", "主页", <HomePage />, "home");
        this.addPage("Transaction", "交易", <TransactionPage />, "money-collect");
        this.addPage("History", "历史", <HistoryPage />, "clock-circle");
        this.addPage("Address", "通讯录", <AddressPage />, "contacts", true);
        this.addPage("Contract", "智能合约", <ContractPage />, "audit");
        this.addPage("Setting", "设置", <SettingPage />, "setting", true);
        // this.addPage("Testing", "测试", <TestingPage />, "fire");
    }

    selectPage(e) {
        let id = e.detail;
        if (this.state.selected != id) {
            this.setState({
                selected: id
            });
        }

        sessionStorage.setItem("selectedPage", id);
    }

    addPage(name, title, obj, icon, refresh = false) {
        this.pages.set(this.currentID, {
            id: this.currentID,
            name: name,
            title: title,
            obj: obj,
            icon: icon,
            refresh: refresh,
        });
        return this.currentID ++;
    }

    componentDidMount() {
        pipe.pipeRegister("selectpage", (e) => this.selectPage(e));

        sessionStorage.setItem("account", "default");
        sessionStorage.setItem("asset", "gravity");
        if (sessionStorage.getItem("selectedPage") === null) {
            sessionStorage.setItem("selectedPage", '0');
        }
        pulseServer.registerPulse();
        pulse.start();
    }
    componentWillUnmount() {
        pulse.stop();
        pipe.pipeRemove("selectpage", (e) => this.selectPage(e));
    }
    showExitConfirm(e) {
        e.preventDefault();
        confirm({
            title: '退出钱包',
            content: '是否确认退出钱包？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                provider.request("closemainwindow");
            }
        });
    }

    render() {
        let view = this.state.view;
        if (view === null) {
            return (
                <LoadingPage />
            );
        } else if (view === "login") {
            return (
                <LoginPage />
            );
        }

        let selectedPage = sessionStorage.getItem("selectedPage");
        return (
            <Layout className="app-content">
                <Layout>
                    <Sider className="sider"><NavPage customIcon={false} pages={this.state.pages} selected={selectedPage} showLogo={true} title="Gravity" /></Sider>
                    <Layout>
                        <Header className="header"><ToolbarPage /></Header>
                        <Content className="content"><PageContainer pages={this.state.pages} selected={selectedPage} /></Content>
                    </Layout>
                </Layout>
                <Footer className="footer"><StatebarPage /></Footer>
            </Layout>
        );
    }
}
export default App;
