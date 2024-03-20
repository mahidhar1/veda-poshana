"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./audio-player.module.scss";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = ({
  timeJump,
  audioSrc,
}: {
  timeJump: any;
  audioSrc?: string;
}) => {
  const searchParams = useSearchParams();
  const timeQueryParam = searchParams.get("t");
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const chapters = [
    {
      start: 20,
      end: 33,
      text: "ग॒णानां᳚ त्वा ग॒णप॑तिगं हवामहे क॒विं क॑वी॒नामु॑पमश्र॑वस्तमम् ।",
    },
    {
      start: 64,
      end: 78,
      text: "ज्ये॒ष्ठ॒राजं॒ ब्रह्म॑णां ब्रह्मणस्पत॒ आ नः॑ शृ॒णवन्नू॒तिभि॑स्सीद॒ साद॑नम् ॥",
    },
    {
      start: 111,
      end: 149,
      text: "प्र णो॑ दे॒वी सर॑स्वती वाजे॑भिर्वाजिनी॑वती । ",
    },
    {
      start: 143,
      end: 149,
      text: "धीनाम॑वित्र्य॑वतु ॥",
    },
    {
      start: 159,
      end: 162,
      text: "ग॒णे॒शाय॑ नमः । ",
    },
    {
      start: 172,
      end: 176,
      text: "स॒र॒स्व॒त्यै न॑मः ।",
    },
    {
      start: 184,
      end: 188,
      text: "श्री॒गु॒रु॒भ्यो॒ न॒मः॒ ।",
    },
    {
      start: 198,
      end: 204,
      text: "हरिः॑ ॐ ॥ ",
    },
  ];

  //reference
  const audioPlayer = useRef<any>(); //reference our audio component
  const progressBar = useRef<any>(); //reference to progress bar
  const animationRef = useRef<any>(); //reference to animation

  useEffect(() => {
    if (timeJump) {
      timeTravel(timeJump);
      setIsPlaying(true);
      play();
    } else {
      progressBar.current.value = 0;
      setIsPlaying(false);
    }
  }, [timeJump]);

  useEffect(() => {
    console.log(audioPlayer.current);
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  useEffect(() => {
    if (currentTime == Math.floor(duration)) {
      togglePlayPause();
      timeTravel(0);
    }
  }, [currentTime]);

  const calculateTime = (secs: any) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const play = () => {
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer?.current?.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current?.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`,
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    timeTravel(Number(progressBar.current.value) - 30);
  };

  const forwardThirty = () => {
    timeTravel(Number(progressBar.current.value) + 30);
  };

  const timeTravel = (newTime: any) => {
    progressBar.current.value = newTime;
    changeRange();
  };

  return (
    <>
      <div className={styles.audioPlayer}>
        <audio ref={audioPlayer} src={audioSrc} preload="meta"></audio>
        <button className={styles.forwardBackward} onClick={backThirty}>
          <BsArrowLeftShort /> 30
        </button>
        <button className={styles.playPause} onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>
        <button className={styles.forwardBackward} onClick={forwardThirty}>
          30 <BsArrowRightShort />
        </button>

        {/* current time*/}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        {/* Progress bar */}
        <div className={styles.progressBarWrapper}>
          <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          ></input>
          {chapters.map((chapter, i) => {
            const leftStyle = (chapter.start / duration) * 100;
            const widthStyle = ((chapter.end - chapter.start) / duration) * 100;
            return (
              <div
                key={i}
                className={`${styles.chapter} ${
                  chapter.start == 0 && styles.start
                } ${chapter.end == Math.floor(duration) && styles.end}`}
                style={{
                  "--left": `${leftStyle}%`,
                  "--width": `${widthStyle}%`,
                }}
              ></div>
            );
          })}
        </div>

        {/* duration */}
        <div className={styles.duration}>
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {chapters.map((chapter, i) => (
          <div
            key={i}
            className={styles.timelineText}
            onClick={() => timeTravel(Number(chapter.start))}
          >
            {chapter.text}
            {/* <Link key={i} href={{ query: { t: `${chapter.start}` } }}>
              {chapter.text}
            </Link> */}
          </div>
        ))}
      </div>
    </>
  );
};

export { AudioPlayer };
