import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddCategory = ({ open, onOpenChange, setOnCategory }) => {

  const [ categoryValue, setCategoryValue ] = useState("")


  const handleSubmit = () => {
    if(categoryValue.trim()){
      setOnCategory(categoryValue.trim())
      setCategoryValue("")
      onOpenChange(false)
    }
    
  }

  return (
    <>
     <Dialog open={open} onOpenChange={onOpenChange} >
      
       
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category. This will be available for all products.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="category">Category Name</Label>
              <Input id="category" placeholder="Enter Category Name" name="name"  onChange={(e) => setCategoryValue(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={()=>onOpenChange=(false)} variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-astro-green hover:bg-astro-light" onClick={handleSubmit} type="submit">Add Category</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
    </>
  )
}

export default AddCategory