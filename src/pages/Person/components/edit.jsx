import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message, Modal, Skeleton } from 'antd';
import { updateDriver } from '@/services/user';
import { specificDriver } from '@/services/user';



const edit = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible, editID } = props;
    let [initialvalues, setInitialvalues] = useState(undefined);
    useEffect(async () => {
        const response = await specificDriver(editID);
        setInitialvalues(response.data[0]);
        console.log(initialvalues);
    }, [])
    const editDrivers = async (values) => {
        const response = await updateDriver(values);
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
            title="编辑驾驶员"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            {
                !initialvalues ? <Skeleton /> :
                    <ProForm
                        onFinish={(values) => editDrivers(values)}
                        initialValues={initialvalues}
                    >
                        <ProFormText
                            width="md"
                            name="DriverID"
                            label="编号"
                            readonly
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
                            readonly
                            valueEnum={{
                                1: '驾驶中',
                                0: '休息中',
                            }}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            placeholder="请输入1(驾驶中)或者0(休息中)"
                        />
                    </ProForm>
            }


        </Modal>
    )
}
export default edit
