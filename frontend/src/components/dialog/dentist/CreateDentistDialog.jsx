import { useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { CreateDentistForm } from './CreateDentistForm'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'

/* interface AddPromoProps {
  userId: string
  disabled?: boolean
  buttonTriggerClassName?: string
  showLabel?: boolean
} */

export const CreateDentistDialog = ({
	disabled,
	buttonTriggerClassName,
	showLabel = true,
}) => {
	const dialogRef = useRef(null)
	const createDentistFormRef = useRef(null)

	const isMutating = useIsMutating()

	const handleConfirm = () => {
		createDentistFormRef.current?.submit()
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
					<UserRoundPlus /> Create dentist
				</Button>
			}
			isPending={isMutating > 0}
			content={
				<CreateDentistForm
					ref={createDentistFormRef}
					onSuccess={handleCloseDialog}
				/>
			}
			onConfirm={handleConfirm}
			manualClose
		/>
	)
}
