import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'
import Navigation from '../components/Navigation'
import FileUploadModal from '../components/FileUploadModal'

const App = () => {
    return (
        <MainLayout>
            <div className="flex">
                <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-72 w-64 dark:bg-gray-900 dark:border-gray-700">
                    <div className="px-5 text-center">
                        <FileUploadModal />
                    </div>
                    <div className="mt-8 space-y-4">
                        <SideBar />
                    </div>
                </div>
                <div className="w-full">
                    <Navigation />
                    <div></div>
                </div>
            </div>
        </MainLayout>
    )
}

export default App
