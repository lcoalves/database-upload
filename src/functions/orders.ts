import storage from 'node-persist';

import api from '../services/api';

interface Response {
  paging: {
    total: number;
    page: number;
    offset: number;
    limit: number;
    maxLimit: number;
  };
  Orders: Order[];
}

interface Order {
  Order: {
    status: string;
    id: string;
    date: string;
    customer_id: string;
    partial_total: string;
    taxes: string;
    discount: string;
    point_sale: string;
    shipment: string;
    shipment_value: string;
    shipment_date: string;
    discount_coupon: string;
    payment_method_rate: string;
    value_1: string;
    payment_form: string;
    sending_code: string;
    session_id: string;
    total: string;
    payment_date: string;
    access_code: string;
    shipment_integrator: string;
    modified: string;
    id_quotation: string;
    estimated_delivery_date: string;
    external_code: string;
    has_payment: string;
    has_shipment: string;
    has_invoice: string;
    total_comission_user: string;
    total_comission: string;
    is_traceable: string;
    OrderStatus: {
      id: string;
      default: string;
      type: string;
      show_backoffice: string;
      allow_edit_order: string;
      description: string;
      status: string;
      show_status_central: string;
      background: string;
    };
    ProductsSold: Products[];
    Payment: Payment[];
    OrderTransactions: Transaction[];
  };
}

interface Products {
  id: string;
}

interface Payment {
  id: string;
}

interface Transaction {
  url_payment: string;
}

// pegar todos os pedidos em /orders
// fazer um map nesses pedidos, pegando os dados completos de cada pedido em /orders/${id}/complete
// para cada pedido precisamos montar um array de objetos com:
// 1. dados do pedido
//  1.1. forma de envio
// 2. dados do cliente
//  2.1. dados de entrega
// 3. dados dos produtos

const orders = async (): Promise<Order[]> => {
  await storage.init();

  const auth = await storage.getItem('auth');

  const response = await api.get<Response>('/orders', {
    params: {
      access_token: auth.access_token,
      limit: 1,
      status: '%A ENVIAR%',
    },
  });

  const { id } = response.data.Orders[0].Order;

  const responseComplete = await api.get(`/orders/${id}/complete`, {
    params: {
      access_token: auth.access_token,
    },
  });

  console.log(responseComplete.data.Order.id);

  const allOrders = response.data.Orders;

  return allOrders;
};

export default orders;
