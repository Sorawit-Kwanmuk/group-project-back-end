const omise = require("omise")({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});
exports.createCheckout = async (req, res, next) => {
  const { amount, token } = req.body;
  try {
    const customer = await omise.customers.create({
      userId: req.user.id,
      email: req.user.email,
      description: req.user.fullName,
      amount,
      card: token,
    });
    console.log(`customer`, customer);

    const charge = await omise.charges.create({
      amount: 10000,
      currency: "thb",
      customer: customer.id,
    });
    console.log(`charge -------> `, charge);
  } catch (error) {
    next(error.message);
  }
};
