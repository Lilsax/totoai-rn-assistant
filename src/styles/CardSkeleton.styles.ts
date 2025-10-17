import {StyleSheet} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS} from './theme';

export const cardSkeletonStyles = StyleSheet.create({
  container: {
    width: 320,
    height: 200,
    borderRadius: BORDER_RADIUS.xxl,
    backgroundColor: COLORS.background.skeleton,
    marginHorizontal: SPACING.sm,
    overflow: 'hidden',
  },
  shimmer: {
    flex: 1,
    padding: SPACING.xxl,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    width: '80%',
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SPACING.xs,
    marginTop: SPACING.xl,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.xl,
  },
  name: {
    width: '60%',
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SPACING.xs,
  },
  expiry: {
    width: '25%',
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SPACING.xs,
  },
  balance: {
    width: '50%',
    height: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: SPACING.xs,
    alignSelf: 'flex-end',
  },
});
