const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Shop With Us
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
            <p className="text-gray-600">
              Get your products delivered quickly and safely to your doorstep.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              We use trusted payment gateways to keep your transactions safe.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
            <p className="text-gray-600">
              Carefully selected products with quality you can trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
