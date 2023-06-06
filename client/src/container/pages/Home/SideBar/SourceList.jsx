import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Spin, message } from "antd";

import { FilePdfOutlined, PlusOutlined } from '@ant-design/icons';
import { BsChatLeftDots } from "react-icons/bs";

import { getSources } from "../../../../redux/source/sourceSlice";
import { getDocuments } from "../../../../redux/document/documentSlice";
import { setStorage, getStorage, getItem } from "../../../../helpers";
import { setSelectedSource } from "../../../../redux/app/appSlice";
import DocumentUploadModal from "../Modals/DocumentUploadModal";

const SourceList = () => {

    const loading = useSelector((state) => state.source.loading);
    const error = useSelector((state) => state.source.error);
    const sources = useSelector((state) => state.source.sources);
    const documents = useSelector((state) => state.document.documents);
    const uploading = useSelector((state) => state.document.loading);
    const dispatch = useDispatch();
    const selectedSource = useSelector((state) => state.app.selectedSource);
    const [openDocumentUpoadModal, setOpenDocumentUpoadModal] = useState(false);
    
    const items = sources.map(({ name, sourceId }, index) => {
        const subMenu = documents
            .filter((item) => item.sourceId === sourceId)
            .map((document) =>
                getItem(document.name, `${document._id}`, <FilePdfOutlined />, null, true)
            );
        subMenu.push(getItem('Add Document', `addDocument-${index}-${sourceId}`, (uploading == sourceId) ?  <Spin size="small" /> : <PlusOutlined />, null))
        if (subMenu.length > 0)
            return getItem(name, `${sourceId}`, <BsChatLeftDots />, subMenu);
        return getItem(name, `${sourceId}`, <BsChatLeftDots />);
    });

    useEffect(() => {
        dispatch(getSources());
        dispatch(getDocuments());
    }, []);

    useEffect(() => {
        let latestKey = getStorage("latestKey") || sources[0]?.sourceId;
        if (latestKey) {
            dispatch(setSelectedSource({ sourceId: latestKey }));
        }
    }, [sources]);

    // useEffect(() => {
    //     if (selectedSource) {
            
    //     }
    // }, [selectedSource]);

    if (loading) return <div className="text-center text-gray-400">Loading...</div>;

    const onOpenChange = (keys) => {
        if(keys.length < 2) return;
        let key = keys[keys.length - 1];
        dispatch(setSelectedSource({ sourceId: key }));
        setStorage("latestKey", key);
    };

    const handleClick = ({ key }) => {
        if(key.startsWith("addDocument")) {
            if(uploading) {
                return message.warning('Server is busy now. Please wait a moment...');
            }
            setOpenDocumentUpoadModal(true);
        }
    }

    return (
        <div>
            <Menu
                openKeys={[`${selectedSource}`]}
                onOpenChange={onOpenChange}
                mode="inline"
                theme="dark"
                items={items}
                selectable={false}
                onClick={handleClick}
            />
            <DocumentUploadModal open={openDocumentUpoadModal} onClose={() => setOpenDocumentUpoadModal(false)}/>
        </div>
    );
};

export default SourceList;
