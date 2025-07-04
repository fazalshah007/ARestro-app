import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, UploadCloud } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import uploadImage from "@/assets/images/upload-image.jpg"
import AddCategory from '@/components/AdminComponent/add-category-dialog';
import AddToppings from '@/components/AdminComponent/toppings-dialog';
import AddSizeOption from '@/components/AdminComponent/sizes-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProductSchema from '@/utils/ProductSchema';
import { createProduct } from '@/http/AllRequestFromServer';
import { toast } from 'react-toastify';
import SpinnerDemo from '@/components/customized/spinner/spinner-01';
import { reRenderComponent } from '@/store/ProductSlice/ProductSlice';

const CreateProduct = () => {

    const navigate = useNavigate();

    const stateProduct = useSelector(state => state.productSlice)
    const dispatch = useDispatch()


    const [loading, setLoading] = useState(false);

    const [showCategoryDialog, setShowCategoryDialog] = useState(false);
    const [showToppingDialog, setShowToppingDialog] = useState(false);
    const [showOptionSize, setShowOptionSize] = useState(false);

    const [onCategory, setOnCategory] = useState("");
    const [toppings, setToppings] = useState([]);
    const [optionSize, setOptionSize] = useState([]);
    const [files, setFiles] = useState(uploadImage);
    const [originalFile, setOriginalFile] = useState(null)


    const handleImageFile = (e) => {
        const filePath = URL.createObjectURL(e.target.files[0])
        setOriginalFile(e.target.files[0])
        setFiles(filePath)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '',

        }

    })

    const handleSubmitProduct = async (value) => {

        setLoading(true)

        try {

            const formatTopping = toppings.map(({ name, price }) => ({ name, price }))
            const formatSizeOption = optionSize.map(({ name, price }) => ({ name, price }))

            const parseToppings = JSON.stringify(formatTopping)
            const parseSizeOption = JSON.stringify(formatSizeOption)

            const formData = new FormData();
            formData.append("title", value.name);
            formData.append("category", onCategory);
            formData.append("description", value.description);
            formData.append("price", Number.parseInt(value.price));
            formData.append("image", originalFile);
            formData.append("toppings", parseToppings);
            formData.append("sizeOptions", parseSizeOption);

            const createdProduct = await createProduct(formData)

            dispatch(reRenderComponent())
            setLoading(false)
            navigate("/admin/products")




        } catch (error) {
            setLoading(false)

            toast.error(`${error?.response?.data?.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

        }


    }

    if (loading) {
        return (
            <SpinnerDemo />
        )
    }


    return (
        <>
            <div className='@container/createProduct'>
                <div className='w-11/12 mx-auto '>
                    <Button className="my-4" onClick={() => navigate(-1)} variant="ghost"><ArrowLeft /> Back To Products</Button>
                    <div className='w-full'>
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="text-2xl">Add New Product</CardTitle>
                                <CardDescription>Create a new product with all specifications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col @3xl:flex-row justify-between gap-4 my-5'>
                                    <div className='flex-2 '>
                                        <div className='my-4'>
                                            <Label className="text-lg my-1">Product Name<span className='text-red-600'>*</span></Label>
                                            <Input
                                                {...register("name")}
                                                className={`p-5 focus-visible:border-0 ${errors?.name?.message && "ring-2 ring-red-500 focus-visible:border-2 focus-visible:border-red-500"}`}
                                                type="text"
                                                // value={productName}
                                                // onChange={(e) => setProductName(e.target.value)}
                                                placeholder="Enter Product Name"
                                            />
                                            {errors?.name && <p className='text-red-500'>{errors?.name?.message}</p>}
                                        </div>
                                        <div className='my-4'>
                                            <Label className="text-lg my-1">Category<span className='text-red-600'>*</span></Label>
                                            <div className='w-full flex gap-4 justify-between'>

                                                <Select
                                                    onValueChange={(e) => setOnCategory(e.target.value)}
                                                >
                                                    <SelectTrigger className="w-11/12">
                                                        <SelectValue placeholder="Select Category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Categories</SelectLabel>
                                                            {
                                                                stateProduct && stateProduct?.category?.map((item, index) => (
                                                                    <SelectItem key={index} value={item}>{item}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>

                                                <Button onClick={() => setShowCategoryDialog(true)} variant="secondary"><Plus /></Button>
                                            </div>
                                        </div>
                                        <div className='my-4'>
                                            <Label className="text-lg my-1">Price (Rs)<span className='text-red-600'>*</span></Label>
                                            <Input
                                                {...register("price")}
                                                className={`p-5 focus-visible:border-0 ${errors?.price?.message && "ring-2 ring-red-500 focus-visible:border-2 focus-visible:border-red-500"}`}
                                                type="text"
                                                //    value={price}
                                                //     onChange={(e) => setPrice(e.target.value)}
                                                placeholder="Enter Product Price"
                                            />
                                            {errors?.price && <p className='text-red-500'>{errors?.price?.message}</p>}
                                        </div>
                                        <div className='my-4 flex justify-between'>
                                            <Label className="text-lg my-1">Toppings<span className='text-red-600'>*</span></Label>
                                            <Button onClick={() => setShowToppingDialog(true)} variant="secondary"><Plus />Add Toppings</Button>
                                        </div>
                                        <div className='my-4'>
                                            <Card className="py-5 bg-slate-200/5">
                                                <CardContent>
                                                    {
                                                        toppings?.map((item, index) => (
                                                            <Badge key={index} variant="secondary">{item.name} (Rs:{item.price})</Badge>
                                                        ))
                                                    }
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className='my-4 flex justify-between'>
                                            <Label className="text-lg my-1">Size<span className='text-red-600'>*</span></Label>
                                            <Button onClick={() => setShowOptionSize(true)} variant="secondary"><Plus />Add Size</Button>
                                        </div>
                                        <div className='my-4'>
                                            <Card className="py-5 bg-slate-200/5">
                                                <CardContent>
                                                    {
                                                        optionSize?.map((item, index) => (
                                                            <Badge key={index} variant="secondary">{item.name}</Badge>

                                                        ))
                                                    }
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <div className='my-3'>
                                            <Label>Product Image<span className='text-red-600'>*</span></Label>
                                            <div className='aspect-square w-sm border-4  overflow-hidden rounded-2xl border-slate-400/30 my-2'>
                                                <img src={files} className='w-full h-full object-center object-cover' alt="upload-image" />
                                            </div>
                                            <div className='inline-block'>
                                                <Label className="text-lg bg-astro-green hover:bg-astro-light text-white p-3 " htmlFor="fileType"><UploadCloud />Upload</Label>
                                                <input onChange={handleImageFile} className='hidden' id='fileType' type="file" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <Label className="my-4 text-lg">Description<span className='text-red-600'>*</span></Label>
                                    <Textarea
                                        className={`${errors?.description?.message && "ring-2 ring-red-500"}`}
                                        {...register("description")}
                                        row={4}
                                    />
                                    {errors?.description && <p className='text-red-500'>{errors?.description?.message}</p>}

                                </div>
                                <div>
                                    <Button onClick={handleSubmit(handleSubmitProduct)} className="text-lg my-4 bg-astro-green hover:bg-astro-light" >Create Product</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <AddCategory open={showCategoryDialog} onOpenChange={setShowCategoryDialog} setOnCategory={setOnCategory} />
            <AddToppings open={showToppingDialog} onOpenChange={setShowToppingDialog} toppings={toppings} onUpdate={setToppings} />
            <AddSizeOption open={showOptionSize} onOpenChange={setShowOptionSize} sizeOptions={optionSize} onUpdate={setOptionSize} />
        </>
    )
}

export default CreateProduct