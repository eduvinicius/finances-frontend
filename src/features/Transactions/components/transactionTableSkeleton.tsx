import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { TRANSACTIONS_COLUMNS } from "../constants/transactionColumns.const";

const SKELETON_ROWS = 8;
const COLUMNS = TRANSACTIONS_COLUMNS.map(col => col.header);

export function TransactionTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((col) => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: SKELETON_ROWS }, (_, i) => `skeleton-row-${i}`).map((rowKey) => (
          <TableRow key={rowKey}>
            {COLUMNS.map((col) => (
              <TableCell key={col}>
                <Skeleton className="h-4 w-full bg-(--purple-200)" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
