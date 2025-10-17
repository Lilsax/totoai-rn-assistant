import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {cardSkeletonStyles as styles} from '../styles/CardSkeleton.styles';

const CardSkeleton: React.FC = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const opacity = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.shimmer, {opacity}]}>
        <View style={styles.header} />
        <View style={styles.cardNumber} />
        <View style={styles.cardDetails}>
          <View style={styles.name} />
          <View style={styles.expiry} />
        </View>
        <View style={styles.balance} />
      </Animated.View>
    </View>
  );
};



export default CardSkeleton;
