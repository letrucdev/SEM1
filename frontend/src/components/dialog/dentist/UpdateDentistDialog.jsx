import { useRef } from 'react'
import { useIsMutating } from '@tanstack/react-query'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { UserRoundPen } from 'lucide-react'
import { UpdateDentistForm } from './UpdateDentistForm'

export const UpdateDentistDialog = ({
	disabled,
	buttonTriggerClassName,
	doctor,
}) => {
	const dialogRef = useRef(null)
	const updateDentistFormRef = useRef(null)

	const isMutating = useIsMutating()

	const handleConfirm = () => {
		updateDentistFormRef.current?.submit()
	}

	const handleCloseDialog = () => dialogRef.current?.close()

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Edit Dentist'}
			triggerElement={
				<Button
					disabled={disabled}
					className={buttonTriggerClassName}
					size={'icon'}
				>
					<UserRoundPen />
				</Button>
			}
			isPending={isMutating > 0}
			content={
				<UpdateDentistForm
					ref={updateDentistFormRef}
					onSuccess={handleCloseDialog}
					doctor={doctor}
				/>
			}
			onConfirm={handleConfirm}
			manualClose
		/>
	)
}
