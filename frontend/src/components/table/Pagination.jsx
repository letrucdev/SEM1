import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { PAGE_SIZES } from '@/constants'

const ChangePageAction = {
	NEXT: 1,
	BACK: 0,
}

export const TablePagination = ({
	pagination,
	total,
	onChangePage,
	onChangePageSize,
}) => {
	const currentPage = useMemo(
		() => String(pagination.page + 1),
		[pagination.page]
	)

	const [pageSize, setPageSize] = useState(pagination.pageSize)
	const [page, setPage] = useState(currentPage)

	const totalPage = useMemo(
		() => Math.ceil(total / pagination.pageSize),
		[total, pagination.pageSize]
	)

	const canBack = useMemo(() => pagination.page > 0, [pagination.page])

	const canNext = useMemo(
		() => pagination.page + 1 < totalPage,
		[pagination.page, totalPage]
	)

	/*   const firstItemOfPageOrder = useMemo(
    () => pagination.page * pagination.pageSize + 1,
    [pagination.page, pagination.pageSize]
  )

  const lastItemOfPageOrder = useMemo(
    () => Math.min((pagination.page + 1) * pagination.pageSize, total),
    [pagination.page, pagination.pageSize, total]
  ) */

	const handleChangePage = (action) => () => {
		switch (action) {
			case ChangePageAction.NEXT:
				onChangePage(pagination.page + 1)
				break
			case ChangePageAction.BACK:
				onChangePage(pagination.page - 1)
				break
		}
	}

	const handleChangePageManual = () => {
		const maxPagePattern = new RegExp(
			`^[1-9][0-9]{0,${totalPage.toString().length - 1}}$`
		)
		if (!maxPagePattern.test(page) || Number(page) > totalPage) {
			setPage(currentPage)
		} else {
			onChangePage(Number(page) - 1)
		}
	}

	const handleChangePageInput = (event) => {
		const onlyNumberPattern = /^(\d+)?$/
		if (!onlyNumberPattern.test(event.currentTarget.value)) return

		setPage(event.currentTarget.value)
	}

	useEffect(() => {
		setPage(currentPage)
	}, [currentPage, setPage])

	return (
		<Pagination className='w-full justify-start sm:justify-end px-3 py-2 overflow-hidden flex-shrink-0'>
			<PaginationContent className='sm:flex-row flex-col gap-1 items-start sm:items-center sm:gap-2'>
				<PaginationItem className='gap-3 items-center mr-4 flex'>
					<span className='text-muted-foreground text-sm text-nowrap'>
						Rows per page
					</span>
					<Select
						value={String(pageSize)}
						onValueChange={(value) => {
							setPageSize(Number(value))
							onChangePageSize(Number(value))
						}}
					>
						<SelectTrigger className='w-20 h-8'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{PAGE_SIZES.map((size, index) => {
								return (
									<SelectItem key={index} value={String(size)}>
										{size}
									</SelectItem>
								)
							})}
						</SelectContent>
					</Select>
				</PaginationItem>
				<PaginationItem className='items-center flex gap-2 py-2'>
					{/*  <span className='text-muted-foreground text-sm mr-2 text-nowrap'>
            {firstItemOfPageOrder}-{lastItemOfPageOrder} của tổng {total}
          </span> */}
					<span className='text-muted-foreground text-sm mr-2 text-nowrap'>
						Page of {currentPage} / {totalPage}
						{/* {t('pageOf', { page: currentPage, totalPage })} */}
					</span>
					<Button
						size={'icon'}
						className='size-8 disabled:cursor-not-allowed'
						variant={'outline'}
						onClick={handleChangePage(ChangePageAction.BACK)}
						disabled={!canBack}
					>
						<ChevronLeft className='size-4' />
					</Button>
					<Input
						className='w-16 h-8 text-center'
						value={page}
						onChange={handleChangePageInput}
						onBlur={handleChangePageManual}
					/>
					<Button
						size={'icon'}
						className='size-8 disabled:cursor-not-allowed'
						variant={'outline'}
						disabled={!canNext}
						onClick={handleChangePage(ChangePageAction.NEXT)}
					>
						<ChevronRight className='size-4' />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
