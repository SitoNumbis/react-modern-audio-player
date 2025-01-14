import { audioPlayerStateContext } from "@/components/AudioPlayer/Context";
import { useNonNullableContext } from "@/hooks/useNonNullableContext";
import { HTMLAttributes, useCallback, useState, MouseEvent } from "react";

export const useBarProgress = (): HTMLAttributes<HTMLDivElement> => {
  const { elementRefs } = useNonNullableContext(audioPlayerStateContext);
  const [isTimeChangeActive, setTimeChangeActive] = useState(false);

  const onMoveAudioTime = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!elementRefs?.audioEl) return;
      const { clientX } = e;
      const { clientWidth } = e.currentTarget;
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const curPositionX = clientX - boundingRect.x;
      const curPositionPercent = curPositionX / clientWidth;
      const curPositionTime = curPositionPercent * elementRefs.audioEl.duration;
      elementRefs.audioEl.currentTime = curPositionTime;
    },
    [elementRefs?.audioEl]
  );
  return {
    onMouseDown: () => setTimeChangeActive(true),
    onMouseUp: () => setTimeChangeActive(false),
    onMouseLeave: () => setTimeChangeActive(false),
    onMouseMove: isTimeChangeActive ? onMoveAudioTime : undefined,
    onClick: onMoveAudioTime,
  };
};
