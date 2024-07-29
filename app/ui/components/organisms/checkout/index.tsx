"use client";
import useCartStore from "@/app/lib/zustand-store";
import { Button, Container, NumberFormatter, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import CartItemSectionMolecule from "../../molecutles/cart/CartItemSectionMolecule";
import CheckoutFormOrganism from "./CheckoutFormOrganism";

const CheckoutOrganism = () => {
  const { cartItems, totalCost } = useCartStore();
  const { push } = useRouter();
  return (
    <Container size="lg" my={10}>
      <Text fw={700} truncate="end" size="xl">
        Checkout
      </Text>
      <Button
        onClick={() => {
          push("/");
        }}
        my={20}
      >
        Go Back
      </Button>
      <div className="w-full flex flex-col-reverse lg:flex-row items-start lg:space-x-4">
        <div className="w-full lg:w-7/12 lg:h-[75vh] p-5 bg-blue-100 rounded-md my-10 lg:my-0">
          <CheckoutFormOrganism />
        </div>
        <div className="w-full lg:w-5/12 lg:h-[75vh] p-5 bg-blue-100 rounded-md">
          <Text fw={500} truncate="end" size="lg" mb={20}>
            Selected Books
          </Text>
          <div className="flex flex-col space-y-4 max-h-[50vh] lg:h-[50vh] overflow-y-auto px-2 py-4 bg-gray-100 rounded-md">
            {cartItems?.map((cartItem) => (
              <CartItemSectionMolecule
                key={cartItem.id}
                cartItem={cartItem}
                isCheckoutPage={true}
              />
            ))}
          </div>
          <div className="w-full flex justify-center mt-5">
            <div className="flex justify-between w-10/12">
              <div>Total Cost</div>
              <div>
                <NumberFormatter prefix="$ " value={totalCost} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutOrganism;
