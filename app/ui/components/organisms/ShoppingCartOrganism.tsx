import useCartStore from "@/app/lib/zustand-store";
import { Button, Drawer, em, NumberFormatter } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { BsXCircle } from "react-icons/bs";
import CartItemSectionMolecule from "../molecutles/cart/CartItemSectionMolecule";

type Props = {
  opened: boolean;
  close: () => void;
};

const ShoppingCartOrganism = ({ opened, close }: Props) => {
  const isMobile = useMediaQuery(`(max-width: ${em(1024)})`);
  const { push } = useRouter();
  const { cartItems, totalCost } = useCartStore();
  return (
    <Drawer
      opened={opened}
      size={isMobile ? "100%" : "md"}
      position="right"
      onClose={close}
      title="Shopping Cart"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      closeButtonProps={{
        icon: <BsXCircle size={20} />,
      }}
    >
      <div className="flex flex-col space-y-4 h-[75vh] overflow-y-auto p-4">
        {cartItems?.map((cartItem) => (
          <CartItemSectionMolecule key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="flex justify-between w-10/12">
          <div>Total Cost</div>
          <div>
            <NumberFormatter prefix="$ " value={totalCost} />
          </div>
        </div>
        <div className="flex justify-between w-11/12 mt-10">
          <Button
            disabled={cartItems?.length === 0}
            fullWidth
            variant="outline"
            onClick={() => push("/checkout")}
          >
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ShoppingCartOrganism;
