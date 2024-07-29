import {
  Button,
  Collapse,
  ComboboxItem,
  RangeSlider,
  Select,
  Text,
} from "@mantine/core";

type Props = {
  isFilterOpen: boolean;
  category: ComboboxItem | null;
  sortField: ComboboxItem | null;
  sortOrder: ComboboxItem | null;
  priceRange: [number, number];
  setCategory: (value: ComboboxItem | null) => void;
  setSortField: (value: ComboboxItem | null) => void;
  setSortOrder: (value: ComboboxItem | null) => void;
  handleFilters: (field: string, value: string) => void;
  setPriceRange: (value: [number, number]) => void;
  handleSort: (
    sortField: string | undefined,
    sortOrder: string | undefined
  ) => void;
  handlePriceRangeFilter: (value: [number, number]) => void;
  resetFilters: () => void;
};

const FilterOrganism = ({
  isFilterOpen,
  category,
  sortField,
  sortOrder,
  priceRange,
  setCategory,
  setSortField,
  setSortOrder,
  handleFilters,
  setPriceRange,
  handleSort,
  handlePriceRangeFilter,
  resetFilters,
}: Props) => {
  return (
    <Collapse className="bg-gray-100 my-5 p-5 rounded-md" in={isFilterOpen}>
      <Select
        data={[
          { value: "All", label: "All" },
          { value: "Fiction", label: "Fiction" },
          { value: "Non-Fiction", label: "Non-Fiction" },
          { value: "Fantasy", label: "Fantasy" },
          { value: "Science Fiction", label: "Science Fiction" },
          { value: "Mystery", label: "Mystery" },
          { value: "Thriller", label: "Thriller" },
          { value: "Romance", label: "Romance" },
          { value: "Historical", label: "Historical" },
        ]}
        label="Category"
        value={category ? category.value : null}
        onChange={(_value, option) => {
          setCategory(option);
          handleFilters("category", option.value === "All" ? "" : option.value);
        }}
        placeholder="Select Category"
      />
      <div className="w-full flex space-x-5 mt-10">
        <Select
          className="w-1/2"
          data={[
            { value: "name", label: "Name" },
            { value: "author", label: "Author" },
          ]}
          label="Sort By"
          value={sortField ? sortField.value : null}
          onChange={(_value, option) => {
            setSortField(option);
            handleSort(option.value, sortOrder?.value);
          }}
          placeholder="Select Sort Field"
        />
        <Select
          className="w-1/2"
          data={[
            { value: "Ascending", label: "Ascending" },
            { value: "Descending", label: "Descending" },
          ]}
          label="Sort Order"
          value={sortOrder ? sortOrder.value : null}
          onChange={(_value, option) => {
            setSortOrder(option);
            handleSort(sortField?.value, option?.value);
          }}
          placeholder="Select Sort Order"
        />
      </div>
      <div className="w-full mt-10 pr-5 pb-10">
        <Text fw={500} truncate="end" size="sm" mb={30}>
          Price Range
        </Text>
        <RangeSlider
          marks={[{ value: 500, label: "$ 500" }]}
          step={1}
          min={0}
          max={500}
          labelAlwaysOn
          value={priceRange}
          onChange={(value) => {
            setPriceRange(value);
            handlePriceRangeFilter(value);
          }}
        />
      </div>
      <div className="w-full flex justify-end">
        <Button onClick={resetFilters} size="md">
          Reset Filters
        </Button>
      </div>
    </Collapse>
  );
};

export default FilterOrganism;
