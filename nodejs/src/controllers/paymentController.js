const axios = require("axios");
const Stripe = require("stripe");
// need to save env config
const stripeSecretKey =
	"sk_test_51P7ey4K1nC28uFDPdyPa1iy8fP8ctTVkDzZoqNBZBCVIeYqqnm94Qx7J5yUZqrY4Y8oJaWedhaoW2iyLv1tM9VzM005UL3Dx8x";
const stripeConnect = Stripe(stripeSecretKey);
const getUrlPay = async (req, res) => {
	try {
		const { title, price, quantity, bookId } = req.body;
		const session = await stripeConnect.checkout.sessions.create({
			line_items: [
				{
					price_data: {
						currency: "VND",
						product_data: {
							name: title,
						},
						unit_amount: price,
					},
					quantity: quantity || 1,
				},
			],
			mode: "payment",
			success_url: `http://localhost:3000/booking-success/${bookId}`,
			cancel_url: `http://localhost:3000/booking-fail/${bookId}`,
		});

		res.send({ url: session.url });
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getUrlPay,
};
