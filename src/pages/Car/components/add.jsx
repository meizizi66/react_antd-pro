import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { addCar } from '@/services/car';


const add = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible } = props;
    const addCars = async (values) => {
        const response = await addCar(values);
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
            title="添加新汽车信息"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            <ProForm
                onFinish={(values) => addCars(values)}
            >
                <ProFormText
                    width="md"
                    name="CarNUM"
                    label="汽车号牌"
                    rules={[{ required: true, message: 'Please input your CarNUM!' }]}
                    placeholder="请输入汽车号牌"
                />
                <ProFormText
                    width="md"
                    name="CarTYPE"
                    label="汽车种类"
                    valueEnum={{
                        小轿车: '小轿车',
                        大巴车: '大巴车',
                        高铁: '高铁',
                        火车: '火车',
                    }}
                    rules={[{ required: true, message: 'Please input your CarTYPE!' }]}
                    placeholder="请输入汽车种类"
                />
                <ProFormText
                    width="md"
                    name="MaxNUM"
                    label="最大载客量"
                    rules={[{ required: true, message: 'Please input your MaxNUM!' }]}
                    placeholder="请输入最大载客量"
                />
            </ProForm>
        </Modal>
    )
}
export default add
