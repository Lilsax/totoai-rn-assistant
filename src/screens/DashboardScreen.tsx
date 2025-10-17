import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatPopup from '../components/ChatPopup';
import CreditCard from '../components/CreditCard';
import CardSkeleton from '../components/CardSkeleton';
import {apiService, useQuery} from '../services/apiService';
import type {DashboardData} from '../types';
import {dashboardStyles as styles} from '../styles/DashboardScreen.styles';
import {COLORS} from '../styles/theme';

const DashboardScreen: React.FC = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const {data: dashboardData, loading, error} = useQuery<DashboardData>(
    () => apiService.fetchDashboardData(),
  );

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const handleRetry = () => {
    Alert.alert('Retry', 'Please close and reopen the app to retry.');
  };

  if (error && !dashboardData && !loading) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={64} color="#dc2626" />
        <Text style={styles.errorTitle}>Failed to Load Dashboard</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="dashboard" size={24} color="white" style={styles.headerIcon} />
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>My Cards</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            decelerationRate="fast"
            snapToInterval={336}
            style={styles.cardsCarousel}
            contentContainerStyle={styles.cardsCarouselContent}
          >
            {(!dashboardData?.creditCards || loading) ? (
              [1, 2, 3].map((index) => (
                <CardSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              dashboardData.creditCards.map((card) => (
                <CreditCard key={card.id} card={card} />
              ))
            )}
          </ScrollView>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>
          <View style={styles.statsGrid}>
            {(!dashboardData?.quickStats || loading) ? (
              // Show loading placeholders for stats
              [1, 2, 3, 4].map((index) => (
                <View key={`stat-skeleton-${index}`} style={styles.statSkeleton} />
              ))
            ) : (
              dashboardData.quickStats.map((stat) => (
                <View key={stat.id} style={styles.statCard}>
                  <View style={[styles.statIconContainer, {backgroundColor: `${stat.color}15`}]}>
                    <Icon name={stat.icon} size={24} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                  <View style={styles.statChangeContainer}>
                    <Icon
                      name={stat.changeType === 'increase' ? 'trending-up' : stat.changeType === 'decrease' ? 'trending-down' : 'remove'}
                      size={14}
                      color={stat.changeType === 'increase' ? '#059669' : stat.changeType === 'decrease' ? '#dc2626' : '#666'}
                    />
                    <Text style={[
                      styles.statChange,
                      {color: stat.changeType === 'increase' ? '#059669' : stat.changeType === 'decrease' ? '#dc2626' : '#666'},
                    ]}>
                      {stat.change}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {(!dashboardData?.recentTransactions || loading) ? (
            [1, 2, 3].map((index) => (
              <View key={`transaction-skeleton-${index}`} style={styles.transactionSkeleton} />
            ))
          ) : (
            dashboardData.recentTransactions.slice(0, 3).map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionIcon}>
                  <Icon
                    name={transaction.type === 'credit' ? 'add' : 'remove'}
                    size={20}
                    color={transaction.type === 'credit' ? '#059669' : '#dc2626'}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  {color: transaction.type === 'credit' ? '#059669' : '#dc2626'},
                ]}>
                  {transaction.amount}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.quickActions}>
          <View style={styles.actionCard}>
            <Icon name="account-balance-wallet" size={40} color={COLORS.primary} />
            <Text style={styles.actionTitle}>Account Balance</Text>
            <Text style={styles.actionSubtitle}>View your current balance</Text>
          </View>

          <View style={styles.actionCard}>
            <Icon name="send" size={40} color={COLORS.primary} />
            <Text style={styles.actionTitle}>Transfer Money</Text>
            <Text style={styles.actionSubtitle}>Send money securely</Text>
          </View>

          <View style={styles.actionCard}>
            <Icon name="receipt-long" size={40} color={COLORS.primary} />
            <Text style={styles.actionTitle}>Transaction History</Text>
            <Text style={styles.actionSubtitle}>View recent transactions</Text>
          </View>

          <View style={styles.actionCard}>
            <Icon name="settings" size={40} color={COLORS.primary} />
            <Text style={styles.actionTitle}>Settings</Text>
            <Text style={styles.actionSubtitle}>Manage your account</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.chatToggleButton}
        onPress={toggleChat}
        activeOpacity={0.8}
      >
        <Icon name="chat" size={24} color="white" />
      </TouchableOpacity>

      <ChatPopup
        visible={isChatVisible}
        onClose={() => setIsChatVisible(false)}
      />
    </View>
  );
};




export default DashboardScreen;
