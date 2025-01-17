import {
  defaultReactions,
  useCall,
  useMediaDevices,
  useToggleAudioMuteState,
  useToggleVideoMuteState,
} from '@stream-io/video-react-sdk';
import { useEffect, useRef, useState } from 'react';

import hotkeys from 'hotkeys-js';

enum KeyboardShortcut {
  PUSH_TO_TALK = 'space',
  TOGGLE_AUDIO_MAC = 'cmd+d,cmd+shift+space',
  TOGGLE_AUDIO_OTHER = 'ctrl+d,ctrl+shift+space',
  TOGGLE_VIDEO_MAC = 'cmd+e',
  TOGGLE_VIDEO_OTHER = 'ctrl+e',
  RAISE_HAND_MAC = 'ctrl+cmd+h',
  RAISE_HAND_OTHER = 'ctrl+alt+h',
}

const isMacOS = () => {
  return !!navigator.userAgent.match(/(Mac\s?OS)/g)?.length;
};

const [, raiseHandReaction] = defaultReactions;

export const usePushToTalk = (key: string) => {
  const { publishAudioStream, stopPublishingAudio } = useMediaDevices();

  const [isTalking, setIsTalking] = useState(false);
  const interactedRef = useRef(false);

  useEffect(() => {
    hotkeys(key, { keyup: true }, (e) => {
      if (e.metaKey || e.ctrlKey) return;

      if (e.type === 'keydown') {
        interactedRef.current = true;
        setIsTalking(true);
      }

      if (e.type === 'keyup') setIsTalking(false);
    });

    return () => {
      hotkeys.unbind(key);
    };
  }, [key]);

  useEffect(() => {
    if (isTalking) publishAudioStream().catch(console.error);

    return () => {
      if (interactedRef.current) stopPublishingAudio();
    };
  }, [isTalking, publishAudioStream, stopPublishingAudio]);
};

export const useKeyboardShortcuts = () => {
  const { toggleAudioMuteState } = useToggleAudioMuteState();
  const { toggleVideoMuteState } = useToggleVideoMuteState();
  const call = useCall();
  usePushToTalk(KeyboardShortcut.PUSH_TO_TALK);

  useEffect(() => {
    const key = `${KeyboardShortcut.TOGGLE_AUDIO_MAC},${KeyboardShortcut.TOGGLE_AUDIO_OTHER}`;
    const isMac = isMacOS();

    hotkeys(key, (e, ke) => {
      e.preventDefault();

      if (isMac && !KeyboardShortcut.TOGGLE_AUDIO_MAC.includes(ke.shortcut))
        return;

      toggleAudioMuteState().catch(console.error);
    });

    return () => {
      hotkeys.unbind(key);
    };
  }, [toggleAudioMuteState]);

  useEffect(() => {
    const key = `${KeyboardShortcut.TOGGLE_VIDEO_MAC},${KeyboardShortcut.TOGGLE_VIDEO_OTHER}`;
    const isMac = isMacOS();

    hotkeys(key, (e, ke) => {
      e.preventDefault();

      if (isMac && !KeyboardShortcut.TOGGLE_VIDEO_MAC.includes(ke.shortcut))
        return;

      toggleVideoMuteState().catch(console.error);
    });

    return () => {
      hotkeys.unbind(key);
    };
  }, [toggleVideoMuteState]);

  useEffect(() => {
    const key = `${KeyboardShortcut.RAISE_HAND_MAC},${KeyboardShortcut.RAISE_HAND_OTHER}`;
    const isMac = isMacOS();

    if (!call) return;

    hotkeys(key, (e, ke) => {
      e.preventDefault();

      if (isMac && !KeyboardShortcut.RAISE_HAND_MAC.includes(ke.shortcut))
        return;

      call.sendReaction(raiseHandReaction).catch(console.error);
    });

    return () => {
      hotkeys.unbind(key);
    };
  }, [call]);
};
