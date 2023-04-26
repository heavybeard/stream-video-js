import React, { useEffect } from 'react';
import {
  ActiveCall,
  useActiveCall,
  useIncomingCalls,
  useRingCall,
  theme,
} from '@stream-io/video-react-native-sdk';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { RingingStackParamList } from '../../../types';
import { callkeepCallId$ } from '../../hooks/useCallkeepEffect';
import {
  startForegroundService,
  stopForegroundService,
} from '../../modules/push/android';

type Props = NativeStackScreenProps<RingingStackParamList, 'CallScreen'>;

export const CallScreen = ({ navigation }: Props) => {
  const activeCall = useActiveCall();
  const [incomingCall] = useIncomingCalls();
  const { answerCall } = useRingCall();

  useEffect(() => {
    // effect to answer call when incoming call is received from callkeep
    if (!incomingCall) {
      return;
    }
    const subscription = callkeepCallId$.subscribe((callkeepCallId) => {
      if (callkeepCallId) {
        // TODO: check if callId is the same call as incoming call
        answerCall();
        callkeepCallId$.next(undefined); // remove the current call id to avoid rejoining when coming back to this screen
      }
    });
    return () => subscription.unsubscribe();
  }, [answerCall, incomingCall]);

  useEffect(() => {
    if (!activeCall) {
      return;
    }
    startForegroundService();
    return () => {
      stopForegroundService();
    };
  }, [activeCall]);

  const onOpenCallParticipantsInfoViewHandler = () => {
    navigation.navigate('CallParticipantsInfoScreen');
  };

  if (!activeCall) {
    return <ActivityIndicator size={'large'} style={StyleSheet.absoluteFill} />;
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <ActiveCall
        onOpenCallParticipantsInfoView={onOpenCallParticipantsInfoViewHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.light.static_grey,
  },
});
