import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { sendMessage } from '@/http/AllRequestFromServer'
import ContactSchema from '@/utils/ContactSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus } from "lucide-react"
import mailImage from "../../assets/images/mail-image.png"

const ContactEmail = () => {

    const [open, setOpen] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            fullname: "",
            email: "",
            subject: "",
            message: "",
        }
    })


    const handleContact = async (value) => {
        try {

            const messgae = await sendMessage(value);
            setOpen(true)
            reset({
                fullname: "",
                email: "",
                subject: "",
                message: "",
            })

        } catch (error) {
            console.log(error);
            reset({
                fullname: "",
                email: "",
                subject: "",
                message: "",
            })
        }
    }

    return (
        <div className='w-full min-h-[70vh] mb-24 @5xl:my-10'>
            <h1 className='text-center text-4xl font-bold text-black/60'>Get In Touch</h1>
            <div className='w-11/12 grid place-items-center grid-cols-1 @5xl:grid-cols-2 @5xl:max-w-4xl mx-auto h-full'>
                <div className='w-full py-3 px-5 mt-4'>
                    <Label className="text-black/50 text-xl my-2" htmlFor="contact-full-name">Full Name</Label>
                    <Input {...register("fullname")} id="contact-full-name" placeholder="Enter your Full Name" className={`w-full border-2 py-6 @3xl:text-md focus-visible:ring-0 rounded-none focus-visible:border-transparent ${errors.fullname ? 'focus-visible:bg-red-500 border-red-500' : 'focus-visible:bg-astro-green border-astro-green'} focus-visible:text-white focus-visible:placeholder:text-white focus-visible:transition-colors font-bold tracking-widest px-2 rounded-none"`} type="text" />
                    {errors.fullname && <p className='text-red-500 font-medium text-sm mt-2'>{errors.fullname.message}</p>}
                </div>
                <div className='w-full py-3 px-5 mt-3'>
                    <Label className="text-black/50 text-xl my-2" htmlFor="contact-email">Email</Label>
                    <Input {...register("email")} id="contact-email" placeholder="Enter your email" className={`focus-visible:placeholder:text-white w-full border-2 py-6 @3xl:text-md focus-visible:ring-0 focus-visible:border-transparent ${errors.email ? 'focus-visible:bg-red-500 border-red-500' : 'focus-visible:bg-astro-green border-astro-green'} focus-visible:text-white font-bold focus-visible:transition-colors tracking-widest px-2 rounded-none`} type="text" />
                    {errors.email && <p className='text-red-500 font-medium text-sm mt-2'>{errors.email.message}</p>}

                </div>
                <div className='@5xl:col-span-2 w-full py-3 px-5 mt-3'>
                    <Label className="text-black/50 text-xl my-2" htmlFor="contact-subject">Subject</Label>
                    <Input {...register("subject")} id="contact-subject" placeholder="Enter your subject" className={`focus-visible:placeholder:text-white w-full border-2 py-6 @3xl:text-md focus-visible:ring-0 focus-visible:border-transparent ${errors.subject ? 'focus-visible:bg-red-500 border-red-500' : 'focus-visible:bg-astro-green border-astro-green'} focus-visible:text-white font-bold focus-visible:transition-colors tracking-widest px-2 rounded-none`} type="text" />
                    {errors.subject && <p className='text-red-500 font-medium text-sm mt-2'>{errors.subject.message}</p>}
                </div>
                <div className='@5xl:col-span-2 w-full min-h-full py-3 px-5 mt-3'>
                    <Label className="text-black/50 text-xl my-2" htmlFor="contact-message">Message</Label>
                    <Textarea {...register("message")} id="contact-message" placeholder="Enter your message" className={`focus-visible:placeholder:text-white w-full border-2 h-40 py-6 @3xl:text-md focus-visible:ring-0 focus-visible:border-transparent ${errors.message ? 'focus-visible:bg-red-500 border-red-500' : 'focus-visible:bg-astro-green border-astro-green'} focus-visible:text-white font-bold focus-visible:transition-colors tracking-widest px-2 rounded-none`} type="text" />
                    {errors.message && <p className='text-red-500 font-medium text-sm mt-2'>{errors.message.message}</p>}

                </div>
                <div className='w-full pl-5'>
                    <Button onClick={handleSubmit(handleContact)} className="bg-astro-green hover:bg-astro-light rounded-none uppercase items-start">Send Message</Button>
                </div>
            </div>

            {
                open && <div className='w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black/60'>
                    <div className='w-11/12 max-w-5xl h-[40vh] @4xl:h-[70vh] rounded-2xl bg-astro-green/100'>
                        <h1 onClick={() => setOpen(false)} className='flex hover:cursor-pointer justify-end p-5'> <Plus size={30} className='rotate-45 bg-white/80 rounded-full' /> </h1>
                        <div className='w-full h-full'>
                            <div className='w-36 mx-auto @4xl:w-2xs aspect-square'>
                                <img className='w-full h-full' src={mailImage} alt="" />
                            </div>
                            <h1 className='text-center text-2xl @2xl:text-4xl @4xl:text-5xl text-white/70 font-semibold mt-10'>Thank you for contact us!</h1>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ContactEmail