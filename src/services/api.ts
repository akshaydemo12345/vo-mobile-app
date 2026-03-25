import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://api.example.com/v1';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      config => {
        // Add auth token if available
        // const token = await AsyncStorage.getItem('auth_token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  login(email: string, password: string) {
    return this.axiosInstance.post('/auth/login', { email, password });
  }

  signup(name: string, email: string, password: string, phone: string) {
    return this.axiosInstance.post('/auth/signup', { name, email, password, phone });
  }

  // Products endpoints
  getProducts(filters?: Record<string, any>) {
    return this.axiosInstance.get('/products', { params: filters });
  }

  getProductById(id: string) {
    return this.axiosInstance.get(`/products/${id}`);
  }

  // Orders endpoints
  getOrders() {
    return this.axiosInstance.get('/orders');
  }

  placeOrder(orderData: any) {
    return this.axiosInstance.post('/orders', orderData);
  }

  getOrderById(id: string) {
    return this.axiosInstance.get(`/orders/${id}`);
  }

  // Addresses endpoints
  getAddresses() {
    return this.axiosInstance.get('/addresses');
  }

  addAddress(addressData: any) {
    return this.axiosInstance.post('/addresses', addressData);
  }

  // Payments endpoints
  processPayment(paymentData: any) {
    return this.axiosInstance.post('/payments', paymentData);
  }
}

export const apiClient = new ApiClient();
