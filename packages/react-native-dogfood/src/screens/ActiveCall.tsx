import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CallControls from '../components/CallControls';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoRenderer from '../containers/VideoRenderer';
import { RootStackParamList } from '../../types';
import { Stats } from '../components/Stats';
import {
  useAppGlobalStoreSetState,
  useAppGlobalStoreValue,
} from '../contexts/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ActiveCall'>;

export default (_props: Props) => {
  const call = useAppGlobalStoreValue((store) => store.call);
  const callState = useAppGlobalStoreValue((store) => store.callState);
  const setState = useAppGlobalStoreSetState();

  useEffect(() => {
    return () => {
      setState((prevState) => {
        prevState.call?.leave();
        return {
          call: undefined,
        };
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({ participants: callState?.participants ?? [] });
  }, [callState?.participants, setState]);

  useEffect(() => {
    if (!call) {
      return;
    }
    const unsubscribeParticipantJoined = call.on(
      'participantJoined',
      async (e) => {
        if (e.eventPayload.oneofKind !== 'participantJoined') {
          return;
        }
        const { participant } = e.eventPayload.participantJoined;
        if (participant) {
          call.participantMapping[participant.trackLookupPrefix] =
            participant.user!.id;
          setState((prev) => ({
            participants: [...prev.participants, participant],
          }));
        }
      },
    );
    const unsubscribeParticipantLeft = call.on('participantLeft', (e) => {
      if (e.eventPayload.oneofKind !== 'participantLeft') {
        return;
      }

      const { participant } = e.eventPayload.participantLeft;
      if (participant) {
        delete call.participantMapping[participant.trackLookupPrefix];
        setState((prev) => ({
          participants: prev.participants.filter(
            (p) => p.user!.id !== participant.user!.id,
          ),
        }));
      }
    });

    return () => {
      unsubscribeParticipantJoined();
      unsubscribeParticipantLeft();
    };
  }, [call, setState]);

  return (
    <SafeAreaView style={styles.body} edges={['right', 'left']}>
      <VideoRenderer />
      <CallControls />
      <Stats />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  stream: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  header: {
    backgroundColor: '#1486b5',
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    top: 50,
    zIndex: 1,
  },
});
