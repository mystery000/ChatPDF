import { FaRegUserCircle } from 'react-icons/fa'
import { TbDotsVertical } from 'react-icons/tb'

const Header = () => {
    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-white p-6">
                <div className="flex items-center flex-shrink-0 text-white mr-6"></div>
                <div className="block lg:hidden">
                    <button className="cursor-point">
                        <TbDotsVertical color="rgb(153, 153, 153)" size={22} />
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        {/* <a
                            href="#responsive-header"
                            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        >
                            Documentation
                        </a> */}
                    </div>
                    <div>
                        <button className="flex items-center bg-slate-800 text-white active:bg-slate-900 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
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
