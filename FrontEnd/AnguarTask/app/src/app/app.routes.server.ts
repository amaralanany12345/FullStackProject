import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Client
  },
  {
    path: 'home/items/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/orders',
    renderMode: RenderMode.Client
  },
  {
    path: 'home/orders/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/receipts',
    renderMode: RenderMode.Client
  },
  {
    path: 'home/receipts/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/activeOrder/:orderId',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/updateItem/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/createCategory',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home/createItem',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home/paymentPage/:orderId',
    renderMode: RenderMode.Server
  },
  

];
