import React from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type {CreditCardProps} from '../types';
import {creditCardStyles as styles} from '../styles/CreditCard.styles';

const CreditCard: React.FC<CreditCardProps> = ({card, style}) => {
  const formatCardNumber = (number: string) => {
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  const getCardIcon = () => {
    switch (card.cardType) {
      case 'visa':
        return 'credit-card';
      case 'mastercard':
        return 'credit-card';
      case 'amex':
        return 'credit-card';
      default:
        return 'credit-card';
    }
  };

  const getCardTypeText = () => {
    switch (card.cardType) {
      case 'visa':
        return 'VISA';
      case 'mastercard':
        return 'MASTERCARD';
      case 'amex':
        return 'AMERICAN EXPRESS';
      default:
        return 'CARD';
    }
  };

  return (
    <Pressable onPress={() => Alert.alert('card pressed')}>
    <View
      style={[styles.card, {backgroundColor: card.backgroundColor}, style]}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardType}>{getCardTypeText()}</Text>
          <Icon name={getCardIcon()} size={32} color="white" />
        </View>

        <View style={styles.chipAndWifi}>
          <View style={styles.chip}>
            <View style={styles.chipInner} />
          </View>
          <Icon name="wifi" size={20} color="white" style={styles.wifiIcon} />
        </View>

        <View style={styles.cardNumberSection}>
          <Text style={styles.cardNumber}>
            {formatCardNumber(card.cardNumber)}
          </Text>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.cardholderSection}>
            <Text style={styles.label}>CARD HOLDER</Text>
            <Text style={styles.cardholderName}>
              {card.cardholderName.toUpperCase()}
            </Text>
          </View>

          <View style={styles.expirySection}>
            <Text style={styles.label}>EXPIRES</Text>
            <Text style={styles.expiryDate}>{card.expiryDate}</Text>
          </View>
        </View>
  
      </View>
    </View>
    </Pressable>
  );
};



export default CreditCard;
