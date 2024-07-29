import { CartItem } from "@/app/lib/definitions";
import useCartStore from "@/app/lib/zustand-store";
import { ActionIcon, NumberFormatter, NumberInput, Text } from "@mantine/core";
import Image from "next/image";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";

type Props = {
  cartItem: CartItem;
  isCheckoutPage?: boolean;
};

const CartItemSectionMolecule = ({ cartItem, isCheckoutPage }: Props) => {
  const { updateQuantity, removeItem } = useCartStore();
  return (
    <div key={cartItem.id} className="shadow-md p-3 rounded-md">
      <div className="flex space-x-4 w-full">
        <div className="w-2/12 bg-red-200 h-full rounded-md overflow-hidden">
          <Image
            src={cartItem?.book?.imgUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "71px" }}
            alt={cartItem?.book?.name}
          />
        </div>
        <div className="w-10/12 flex flex-col justify-between">
          <div className="flex w-full justify-between">
            <Text fw={500} truncate="end">
              {cartItem?.book?.name}
            </Text>
            {!isCheckoutPage && (
              <ActionIcon
                onClick={() => {
                  removeItem(cartItem?.book?.id);
                }}
                variant="filled"
                aria-label="Settings"
                size="sm"
                color="red"
              >
                <BsTrash style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            )}
          </div>
          <div className="w-full flex justify-between items-end">
            <div className="flex items-center space-x-3">
              {!isCheckoutPage && (
                <ActionIcon
                  onClick={() => {
                    if (cartItem.quantity > 1)
                      updateQuantity(cartItem.book.id, cartItem.quantity - 1);
                  }}
                  variant="filled"
                  aria-label="Settings"
                >
                  <BsDash
                    style={{ width: "70%", height: "70%" }}
                    className="stroke-1"
                  />
                </ActionIcon>
              )}

              <NumberInput
                w={100}
                readOnly={isCheckoutPage}
                value={cartItem.quantity}
                clampBehavior="strict"
                min={1}
                max={cartItem.book.quantity}
                onChange={(value) => {
                  if (parseInt(value.toString()) <= cartItem.book.quantity) {
                    if (parseInt(value.toString()) > cartItem.book.quantity) {
                      updateQuantity(
                        cartItem.book.id,
                        parseInt(value.toString())
                      );
                    }

                    if (parseInt(value.toString()) < cartItem.book.quantity) {
                      updateQuantity(
                        cartItem.book.id,
                        parseInt(value.toString())
                      );
                    }
                  }
                }}
              />
              {!isCheckoutPage && (
                <ActionIcon
                  onClick={() => {
                    if (cartItem.quantity < cartItem.book.quantity)
                      updateQuantity(cartItem.book.id, cartItem.quantity + 1);
                  }}
                  variant="filled"
                  aria-label="Settings"
                >
                  <BsPlus
                    style={{ width: "70%", height: "70%" }}
                    className="stroke-1"
                  />
                </ActionIcon>
              )}
            </div>
            <div>
              <NumberFormatter prefix="$ " value={cartItem?.totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSectionMolecule;
