import React from 'react';
import { mockQuickStats, mockRecentTransactions, sampleCreditCards, sampleUserProfile } from '../data/mockData';
import type {
  CreditCardData,
  UserProfile,
  ApiResponse,
  DashboardData,
  Transaction,
  Notification,
} from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Transaction Alert',
    message: 'Payment of 1,250.00 SAR at Al-Rajhi Supermarket',
    type: 'info',
    timestamp: '2024-01-15T14:30:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Salary Credited',
    message: 'Your salary of 15,200.00 SAR has been credited',
    type: 'success',
    timestamp: '2024-01-15T09:00:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Low Balance Warning',
    message: 'Your savings account balance is below 5,000 SAR',
    type: 'warning',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
  },
];

class ApiService {
  static async simulateApiCall<T>(data: T, delayMs = 1500): Promise<T> {
    await delay(delayMs);
    if (Math.random() < 0.05) {
      throw new Error('Network error occurred. Please try again.');
    }
    return data;
  }

  async fetchDashboardData(): Promise<DashboardData> {
    try {
      const data = await ApiService.simulateApiCall({
        creditCards: sampleCreditCards,
        userProfile: sampleUserProfile,
        quickStats: mockQuickStats,
        recentTransactions: mockRecentTransactions,
        notifications: mockNotifications,
      }, 5000);

      return data;
    } catch (error) {
      throw new Error('Failed to fetch dashboard data');
    }
  }

  async fetchCreditCards(): Promise<CreditCardData[]> {
    try {
      const data = await ApiService.simulateApiCall(sampleCreditCards, 1000);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch credit cards');
    }
  }

  async fetchUserProfile(): Promise<UserProfile> {
    try {
      return await ApiService.simulateApiCall(sampleUserProfile, 800);
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }

  async fetchRecentTransactions(): Promise<Transaction[]> {
    try {
      return await ApiService.simulateApiCall(mockRecentTransactions, 1200);
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  }

  async fetchNotifications(): Promise<Notification[]> {
    try {
      return await ApiService.simulateApiCall(mockNotifications, 600);
    } catch (error) {
      throw new Error('Failed to fetch notifications');
    }
  }
}

export const useQuery = <T>(
  queryFn: () => Promise<T>,
  options: { skip?: boolean } = {},
): ApiResponse<T> => {
  const [state, setState] = React.useState<ApiResponse<T>>({
    data: null,
    loading: !options.skip,
    error: null,
  });

  const queryFnRef = React.useRef(queryFn);
  queryFnRef.current = queryFn;

  React.useEffect(() => {
    if (options.skip) return;

    const fetchData = async() => {
      setState(prev => ({...prev, loading: true, error: null}));

      try {
        const data = await queryFnRef.current();
        setState({data, loading: false, error: null});
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        });
      }
    };

    fetchData();
  }, [options.skip]);

  return state;
};

export const apiService = new ApiService();

