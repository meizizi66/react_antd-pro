import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message, Modal, Skeleton } from 'antd';
import { updatePass } from '@/services/car';
import { specificPass } from '@/services/car';



const edit = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible, editID } = props;
    let [initialvalues, setInitialvalues] = useState(undefined);
    useEffect(async () => {
        const response = await specificPass(editID);
        setInitialvalues(response.data[0]);
    }, [])
    const editPass = async (values) => {
        const response = await updatePass(values);
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
            title="编辑乘客"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            {
                !initialvalues ? <Skeleton /> :
                    <ProForm
                        onFinish={(values) => editPass(values)}
                        initialValues={initialvalues}
                    >
                        <ProFormText
                            width="md"
                            readonly
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
            }


        </Modal>
    )
}
export default edit
