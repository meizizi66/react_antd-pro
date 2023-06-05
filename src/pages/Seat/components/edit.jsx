import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText, ProFormDateTimePicker, ProFormSelect} from '@ant-design/pro-components';
import { message, Modal, Skeleton } from 'antd';
import { updateSeat } from '@/services/seat';
import { specificSeat } from '@/services/seat';



const edit = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible, editID } = props;
    let [initialvalues, setInitialvalues] = useState(undefined);
    useEffect(async () => {
        const response = await specificSeat(editID);
        setInitialvalues(response.data[0]);
        /* setInitialvalues(response.data[0]); */
    }, [])
    const editSeat = async (values) => {
        const response = await updateSeat(values);
        if (response.status === 'ok') {
            message.success('修改成功');
            actionRef.current.reload();
            setIsModalVisible(false);
        }
        else {
            message.error('修改失败');
        }
    }
    return (
        <Modal
            title="编辑座位"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            {
                !initialvalues ? <Skeleton /> :
                    <ProForm
                        onFinish={(values) => editSeat(values)}
                        initialValues={initialvalues}
                    >
                        <ProFormText
                            width="md"
                            name="RouteID"
                            label="路线号"
                            readonly
                            rules={[{ required: true, message: 'Please input your RouteID!' }]}
                            placeholder="请输入路线号"
                        />
                        <ProFormText
                            width="md"
                            name="SeatID"
                            label="座位号"
                            readonly
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
            }


        </Modal>
    )
}
export default edit
