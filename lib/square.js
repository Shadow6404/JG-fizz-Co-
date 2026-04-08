function getBaseUrl() {
  return process.env.SQUARE_ENVIRONMENT === 'production'
    ? 'https://connect.squareup.com'
    : 'https://connect.squareupsandbox.com';
}

function getRedirectUrls(origin) {
  return {
    redirect_url: `${origin}/checkout/success`,
    checkout_options: {
      redirect_url: `${origin}/checkout/success`,
      merchant_support_email: process.env.SQUARE_SUPPORT_EMAIL || undefined,
      ask_for_shipping_address: true,
    },
  };
}

export function getHostedCheckoutLink(productSlug) {
  const key = `SQUARE_PAYMENT_LINK_${productSlug.replace(/-/g, '_').toUpperCase()}`;
  return process.env[key] || null;
}

export function buildPaymentLinkPayload(product, origin) {
  return {
    idempotency_key: crypto.randomUUID(),
    quick_pay: {
      name: product.name,
      price_money: {
        amount: product.amountCents,
        currency: process.env.SQUARE_CURRENCY || 'USD',
      },
      location_id: process.env.SQUARE_LOCATION_ID,
    },
    ...getRedirectUrls(origin),
  };
}

export async function createSquarePaymentLink(product, origin) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;

  if (!accessToken || !process.env.SQUARE_LOCATION_ID) {
    throw new Error('Missing Square credentials. Set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID.');
  }

  const response = await fetch(`${getBaseUrl()}/v2/online-checkout/payment-links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'Square-Version': '2025-03-19',
    },
    body: JSON.stringify(buildPaymentLinkPayload(product, origin)),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Square API error: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.payment_link?.url || null;
}
