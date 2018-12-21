import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class UserInfoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                closable={false}
                onCancel={this.props.handleOk}
                footer={[
                    <Button key="OK" type="primary" onClick={this.props.handleOk}>
                      OK
                    </Button>
                ]}
            >
            <h3>TITTLE</h3>
            This is user info
            </Modal>
        );
    }
}

export default UserInfoModal;