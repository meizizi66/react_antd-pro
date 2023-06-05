import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { addDriver } from '@/services/user';


const add = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible } = props;
    const addDrivers = async (values) => {
        const response = await addDriver(values);
        if (response.status === 'ok') {
            message.success('添加成功');
            actionRef.current.reload();
            setIsModalVisible(false);
        }
        else {
            message.error('添加失败');
        }
    }
    return (
        <Modal
            title="添加新驾驶员"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            <ProForm
                onFinish={(values) => addDrivers(values)}
            >
                <ProFormText
                    width="md"
                    name="DriverID"
                    label="编号"
                    rules={[{ required: true, message: 'Please input your DriverID!' }]}
                    placeholder="请输入编号"
                />
                <ProFormText
                    width="md"
                    name="DriverName"
                    label="姓名"
                    rules={[{ required: true, message: 'Please input your DriverName!' }]}
                    placeholder="请输入姓名"
                />
                <ProFormText
                    width="md"
                    name="DriverPhone"
                    label="电话"
                    rules={[{ required: true, message: 'Please input your DriverPhone!' }]}
                    placeholder="请输入电话"
                />
                <ProFormText
                    width="md"
                    name="is_work"
                    label="是否上班"
                    valueEnum={{
                        1: '驾驶中',
                        0: '休息中',
                    }}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    placeholder="请输入1(驾驶中)或者0(休息中)"
                />
            </ProForm>
        </Modal>
    )
}
export default add
