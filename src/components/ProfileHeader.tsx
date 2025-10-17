import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {ProfileHeaderProps} from '../types';
import {profileHeaderStyles as styles} from '../styles/ProfileHeader.styles';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  onEditProfile,
  onEditImage,
}) => {

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern} />

      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          {userProfile.profileImage ? (
            <Image source={{uri: userProfile.profileImage}} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>
                {getInitials(userProfile.name)}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.editImageButton} onPress={onEditImage}>
            <Icon name="camera-alt" size={16} color="#1a472a" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userEmail}>{userProfile.email}</Text>
        <Text style={styles.accountType}>{userProfile.accountType}</Text>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{userProfile.totalBalance}</Text>
        </View>

        <TouchableOpacity style={styles.editProfileButton} onPress={onEditProfile}>
          <Icon name="edit" size={16} color="white" style={styles.editProfileIcon} />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
