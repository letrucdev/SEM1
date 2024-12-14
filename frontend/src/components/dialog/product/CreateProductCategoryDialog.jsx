import { useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { ListPlus } from 'lucide-react'
import { CreateProductCategoryForm } from './CreateProductCategoryForm'

export const CreateProductCategoryDialog = ({
    disabled,
    buttonTriggerClassName,
    showLabel = true,
}) => {
    const dialogRef = useRef(null)
    const createProductCategoryFormRef = useRef(null)

    const isMutating = useIsMutating()

    const handleConfirm = () => {
        createProductCategoryFormRef.current?.submit()
    }

    const handleCloseDialog = () => dialogRef.current?.close()

    return (
        <ResponsiveDialog
            ref={dialogRef}
            title={'Create Product Category'}
            triggerElement={
                <Button
                    disabled={disabled}
                    className={buttonTriggerClassName}
                    size={showLabel ? 'default' : 'icon'}
                >
                    <ListPlus /> Create product category
                </Button>
            }
            isPending={isMutating > 0}
            content={
                <CreateProductCategoryForm
                    ref={createProductCategoryFormRef}
                    onSuccess={handleCloseDialog}
                />
            }
            onConfirm={handleConfirm}
            manualClose
        />
    )
}
