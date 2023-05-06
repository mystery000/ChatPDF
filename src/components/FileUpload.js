import { Button, Modal } from 'antd'
import { useState } from 'react'
const App = () => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState('Content of the modal')
    const showModal = () => {
        setOpen(true)
    }
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds')
        setConfirmLoading(true)
        setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
        }, 2000)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                className="border border-white"
            >
                + Add Property
            </Button>
            <Modal
                title="Add Property"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            ></Modal>
        </>
    )
}
export default App
