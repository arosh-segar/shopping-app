"use client";
import { ColumnFiltersState, SortingState } from "@/app/lib/definitions";
import useCartStore from "@/app/lib/zustand-store";
import {
  Button,
  ComboboxItem,
  Container,
  Grid,
  Input,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsCart, BsFilter } from "react-icons/bs";
import BookItemMolecule from "../../molecutles/home/BookItemMolecule";
import FilterOrganism from "../FilterOrganism";
import PaginationOrganism from "../PaginationOrganism";
import ShoppingCartOrganism from "../ShoppingCartOrganism";

const HomeOrganism = () => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);
  const [opened, { open, close }] = useDisclosure(false);

  const [category, setCategory] = useState<ComboboxItem | null>(null);
  const [sortField, setSortField] = useState<ComboboxItem | null>({
    value: "name",
    label: "Name",
  });
  const [sortOrder, setSortOrder] = useState<ComboboxItem | null>({
    value: "Ascending",
    label: "Ascending",
  });
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { books } = useCartStore();

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Author",
        accessorKey: "author",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Image Url",
        accessorKey: "imgUrl",
      },
    ],
    []
  );

  const handleFilters = (field: string, value: string) => {
    setColumnFilters([
      ...columnFilters.filter((columnFilter) => columnFilter.id !== field),
      {
        id: field,
        value,
      },
    ]);
  };

  const handleSort = (
    sortField: string | undefined,
    sortOrder: string | undefined
  ) => {
    if (sortField && sortOrder) {
      setSorting([
        {
          id: sortField,
          desc: sortOrder === "Ascending" ? false : true,
        },
      ]);
    }
  };

  const handlePriceRangeFilter = (value: [number, number]) => {
    setColumnFilters([
      ...columnFilters.filter((columnFilter) => columnFilter.id !== "price"),
      {
        id: "price",
        value,
      },
    ]);
  };

  const resetFilters = () => {
    setCategory(null);
    setSorting([
      {
        id: "name",
        desc: false,
      },
    ]);
    setColumnFilters([]);
    setPriceRange([0, 500]);
    setSortField({
      value: "name",
      label: "Name",
    });
    setSortOrder({
      value: "Ascending",
      label: "Ascending",
    });
  };

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting: sorting,
      pagination: pagination,
      columnFilters: columnFilters,
    },
  });

  return (
    <div>
      <ShoppingCartOrganism opened={opened} close={close} />

      <div className="py-5 w-full sticky top-0 z-50 bg-white shadow-md">
        <Container size="lg">
          <div className="flex justify-end">
            <Button
              leftSection={<BsCart className="stroke-1" size={14} />}
              variant="outline"
              size="md"
              onClick={open}
            >
              Shopping Cart
            </Button>
          </div>
          <div className="w-full flex justify-between space-x-5 mt-5">
            <Input
              className="w-11/12"
              placeholder="Search for books..."
              onChange={(e) => handleFilters("name", e.target.value)}
            />
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="filled"
              className="flex justify-center items-center"
            >
              <BsFilter style={{ width: "70%", height: "70%" }} />
            </Button>
          </div>

          <FilterOrganism
            isFilterOpen={isFilterOpen}
            category={category}
            sortField={sortField}
            sortOrder={sortOrder}
            priceRange={priceRange}
            setCategory={setCategory}
            setSortField={setSortField}
            setSortOrder={setSortOrder}
            handleFilters={handleFilters}
            setPriceRange={setPriceRange}
            handleSort={handleSort}
            handlePriceRangeFilter={handlePriceRangeFilter}
            resetFilters={resetFilters}
          />
        </Container>
      </div>
      <Container size="lg">
        {table.getRowModel().flatRows.length > 0 ? (
          <Grid gutter="xl" mt={20}>
            {table.getRowModel().flatRows.map((book) => (
              <BookItemMolecule
                key={book?.original?.id}
                book={book?.original}
              />
            ))}
          </Grid>
        ) : (
          <Text>No books available</Text>
        )}
        {table.getPageCount() > 1 && <PaginationOrganism table={table} />}
      </Container>
    </div>
  );
};

export default HomeOrganism;
