import React from 'react';
import ButtonContainer from './ButtonContainer';
import VideoSlash from '../../icons/VideoSlash';
import Video from '../../icons/Video';
import { useAppGlobalStoreValue } from '../../contexts/AppContext';

const VideoButton = () => {
  const isVideoMuted = useAppGlobalStoreValue((store) => store.isVideoMuted);
  const call = useAppGlobalStoreValue((store) => store.call);
  const toggleVideoState = async () => {
    call?.updateMuteState('video', !isVideoMuted);
  };
  return (
    <ButtonContainer
      onPress={toggleVideoState}
      colorKey={isVideoMuted ? 'deactivated' : 'activated'}
    >
      {isVideoMuted ? <VideoSlash color="#fff" /> : <Video color="#121416" />}
    </ButtonContainer>
  );
};

export default VideoButton;
