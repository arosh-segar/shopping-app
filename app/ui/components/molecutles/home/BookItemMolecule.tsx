import { Book } from "@/app/lib/definitions";
import useCartStore from "@/app/lib/zustand-store";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  NumberFormatter,
  Text,
} from "@mantine/core";
import Image from "next/image";

type Props = {
  book: Book;
};

const BookItemMolecule = ({ book }: Props) => {
  const { addItem, cartItems } = useCartStore();

  const isItemInCart = (itemId: number): boolean => {
    const book = cartItems.find((cartItem) => cartItem.id === itemId);

    if (book === undefined) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Grid.Col key={book?.id} span={{ base: 12, sm: 4, lg: 3 }}>
      <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image
            src={book?.imgUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "200px" }}
            alt={book?.name}
          />
        </Card.Section>

        <Flex
          gap="md"
          mt={10}
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <Text fw={500} truncate="end">
            {book?.name}
          </Text>
          <Text fw={200} truncate="end" size="sm">
            {book?.author}
          </Text>
          <Text fw={200} truncate="end" size="sm">
            Strock : {book?.quantity}
          </Text>
        </Flex>
        <Group justify="space-between" mt="md" mb="xs">
          <Badge color={book?.quantity > 0 ? "green" : "red"}>
            {book?.quantity > 0 ? "Available" : "Out of stock"}
          </Badge>
          <NumberFormatter prefix="$ " value={book?.price} />
        </Group>

        <Button
          disabled={book?.quantity === 0 || isItemInCart(book?.id)}
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => addItem(book)}
        >
          Add to cart
        </Button>
      </Card>
    </Grid.Col>
  );
};

export default BookItemMolecule;
