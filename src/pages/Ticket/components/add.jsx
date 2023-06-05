import React,{useState,useEffect} from 'react';
import { ProForm, ProFormText, ProFormDateTimePicker, ProFormSelect } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { addTicket } from '@/services/ticket';
import { getRouteID } from '@/services/route';
import { getPassID } from '@/services/car';
import { getDirection } from 'umi';


const add = (props) => {
/*     const [RouteID,setRouteID] = useState([]); */
    const { actionRef, isShowModal, isModalVisible, setIsModalVisible } = props;
    const addTickets = async (values) => {
        const response = await addTicket(values);
        if (response.status === 'ok') {
            message.success('添加成功');
            actionRef.current.reload();
            setIsModalVisible(false);
        }
        else {
            message.error('添加失败');
        }
    }
/*     useEffect(async()=>{
        let response = await getRouteID();
        console.log(response);
        setRouteID(response);
    },[]) */
    return (
        <Modal
            title="添加新票"
            visible={isModalVisible}
            footer={null}
            onCancel={() => isShowModal(false)}
            destroyOnClose={true}
        >
            <ProForm
                onFinish={(values) => addTickets(values)}
            >
                <ProFormText
                    width="md"
                    name="TicketID"
                    label="票号"
                    rules={[{ required: true, message: 'Please input your TicketID!' }]}
                    placeholder="请输入票号"
                />
                {/* <ProFormText
                    width="md"
                    name="RouteID"
                    label="路线号"
                    rules={[{ required: true, message: 'Please input your RouteID!' }]}
                    placeholder="请输入路线号"
                /> */}
                <ProFormSelect
                    width="md"
                    name="RouteID"
                    label="路线号"
                    request={()=>getRouteID()}
                    placeholder="请选择路线号"
                    rules={[{ required: true, message: 'Please select your RouteID!' }]}
                />
                <ProFormSelect
                    width="md"
                    name="PassID"
                    request={()=>getPassID()}
                    label="乘客账号"
                    rules={[{ required: true, message: 'Please input your PassID!' }]}
                    placeholder="请选择乘客"
                />
                {/*                 <ProFormText
                    width="md"
                    name="BuyTime"
                    label="购买时间"
                    rules={[{ required: true, message: 'Please input your BuyTime!' }]}
                    placeholder="购买时间"
                /> */}
                <ProFormDateTimePicker
                    name="BuyTime"
                    label="购买时间"
                    rules={[{ required: true, message: 'Please input your BuyTime!' }]}
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
        </Modal>
    )
}
export default add
