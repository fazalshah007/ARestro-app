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

const AddToppings = ({ open, onOpenChange, toppings, onUpdate }) => {


  const [currentTopping, setCurrentTopping] = useState(toppings || [])
  
  const [newTopping, setNewTopping] = useState({ name: "", price: "" })

  const handleTopping = () => {
    if (newTopping.name.trim() && newTopping.price) {
      const toppingSchema = {
        _id: Date.now().toString(),
        name: newTopping.name.trim(),
        price: Number.parseInt(newTopping.price)
      }
      setCurrentTopping((prev) => [...prev, toppingSchema])
      setNewTopping({ name: "", price: "" })
    }

  }

  useEffect(() => {
    setCurrentTopping((prev) => [...toppings])
  },[toppings])

  const handleRemoveTopping = (id) => {
    setCurrentTopping((prev) => prev.filter((toppingItem)=> toppingItem._id !== id ) )
  }

  const saveTopping = () => {
    if(currentTopping.length > 0){
      onUpdate(currentTopping)
      onOpenChange(false)
    }

  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}  >
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Toppings</DialogTitle>
            <DialogDescription>
              Add toppings and their prices. Customers can select these as add-ons
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Card className="p-5">
              <CardHeader>
                <CardTitle className="my-3 text-lg">Add New Topping</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex gap-4 justify-center'>
                  <div className='flex-3'>
                    <Label className="text-md font-semibold my-2">Topping Name</Label>
                    <Input value={newTopping.name} onChange={(e) => setNewTopping({ ...newTopping, name: e.target.value })} placeholder="e.g extra cheese" />
                  </div>
                  <div className='flex-3'>
                    <Label className="text-md font-semibold my-2">Topping Price</Label>
                    <Input value={newTopping.price} onChange={(e) => setNewTopping({ ...newTopping, price: e.target.value })} placeholder="0.00" />
                  </div>
                  <div className='flex-1 flex justify-end items-end'>
                    <Button disabled={!newTopping.name.trim() || !newTopping.price} onClick={handleTopping} className="bg-astro-green hover:bg-astro-light"><Plus /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div>
              <h1 className='text-lg font-semibold'>Current Toppings(0)</h1>
              <div className="p-3">
                {
                  currentTopping.length > 0 ? (
                    currentTopping.map((item, index) => (
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
                      <h1 className='text-xl font-semibold text-gray-600/50'>No Toppings Added Yet.</h1>
                      <h1 className='text-md text-gray-600/50'>Add some delicious toppings above!</h1>
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
            <Button onClick={saveTopping} className="bg-astro-green hover:bg-astro-light">Save Toppings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddToppings