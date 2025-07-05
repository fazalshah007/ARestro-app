import SpinnerDemo from '@/components/customized/spinner/spinner-01';
import { Button } from '@/components/ui/button';
import { getSingleMessage } from '@/http/AllRequestFromServer';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ViewMessage = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [fetchedAllMessages, setFetchedAllMessages] = useState(null);


    useEffect(() => {

        ; (async () => {
            try {
                const allMessages = await getSingleMessage(id)
                setFetchedAllMessages(allMessages.data.contact)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()

    }, [])

    if (loading) {
        return (
            <SpinnerDemo />
        )
    }


    if (Object.keys(fetchedAllMessages) === 0) {
        return (
            <div>
                <h1 className='text-2xl mt-24 text-black/60 text-center'>Message Not Found!</h1>
            </div>
        )
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} variant="ghost"><ArrowLeft/> Back to contacts </Button>
            <div className="max-w-5xl mx-auto mt-24 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-astro-green mb-6">Message Details</h2>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <span className="font-semibold text-astro-green">Full Name:</span>{" "}
                        <span className='font-bold'>{fetchedAllMessages?.fullname} </span>
                    </div>

                    <div>
                        <span className="font-semibold text-astro-green">Email:</span>{" "}
                        <a href={`mailto:${""}`} className="text-blue-600 underline">
                            {fetchedAllMessages?.email}
                        </a>
                    </div>

                    <div>
                        <span className="font-semibold text-astro-green">Subject:</span>{" "}
                        {fetchedAllMessages?.subject} 
                    </div>

                    <div>
                        <span className="font-semibold text-astro-green">Message:</span>
                        <div className="mt-1 bg-gray-50 p-4 h-44 rounded-lg border text-gray-800">
                            {fetchedAllMessages?.message}   
                        </div>
                    </div>

                    <div className="text-sm text-gray-500">
                        <span className="font-semibold text-astro-green">Created At:</span>{" "}
                        {new Date(fetchedAllMessages?.createdAt).toLocaleString()} 
                    </div>

                    <div className="text-xs text-gray-400">
                        <span className="font-semibold text-astro-green">Message ID:</span>{" "}
                        {fetchedAllMessages?._id} 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMessage