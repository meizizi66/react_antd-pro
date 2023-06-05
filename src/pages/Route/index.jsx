import { PageContainer } from '@ant-design/pro-layout';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable, TableDropdown, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Switch, message, Modal,Alert } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi';
import { getRoute,deleteRoute } from '@/services/route';
import Edit from './components/edit';
import Create from './components/add';
import FormItem from 'antd/lib/form/FormItem';

const alert = [
    <Alert message="未发车" type="success" />,
    <Alert message="已发车" type="warning" />,
]
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
        const response = await getRoute();
        if (response.status === 1) {
            message.error('身份认证已失效，请重新登录');
            history.replace('/login');
        }
        return getRoute(params)
    }
    const deleteDate = async(params)=>{
        const response = await deleteRoute(params);
        if(response.status ==='ok'){
            message.success('删除成功');
            actionRef.current.reload();
        }
        else{
            message.error('该路线含有票务信息，不可删除');
        }
    }
    const columns = [
        {
            title: '线路号',
            dataIndex: 'RouteID',
        },
        {
            title: '起始地',
            dataIndex: 'StartPlace',
        },
        {
            title: '目的地',
            dataIndex: 'EndPlace',
        },
        {
            title: '开始时间',
            dataIndex: 'StartTime',
            hideInSearch: true,
        },
        {
            title: '到达时间',
            dataIndex: 'EndTime',
            hideInSearch: true,
        },
        {
            title: '汽车号',
            dataIndex: 'CarNUM',
            hideInSearch: true,
        },
        {
            title: '驾驶员编号',
            dataIndex: 'DriverID',
            hideInSearch: true,
        },
        {
            title: '剩余座位',
            dataIndex: 'SeatNum',
            hideInSearch: true,
        },
        {
            title: '票价',
            dataIndex: 'price',
            hideInSearch: true,
        },
        {
            title: '汽车状态',
            dataIndex: 'RouteStatus',
            hideInSearch: true,
            render: (_, record) => {
                if(record.RouteStatus==='已发车') return alert[1];
                if(record.RouteStatus==='未发车') return alert[0];
            },
        },
        {
            title: '编辑',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => isShowModalEdit(true, record.RouteID)}>编辑</a>
        },
        {
            title: '删除',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => deleteDate(record.RouteID)}>删除</a>
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
                headerTitle="路线信息"
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