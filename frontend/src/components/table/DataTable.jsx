'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { TablePagination } from './Pagination'
import { cn } from '@/lib/utils'

export function DataTable({
	columns,
	rows,
	pagination,
	total,
	handleSetPage,
	handleSetPageSize,
	isPaginated = true,
}) {
	return (
		<div
			className={cn(
				`rounded-md border flex flex-col w-full max-h-full overflow-hidden`,
				!!rows?.length && 'h-full'
			)}
		>
			<div className='w-full h-full max-h-full overflow-auto border-b'>
				<Table>
					<TableHeader className='sticky top-0 bg-background z-40'>
						<TableRow>
							{columns.map((column, index) => {
								return (
									<TableHead key={index} style={{ minWidth: column.minWidth }}>
										<div className='flex items-center font-bold'>
											{column.icon && (
												<span className='*:size-4 mr-1'>{column.icon}</span>
											)}
											{column.title}
										</div>
									</TableHead>
								)
							})}
						</TableRow>
					</TableHeader>
					<TableBody className='overflow-auto h-full'>
						{!!rows?.length &&
							rows.map((row, index) => {
								return (
									<TableRow key={`row-${index}`}>
										{columns.map((column) => {
											return (
												<TableCell
													key={`${column.key}-${index}`}
													style={{ minWidth: column.minWidth }}
												>
													{row[column.key]}
												</TableCell>
											)
										})}
									</TableRow>
								)
							})}
						{!rows?.length && (
							<TableRow>
								<TableCell colSpan={columns.length} align='center'>
									No data.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{!!rows?.length && isPaginated && (
				<TablePagination
					pagination={pagination}
					total={total}
					onChangePage={handleSetPage}
					onChangePageSize={handleSetPageSize}
				/>
			)}
		</div>
	)
}
