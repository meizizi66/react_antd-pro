import { PageContainer } from '@ant-design/pro-layout';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable, TableDropdown, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Switch, message, Modal, Alert } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi';
import { getSeat, deleteSeat } from '@/services/seat';
import Edit from './components/edit';
import Create from './components/add';
import FormItem from 'antd/lib/form/FormItem';

const alert = [
    <Alert message="未售" type="success" />,
    <Alert message="已售" type="warning" />,
]
const Index = () => {
    const actionRef = useRef();
    const [editID, setEditId] = useState(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const isShowModal = (state) => {
        setIsModalVisible(state);
    }
    const isShowModalEdit = (state, RouteID, SeatID) => {
        setEditId({ RouteID, SeatID });
        setIsModalVisibleEdit(state);
    }
    const getData = async (params) => {
        const response = await getSeat();
        if (response.status === 1) {
            message.error('身份认证已失效，请重新登录');
            history.replace('/login');
        }
        return getSeat(params)
    }
    const deleteDate = async (RouteID, SeatID) => {
        const response = await deleteSeat(RouteID, SeatID);
        if (response.status === 'ok') {
            message.success('删除成功');
            actionRef.current.reload();
        }
        else {
            message.error('删除失败');
        }
    }
    const changeStatus = async (id, status) => {
        const res = await updateStatus({ id, status });
        if (res.status === 201) {
            props.dispatch({
                type: 'todolist/fetchTodoList',
                payload: null,
            })
            message.success(res.message);
        }
        else {
            message.error('状态修改失败');
        }
    }


    const columns = [
        {
            title: '路线号',
            dataIndex: 'RouteID',
        },
        {
            title: '座位号',
            dataIndex: 'SeatID',
        },
        {
            title: '是否售出',
            dataIndex: 'SeatStatus',
            hideInSearch: true,
            render: (_, record) => {
                if(record.SeatStatus==='已售') return alert[1];
                if(record.SeatStatus==='未售') return alert[0];
            },
        },
        {
            title: '编辑',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => isShowModalEdit(true, record.RouteID, record.SeatID)}>编辑</a>
        },
        {
            title: '删除',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => deleteDate(record.RouteID, record.SeatID)}>删除</a>
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
                headerTitle="座位信息"
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