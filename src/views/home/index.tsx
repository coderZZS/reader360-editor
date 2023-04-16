import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Card, Table, Button, Modal } from 'antd'
import Header from '@/components/Header'
import { useTableSource } from './indexHook'
import './index.scss'

const Home = () => {
    const navigate = useNavigate()
    const { columns, data } = useTableSource()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const showDialog = () => {
        setIsModalOpen(true)
    }
    return (
        <div className="home">
            <Header />
            <div className="home__content">
                <div className="home__content--handle"></div>
                <Card className="home__content--table">
                    <Button type="primary" style={{ marginBottom: 16 }} onClick={showDialog}>
                        新增
                    </Button>
                    <Table columns={columns} dataSource={data}></Table>
                </Card>
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
export default Home
