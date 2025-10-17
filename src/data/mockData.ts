import type {CreditCardData, QuickStat, Transaction} from '../types';
import type {UserProfile, AccountStat, PersonalInfo, QuickAction, BankingService} from '../types';

export const sampleCreditCards: CreditCardData[] = [
  {
    id: '1',
    cardNumber: '4532123456789012',
    cardholderName: 'Ahmed Al-Rashid',
    expiryDate: '12/26',
    cardType: 'visa',
    balance: 15420.75,
    backgroundColor: '#1a472a',
  },
  {
    id: '2',
    cardNumber: '5412345678901234',
    cardholderName: 'Fatima Al-Zahra',
    expiryDate: '09/27',
    cardType: 'mastercard',
    balance: 28750.50,
    backgroundColor: '#b45309',
  },
  {
    id: '3',
    cardNumber: '3782822463100056',
    cardholderName: 'Omar Al-Mahmoud',
    expiryDate: '03/25',
    cardType: 'visa',
    balance: 45300.00,
    backgroundColor: '#1e3a8a',
  },
  {
    id: '4',
    cardNumber: '4111111111111111',
    cardholderName: 'Noura Al-Qahtani',
    expiryDate: '08/28',
    cardType: 'mastercard',
    balance: 12250.25,
    backgroundColor: '#7c2d12',
  },
  {
    id: '5',
    cardNumber: '5555555555554444',
    cardholderName: 'Khalid Al-Otaibi',
    expiryDate: '05/26',
    cardType: 'visa',
    balance: 33890.00,
    backgroundColor: '#14532d',
  },
];

export const sampleUserProfile: UserProfile = {
    name: 'Omar Al-Mahmoud',
    email: 'omar.mahmoud@saudibank.sa',
    phone: '+966 50 123 4567',
    accountNumber: 'SA44 2000 0001 2345 6789 1234',
    accountType: 'Platinum Banking',
    memberSince: 'March 2019',
    lastLogin: 'Today at 3:45 PM',
    status: 'Active',
    totalBalance: '125,430.75 SAR',
};

export const accountStats: AccountStat[] = [
    {
        id: '1',
        label: 'Monthly Income',
        value: '45,200 SAR',
        icon: 'trending-up',
        color: '#059669',
        growth: '+12.5%',
    },
    {
        id: '2',
        label: 'Monthly Expenses',
        value: '28,650 SAR',
        icon: 'trending-down',
        color: '#dc2626',
        growth: '-5.2%',
    },
    {
        id: '3',
        label: 'Savings This Month',
        value: '16,550 SAR',
        icon: 'savings',
        color: '#1a472a',
        growth: '+18.7%',
    },
    {
        id: '4',
        label: 'Investment Portfolio',
        value: '89,750 SAR',
        icon: 'show-chart',
        color: '#b45309',
        growth: '+7.3%',
    },
];


export const personalInfo: PersonalInfo[] = [
    {
        label: 'Full Name',
        value: 'Omar Abdullah Al-Mahmoud',
        icon: 'person',
        editable: true,
    },
    {
        label: 'National ID',
        value: '1234567890',
        icon: 'badge',
        editable: false,
    },
    {
        label: 'Email Address',
        value: 'omar.mahmoud@saudibank.sa',
        icon: 'email',
        editable: true,
    },
    {
        label: 'Mobile Number',
        value: '+966 50 123 4567',
        icon: 'phone',
        editable: true,
    },
    {
        label: 'Date of Birth',
        value: 'April 15, 1988',
        icon: 'cake',
        editable: false,
    },
    {
        label: 'Nationality',
        value: 'Saudi Arabia',
        icon: 'flag',
        editable: false,
    },
    {
        label: 'City',
        value: 'Riyadh',
        icon: 'location-city',
        editable: true,
    },
    {
        label: 'Member Since',
        value: 'March 2019',
        icon: 'schedule',
        editable: false,
    },
];


