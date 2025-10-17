import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from './theme';

export const chatPopupStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#17171C',
    overflow: 'hidden',
    borderRadius: BORDER_RADIUS.xxl,
  },
  minimizedContainer: {
    height: 60,
  },
  header: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    marginRight: SPACING.sm,
  },
  headerText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  chatArea: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingBottom: 12,
  },
  chatContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  },
  welcomeText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  messageContainer: {
    marginBottom: SPACING.md,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  userBubble: {
    backgroundColor: "#212129",
    borderBottomRightRadius: SPACING.xs,
  },
  assistantBubble: {
    flex: 1,
    backgroundColor: '#333338',
    borderBottomLeftRadius: SPACING.xs,
  },
  messageText: {
    fontSize: FONT_SIZE.md,
    color: 'white'
  },
  userText: {
    color: COLORS.white,
  },
  assistantText: {
    color: 'white',
  },
  navigationText: {
    color: "white",
    textDecorationLine: 'underline',
    fontWeight: FONT_WEIGHT.semibold,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: '#333338',
    gap: 4,
    maxWidth: '100%',
    justifyContent: 'space-between'
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    width: '60%',
    fontSize: FONT_SIZE.md,
    color: '#ABABB0',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.gray[200],
  },
  messageComponentContainer: {
    flex: 1,
    marginBottom: SPACING.md
  },
  bubbleMessaheText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
  }
});

export const markdownStyles = StyleSheet.create({
  body: {
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2a2a2f',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  imagePreviewText: {
    color: COLORS.text.white,
    fontSize: FONT_SIZE.sm,
  },
  imageRemoveBtn: {
    padding: 2,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
  },
  strong: {
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
  },
  em: {
    fontStyle: 'italic',
    color: COLORS.text.primary,
  },
  code_block: {
    backgroundColor: COLORS.background.primary,
    padding: SPACING.sm,
    borderRadius: SPACING.xs,
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.sm,
  },
  code_inline: {
    backgroundColor: COLORS.background.primary,
    padding: 2,
    borderRadius: 3,
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.sm,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    paddingLeft: SPACING.sm,
    marginVertical: SPACING.sm,
    fontStyle: 'italic',
  },
  list_item: {
    marginVertical: 1,
  },
  bullet_list: {
    marginVertical: 3,
  },
  ordered_list: {
    marginVertical: 3,
  },
});
