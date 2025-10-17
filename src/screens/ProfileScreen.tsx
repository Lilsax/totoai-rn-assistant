import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from '../components/ProfileHeader';
import ProfileCard from '../components/ProfileCard';
import ProfileMenuItem from '../components/ProfileMenuItem';
import {accountStats, bankingServices, personalInfo, quickActions, sampleUserProfile} from '../data/mockData';

const ProfileScreen: React.FC = () => {
  const [userProfile] = useState(sampleUserProfile);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleEditImage = () => {
    Alert.alert('Change Photo', 'Photo upload feature coming soon!');
  };

  const handleQuickAction = (action: string) => {
    const actionTitles: Record<string, string> = {
      'transactions': 'Transaction History',
      'change-pin': 'Change PIN',
      'security': 'Security Settings',
      'support': 'Customer Support',
      'statements': 'Download Statements',
      'address': 'Update Address',
    };

    Alert.alert(actionTitles[action] || 'Action', `${actionTitles[action]} feature coming soon!`);
  };

  const handlePersonalInfoEdit = (label: string) => {
    Alert.alert('Edit Information', `Edit ${label} feature coming soon!`);
  };

  const handleServiceToggle = (serviceId: string) => {
    Alert.alert('Toggle Service', 'Service toggle feature coming soon!');
  };

  const renderAccountStats = () => (
    <ProfileCard
      title="Account Overview"
      headerIcon={<Icon name="analytics" size={24} color="#1a472a" />}
    >
      <View style={styles.statsGrid}>
        {accountStats.map((stat, index) => (
          <View key={stat.id} style={styles.statCard}>
            <View style={[styles.statIconContainer, {backgroundColor: `${stat.color}15`}]}>
              <Icon name={stat.icon} size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            {stat.growth && (
              <Text style={[styles.statGrowth, {color: stat.growth.startsWith('+') ? '#059669' : '#dc2626'}]}>
                {stat.growth}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ProfileCard>
  );

  const renderPersonalInfo = () => (
    <ProfileCard
      title="Personal Information"
      headerIcon={<Icon name="person" size={24} color="#1a472a" />}
    >
      {personalInfo.map((info, index) => (
        <ProfileMenuItem
          key={index}
          icon={info.icon}
          title={info.label}
          value={info.value}
          onPress={() => info.editable ? handlePersonalInfoEdit(info.label) : null}
          showArrow={info.editable}
          isLast={index === personalInfo.length - 1}
        />
      ))}
    </ProfileCard>
  );

  const renderQuickActions = () => (
    <ProfileCard
      title="Quick Actions"
      headerIcon={<Icon name="flash-on" size={24} color="#1a472a" />}
    >
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <ProfileMenuItem
            key={action.id}
            icon={action.icon}
            title={action.title}
            subtitle={action.subtitle}
            onPress={() => handleQuickAction(action.action)}
            iconColor={action.color}
            isLast={index === quickActions.length - 1}
          />
        ))}
      </View>
    </ProfileCard>
  );

  const renderBankingServices = () => (
    <ProfileCard
      title="Banking Services"
      headerIcon={<Icon name="account-balance" size={24} color="#1a472a" />}
    >
      {bankingServices.map((service, index) => (
        <ProfileMenuItem
          key={service.id}
          icon={service.icon}
          title={service.title}
          subtitle={service.enabled ? 'Active' : 'Inactive'}
          onPress={() => handleServiceToggle(service.id)}
          iconColor={service.color}
          value={service.enabled ? 'ON' : 'OFF'}
          isLast={index === bankingServices.length - 1}
        />
      ))}
    </ProfileCard>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ProfileHeader
        userProfile={userProfile}
        onEditProfile={handleEditProfile}
        onEditImage={handleEditImage}
      />

      {renderAccountStats()}
      {renderPersonalInfo()}
      {renderQuickActions()}
      {renderBankingServices()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Saudi Banking Platform</Text>
        <Text style={styles.footerText}>Secure • Reliable • Innovative</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(26, 71, 42, 0.1)',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a472a',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  statGrowth: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionsGrid: {
    gap: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#1a472a',
    textAlign: 'center',
    marginBottom: 6,
    fontWeight: '500',
  },
});

export default ProfileScreen;
