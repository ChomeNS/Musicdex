import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  useBreakpoint,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { formatSeconds } from "../../utils/SongHelper";
import { SongInfo } from "./controls/PlayerSongInfo";
import { PlaybackControl } from "./controls/PlaybackControl";
import { PlayerOption } from "./controls/PlayerOption";
import { VolumeSlider } from "./controls/VolumeSlider";
import { TimeSlider } from "./controls/TimeSlider";
import { useEffect, useState } from "react";
import { MotionBox } from "../common/MotionBox";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useStoreActions, useStoreState } from "../../store";
import { PlayerPosition } from "../../store/player";
import { FaChevronDown } from "react-icons/fa";
import { resizeArtwork } from "../../modules/songs/utils";
import React from "react";
import { useLocation } from "react-router-dom";
interface PlayerBarProps {
  progress: number;
  onProgressChange: (e: number) => void;
  currentSong: Song | undefined;
  isPlaying: boolean;
  togglePlay: () => void;
  seconds: string;
  volume: number;
  onVolumeChange: (e: number) => void;
  totalDuration: number;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const springTransition = { type: "spring", stiffness: 350, damping: 23 };

export const PlayerBar = React.memo(
  ({
    progress,
    onProgressChange,
    currentSong,
    isPlaying,
    togglePlay,
    seconds,
    volume,
    onVolumeChange,
    totalDuration,
    isExpanded,
    toggleExpanded,
  }: PlayerBarProps) => {
    const [fullPlayer, setFullPlayer] = useState(false);
    const pos = useStoreState((store) => store.player.position);
    const setPos = useStoreActions((store) => store.player.setPosition);
    const [lastPos, setLastPos] = useState<PlayerPosition>("sidebar");
    const location = useLocation();
    const breakpoint = useBreakpoint();

    useEffect(() => {
      if (!fullPlayer && pos === "full-player") setPos("sidebar");
      return () => {
        if (fullPlayer && lastPos) setPos(lastPos);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (fullPlayer) {
        toggleFullPlayer();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    function toggleFullPlayer() {
      setFullPlayer((prev) => !prev);
      if (fullPlayer) {
        setPos(lastPos);
      } else {
        setLastPos(pos);
        setPos("full-player");
      }
    }

    function handlePlayerbarClick(e: any) {
      if (
        e?.target?.className &&
        typeof e.target.className === "string" &&
        e?.target?.className.split(" ").length === 1
      ) {
        toggleFullPlayer();
      }
    }

    function handleSongInfoClick(e: any) {
      if (breakpoint === "base") {
        e.preventDefault();
        e.stopPropagation();
        toggleFullPlayer();
      }
    }

    return (
      <PlayerContainer expanded={fullPlayer}>
        {!fullPlayer && (
          <>
            <TimeSlider
              progress={progress}
              onChange={onProgressChange}
              totalDuration={totalDuration}
              marginTop="-4px"
            />
            <MotionBox className="main" onClickCapture={handlePlayerbarClick}>
              <LayoutGroup>
                <MotionBox
                  display="flex"
                  flex="1"
                  alignItems="center"
                  marginRight="auto"
                  paddingLeft={{ base: 2, sm: 5 }}
                  layout
                  transition={springTransition}
                  layoutId="songInfo"
                >
                  {currentSong && (
                    <SongInfo
                      song={currentSong}
                      onClickCapture={handleSongInfoClick}
                    />
                  )}
                </MotionBox>
                <MotionBox
                  display="flex"
                  flex={{ base: 0, sm: 1 }}
                  alignItems="center"
                  justifyContent={{ base: "flex-end", sm: "center" }}
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <PlaybackControl
                    isPlaying={isPlaying}
                    togglePlay={togglePlay}
                  />
                </MotionBox>
                <Flex
                  flex={{ base: 0, sm: 1 }}
                  paddingRight={{ base: 0, sm: 3 }}
                  marginLeft="auto"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Box
                    width={36}
                    mr={2}
                    display={{ base: "none", md: "block" }}
                  >
                    <VStack spacing={-1}>
                      <VolumeSlider volume={volume} onChange={onVolumeChange} />
                      <Text
                        fontSize=".85em"
                        display="inline-block"
                        opacity={0.5}
                      >
                        <span>{seconds}</span> /{" "}
                        <span>{formatSeconds(totalDuration)}</span>
                      </Text>
                    </VStack>
                  </Box>
                  <PlayerOption
                    isExpanded={isExpanded}
                    toggleExpanded={toggleExpanded}
                    display={{ base: "none", sm: "flex" }}
                  />
                </Flex>
              </LayoutGroup>
            </MotionBox>
          </>
        )}
        <AnimatePresence>
          {fullPlayer && (
            <MotionBox
              padding={6}
              paddingTop={3}
              display="flex"
              flex="1"
              flexDirection="column"
              exit={{ opacity: 0, pointerEvents: "none" }}
            >
              <LayoutGroup>
                <IconButton
                  aria-label="Close Full Player"
                  onClick={() => toggleFullPlayer()}
                  icon={<FaChevronDown size={20} />}
                  variant="ghost"
                  size="lg"
                  margin={2}
                  position="absolute"
                  left={0}
                  top={0}
                ></IconButton>
                <Spacer />
                <MotionBox
                  layout
                  layoutId="songInfo"
                  transition={springTransition}
                >
                  {currentSong && (
                    <SongInfo song={currentSong} fullPlayer={true} />
                  )}
                </MotionBox>

                <TimeSlider
                  progress={progress}
                  onChange={onProgressChange}
                  totalDuration={totalDuration}
                  fullPlayer={true}
                  marginY={6}
                />

                <MotionBox
                  initial={{ opacity: 0, y: "30vh", scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  // transition={{ ease: "easeOut", duration: 0.3 }}
                  transition={springTransition}
                >
                  <PlaybackControl
                    isPlaying={isPlaying}
                    togglePlay={togglePlay}
                    fullPlayer={true}
                    justifyContent="space-around"
                    flexGrow="1"
                  />
                </MotionBox>
                {/* {currentSong && (
                  <Box
                    backgroundImage={resizeArtwork(currentSong.art, 70)}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    filter="blur(6px) brightness(10%)"
                    zIndex={-1}
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100vh"
                  ></Box>
                )} */}
                <Box
                  bgGradient="linear-gradient(
                    to bottom,
                    var(--chakra-colors-brand-300) 30%,
                    var(--chakra-colors-n2-300) 80%
                  );"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  zIndex={-1}
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  opacity={0.25}
                ></Box>
                <Spacer />
                <MotionBox
                  initial={{ opacity: 0, y: "20vh" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={springTransition}
                >
                  <PlayerOption
                    isExpanded={isExpanded}
                    toggleExpanded={toggleExpanded}
                    justifyContent="center"
                    fullPlayer={true}
                  />
                </MotionBox>
              </LayoutGroup>
            </MotionBox>
          )}
        </AnimatePresence>
      </PlayerContainer>
    );
  }
);
// const MemoizedPlayerBarLower = React.memo(PlayerBar);

const PlayerContainer = styled.div<{
  expanded: boolean;
  backgroundUrl?: string;
}>`
  overflow: hidden;
  width: 100%;
  padding-top: ${({ expanded }) => (expanded ? "calc(40vh + 56px)" : "0")};
  height: ${({ expanded }) => (expanded ? "100vh" : "80px")};
  position: ${({ expanded }) => (expanded ? "absolute" : "relative")};
  flex-basis: 1;
  flex-shrink: 0;
  bottom: 0;
  transition: all 0.3s ease-out;
  background: var(--chakra-colors-bg-800);
  flex-direction: column;
  display: flex;
  z-index: 10;

  .main {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 8px;
  }
`;
