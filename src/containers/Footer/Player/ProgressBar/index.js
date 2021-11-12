import React, { useRef, useEffect } from "react";
import { calculateProgressPercent, getElementWidthOnWindow, percentToSecond } from "../../../../helpers";
import { setProgressPercent } from "./helper";
import * as Styled from "./styled";

export const ProgressBar = (props) => {
  const { audio, progressPercent } = props;
  const progress = useRef(null);
  const progressBar = useRef(null);

  const calculateProgress = (event) => {
    const clickedProgressCoordinate = event.clientX;
    const { elementStart, elementWidth } = getElementWidthOnWindow(
      progressBar.current,
      clickedProgressCoordinate
    );
    const progressPercent = calculateProgressPercent(
      elementStart,
      elementWidth
    );
    setProgressBarPercent(progressPercent);

  };

  const setProgressBarPercent = (percent) => {
    setProgressPercent(progress, percent);
    setAudioCurrentTime(percent);
  };

  const setAudioCurrentTime = (percent) => {
    audio.currentTime = percentToSecond(audio.duration, percent);
  };

  useEffect(() => {
    setProgressPercent(progress, progressPercent);
  }, [progress, progressPercent]);

  return (
    <Styled.ProgressBar
      ref={progressBar}
      onMouseDown={calculateProgress}
    >
      <Styled.ProgressPercent ref={progress} />
    </Styled.ProgressBar>
  );
};
