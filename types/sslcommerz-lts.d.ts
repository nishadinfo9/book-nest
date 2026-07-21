declare module "sslcommerz-lts" {
  interface SSLCommerzConfig {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url?: string;
    shipping_method: string;
    product_name: string;
    product_category: string;
    product_profile: string;
    cus_name: string;
    cus_email: string;
    cus_add1: string;
    cus_city: string;
    cus_country: string;
    cus_phone: string;
  }

  export default class SSLCommerzPayment {
    constructor(
      storeId: string,
      storePassword: string,
      live: boolean
    );

    init(data: SSLCommerzConfig): Promise<{
      GatewayPageURL: string;
      [key: string]: unknown;
    }>;
  }
}