import { Book } from "@/app/lib/definitions";
import { Button, Flex, Group, Text } from "@mantine/core";
import { Table } from "@tanstack/react-table";

type Props = {
  table: Table<Book>;
};

const PaginationOrganism = ({ table }: Props) => {
  return (
    <Flex
      mb={20}
      justify="flex-end"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      <Group mt="xl">
        <Button
          disabled={table.getState().pagination.pageIndex === 0}
          onClick={() => {
            if (table.getState().pagination.pageIndex > 0) {
              table.setPageIndex(0);
            }
          }}
          variant="outline"
        >
          First Page
        </Button>
        <Button
          disabled={
            table.getState().pagination.pageIndex === table.getPageCount() - 1
          }
          onClick={() => {
            if (
              table.getState().pagination.pageIndex <
              table.getPageCount() - 1
            ) {
              table.setPageIndex(table.getPageCount() - 1);
            }
          }}
          variant="outline"
        >
          Last Page
        </Button>
        <Button
          onClick={() => {
            if (table.getState().pagination.pageIndex > 0) {
              table.setPageIndex(table.getState().pagination.pageIndex - 1);
            }
          }}
          disabled={table.getState().pagination.pageIndex === 0}
          variant="outline"
        >
          Previous Page
        </Button>
        <Button
          disabled={
            table.getState().pagination.pageIndex === table.getPageCount() - 1
          }
          onClick={() => {
            if (
              table.getState().pagination.pageIndex <
              table.getPageCount() - 1
            ) {
              table.setPageIndex(table.getState().pagination.pageIndex + 1);
            }
          }}
          variant="outline"
        >
          Next Page
        </Button>
        <Text fw={400}>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </Text>
      </Group>
    </Flex>
  );
};

export default PaginationOrganism;
