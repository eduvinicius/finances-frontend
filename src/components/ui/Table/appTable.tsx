import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./index"

export interface Column<T> {
  readonly header: string
  readonly accessor: keyof T | ((row: T) => React.ReactNode)
  readonly cell?: (value: unknown, row: T, index: number) => React.ReactNode
  readonly footer?: string | ((data: T[]) => React.ReactNode)
  readonly className?: string
  readonly headerClassName?: string
  readonly id?: string
}

export interface AppTableProps<T> {
  readonly data: T[]
  readonly columns: Column<T>[]
  readonly caption?: string
  readonly showFooter?: boolean
  readonly onRowClick?: (row: T, index: number) => void
  readonly rowClassName?: (row: T, index: number) => string
  readonly emptyMessage?: string
  readonly isLoading?: boolean
  readonly getRowKey?: (row: T, index: number) => string | number
}

export function AppTable<T extends Record<string, unknown>>({
  data,
  columns,
  caption,
  showFooter = false,
  onRowClick,
  rowClassName,
  emptyMessage = "Sem dados disponíveis",
  isLoading = false,
  getRowKey,
}: AppTableProps<T>) {
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row)
    }
    return row[column.accessor]
  }

  const renderCell = (row: T, column: Column<T>, rowIndex: number): React.ReactNode => {
    const value = getCellValue(row, column)
    
    if (column.cell) {
      return column.cell(value, row, rowIndex)
    }
    
    if (value === null || value === undefined) {
      return ""
    }
    
    if (typeof value === "object" && "$$typeof" in value) {
      return value as React.ReactNode
    }
    
    if (typeof value === "object") {
      return JSON.stringify(value)
    }
    
    return String(value)
  }

  const renderFooterCell = (column: Column<T>) => {
    if (!column.footer) return null
    
    if (typeof column.footer === "function") {
      return column.footer(data)
    }
    
    return column.footer
  }

  if (isLoading) {
    return (
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={column.id || column.header || `loading-header-${index}`}
                className={column.headerClassName}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center"
            >
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={column.id || column.header || `header-${index}`}
              className={column.headerClassName}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="text-center text-muted-foreground"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow
              key={getRowKey ? getRowKey(row, rowIndex) : `row-${rowIndex}`}
              onClick={() => onRowClick?.(row, rowIndex)}
              className={rowClassName?.(row, rowIndex)}
              style={onRowClick ? { cursor: 'pointer' } : undefined}
            >
              {columns.map((column, colIndex) => (
                <TableCell
                  key={column.id || column.header || `cell-${rowIndex}-${colIndex}`}
                  className={column.className}
                >
                  {renderCell(row, column, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
      
      {showFooter && (
        <TableFooter>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={column.id || column.header || `footer-${index}`}>
                {renderFooterCell(column)}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}
