import "./layout.css";
import React, { Component } from "react";
import { Select, Row, Col, Carousel } from "antd";
const Option = Select.Option;

class IntroGravity extends Component {
  constructor(props) {
    super(props);
  }
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  render() {
    return (
      <div className="introgravity">
        <Row>
          <Col span={9}>
            <div className="gravity-title">
              <span>G</span>ravity
            </div>
            <p style={{ padding: "20px 10px" }}>
              欢迎使用<span>G</span>
              ravity官方钱包，下面将进行一系列初始化操作，为了您的账户安全，请按照教程耐心操作。
            </p>
          </Col>
          <Col span={15} className="intro-gravity">
            <Carousel afterChange={() => this.onChange()} autoplay={true}>
              <div className="gravity-mean">
                <h2>
                  什么是<span>G</span>ravity?
                </h2>
                <p>
                  <span>G</span>ravity 是一种新型底层公有链分布式账本系统。
                  <span>G</span>
                  ravity 是一种新型底层公有链分布式账本系统。 它采用新型的
                  DAG(Directed Acyclic Graph)存储和共识方案，以及基于 DAG
                  的智能合约方案设计。 不仅可以实现 在 <span>G</span>
                  ravity网络上交易的快速落账以及数据的及时共享，而且可以在该平台上灵活地
                  开发去中心化 的应用程序(DApp)。此外，
                  <span>G</span>ravity 还实现了公有链和联盟链之间的跨
                  链技术，打通了链之间价值 交换的通道。
                </p>
              </div>
              <div className="wallet-mean">
                <h2>什么是钱包</h2>
                <p>
                  钱包是与区块链进行交互并使用货币的工具它可以用来发送和接收资金，并作为个人的交易分类帐。
                </p>
              </div>
              <div className="your-seckey">
                <h2>你的密钥</h2>
                <p>
                  钱包是由钱包种子决定产生的。记忆种子是一个包含
                  33个单词的列表，可以很容易地写在一张纸上作为备份。
                  区块链用于确认新事务是有效的，并且没有发生欺诈。
                  如果钱包加密密码被遗忘，或者钱包被破坏
                  (例如电脑坏掉)，种子可以用来找回钱包。同样的种子
                  也可以用于将您的钱包导出到其他的
                  <span>G</span>ravity钱包客户端。
                </p>
              </div>
              <div className="friend-reminder">
                <h2>友情提示</h2>
                <p>
                  始终保持种子密钥和密码的安全。如果您丢失了
                  种子密钥或密码，其他人将无法恢复它。
                  备份你的种子密钥和密码。不要把它存储在你
                  的电脑上，而是把它写下来，或者打印在一张纸上，
                  或者保存到USB驱动器上。
                  不要将种子密钥存储在云存储或密码服务中。
                  如果你的账户被盗，你的资金也会被盗。
                </p>
              </div>
            </Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default IntroGravity;
