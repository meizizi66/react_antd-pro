import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { addPass } from '@/services/car';


const add = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible } = props;
    const addPasss = async (values) => {
        const response = await addPass(values);
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
            title="添加新乘客"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            <ProForm
                onFinish={(values) => addPasss(values)}
            >
                <ProFormText
                    width="md"
                    name="PassID"
                    label="乘客编号"
                    rules={[{ required: true, message: 'Please input your PassID!' }]}
                    placeholder="请输入乘客编号"
                />
                <ProFormText
                    width="md"
                    name="PassNAME"
                    label="乘客姓名"
                    rules={[{ required: true, message: 'Please input your PassNAME!' }]}
                    placeholder="请输入乘客姓名"
                />
                <ProFormText
                    width="md"
                    name="PassSex"
                    label="性别"
                    valueEnum={{
                        男: '男',
                        女: '女',
                    }}
                    rules={[{ required: true, message: 'Please input your PassSex!' }]}
                    placeholder="请输入性别"
                />
                <ProFormText
                    width="md"
                    name="PassIDCard"
                    label="身份证号"
                    rules={[{ required: true, message: 'Please input your PassIDCard!' }]}
                    placeholder="请输入身份证号"
                />
                <ProFormText
                    width="md"
                    name="PassPhone"
                    label="电话"
                    rules={[{ required: true, message: 'Please input your PassPhone!' }]}
                    placeholder="请输入电话 "
                />
            </ProForm>
        </Modal>
    )
}
export default add
