import {StyleSheet} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS} from './theme';

export const creditCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    height: 200,
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.xxl,
    marginHorizontal: SPACING.sm,
    ...SHADOWS.creditCard,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 1,
  },
  chipAndWifi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  chip: {
    width: 32,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipInner: {
    width: 24,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 2,
  },
  wifiIcon: {
    opacity: 0.8,
  },
  cardNumberSection: {
    marginTop: SPACING.md,
  },
  cardNumber: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 2.5,
    fontFamily: 'monospace',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  cardholderSection: {
    flex: 1,
  },
  expirySection: {
    alignItems: 'flex-end',
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardholderName: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 1,
  },
  expiryDate: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
    letterSpacing: 1,
    fontFamily: 'monospace',
  },
  balanceSection: {
    marginTop: SPACING.sm,
    alignItems: 'flex-end',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  balance: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
