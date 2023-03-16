import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import InCallManager from 'react-native-incall-manager';
import { Mic, MicOff, Video, VideoSlash } from '../icons';
import {
  useConnectedUser,
  useStreamVideoClient,
} from '@stream-io/video-react-bindings';
import { useStreamVideoStoreValue } from '../contexts/StreamVideoContext';
import { CallControlsButton } from './CallControlsButton';
import { useCallCycleContext } from '../contexts';
import { useMutingState } from '../hooks/useMutingState';
import { useLocalVideoStream } from '../hooks';
import { VideoRenderer } from './VideoRenderer';
import { Avatar } from './Avatar';
import { StreamVideoParticipant } from '@stream-io/video-client';

/**
 * Props to be passed for the ActiveCall component.
 */
export interface LobbyViewProps {
  /**
   * Call ID of the call that is to be joined.
   */
  callID: string;
}

const ParticipantStatus = () => {
  const connectedUser = useConnectedUser();
  const isAudioMuted = useStreamVideoStoreValue((store) => store.isAudioMuted);
  const isVideoMuted = useStreamVideoStoreValue((store) => store.isVideoMuted);
  return (
    <View style={styles.status}>
      <Text style={styles.userNameLabel}>{connectedUser?.id}</Text>
      {isAudioMuted && (
        <View style={styles.svgWrapper}>
          <MicOff color="red" />
        </View>
      )}
      {isVideoMuted && (
        <View style={styles.svgWrapper}>
          {isVideoMuted && <VideoSlash color="red" />}
        </View>
      )}
    </View>
  );
};

export const LobbyView = (props: LobbyViewProps) => {
  const connectedUser = useConnectedUser();
  const localVideoStream = useLocalVideoStream();
  const videoClient = useStreamVideoClient();
  const { callCycleHandlers } = useCallCycleContext();
  const { isAudioMuted, isVideoMuted, toggleAudioState, toggleVideoState } =
    useMutingState();
  const isCameraOnFrontFacingMode = useStreamVideoStoreValue(
    (store) => store.isCameraOnFrontFacingMode,
  );
  const isVideoAvailable = !!localVideoStream && !isVideoMuted;
  const { onActiveCall } = callCycleHandlers;
  const { callID } = props;

  const MicIcon = isAudioMuted ? (
    <MicOff color="white" />
  ) : (
    <Mic color="black" />
  );
  const VideoIcon = isVideoMuted ? (
    <VideoSlash color="white" />
  ) : (
    <Video color="black" />
  );

  const joinCallHandler = () => {
    videoClient
      ?.joinCall(callID, 'default')
      .then(() => {
        if (onActiveCall) {
          onActiveCall();
          InCallManager.start({ media: 'video' });
          InCallManager.setForceSpeakerphoneOn(true);
        }
      })
      .catch((err) => {
        console.log('Error joining call', err);
      });
  };
  const connectedUserAsParticipant = {
    userId: connectedUser?.id,
    // @ts-ignore
    image: connectedUser?.imageUrl,
    name: connectedUser?.name,
  } as StreamVideoParticipant;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Before Joining</Text>
      <Text style={styles.subHeading}>Setup your audio and video</Text>
      <View style={styles.videoView}>
        {isVideoAvailable ? (
          <VideoRenderer
            mirror={isCameraOnFrontFacingMode}
            mediaStream={localVideoStream}
            objectFit="cover"
            style={styles.stream}
          />
        ) : (
          <Avatar participant={connectedUserAsParticipant} />
        )}
        <ParticipantStatus />
      </View>

      <View style={styles.buttons}>
        <CallControlsButton
          onPress={toggleAudioState}
          colorKey={!isAudioMuted ? 'activated' : 'deactivated'}
          style={styles.button}
        >
          {MicIcon}
        </CallControlsButton>
        <CallControlsButton
          onPress={toggleVideoState}
          colorKey={!isVideoMuted ? 'activated' : 'deactivated'}
          style={styles.button}
        >
          {VideoIcon}
        </CallControlsButton>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          You are about to join a test call at Stream. 3 more people are in the
          call now.
        </Text>
        <Pressable style={styles.joinButton} onPress={joinCallHandler}>
          <Text style={styles.joinButtonText}>Join</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    flex: 1,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  stream: {
    height: '100%',
    width: '100%',
  },
  subHeading: {
    color: '#979797',
    fontSize: 20,
    textAlign: 'center',
  },
  videoView: {
    backgroundColor: '#474D56',
    height: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 30,
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '90%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 70,
    width: 70,
    borderRadius: 70,
    marginHorizontal: 10,
  },
  mutedColor: { backgroundColor: '#00000066' },
  info: {
    backgroundColor: '#1C1C1EE5',
    padding: 15,
    marginHorizontal: '5%',
    borderRadius: 10,
    marginVertical: 30,
  },
  infoText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  joinButton: {
    width: '100%',
    backgroundColor: '#005FFF',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 6,
    bottom: 6,
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#1C1E22',
    zIndex: 10,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
    alignSelf: 'center',
  },
  userNameLabel: {
    color: '#fff',
    fontSize: 12,
  },
  svgWrapper: {
    height: 12,
    width: 12,
    marginLeft: 6,
  },
});
