import { useState } from "react";

function Checkout({ cart }) {
  const [step, setStep] = useState(1);
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!billing.name) newErrors.name = "Name is required";
    if (!billing.email) newErrors.email = "Email is required";
    if (!billing.address) newErrors.address = "Address is required";
    if (!billing.city) newErrors.city = "City is required";
    if (!billing.zip) newErrors.zip = "ZIP is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const handlePayment = () => {
    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: subtotal,
        status: "Delivered",
        date: new Date().toLocaleDateString(),
      };

      const existingOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, newOrder])
      );
    }

    setPaymentStatus(isSuccess ? "success" : "failure");
    setStep(3);
  };

  const handleRestart = () => {
    setStep(1);
    setBilling({ name: "", email: "", address: "", city: "", zip: "" });
    setErrors({});
    setPaymentStatus("");
  };

  return (
    <div
      style={{
        width: "90vw",
        padding: "40px",
        boxSizing: "border-box",
        backgroundColor: "#f7f7f7",
      }}
    >
      <h1>Checkout</h1>

      {/* Stepper */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          maxWidth: "600px",
        }}
      >
        <span style={{ fontWeight: step === 1 ? "bold" : "normal" }}>
          Billing
        </span>
        <span style={{ fontWeight: step === 2 ? "bold" : "normal" }}>
          Review & Payment
        </span>
        <span style={{ fontWeight: step === 3 ? "bold" : "normal" }}>
          Confirmation
        </span>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "300px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billing.name}
            onChange={handleChange}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={billing.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={billing.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span style={{ color: "red" }}>{errors.address}</span>
          )}

          <input
            type="text"
            name="city"
            placeholder="City"
            value={billing.city}
            onChange={handleChange}
          />
          {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}

          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={billing.zip}
            onChange={handleChange}
          />
          {errors.zip && <span style={{ color: "red" }}>{errors.zip}</span>}
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ maxWidth: "600px" }}>
          <h3>Review Your Order</h3>

          <p><strong>Name:</strong> {billing.name}</p>
          <p><strong>Email:</strong> {billing.email}</p>
          <p>
            <strong>Address:</strong> {billing.address}, {billing.city} - {billing.zip}
          </p>

          <h4>Cart Items</h4>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <h4>Total: ${subtotal.toFixed(2)}</h4>

          <button
            onClick={handlePayment}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ maxWidth: "600px" }}>
          {paymentStatus === "success" ? (
            <div>
              <h3>Payment Successful 🎉</h3>
              <p>Thank you {billing.name}! Your order is confirmed.</p>
            </div>
          ) : (
            <div>
              <h3>Payment Failed ❌</h3>
              <p>Please try again.</p>
            </div>
          )}

          <button
            onClick={handleRestart}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
            }}
          >
            Restart Checkout
          </button>
        </div>
      )}

      {/* Navigation */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "600px",
        }}
      >
        {step > 1 && step < 3 && <button onClick={prevStep}>Back</button>}
        {step === 1 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
}

export default Checkout;