export const quickActions: QuickAction[] = [
    {
        id: '1',
        title: 'Transaction History',
        subtitle: 'View all your transactions',
        icon: 'receipt-long',
        color: '#1a472a',
        action: 'transactions',
    },
    {
        id: '2',
        title: 'Change PIN',
        subtitle: 'Update your security PIN',
        icon: 'lock-reset',
        color: '#dc2626',
        action: 'change-pin',
    },
    {
        id: '3',
        title: 'Security Settings',
        subtitle: 'Manage account security',
        icon: 'security',
        color: '#7c3aed',
        action: 'security',
    },
    {
        id: '4',
        title: 'Customer Support',
        subtitle: 'Get help and support',
        icon: 'support-agent',
        color: '#b45309',
        action: 'support',
    },
    {
        id: '5',
        title: 'Download Statements',
        subtitle: 'Get your account statements',
        icon: 'file-download',
        color: '#059669',
        action: 'statements',
    },
    {
        id: '6',
        title: 'Update Address',
        subtitle: 'Change your address details',
        icon: 'home',
        color: '#ea580c',
        action: 'address',
    },
];


export const bankingServices: BankingService[] = [
    {
        id: '1',
        title: 'SMS Notifications',
        subtitle: 'Transaction alerts via SMS',
        icon: 'sms',
        color: '#1a472a',
        enabled: true,
    },
    {
        id: '2',
        title: 'Email Statements',
        subtitle: 'Monthly statements via email',
        icon: 'email',
        color: '#b45309',
        enabled: true,
    },
    {
        id: '3',
        title: 'Mobile Banking',
        subtitle: 'Access via mobile app',
        icon: 'phone-android',
        color: '#059669',
        enabled: true,
    },
    {
        id: '4',
        title: 'International Transfers',
        subtitle: 'Send money internationally',
        icon: 'language',
        color: '#7c3aed',
        enabled: true,
    },
    {
        id: '5',
        title: 'Investment Services',
        subtitle: 'Portfolio management',
        icon: 'trending-up',
        color: '#dc2626',
        enabled: false,
    },
    {
        id: '6',
        title: 'Credit Card Services',
        subtitle: 'Manage your credit cards',
        icon: 'credit-card',
        color: '#ea580c',
        enabled: true,
    },
];

export const mockQuickStats: QuickStat[] = [
  {
    id: '1',
    title: 'Total Balance',
    value: '89,471.25 SAR',
    icon: 'account-balance-wallet',
    color: '#1a472a',
    change: '+5.2%',
    changeType: 'increase',
  },
  {
    id: '2',
    title: 'Monthly Income',
    value: '15,200 SAR',
    icon: 'trending-up',
    color: '#059669',
    change: '+12.8%',
    changeType: 'increase',
  },
  {
    id: '3',
    title: 'Monthly Expenses',
    value: '8,450 SAR',
    icon: 'trending-down',
    color: '#dc2626',
    change: '-3.1%',
    changeType: 'decrease',
  },
  {
    id: '4',
    title: 'Savings Goal',
    value: '75%',
    icon: 'savings',
    color: '#b45309',
    change: '+8.5%',
    changeType: 'increase',
  },
];

export const mockRecentTransactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: '-1,250.00 SAR',
    description: 'Al-Rajhi Supermarket',
    date: '2024-01-15',
    category: 'Groceries',
    status: 'completed',
  },
  {
    id: '2',
    type: 'credit',
    amount: '+15,200.00 SAR',
    description: 'Salary Deposit',
    date: '2024-01-15',
    category: 'Income',
    status: 'completed',
  },
  {
    id: '3',
    type: 'debit',
    amount: '-850.00 SAR',
    description: 'STC Mobile Bill',
    date: '2024-01-14',
    category: 'Utilities',
    status: 'completed',
  },
  {
    id: '4',
    type: 'debit',
    amount: '-2,100.00 SAR',
    description: 'Restaurant Payment',
    date: '2024-01-14',
    category: 'Dining',
    status: 'completed',
  },
  {
    id: '5',
    type: 'debit',
    amount: '-500.00 SAR',
    description: 'ATM Withdrawal',
    date: '2024-01-13',
    category: 'Cash',
    status: 'completed',
  },
];

export const appInfo = {
    name: 'TotoAI Banking Assistant',
    version: '1.0.0',
    buildNumber: '2024.08.23',
    developer: 'TotoAI Team',
    supportEmail: 'support@totoai.com',
};