import {StyleSheet} from 'react-native';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS} from './theme';

export const profileCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    marginTop: SPACING.lg,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.xxl,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  header: {
    backgroundColor: COLORS.background.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primary,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    marginRight: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
    letterSpacing: 0.3,
  },
  decorativeLine: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  content: {
    padding: SPACING.xl,
  },
});
