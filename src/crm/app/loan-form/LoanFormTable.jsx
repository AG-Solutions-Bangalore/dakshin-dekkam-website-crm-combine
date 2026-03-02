/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "@/crm/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/crm/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/crm/components/ui/popover";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search, Eye, SquarePlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/crm/components/ui/dropdown-menu";
import { Input } from "@/crm/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import useToken from "@/api/usetoken";
import { encryptId } from "@/crm/utils/encyrption/Encyrption";

const LoanFormTable = ({ data, refetch, navigate, title }) => {
  const { toast } = useToast();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const token = useToken();
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: async ({ loanId, status }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}loans/${loanId}/status`,
        { loans_status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["loanFormData"] });
      toast({
        title: "Success",
        description: data.message || "Status updated successfully",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update status",
        variant: "destructive",
      });
      console.error("Status update error:", error);
    },
  });

  const handleStatusChange = (loanId, newStatus) => {
    statusMutation.mutate({ loanId, status: newStatus });
  };

  const handleViewClick = (loanId) => {
    navigate(`/crm/loan-view/${encodeURIComponent(encryptId(loanId))}`);
  };

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "Approved",
      label: "Approved",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "Processing",
      label: "Processing",
      color: "bg-blue-100 text-blue-800",
    },
    { value: "Cancel", label: "Cancel", color: "bg-red-100 text-red-800" },
  ];

  const columns = [
    {
      accessorKey: "index",
      id: "Sl No",
      header: "Sl No",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      id: "Name",
      header: "Name",
      cell: ({ row }) => {
        const { user_full_name } = row.original;
        return <div>{user_full_name}</div>;
      },
    },
    {
      id: "Email",
      header: "Email",
      cell: ({ row }) => {
        const { user_email } = row.original;
        return <div>{user_email}</div>;
      },
    },
    {
      id: "Gender",
      header: "Gender",
      cell: ({ row }) => {
        const { user_gender } = row.original;
        return <div>{user_gender}</div>;
      },
    },
    {
      id: "City",
      header: "City",
      cell: ({ row }) => {
        const { user_city } = row.original;
        return <div>{user_city}</div>;
      },
    },
    {
      id: "Mobile",
      header: "Mobile",
      cell: ({ row }) => {
        const { user_mobile_number } = row.original;
        return <div>{user_mobile_number}</div>;
      },
    },
    {
      id: "Branch",
      header: "Branch",
      cell: ({ row }) => {
        const { branch_name } = row.original;
        return <div>{branch_name}</div>;
      },
    },
    {
      id: "Total Loans",
      header: "Total Loans",
      cell: ({ row }) => {
        const { user_total_loans } = row.original;
        return <div>{user_total_loans}</div>;
      },
    },
    {
      id: "Loan Type",
      header: "Loan Type",
      cell: ({ row }) => {
        const { loans_type } = row.original;
        return <div>{loans_type}</div>;
      },
    },
    {
      id: "Date of Birth",
      header: "Date of Birth",
      cell: ({ row }) => {
        const { user_dob } = row.original;
        return <div>{user_dob}</div>;
      },
    },
    {
      accessorKey: "loans_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("loans_status");
        const loanId = row.original.id;
        const currentStatus = statusOptions.find((opt) => opt.value === status);

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`${currentStatus?.color || "bg-gray-100 text-gray-800"} border-0`}
                disabled={statusMutation.isPending}
              >
                {currentStatus?.label || status}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-1">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    className={`w-full justify-start ${option.color} ${
                      status === option.value
                        ? "ring-2 ring-offset-1 ring-gray-400"
                        : ""
                    }`}
                    onClick={() => handleStatusChange(loanId, option.value)}
                    disabled={statusMutation.isPending}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const loan = row.original;

        return (
          <div className="flex items-center space-x-2">
            {/* View Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleViewClick(loan.id)}
              className="hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 text-blue-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize: 7 } },
  });

  return (
    <div className="w-full">
      <div className="flex text-left text-2xl text-gray-800 font-[400] mb-6">
        {title || "Loan Form List"}
      </div>
      <div className="flex items-center py-4">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            value={table.getState().globalFilter || ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="pl-8 bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header == "string"
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="default"
          className={`ml-2  ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} `}
          onClick={() => {
            navigate("/loan");
          }}
        >
          <SquarePlus className="h-4 w-4 " /> Loan Form
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`${ButtonConfig.tableHeader} ${ButtonConfig.tableLabel}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total: {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoanFormTable;
