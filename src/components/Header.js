import { useState } from 'react'
import { TbDotsVertical } from 'react-icons/tb'
import { FaRegUserCircle } from 'react-icons/fa'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineClear } from 'react-icons/ai'
import { Input, Modal, Popconfirm } from 'antd'

const Header = ({ handleRename, handleDelete, handleReset }) => {
    const [renameModalOpen, setRenameModalOpen] = useState(false)
    const [chatName, setChatName] = useState('')

    const handleChange = (e) => {
        setChatName(e.target.value)
    }

    const handleOK = () => {
        handleRename(chatName)
        setChatName('')
        setRenameModalOpen(false)
    }

    const handleCancel = () => {
        setChatName('')
        setRenameModalOpen(false)
    }

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-white p-3">
                <div className="flex items-center flex-shrink-0 text-white mr-6"></div>
                <div className="block lg:hidden">
                    <button className="cursor-point">
                        <TbDotsVertical color="rgb(153, 153, 153)" size={22} />
                    </button>
                </div>
                <div className="w-full hidden flex-grow lg:block lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        {/* <a
                            href="#responsive-header"
                            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        >
                            Documentation
                        </a> */}

                        <Popconfirm
                            placement="bottomLeft"
                            title={'Delete Chat'}
                            description={
                                'Are you sure you want to delete this chat?'
                            }
                            onConfirm={handleDelete}
                            okText="Yes"
                            okButtonProps={{
                                className:
                                    'bg-red-400 hover:!bg-red-500 text-white',
                            }}
                            cancelText="No"
                            icon={false}
                        >
                            <span
                                title="Delete Chat"
                                className="cursor-pointer inline-block px-1"
                            >
                                <AiOutlineDelete size={20} />
                            </span>
                        </Popconfirm>
                        <span
                            title="Rename Chat"
                            className="cursor-pointer inline-block px-1"
                            onClick={() => setRenameModalOpen(true)}
                        >
                            <AiOutlineEdit size={20} />
                        </span>
                        <Modal
                            title="Rename Chat"
                            style={{
                                top: '10%',
                            }}
                            open={renameModalOpen}
                            onOk={handleOK}
                            onCancel={handleCancel}
                            okButtonProps={{
                                className: 'bg-blue-600',
                            }}
                        >
                            <Input
                                placeholder="Input chat name..."
                                className="mt-2"
                                onChange={handleChange}
                                value={chatName}
                            />
                        </Modal>

                        <span
                            title="Reset chat"
                            className="cursor-pointer inline-block px-1"
                            onClick={handleReset}
                        >
                            <AiOutlineClear size={20} />
                        </span>
                    </div>
                    <div>
                        <button className="flex items-center bg-slate-800 text-white active:bg-slate-900 font-bold text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                            <div className="mr-2">
                                <FaRegUserCircle size={18} />
                            </div>
                            <div>Julian Sarokin</div>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
