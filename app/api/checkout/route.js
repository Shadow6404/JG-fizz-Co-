import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/products';
import { createSquarePaymentLink, getHostedCheckoutLink } from '@/lib/square';

function getOrigin(request) {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const forwardedHost = request.headers.get('x-forwarded-host');
  const fallbackHost = request.headers.get('host');
  const protocol = forwardedProto || 'http';
  const host = forwardedHost || fallbackHost;
  return `${protocol}://${host}`;
}

export async function POST(request) {
  const formData = await request.formData();
  const productSlug = String(formData.get('productSlug') || '');
  const product = getProductBySlug(productSlug);

  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  const hostedLink = getHostedCheckoutLink(product.slug);
  if (hostedLink) {
    return NextResponse.redirect(hostedLink, 303);
  }

  try {
    const paymentLink = await createSquarePaymentLink(product, getOrigin(request));

    if (!paymentLink) {
      return NextResponse.json({ error: 'Square checkout link was not returned.' }, { status: 502 });
    }

    return NextResponse.redirect(paymentLink, 303);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout setup failed.' },
      { status: 500 },
    );
  }
}
