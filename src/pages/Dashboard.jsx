import React, { useEffect, useState } from 'react'
import { Copy, QrCode, Trash2 } from 'lucide-react'
import ResponsiveModal from '../components/NewLInkModal';
import { userLinks, deleteLinks } from '../configaration/endpoints';
import { toast } from 'react-toastify';
import QRCodeModal from '../components/QrCodeModal';
import { useLocation } from "react-router-dom";
import Loading from '../components/Loading';

function Dashboard({ val = null }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [links, setLinks] = useState([]);
    const [open, setOpen] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [loading,setLoading]=useState(false)

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
   
    

    useEffect(() => {
        takeUserUrls()
    }, [id])
    async function takeUserUrls() {
        setLoading(true)
        try {
            const response = await userLinks()
            //  console.log(response.data);
            setLinks(response.data)
        } catch (error) {
           // console.log(400, error);
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    const handleCopy = (url) => {
        
        navigator.clipboard.writeText(takebaseUrl()+url);
        toast.success(`URL copied to clipboard: ${url}`)

    };

    const handleDelete = async (_id) => {
        try {
            const data = await deleteLinks(_id);
          //  console.log(data);
            toast.success(data.message)
            setLinks(links.filter(link => link._id !== _id));
        } catch (error) {
            console.log(404, error);

        }
    };
    function takebaseUrl() {
        const { protocol, hostname, port } = window.location;

        // Construct the base URL
        const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}/`;
        return baseUrl;
    }
    const displayQRcode = (QrCode) => {
        setQrCode(QrCode);
        setOpen(true)

    }

    return (
        <div className='bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center px-4 py-8'>
            <QRCodeModal open={open} setOpen={setOpen} qrCodeData={qrCode} />
            <ResponsiveModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className="w-full max-w-3xl  rounded-xl  overflow-hidden mt-[30px]">
                <div className="px-6 py-8 md:px-8 md:py-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            My Links
                        </h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                            onClick={() => setIsModalOpen(true)}>
                            <span className="hidden md:inline">Create New Link</span>
                            <span className="md:hidden">+</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {loading?(
                            <>
                            <Loading/>
                            </>
                        ):
                        (links.map((link) => (
                            <div
                                key={link._id}
                                className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {link.title}
                                    </h2>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleCopy(link.shortenedLink)}
                                            className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded"
                                            title="Copy Link"
                                        >
                                            <Copy size={16} />
                                        </button>
                                        <button
                                            className="text-gray-500 hover:text-green-600 transition-colors p-1 rounded"
                                            onClick={() => displayQRcode(link.qrCode)}
                                            title="Generate QR Code"
                                        >
                                            <QrCode size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link._id)}
                                            className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded"
                                            title="Delete Link"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                            Original Link
                                        </label>
                                        <a
                                            href={link.originalLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 dark:text-blue-400 hover:underline truncate block"
                                        >
                                            {link.originalLink}
                                        </a>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                            Custom Link
                                        </label>
                                        <a
                                            href={link.shortenedLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 dark:text-green-400 hover:underline truncate block"
                                        >
                                            {takebaseUrl()}{link.shortenedLink ? link.shortenedLink : 'no'}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span>Created: {new Date(link.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard