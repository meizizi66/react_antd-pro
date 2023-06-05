import React, { useEffect, useState } from 'react';
import { ProForm, ProFormText, ProFormDateTimePicker, ProFormSelect } from '@ant-design/pro-components';
import { message, Modal, Skeleton } from 'antd';
import { updateTicket } from '@/services/ticket';
import { getRouteID } from '@/services/route';
import { getPassID } from '@/services/car';
import { specificTicket } from '@/services/ticket';



const edit = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible, editID } = props;
    let [initialvalues, setInitialvalues] = useState(undefined);
    useEffect(async () => {
        const response = await specificTicket(editID);
        setInitialvalues(response.data[0]);
        /* setInitialvalues(response.data[0]); */
    }, [])
    const editTicket = async (values) => {
        const response = await updateTicket(values);
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
            title="编辑票务"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            {
                !initialvalues ? <Skeleton /> :
                    <ProForm
                        onFinish={(values) => editTicket(values)}
                        initialValues={initialvalues}
                    >
                        <ProFormText
                            width="md"
                            name="TicketID"
                            label="票号"
                            readonly
                            rules={[{ required: true, message: 'Please input your TicketID!' }]}
                            placeholder="请输入票号"
                        />
                        <ProFormSelect
                            width="md"
                            name="RouteID"
                            label="路线号"
                            request={()=>getRouteID()}
                            placeholder="请输入路线号"
                            rules={[{ required: true, message: 'Please select your RouteID!' }]}
                        />
                        <ProFormText
                            width="md"
                            name="PassID"
                            label="乘客账号"
                            request={()=>getPassID()}
                            rules={[{ required: true, message: 'Please input your PassID!' }]}
                            placeholder="乘客账号"
                        />
                        <ProFormDateTimePicker
                            name="BuyTime"
                            label="购买时间"
                            fieldProps={{
                                format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
                            }}
                        />
                        <ProFormText
                            width="md"
                            name="TicketStatus"
                            label="票务状态"
                            valueEnum={{
                                未乘: '未乘',
                                已乘: '已乘',
                                退票: '退票',
                                过期: '过期',
                            }}
                            rules={[{ required: true, message: 'Please input your TicketStatus!' }]}
                            placeholder="请输入票务状态"
                        />
                        <ProFormText
                            width="md"
                            name="SeatID"
                            label="座位号"
                            rules={[{ required: true, message: 'Please input your SeatID!' }]}
                            placeholder="请输入座位号"
                        />
                    </ProForm>
            }


        </Modal>
    )
}
export default edit
