import { useCallback, useRef } from 'react'
import { useDeleteDoctor } from '@/hooks/doctor/useDeleteDoctor'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '../ResponsiveDialog'
import { Trash2 } from 'lucide-react'

export const DeleteDentistDialog = ({ doctorId }) => {
	const dialogRef = useRef(null)

	const { deleteDoctorMutateAsync, isPendingDeleteDoctor } = useDeleteDoctor()

	const handleRejectTransaction = useCallback(
		(doctorId) => async () => {
			try {
				await deleteDoctorMutateAsync(doctorId)
			} finally {
				dialogRef.current?.close()
			}
		},
		[deleteDoctorMutateAsync]
	)

	return (
		<ResponsiveDialog
			ref={dialogRef}
			title={'Are you sure you want to delete this dentist?'}
			description={'This action cannot be undone.'}
			triggerElement={
				<Button
					variant={'destructive'}
					size='icon'
					disabled={isPendingDeleteDoctor}
				>
					<Trash2 />
				</Button>
			}
			onConfirm={handleRejectTransaction(doctorId)}
			isPending={isPendingDeleteDoctor}
			manualClose
		/>
	)
}
