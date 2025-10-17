import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {ProfileMenuItemProps} from '../types';
import {profileMenuItemStyles as styles} from '../styles/ProfileMenuItem.styles';
import {COLORS} from '../styles/theme';

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  iconColor = '#1a472a',
  value,
  isLast = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, !isLast && styles.borderBottom]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, {backgroundColor: `${iconColor}15`}]}>
          <Icon name={icon} size={24} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.rightSection}>
        {value && <Text style={styles.value}>{value}</Text>}
        {showArrow && (
          <Icon
            name="chevron-right"
            size={24}
            color={COLORS.secondary}
            style={styles.arrow}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};



export default ProfileMenuItem;
