import {
  FormErrors,
  PaymentFormData,
  ShippingFormData,
} from "@/app/lib/definitions";
import useCartStore from "@/app/lib/zustand-store";
import {
  Button,
  Group,
  Notification,
  rem,
  Stepper,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  BsCardText,
  BsCheck,
  BsCheckCircle,
  BsCreditCard2Back,
  BsTruck,
} from "react-icons/bs";
import { paymentSchema, shippingSchema } from "../../../../lib/form-schemas";

const CheckoutFormOrganism = () => {
  const { push } = useRouter();
  const { makeOrder } = useCartStore();
  const [active, setActive] = useState<number>(0);
  const [paymentErrors, setPaymentErrors] = useState<FormErrors>({});
  const [shippingErrors, setShippingErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<PaymentFormData & ShippingFormData>({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: "",
    fullName: "",
    email: "",
    postalCode: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (active === 0) {
      const result = paymentSchema.safeParse({
        cardNumber: formData.cardNumber,
        nameOnCard: formData.nameOnCard,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
      });

      if (!result.success) {
        const errors: FormErrors = {};
        result.error.errors.forEach((error) => {
          errors[error.path[0] as string] = error.message;
        });
        setPaymentErrors(errors);
        return;
      } else {
        setPaymentErrors({});
      }
    }

    if (active === 1) {
      const result = shippingSchema.safeParse({
        fullName: formData.fullName,
        email: formData.email,
        postalCode: formData.postalCode,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      });

      if (!result.success) {
        const errors: FormErrors = {};
        result.error.errors.forEach((error) => {
          errors[error.path[0] as string] = error.message;
        });
        setShippingErrors(errors);
        return;
      } else {
        setShippingErrors({});
      }
    }

    setActive((current) => (current < 2 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Stepper
        active={active}
        onStepClick={setActive}
        completedIcon={
          <BsCheckCircle style={{ width: rem(18), height: rem(18) }} />
        }
      >
        <Stepper.Step
          icon={
            <BsCreditCard2Back style={{ width: rem(18), height: rem(18) }} />
          }
          label="Step 1"
          description="Add Payment Details"
        >
          <TextInput
            name="cardNumber"
            leftSectionPointerEvents="none"
            size="sm"
            leftSection={
              <BsCardText style={{ width: rem(18), height: rem(18) }} />
            }
            label="Your card number"
            placeholder="8452 **** **** ****"
            value={formData.cardNumber}
            onChange={handleChange}
            error={paymentErrors.cardNumber}
          />
          <TextInput
            name="nameOnCard"
            className="mt-5"
            leftSectionPointerEvents="none"
            size="sm"
            label="Name on the card"
            placeholder="John Doe"
            value={formData.nameOnCard}
            onChange={handleChange}
            error={paymentErrors.nameOnCard}
          />
          <div className="w-full flex space-x-5 mt-5">
            <TextInput
              name="expiryDate"
              className="w-1/2"
              leftSectionPointerEvents="none"
              size="sm"
              label="Expiry Date"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              error={paymentErrors.expiryDate}
            />
            <TextInput
              name="cvv"
              className="w-1/2"
              leftSectionPointerEvents="none"
              size="sm"
              label="CVV"
              placeholder="129"
              value={formData.cvv}
              onChange={handleChange}
              error={paymentErrors.cvv}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step
          icon={<BsTruck style={{ width: rem(18), height: rem(18) }} />}
          label="Step 2"
          description="Shipping Details"
        >
          <div className="flex flex-col space-y-5">
            <TextInput
              name="fullName"
              leftSectionPointerEvents="none"
              label="Full Name"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              error={shippingErrors.fullName}
            />
            <TextInput
              name="email"
              leftSectionPointerEvents="none"
              label="Your email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              error={shippingErrors.email}
            />
            <TextInput
              name="postalCode"
              leftSectionPointerEvents="none"
              label="Postal code"
              value={formData.postalCode}
              onChange={handleChange}
              error={shippingErrors.postalCode}
            />
            <TextInput
              name="address"
              leftSectionPointerEvents="none"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              error={shippingErrors.address}
            />
            <TextInput
              name="phoneNumber"
              leftSectionPointerEvents="none"
              label="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={shippingErrors.phoneNumber}
            />
          </div>
        </Stepper.Step>
      </Stepper>
      {active === 2 && (
        <Notification
          icon={<BsCheck style={{ width: rem(20), height: rem(20) }} />}
          color="teal"
          title="Order Complete!"
          mt="md"
        >
          Your purchase was successful
        </Notification>
      )}

      <Group justify="end" mt="xl">
        {active === 1 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            nextStep();
            if (active === 2) {
              makeOrder();
              push("/");
            }
          }}
        >
          {active === 2 ? "Go to Home Page" : "Next"}
        </Button>
      </Group>
    </div>
  );
};

export default CheckoutFormOrganism;
