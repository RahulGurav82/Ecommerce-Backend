const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || 'AR6ww2SzHuoWAZhBjVTHHKvJlJMscbCmQlaqxsMR5_PE_pbjaT7OVtOd9ODO2cV9_V6Rvj95YBTEHPQp';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'EB5x-kLOP-EGIp5Tjx1El-_DADMvT_DAVvYYqbbecNCVERLvq9WJ3P_pbFWHGUMJVjiFAJFhUsTLOeeY';

  // Use sandbox for testing, live for production
  return process.env.NODE_ENV === 'production'
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

// Export both client and orders for easier access
module.exports = {
  client,
  orders: checkoutNodeJssdk.orders
};