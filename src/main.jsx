

import './index.css'
import ReactDOM from "react-dom/client";
import { Routers } from '../src/components/routes/index.routes';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
      <Routers />
  </QueryClientProvider>
);