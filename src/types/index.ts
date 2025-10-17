export interface CreditCardData {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  balance: number;
  backgroundColor: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  accountNumber: string;
  accountType: string;
  memberSince: string;
  lastLogin: string;
  status: string;
  totalBalance: string;
  profileImage?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardData {
  creditCards: CreditCardData[];
  userProfile: UserProfile;
  quickStats: QuickStat[];
  recentTransactions: Transaction[];
  notifications: Notification[];
}

export interface QuickStat {
  id: string;
  title: string;
  value: string;
  icon: string;
  color: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: string;
  description: string;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface AccountStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
  growth?: string;
}

export interface PersonalInfo {
  label: string;
  value: string;
  icon: string;
  editable?: boolean;
}

export interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action: string;
}

export interface BankingService {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export interface CreditCardProps {
  card: CreditCardData;
  style?: any;
}

export interface ProfileHeaderProps {
  userProfile: UserProfile;
  onEditProfile: () => void;
  onEditImage?: () => void;
}

export interface ProfileCardProps {
  title: string;
  children: React.ReactNode;
  style?: any;
  headerIcon?: React.ReactNode;
}

export interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  iconColor?: string;
  value?: string;
  isLast?: boolean;
}

export interface DashboardLoaderProps {
  message?: string;
}

import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface ChatPopupProps {
  visible: boolean;
  onClose: () => void;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  component?: {
    name: string;
    props: any;
  };
}

export interface GeminiHistoryMessage {
  role: 'user' | 'model';
  parts: [{text: string}];
}

export interface ChatHistoryData {
  messages: GeminiHistoryMessage[];
  timestamp: number;
}

export interface TabParamList {
  Dashboard: undefined;
  Profile: undefined;
  Settings: undefined;
}

export type ChatScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Dashboard'>;

export interface ComponentData {
  name: string;
  props: Record<string, unknown>;
}

export interface ResponseData {
  text?: string;
  navigation?: string;
  component?: ComponentData;
}
