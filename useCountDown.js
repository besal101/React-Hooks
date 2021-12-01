// A PERFECT COUNTDOWN TIMER THAT YOU CAN IMPORT AS HOOKS OR USE AS COMPONENTS
//IMPORT AS COMPONENTS:
// <MyTimer expiryTimestamp={USETIMESTAMPHERE} />
//OR USE AS HOOKS :
// USETIMER(USETIMESTAMPHERE)
//THIS HOOKS USES DAYJS TO CONVERT TIMESTAMP TO TIME

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const defaultTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
};

const MyTimer = ({ expiryTimestamp }) => {
  const timer = useTimer(expiryTimestamp);
  return (
    <div>
      {
        <>
          <span>
            {timer.days} days, {timer.hours}: {timer.minutes}: {timer.seconds}{' '}
          </span>
        </>
      }
    </div>
  );
};

export const useTimer = (countdownTimestamps) => {
  const [remainingTime, setRemainingTime] = useState(defaultTime);

  useEffect(() => {
    const IntervalId = setInterval(() => {
      updateRemainingTime(countdownTimestamps);
    }, 1000);
    return () => clearInterval(IntervalId);
  }, [countdownTimestamps]);

  const updateRemainingTime = (countdown) => {
    setRemainingTime(TimerUtils(countdown));
  };

  function TimerUtils(countdown) {
    const timeStampsDayJS = dayjs(countdown);
    const nowDayjs = dayjs();
    if (timeStampsDayJS.isBefore(nowDayjs)) {
      return {
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00',
      };
    }
    return {
      seconds: getRemainingSeconds(nowDayjs, timeStampsDayJS),
      minutes: getRemainingMinutes(nowDayjs, timeStampsDayJS),
      hours: getRemainingHours(nowDayjs, timeStampsDayJS),
      days: getRemainingDays(nowDayjs, timeStampsDayJS),
    };
  }

  function getRemainingSeconds(nowDayjs, timeStampsDayJS) {
    const seconds = timeStampsDayJS.diff(nowDayjs, 'seconds') % 60;
    return padwithZeros(seconds, 2);
  }

  function getRemainingMinutes(nowDayjs, timeStampsDayJS) {
    const minutes = timeStampsDayJS.diff(nowDayjs, 'minutes') % 60;
    return padwithZeros(minutes, 2);
  }

  function getRemainingHours(nowDayjs, timeStampsDayJS) {
    const hours = timeStampsDayJS.diff(nowDayjs, 'hours') % 24;
    return padwithZeros(hours, 2);
  }

  function getRemainingDays(nowDayjs, timeStampsDayJS) {
    const days = timeStampsDayJS.diff(nowDayjs, 'days');
    return days.toString();
  }

  function padwithZeros(number, minLength) {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return '0'.repeat(minLength - numberString.length) + numberString;
  }
  return remainingTime;
};

export default MyTimer;
