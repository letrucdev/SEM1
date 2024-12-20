import { useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { CreateProductForm } from './CreateProductForm'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { PackagePlus } from 'lucide-react'

export const CreateProductDialog = ({
    disabled,
    buttonTriggerClassName,
    showLabel = true,
}) => {
    const dialogRef = useRef(null)
    const createProductFormRef = useRef(null)

    const isMutating = useIsMutating()

    const handleConfirm = () => {
        createProductFormRef.current?.submit()
    }

    const handleCloseDialog = () => dialogRef.current?.close()

    return (
        <ResponsiveDialog
            ref={dialogRef}
            title={'Create Dentist'}
            triggerElement={
                <Button
                    disabled={disabled}
                    className={buttonTriggerClassName}
                    size={showLabel ? 'default' : 'icon'}
                >
                    <PackagePlus /> Create product
                </Button>
            }
            isPending={isMutating > 0}
            content={
                <CreateProductForm
                    ref={createProductFormRef}
                    onSuccess={handleCloseDialog}
                />
            }
            onConfirm={handleConfirm}
            manualClose
        />
    )
}
