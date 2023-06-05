import { PageContainer } from '@ant-design/pro-layout';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable, TableDropdown, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Switch, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi';
import { getTicket,deleteTicket } from '@/services/ticket';
import Edit from './components/edit';
import Create from './components/add';
import FormItem from 'antd/lib/form/FormItem';


const Index = () => {
    const actionRef = useRef();
    const [editID, setEditId] = useState(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const isShowModal = (state) => {
        setIsModalVisible(state);
    }
    const isShowModalEdit = (state, id) => {
        setEditId(id);
        setIsModalVisibleEdit(state);
    }
    const getData = async (params) => {
        const response = await getTicket();
        if (response.status === 1) {
            message.error('身份认证已失效，请重新登录');
            history.replace('/login');
        }
        return getTicket(params)
    }
    const deleteDate = async(params)=>{
        const response = await deleteTicket(params);
        if(response.status ==='ok'){
            message.success('删除成功');
            actionRef.current.reload();
        }
        else{
            message.error('删除失败');
        }
    }


    const columns = [
        {
            title: '票号',
            dataIndex: 'TicketID',
        },
        {
            title: '线路号',
            dataIndex: 'RouteID',
            hideInSearch: true,
        },
        {
            title: '乘客账号',
            dataIndex: 'PassID',
        },
        {
            title: '购买时间',
            dataIndex: 'BuyTime',
            hideInSearch: true,
        },
        {
            title: '票务状态',
            dataIndex: 'TicketStatus',
            hideInSearch: true,
        },
        {
            title: '座位号',
            dataIndex: 'SeatID',
            hideInSearch: true,
        },
        {
            title: '编辑',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => isShowModalEdit(true, record.TicketID)}>编辑</a>
        },
        {
            title: '删除',
            hideInSearch: true,
            render: (_, record) => {if(record.TicketStatus==='退票') return <a onClick={() => deleteDate(record.TicketID)}>删除</a>
            if(record.TicketStatus==='过期') return <a onClick={() => deleteDate(record.TicketID)}>删除</a>
            if(record.TicketStatus==='已乘') return <a onClick={()=>{message.error('仅退票和过期状态可删除')}}>已乘不可删除</a>
            else return <a onClick={()=>{message.error('仅退票和过期状态可删除')}}>未乘不可删除</a>
        }
        },
    ];
    return (
        <PageContainer>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}) => getData(params)}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    /* onChange(value) {
                        console.log('value: ', value);
                    }, */
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                pagination={{
                    pageSize: 10,
                }}
                dateFormatter="string"
                headerTitle="票务信息"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => isShowModal(true)}>
                        新建
                    </Button>,
                ]}
            />
            <Create
                actionRef={actionRef}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                isShowModal={isShowModal}
            />
            {
                !isModalVisibleEdit ? '' :
                    <Edit
                        actionRef={actionRef}
                        isModalVisible={isModalVisibleEdit}
                        setIsModalVisible={setIsModalVisibleEdit}
                        isShowModal={isShowModalEdit}
                        editID={editID}
                    />
            }
        </PageContainer>
    )
}
export default Index