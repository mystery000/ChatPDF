const Message = ({ message }) => {
    const { text, isChatOwner } = message;

    return (
        <div
            className={`px-3 py-2 flex flex-row w-full ${
                isChatOwner ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`px-3 py-2 w-fit lg:max-w-lg flex flex-col  rounded-lg  shadow-slate-200 shadow-sm  text-sm 
                ${
                    isChatOwner
                        ? "order-1  bg-[#1677ff] text-white"
                        : "order-2  bg-gray-200  text-gray-800"
                }`}
            >
                {text}
            </div>
        </div>
    );
};

export default Message;
