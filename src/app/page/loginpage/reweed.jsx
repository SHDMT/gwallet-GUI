import "./layout.css";
import React, { Component } from "react";
import { Input } from "antd";

class ReSeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="reseed">
        <h2>
          钱<span>包</span>种子
        </h2>
        <p>
          下面展示的是钱包的种子，种子是用于恢复钱包的唯一方法。如果您不慎遗忘钱包密码
          或者钱包文件被损坏，您可以通过种子恢复钱包。钱包创建后，种子将被彻底销毁，
          任何人都无法通过操纵您的钱包获取种子。因此，请您将种子妥善记录下来，并保存到最安全的地方。
        </p>
        <p>
          The end of _____ term is coming soon. All the students are preparing
          for the final exam. Some students want to _____ the high mark by
          playing some _______. There is no meaning to do this. _______ is very
          important, because it decides what kind of person we will be. So we
          should behave _____ well and our parents will be proud of us.
        </p>
      </div>
    );
  }
}

export default ReSeed;
