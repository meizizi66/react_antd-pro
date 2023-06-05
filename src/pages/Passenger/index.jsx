import { PageContainer } from '@ant-design/pro-layout';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable, TableDropdown, ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Switch, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import { history } from 'umi';
import { getPass,deletePass } from '@/services/car';
import { changeWork } from '@/services/user';
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
        const response = await getPass();
        if (response.status === 1) {
            message.error('身份认证已失效，请重新登录');
            history.replace('/login');
        }
        return getPass(params)
    }
    const deletePasss = async(params)=>{
        const response = await deletePass(params);
        if(response.status ==='ok'){
            message.success('删除成功');
            actionRef.current.reload();
        }
        else{
            message.error('系统中存在该乘客的票务信息，不可删除！');
        }
    }


    const columns = [
        {
            title: '乘客账号',
            dataIndex: 'PassID',
        },
        {
            title: '乘客姓名',
            dataIndex: 'PassNAME',
        },
        {
            title: '性别',
            dataIndex: 'PassSex',
            hideInSearch: true,
        },
        {
            title: '身份证号',
            dataIndex: 'PassIDCard',
            hideInSearch: true,
        },
        {
            title: '电话',
            dataIndex: 'PassPhone',
            hideInSearch: true,
        },
        {
            title: '编辑',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => isShowModalEdit(true, record.PassID)}>编辑</a>
        },
        {
            title: '删除',
            hideInSearch: true,
            render: (_, record) => <a onClick={() => deletePasss(record.PassID)}>删除</a>
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
                headerTitle="乘客列表"
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
