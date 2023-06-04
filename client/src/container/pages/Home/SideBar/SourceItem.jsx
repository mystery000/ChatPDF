import { AiOutlineMessage } from "react-icons/ai";

const SourceItem = ({ name, active }) => {
  return (
    <div
      className={`flex items-center text-center px-3 py-2 m-1 w-[96%] transition-colors duration-600 hover:text-white focus:outline-none text-sm cursor-pointer ${
        active ? "bg-[#1677ff] text-white rounded-lg" : ""
      }`}
    >
      <AiOutlineMessage />
      <div className="text-left">
        <h1 className="w-40 ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default SourceItem;
