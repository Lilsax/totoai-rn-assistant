import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {appInfo} from '../data/mockData';

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(true);
  const [biometricEnabled, setBiometricEnabled] = useState<boolean>(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', style: 'destructive', onPress: () => console.log('Logout pressed')},
      ],
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear Data',
      'This will clear all chat history and settings. This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Clear', style: 'destructive', onPress: () => console.log('Clear data pressed')},
      ],
    );
  };

  const renderSettingItem = (title: string, value?: string, onPress?: () => void, isSwitch?: boolean, switchValue?: boolean, onSwitchChange?: (value: boolean) => void) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {isSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{false: '#E5E5EA', true: '#007AFF'}}
          thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
        />
      )}
      {!isSwitch && onPress && (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="info" size={20} color="#007AFF" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>App Information</Text>
        </View>
        {renderSettingItem('App Name', appInfo.name)}
        {renderSettingItem('Version', appInfo.version)}
        {renderSettingItem('Build Number', appInfo.buildNumber)}
        {renderSettingItem('Developer', appInfo.developer)}
        {renderSettingItem('Support Email', appInfo.supportEmail)}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="settings" size={20} color="#007AFF" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Preferences</Text>
        </View>
        {renderSettingItem('Push Notifications', undefined, undefined, true, notificationsEnabled, setNotificationsEnabled)}
        {renderSettingItem('Dark Mode', undefined, undefined, true, darkModeEnabled, setDarkModeEnabled)}
        {renderSettingItem('Auto Save Chats', undefined, undefined, true, autoSaveEnabled, setAutoSaveEnabled)}
        {renderSettingItem('Biometric Login', undefined, undefined, true, biometricEnabled, setBiometricEnabled)}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="security" size={20} color="#007AFF" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
        </View>
        {renderSettingItem('Privacy Policy', undefined, () => console.log('Privacy Policy pressed'))}
        {renderSettingItem('Terms of Service', undefined, () => console.log('Terms of Service pressed'))}
        {renderSettingItem('Data Usage', undefined, () => console.log('Data Usage pressed'))}
        {renderSettingItem('Clear Chat History', undefined, handleClearData)}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="help" size={20} color="#007AFF" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Support</Text>
        </View>
        {renderSettingItem('Help Center', undefined, () => console.log('Help Center pressed'))}
        {renderSettingItem('Contact Support', undefined, () => console.log('Contact Support pressed'))}
        {renderSettingItem('Report a Bug', undefined, () => console.log('Report a Bug pressed'))}
        {renderSettingItem('Rate App', undefined, () => console.log('Rate App pressed'))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="account-circle" size={20} color="#007AFF" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Account</Text>
        </View>
        {renderSettingItem('Profile Settings', undefined, () => console.log('Profile Settings pressed'))}
        {renderSettingItem('Security Settings', undefined, () => console.log('Security Settings pressed'))}
        {renderSettingItem('Connected Devices', undefined, () => console.log('Connected Devices pressed'))}
        <TouchableOpacity style={[styles.settingItem, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ by TotoAI Team</Text>
        <Text style={styles.footerText}>© 2024 TotoAI. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: '#999',
    fontWeight: '300',
  },
  logoutButton: {
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default SettingsScreen;
