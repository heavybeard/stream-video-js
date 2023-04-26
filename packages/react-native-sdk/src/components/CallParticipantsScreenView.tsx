import { SfuModels } from '@stream-io/video-client';
import { useParticipants } from '@stream-io/video-react-bindings';
import { StyleSheet, View } from 'react-native';
import { ParticipantView } from './ParticipantView';
import { theme } from '../theme';
import { useDebouncedValue } from '../utils/useDebouncedValue';
import { CallParticipantsList } from './CallParticipantsList';
import { useMemo } from 'react';

export const CallParticipantsScreenView = () => {
  const _allParticipants = useParticipants();
  const allParticipants = useDebouncedValue(_allParticipants, 300); // we debounce the participants to avoid unnecessary rerenders that happen when participant tracks are all subscribed simultaneously
  const firstScreenSharingParticipant = useMemo(
    () =>
      allParticipants.find((p) =>
        p.publishedTracks.includes(SfuModels.TrackType.SCREEN_SHARE),
      ),
    [allParticipants],
  );

  return (
    <View style={styles.container}>
      {firstScreenSharingParticipant && (
        <View style={styles.screenShareContainer}>
          <ParticipantView
            participant={firstScreenSharingParticipant}
            containerStyle={{ flex: 1 }}
            kind="screen"
          />
        </View>
      )}
      <View style={styles.participantVideoContainer}>
        <CallParticipantsList participants={allParticipants} horizontal />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenShareContainer: {
    flex: 1,
    paddingTop: theme.padding.md,
    paddingHorizontal: theme.padding.md,
  },
  participantVideoContainer: {
    paddingVertical: theme.padding.sm,
  },
});
