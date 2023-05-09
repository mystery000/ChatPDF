import { BsFiletypePdf } from 'react-icons/bs'

const Document = ({ name }) => {
    return (
        <>
            <button className="text-sm flex w-full px-5 py-2 transition-colors duration-600 gap-x-2 hover:text-white">
                <BsFiletypePdf />
                <div className="font-medium ">{name}</div>
            </button>
        </>
    )
}

export default Document
