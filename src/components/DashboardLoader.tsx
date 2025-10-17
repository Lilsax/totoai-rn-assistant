import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DashboardLoaderProps} from 'src/types';

const {width} = Dimensions.get('window');

const DashboardLoader: React.FC<DashboardLoaderProps> = ({
  message = 'Loading your dashboard',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    const fadeAnimation = Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });

    fadeAnimation.start();
    spinAnimation.start();
    pulseAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, {opacity: fadeValue}]}>
      <View style={styles.loaderContent}>
        <View style={styles.backgroundElements}>
          <Animated.View
            style={[
              styles.backgroundCircle,
              styles.circle1,
              {transform: [{scale: pulseValue}]},
            ]}
          />
          <Animated.View
            style={[
              styles.backgroundCircle,
              styles.circle2,
              {transform: [{scale: pulseValue}]},
            ]}
          />
          <Animated.View
            style={[
              styles.backgroundCircle,
              styles.circle3,
              {transform: [{scale: pulseValue}]},
            ]}
          />
        </View>
        <Animated.View
          style={[
            styles.iconContainer,
            {transform: [{rotate: spin}]},
          ]}
        >
          <Icon name="account-balance" size={60} color="#1a472a" />
        </Animated.View>
        <Text style={styles.loadingText}>{message}</Text>
        <View style={styles.dotsContainer}>
          <LoadingDot delay={0} />
          <LoadingDot delay={200} />
          <LoadingDot delay={400} />
        </View>
        <View style={styles.featuresContainer}>
          <Animated.View style={[styles.featureIcon, {transform: [{scale: pulseValue}]}]}>
            <Icon name="credit-card" size={24} color="#b45309" />
          </Animated.View>
          <Animated.View style={[styles.featureIcon, {transform: [{scale: pulseValue}]}]}>
            <Icon name="trending-up" size={24} color="#059669" />
          </Animated.View>
          <Animated.View style={[styles.featureIcon, {transform: [{scale: pulseValue}]}]}>
            <Icon name="security" size={24} color="#7c3aed" />
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

const LoadingDot: React.FC<{ delay: number }> = ({delay}) => {
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {transform: [{scale: scaleValue}]},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loaderContent: {
    alignItems: 'center',
    position: 'relative',
  },
  backgroundElements: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    borderColor: '#1a472a',
  },
  circle2: {
    width: 150,
    height: 150,
    borderColor: '#b45309',
  },
  circle3: {
    width: 100,
    height: 100,
    borderColor: '#059669',
  },
  iconContainer: {
    backgroundColor: 'rgba(26, 71, 42, 0.1)',
    padding: 30,
    borderRadius: 50,
    marginBottom: 30,
    shadowColor: '#1a472a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a472a',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#b45309',
    marginHorizontal: 4,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  featureIcon: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default DashboardLoader;
