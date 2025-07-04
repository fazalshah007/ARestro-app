import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Plus, Trash } from 'lucide-react'
import { Badge } from '../ui/badge'

const AddSizeOption = ({ open, onOpenChange, sizeOptions, onUpdate }) => {

  const [currentOptionSize, setCurrentOptionSize] = useState(sizeOptions || [])
  const [newOptionSize, setNewOptionSize] = useState({ name: "", price: "" })

  const handleTopping = () => {
    if (newOptionSize.name.trim() && newOptionSize.price) {
      const sizeOptionSchema = {
        _id: Date.now().toString(),
        name: newOptionSize.name.trim(),
        price: Number.parseInt(newOptionSize.price)
      }
      setCurrentOptionSize((prev) => [...prev, sizeOptionSchema])
      setNewOptionSize({ name: "", price: "" })
    }

  }


    useEffect(() => {
      setCurrentOptionSize((prev) => [...sizeOptions])
    },[sizeOptions])
  

  const handleRemoveTopping = (id) => {
    setCurrentOptionSize((prev) => prev.filter((sizeOptionItem)=> sizeOptionItem._id !== id ) )
  }

  const saveSizeOption = () => {
      onUpdate(currentOptionSize)
      onOpenChange(false)

  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}  >
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Options</DialogTitle>
            <DialogDescription>
              Add Size and their prices. Customers can select these as add-ons
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Card className="p-5">
              <CardHeader>
                <CardTitle className="my-3 text-lg">Add New Option</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex gap-4 justify-center'>
                  <div className='flex-3'>
                    <Label className="text-md font-semibold my-2">Option Name</Label>
                    <Input value={newOptionSize.name} onChange={(e) => setNewOptionSize({ ...newOptionSize, name: e.target.value })} placeholder="e.g extra cheese" />
                  </div>
                  <div className='flex-3'>
                    <Label className="text-md font-semibold my-2">Option Price</Label>
                    <Input value={newOptionSize.price} onChange={(e) => setNewOptionSize({ ...newOptionSize, price: e.target.value })} placeholder="0.00" />
                  </div>
                  <div className='flex-1 flex justify-end items-end'>
                    <Button disabled={!newOptionSize.name.trim() || !newOptionSize.price} onClick={handleTopping} className="bg-astro-green hover:bg-astro-light"><Plus /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div>
              <h1 className='text-lg font-semibold'>Current Options({currentOptionSize.length})</h1>
              <div className="p-3">
                {
                  currentOptionSize.length > 0 ? (
                    currentOptionSize.map((item, index) => (
                      <div key={index} className='w-full mt-2 flex flex-col gap-4'>
                      <div className='flex justify-between items-center border-2 p-2'>
                        <div className='flex gap-8'>
                          <Badge variant="secondary">{item.name}</Badge>
                          <h1 className='text-astro-light font-medium'>+{item.price}</h1>
                        </div>
                        <Button onClick={() => handleRemoveTopping(item._id)} variant="ghost"><Trash className='text-red-500' /></Button>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div className='w-full h-[20vh] flex flex-col justify-center items-center'>
                      <h1 className='text-xl font-semibold text-gray-600/50'>No Options Added Yet.</h1>
                      <h1 className='text-md text-gray-600/50'>Add some Options below!</h1>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => onOpenChange(false)} variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={saveSizeOption} className="bg-astro-green hover:bg-astro-light">Save Size Options</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddSizeOption