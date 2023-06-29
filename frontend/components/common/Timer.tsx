import React, { useState, useEffect } from 'react';

const Timer = (props: {
  seconds: number;
  onTimeOut: () => void;
}): React.ReactElement => {
  const [timeLeft, setTimeLeft] = useState<number>(props.seconds);

  useEffect(() => {
    if (timeLeft >= 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else props.onTimeOut();
  }, [timeLeft]);

  return (
    <div>
      {timeLeft > 0 ? (
        <span>
          {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? '0' + (timeLeft % 60) : timeLeft % 60}
        </span>
      ) : null}
    </div>
  );
};

export default Timer;
