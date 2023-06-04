import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import { getSources } from "../../../../redux/source/sourceSlice";
import { getDocuments } from "../../../../redux/document/documentSlice";
import { BsChatLeftDots } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa";
import { setStorage, getStorage } from "../../../../helpers";
import { setSelectedSource } from "../../../../redux/app/appSlice";

const SourceList = () => {
    const loading = useSelector((state) => state.source.loading);
    const error = useSelector((state) => state.source.error);
    const sources = useSelector((state) => state.source.sources);
    const documents = useSelector((state) => state.document.documents);
    const dispatch = useDispatch();
    const selectedSource = useSelector((state) => state.app.selectedSource);

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = sources.map(({ name, sourceId }) => {
        const subMenu = documents
            .filter((item) => item.sourceId === sourceId)
            .map((document) =>
                getItem(document.name, `${document.sourceId}`, <FaRegFilePdf />)
            );
        if (subMenu.length > 0)
            return getItem(name, `${sourceId}`, <BsChatLeftDots />, subMenu);
        return getItem(name, `${sourceId}`, <BsChatLeftDots />);
    });

    useEffect(() => {
        dispatch(getSources());
        dispatch(getDocuments());
        const latestKey = getStorage("latestKey");
        if (latestKey) {
            dispatch(setSelectedSource({ sourceId: latestKey }));
        }
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;

    const handleClick = ({ key }) => {
        console.log(`${key} clicked`);
        dispatch(setSelectedSource({ sourceId: key }));
        setStorage("latestKey", key);
    };

    return (
        <div>
            <Menu
                selectedKeys={[`${selectedSource}`]}
                mode="inline"
                theme="dark"
                items={items}
                onClick={handleClick}
            />
        </div>
    );
};

export default SourceList;
