const ORDER_STEPS = [
  { key: "Pending", label: "Order Placed" },
  { key: "Processing", label: "Packed" },
  { key: "Shipped", label: "Shipped" },
  { key: "Delivered", label: "Delivered" }
];

const OrderStatusTracker = ({ status }) => {
  const currentStep = ORDER_STEPS.findIndex(
    step => step.key === status
  );

  return (
    <div className="flex items-center justify-between mt-6">
      {ORDER_STEPS.map((step, index) => (
        <div key={step.key} className="flex-1 flex items-center">
          
          {/* Circle */}
          <div
            className={`w-4 h-4 rounded-full ${
              index <= currentStep
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />

          {/* Line */}
          {index !== ORDER_STEPS.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                index < currentStep
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />
          )}

          {/* Label */}
          <span className="absolute mt-8 text-xs">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusTracker;
