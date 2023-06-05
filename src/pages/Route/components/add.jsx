import React from 'react';
import { ProForm, ProFormText, ProFormDateTimePicker, ProFormSelect } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { addRoute } from '@/services/route';
import { getCarID } from '@/services/car';
import { getDriverID } from '@/services/user';


const add = (props) => {
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible } = props;
    const addRoutes = async (values) => {
        const response = await addRoute(values);
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
            title="添加新路线"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            <ProForm
                onFinish={(values) => addRoutes(values)}
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
                    name="StartPlace"
                    label="起始地"
                    rules={[{ required: true, message: 'Please input your StartPlace!' }]}
                    placeholder="请输入起始地"
                />
                <ProFormText
                    width="md"
                    name="EndPlace"
                    label="目的地"
                    rules={[{ required: true, message: 'Please input your EndPlace!' }]}
                    placeholder="目的地"
                />
                <ProFormDateTimePicker
                    name="StartTime"
                    label="开始时间"
                    fieldProps={{
                        format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
                    }}
                />
                <ProFormDateTimePicker
                    name="EndTime"
                    label="结束时间"
                    fieldProps={{
                        format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
                    }}
                />
                <ProFormSelect
                    width="md"
                    name="CarNUM"
                    label="汽车编号"
                    request={()=>getCarID()}
                    rules={[{ required: true, message: 'Please input your CarNUM!' }]}
                    placeholder="请选择可使用的汽车"
                />
                <ProFormSelect
                    width="md"
                    name="DriverID"
                    label="驾驶员编号"
                    request={()=>getDriverID()}
                    rules={[{ required: true, message: 'Please input your DriverID!' }]}
                    placeholder="请选择休息中的驾驶员"
                />
                <ProFormText
                    width="md"
                    name="SeatNum"
                    label="座位数"
                    rules={[{ required: true, message: 'Please input your SeatID!' }]}
                    placeholder="请输入座位数"
                />
                <ProFormText
                    width="md"
                    name="price"
                    label="票价"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                    placeholder="请输入票价"
                />
                <ProFormText
                    width="md"
                    name="RouteStatus"
                    label="汽车状态"
                    valueEnum={{
                        未发车: '未发车',
                    }}
                    rules={[{ required: true, message: 'Please input your RouteStatus!' }]}
                    placeholder="请输入汽车状态"
                />
            </ProForm>
        </Modal>
    )
}
export default add
