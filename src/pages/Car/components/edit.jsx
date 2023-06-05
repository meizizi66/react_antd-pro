import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message, Modal, Skeleton } from 'antd';
import { updateCar } from '@/services/car';
import { specificCar } from '@/services/car';



const edit = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible, editID } = props;
    let [initialvalues, setInitialvalues] = useState(undefined);
    useEffect(async () => {
        const response = await specificCar(editID);
        setInitialvalues(response.data[0]);
    }, [])
    const editCars = async (values) => {
        const response = await updateCar(values);
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
            title="编辑汽车信息"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            {
                !initialvalues ? <Skeleton /> :
                    <ProForm
                        onFinish={(values) => editCars(values)}
                        initialValues={initialvalues}
                    >
                        <ProFormText
                            width="md"
                            name="CarNUM"
                            readonly
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
            }


        </Modal>
    )
}
export default edit
