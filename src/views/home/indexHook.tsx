import React, { useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

interface DataType {
    id: string
    name: string
    classify: string
    key: string
}

export const useTableSource = () => {
    const navigate = useNavigate()
    const columns: ColumnsType<DataType> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '分类',
            dataIndex: 'classify',
            key: 'classify',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record) => (
                <Space size="middle">
                    <Button danger onClick={() => deleteHandle(record.id)}>
                        删除
                    </Button>
                    <Button type="primary" onClick={() => editHandle(record.id)}>
                        编辑
                    </Button>
                </Space>
            ),
        },
    ]

    const [data, setData] = useState<DataType[]>([
        {
            id: '1',
            name: '测试1',
            classify: '分类123',
            key: '1',
        },
        {
            id: '2',
            name: '测试1',
            classify: '分类123',
            key: '2',
        },
        {
            id: '3',
            name: '测试1',
            classify: '分类123',
            key: '3',
        },
        {
            id: '4',
            name: '测试1',
            classify: '分类123',
            key: '4',
        },
    ])

    const deleteHandle = (handleId: string) => {
        setData((preData) => {
            const deletedData = preData.filter(({ id }) => {
                return handleId !== id
            })
            return deletedData
        })
    }

    const editHandle = (id: string) => {
        navigate(`/editor/${id}`)
    }
    return {
        columns,
        data,
    }
}
