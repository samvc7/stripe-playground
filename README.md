# 🧪 Stripe Playground

This is a Stripe integration playground app where I explored and experimented the Stripe API using real-world use cases for eCommerce and subscriptions.

🧭 **Live Demo**: [stripe-playground.vercel.app](https://stripe-playground.vercel.app)

---

## 🛍 Features

### 🛒 Simple Shop Page
- Products are created directly in the [Stripe Dashboard](https://dashboard.stripe.com).
- Uses **Stripe Hosted Checkout Form**.
- Includes **success** and **cancel** pages after checkout.

### 📦 Subscription Page
- Three subscription plans: `Basic`, `Premium`, and `Ultimate`.
- Uses **Stripe Embedded Checkout Form**.
- Includes a **success** page after checkout.

---

## ⚙️ Getting Started

1. Clone the repository and navigate into the project folder.

```bash
git clone https://github.com/your-username/stripe-playground.git
cd stripe-playground
pnpm install
```

2. Install dependencies using your preferred package manager (`pnpm install` recommended).

3. Create a `.env.local` file in the root of the project with the following content. See [Stripe Keys](https://docs.stripe.com/keys) to get the necessary stripe keys:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. Start the development server and visit `http://localhost:3000`.

---

## 🧰 Tech Stack

- **React**
- **TypeScript**
- **Next.js (App Router)**
- **Tailwind CSS**
- **Shadcn UI**
- **Stripe (Hosted + Embedded Checkout)**
- **date-fns**

---

## 🚧 Planned Features

- 🛒 Cart with quantity management
- 📋 Order & Subscription Manager dashboard
- 📧 Email sending with receipt after checkout
- 🧾 Tax calculation and display
- 👤 Autofill customer details in checkout

---

## 📝 License

MIT – use it freely for learning, demos, or prototypes.
