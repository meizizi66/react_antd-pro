import React from 'react';
import { ProForm, ProFormText, ProFormDateTimePicker, ProFormSelect } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { addSeat } from '@/services/seat';


const add = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible } = props;
    const addSeats = async (values) => {
        const response = await addSeat(values);
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
            title="添加新座位"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            <ProForm
                onFinish={(values) => addSeats(values)}
            >
                <ProFormText
                            width="md"
                            name="RouteID"
                            label="路线号"
                            rules={[{ required: true, message: 'Please input your RouteID!' }]}
                            placeholder="请输入路线号"
                        />
                        <ProFormText
                            width="md"
                            name="SeatID"
                            label="座位号"
                            rules={[{ required: true, message: 'Please input your SeatID!' }]}
                            placeholder="请输入座位号"
                        />
                        <ProFormSelect
                            width="md"
                            name="SeatStatus"
                            label="是否售出"
                            valueEnum={{
                                未售: '未售',
                                已售: '已售',
                            }}
                            placeholder="请输入是否售出"
                            rules={[{ required: true, message: 'Please select your SeatStatus!' }]}
                        />
                        {/* <ProFormText
                            width="md"
                            name="SeatStatus"
                            label="是否售出"
                            rules={[{ required: true, message: 'Please input your SeatStatus!' }]}
                            placeholder="请输入是否售出"
                        /> */}
            </ProForm>
        </Modal>
    )
}
export default add
