import Chat from '../ChatApp'
import SideBar from '../components/SideBar'
import MainLayout from '../layout/MainLayout'
import Navigation from '../components/Navigation'

const App = () => {
    return (
        <MainLayout>
            <div className="flex">
                <div className="h-screen py-8 overflow-y-auto bg-white border-l border-r sm:w-72 w-64 dark:bg-gray-900 dark:border-gray-700">
                    <div className="mt-8 space-y-4">
                        <SideBar />
                    </div>
                </div>
                <div className="w-full">
                    <Navigation />
                    <Chat />
                </div>
            </div>
        </MainLayout>
    )
}

export default App
