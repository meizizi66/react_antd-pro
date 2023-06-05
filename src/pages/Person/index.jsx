import { PageContainer } from '@ant-design/pro-layout';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable, TableDropdown, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Switch, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi';
import { getDrivers } from '@/services/user';
import { deleteDriver } from '@/services/user';
import { changeWork } from '@/services/user';
import Edit from './components/edit';
import Create from './components/add';
import FormItem from 'antd/lib/form/FormItem';


const Index = () => {
    const actionRef = useRef();
    const [editID, setEditId] = useState(undefined);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const handleWorkDriver = async (DriverID) => {
        const response = await changeWork(DriverID);
        if (response.status === 'ok') {
            message.success('修改成功');
        }
        else {
            message.error('修改失败');
        }
    }
    const isShowModal = (state) => {
        setIsModalVisible(state);
    }
    const isShowModalEdit = (state, id) => {
        setEditId(id);
        setIsModalVisibleEdit(state);
    }
    const getData = async (params) => {
        const response = await getDrivers();
        if (response.status === 1) {
            message.error('身份认证已失效，请重新登录');
            history.replace('/login');
        }
        return getDrivers(params)
    }
    const deleteDate = async(params)=>{
        const response = await deleteDriver(params);
        if(response.status ==='ok'){
            message.success('删除成功');
            actionRef.current.reload();
        }
        else{
            message.error('删除失败,请检查路线中是否含有该驾驶员信息！');
        }
    }


    const columns = [
        {
            title: '编号',
            dataIndex: 'DriverID',
        },
        {
            title: '姓名',
            dataIndex: 'DriverName',
        },
        {
            title: '电话',
            dataIndex: 'DriverPhone',
            hideInSearch: true,
        },
        {
            title: '是否上班',
            dataIndex: 'is_work',
            hideInSearch: true,
            render: (_, record) => <Switch checkedChildren="驾驶中" unCheckedChildren="休息中"
                defaultChecked={record.is_work === 1}
                onChange={async () => handleWorkDriver(record.DriverID)}
            />
        },
        {
            title: '编辑',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => isShowModalEdit(true, record.DriverID)}>编辑</a>
        },
        {
            title: '删除',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => deleteDate(record.DriverID)}>删除</a>
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
                headerTitle="驾驶员列表"
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
