import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MailOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, message as toast } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';

import TypingMessage from "../../../../components/TypingMessage";

const Message = ({ message, isLast, onClick }) => {
    const { text, isChatOwner, stream } = message;
    const user = useSelector(state => state.auth.user);
    const streamMode = stream && isLast;

    return (
        <div
            className={`px-2 py-2 flex flex-row w-full ${isChatOwner ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`px-3 py-2 w-fit lg:max-w-lg flex flex-col shadow-slate-200 shadow-sm whitespace-pre-wrap text-sm 
                ${isChatOwner
                        ? "order-1  bg-blue-500 text-white cursor-default rounded-bl-lg rounded-tr-lg rounded-tl-lg"
                        : "order-2  bg-gray-200  text-gray-800 rounded-br-lg rounded-tr-lg rounded-tl-lg"
                    }`}
            >
                <div className={classNames({ 'cursor-pointer': !isChatOwner })} onClick={() => isChatOwner ? null : onClick()}>
                    {streamMode ? <TypingMessage className="whitespace-pre-wrap" message={text} /> : text}
                </div>
                {!isChatOwner && <div className='mt-2 flex justify-end'><Link
                    to='#'
                    onClick={(e) => {
                        window.location.href = `mailto:${user.email}?subject=${'Landlordgenius.AI'}&body=${text}`;
                        e.preventDefault();
                    }}
                >
                    <Button className='mr-2' type='primary' icon={<MailOutlined />}>Email</Button>
                </Link> <CopyToClipboard text={text} onCopy={() => {
                    toast.info('This text is copied!')
                }}><Button type='primary' icon={<CopyOutlined />}>Copy</Button></CopyToClipboard></div>}
            </div>
        </div>
    );
};

export default Message;
