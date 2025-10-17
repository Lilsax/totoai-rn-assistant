import React from 'react';
import {View, Text} from 'react-native';
import type {ProfileCardProps} from '../types';
import {profileCardStyles as styles} from '../styles/ProfileCard.styles';

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  children,
  style,
  headerIcon,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {headerIcon && <View style={styles.iconContainer}>{headerIcon}</View>}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.decorativeLine} />
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};


export default ProfileCard;
