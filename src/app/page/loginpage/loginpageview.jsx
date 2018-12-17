import React, { Component } from "react";
import provider from "../../dataproviderclient";
import { Steps, Button, message } from "antd";
// import SelectLanguage from "./selectlanguage";
import IntroGravity from "./introgravity";
import SetAndReWallet from "./setandrewallet";
import SetPassword from "./setpassword";
import WalletSeed from "./walletseed";
import LoginGravity from "./logingravity";
import ImportSeed from "./importseed";
// import ReWeed from "./reweed";

const Step = Steps.Step;

class LoginPageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      status: 1,
      pwd: "",
      loginpwd: "",
      surepwd: "",
      seed: "",
      importseed: "",
      Logingravitypwd: "",
      passwordErrorsInfo: [{ info: "", help: "" }, { info: "", help: "" }]
    };
  }
  componentWillMount() {
    provider.requestWithResponse("isnewuser", {}, res => {
      if (res.status === 200) {
        const { current } = this.state;
        if (res.data === "old") {
          this.setState({
            current: current + 4
          });
        } else {
          this.setState({
            current
          });
        }
      } else {
        message.error("信息有误！");
      }
    });
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  nextKey() {
    const current = this.state.current + 1;
    this.setState({ current });
    sessionStorage.setItem("markkey", 1);
    console.log("current", this.state.current);
  }
  nextTwokey() {
    const current = this.state.current + 4;
    this.setState({ current });
    sessionStorage.setItem("markkey", 2);
  }
  nextSome() {
    const { importseed } = this.state;
    if (importseed) {
      const current = this.state.current - 2;
      this.setState({ current });
    } else {
      this.setPasswordErrorInfo(0, "请先输入种子！");
    }
  }
  setPasswordErrorInfo(input, help) {
    this.state.passwordErrorsInfo[input].info = "error";
    this.state.passwordErrorsInfo[input].help = help;

    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  resetPasswordErrorInfo(input, help) {
    this.state.passwordErrorsInfo[input].info = "";
    this.state.passwordErrorsInfo[input].help = help;

    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  setPasswordErrorInfoPairs(help) {
    this.state.passwordErrorsInfo[0].info = "error";
    this.state.passwordErrorsInfo[0].help = help[0];
    this.state.passwordErrorsInfo[1].info = "error";
    this.state.passwordErrorsInfo[1].help = help[1];
    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  resetPasswordInfoPairs(help) {
    this.state.passwordErrorsInfo[0].info = "";
    this.state.passwordErrorsInfo[0].help = help[0];
    this.state.passwordErrorsInfo[1].info = "";
    this.state.passwordErrorsInfo[1].help = help[1];
    this.setState({
      passwordErrorsInfo: this.state.passwordErrorsInfo
    });
  }
  nextPassword() {
    const { pwd, surepwd, seed, importseed } = this.state;

    if (!pwd && !surepwd) {
      this.setPasswordErrorInfoPairs(["", "密码不能为空！"]);
      return;
    } else if (pwd !== surepwd) {
      this.setPasswordErrorInfoPairs(["", "确认密码和密码不匹配！"]);
      return;
    } else if (sessionStorage.getItem("markkey") === "1") {
      let walletpassword = {
        seed: seed,
        password: pwd
      };
      provider.requestWithResponse(
        "setnewwalletpassword",
        walletpassword,
        res => {
          if (res.status === 200) {
            this.setState({
              walletseedpwd: res.data
            });
          } else {
            console.log(res);
            message.error("设置密码失败!");
          }
        }
      );
      const current = this.state.current + 1;
      this.setState({ current });
    } else if (sessionStorage.getItem("markkey") === "2") {
      let walletpassword = {
        seed: importseed,
        password: pwd
      };
      console.log("恢复种子传入的参数：", walletpassword);
      provider.requestWithResponse("restorewallet", walletpassword, res => {
        if (res.status === 200) {
          this.setState({
            walletseedpwd: res.data
          });
        } else {
          console.log(res);
          message.error("设置密码失败!");
        }
      });
      const current = this.state.current + 1;
      this.setState({ current });
    }
  }
  foucusResetInput() {
    this.resetPasswordInfoPairs(["", ""]);
  }
  foucusImportInput() {
    this.resetPasswordErrorInfo(0, "");
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  prevtwo() {
    const current = this.state.current - 4;
    this.setState({ current });
  }
  prevsome() {
    const current = this.state.current + 2;
    this.setState({ current });
  }
  handleLogin() {
    const { Logingravitypwd } = this.state;
    if (!Logingravitypwd) {
      this.setPasswordErrorInfo(0, "密码不能为空!");
      return;
    }
    let loginpwd = { password: Logingravitypwd };

    provider.requestWithResponse("loginwallet", loginpwd, res => {
      if (res.status === 200 && res.data === "success") {
        provider.request("startcore");
        provider.request("startwallet", loginpwd);
        provider.request("loginmainwindow");
      } else {
        this.setPasswordErrorInfo(0, "密码输入错误!");
      }
    });
  }

  getSeed(seed) {
    this.setState({
      seed
    });
  }
  importSeed(importseed) {
    this.setState({
      importseed
    });
  }
  handelChangePassword(e) {
    this.setState({
      pwd: e.target.value
    });
  }
  handelChangeSureValue(e) {
    this.setState({
      surepwd: e.target.value
    });
  }
  loginPwd(e) {
    this.setState({
      Logingravitypwd: e.target.value
    });
  }

  render() {
    const { current } = this.state;
    const steps = [
      // {
      //   title: "1",
      //   content: <SelectLanguage />
      // },
      {
        title: "1",
        content: <IntroGravity />
      },
      {
        title: "2",
        content: (
          <SetAndReWallet
            clickCreWallet={() => this.nextKey()}
            clickReWallet={() => this.nextTwokey()}
          />
        )
      },
      {
        title: "3",
        content: (
          <WalletSeed
            getSeed={seed => {
              this.getSeed(seed);
            }}
          />
        )
      },
      // {
      //   title: "4",
      //   content: <ReWeed />
      // },
      {
        title: "4",
        content: (
          <SetPassword
            verifyPwd={(pwd, surepwd) => {
              this.verifyPwd(pwd, surepwd);
            }}
            wallet={this.state.seed}
            passwordValue={this.state.pwd}
            sureValue={this.state.surepwd}
            onPasswordValueChange={e => this.handelChangePassword(e)}
            onSureValueChange={e => this.handelChangeSureValue(e)}
            errorInfo={this.state.passwordErrorsInfo}
            foucusResetInput={() => {
              this.foucusResetInput();
            }}
          />
        )
      },
      // {
      //   title: "4",
      //   content: <ReWeed />
      // },
      {
        title: "5",
        content: (
          <LoginGravity
            errorInfo={this.state.passwordErrorsInfo}
            loginPwd={pwd => this.loginPwd(pwd)}
            foucusImportInput={() => {
              this.foucusImportInput();
            }}
          />
        )
      },
      {
        title: "6",
        content: (
          <ImportSeed
            errorInfo={this.state.passwordErrorsInfo}
            importSeed={seed => {
              this.importSeed(seed);
            }}
            foucusImportInput={() => {
              this.foucusImportInput();
            }}
          />
        )
      }
    ];
    return (
      <div className="login-page">
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current === 3 && sessionStorage.getItem("markkey") === "1" && (
            <Button onClick={() => this.prev()}>上一步</Button>
          )}
          {current === 3 && sessionStorage.getItem("markkey") === "2" && (
            <Button onClick={() => this.prevsome()}>上一步</Button>
          )}
          {current === 5 && (
            <Button onClick={() => this.prevtwo()}>上一步</Button>
          )}
          {current > 0 && current < 3 && (
            <Button onClick={() => this.prev()}>上一步</Button>
          )}
          {current < 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current < steps.length - 2 && current > 2 && (
            <Button type="primary" onClick={() => this.nextPassword()}>
              下一步
            </Button>
          )}
          {current === 2 && sessionStorage.getItem("markkey") === "2" && (
            <Button type="primary" onClick={() => this.nextTwokey()}>
              下一步
            </Button>
          )}
          {current === 2 && sessionStorage.getItem("markkey") === "1" && (
            <Button type="primary" onClick={() => this.nextKey()}>
              下一步
            </Button>
          )}

          {current === 4 && (
            <Button type="primary" onClick={() => this.handleLogin()}>
              登录
            </Button>
          )}
          {current === 5 && (
            <Button type="primary" onClick={() => this.nextSome()}>
              下一步
            </Button>
          )}
          {/* {current === 5 && sessionStorage.getItem("markkey") === "1" && (
            <Button onClick={() => this.prev()}>上一步</Button>
          )}
          {current === 5 && sessionStorage.getItem("markkey") === "2" && (
            <Button onClick={() => this.prevsome()}>上一步</Button>
          )}
          {current === 7 && (
            <Button onClick={() => this.prevtwo()}>上一步</Button>
          )}
          {current > 0 && current < 5 && (
            <Button onClick={() => this.prev()}>上一步</Button>
          )}
          {current < 2 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current < steps.length - 2 && current > 3 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {current === 3 && sessionStorage.getItem("markkey") === "2" && (
            <Button type="primary" onClick={() => this.nextTwokey()}>
              下一步
            </Button>
          )}
          {current === 3 && sessionStorage.getItem("markkey") === "1" && (
            <Button type="primary" onClick={() => this.nextKey()}>
              下一步
            </Button>
          )}

          {current === 6 && (
            <Button type="primary" onClick={() => this.handleLogin()}>
              登录
            </Button>
          )}
          {current === 7 && (
            <Button type="primary" onClick={() => this.nextSome()}>
              下一步
            </Button>
          )} */}
        </div>
      </div>
    );
  }
}

export default LoginPageView;
