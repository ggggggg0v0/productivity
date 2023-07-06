// src/App.tsx
import { IconButton, Flex, Text, Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { appWindow } from "@tauri-apps/api/window";
import Setting from "../components/drawer";

import { ChevronRightIcon, RepeatClockIcon } from "@chakra-ui/icons";

export const work = 0;
export const relax = 1;

function useStateAndRef(initial) {
  const [value, setValue] = useState(initial);
  const valueRef = useRef(value);
  valueRef.current = value;
  return [value, setValue, valueRef];
}

function App() {
  const initWorkTime = 5; // second
  const initRelaxTime = 6; // second
  const [workTime, setWorkTime] = useState(0);
  const [relaxTime, setRelaxTime] = useState(0);

  const [action, setAction] = useState(work);
  const [isIntervalRunning, setIsIntervalRunning] = useState(false);
  const [time, setTime, refTime] = useStateAndRef(initWorkTime);

  const toggleTimer = () => {
    startCountdown();
    // invoke('my_custom_command',{ invokeMessage: 'asdfsdf!' }).then((message) => console.log("heyhet", message))
  };

  const triggerResetDialog = () => {
    stopCountdown();
    setTime(
      action === work ? workTime || initWorkTime : relaxTime || initRelaxTime
    );
  };

  const startCountdown = () => {
    setIsIntervalRunning(true);
  };

  const stopCountdown = () => {
    setIsIntervalRunning(false);
  };

  useEffect(() => {
    let interval;
    console.log("isIntervalRunning", action, isIntervalRunning);
    if (isIntervalRunning) {
      interval = setInterval(() => {
        console.log("current", action, refTime.current);
        if (refTime.current > 0) {
          setTime((time) => time - 1);
        } else if (refTime.current === 0) {
          // sendNotification({
          //     title: `Time's up!`,
          //     body: `Congrats on completing a session!🎉`,
          // });
          stopCountdown();
          clearInterval(interval);
          appWindow.setFullscreen(true);

          if (action === work) {
            setTimeout(() => {
              setTime(relaxTime || initRelaxTime);
              setAction(relax);
              startCountdown();
              return;
            }, 1000);
            return;
          }

          setTime(workTime || initWorkTime);
          setAction(() => work);
          appWindow.setFullscreen(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIntervalRunning]);

  const handleSetTime = (type, second) => {
    switch (type) {
      case work:
        setWorkTime(second);
        setTime(second);
      case relax:
        setRelaxTime(second);
        setTime(second);
    }
  };

  return (
    <ChakraProvider>
      <div className="App" style={{ height: "100%" }}>
        <Flex background="#242627" alignItems="end" flexDirection="column">
          <Box>
            <Setting
              handleSetTime={handleSetTime}
              isIntervalRunning={isIntervalRunning}
            />
          </Box>
        </Flex>

        <Flex
          background="#242627"
          height="100%"
          alignItems="center"
          flexDirection="column"
        >
          <Text fontWeight="bold" fontSize="7xl" color="white">
            {`${
              Math.floor(time / 60) < 10
                ? `0${Math.floor(time / 60)}`
                : `${Math.floor(time / 60)}`
            }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
          </Text>
          <Flex>
            <IconButton
              // width="7rem"
              onClick={!isIntervalRunning ? toggleTimer : triggerResetDialog}
              icon={
                !isIntervalRunning ? (
                  <ChevronRightIcon boxSize={10} />
                ) : (
                  <RepeatClockIcon boxSize={6} />
                )
              }
              color={!isIntervalRunning ? "#2A7864" : "white"}
              colorScheme="none"
              border="none"
              boxShadow="none"
            />
            {/* <Button
            background="blue.300"
            marginX={5}
            onClick={triggerResetDialog}
          >
           Reset
          </Button> */}
          </Flex>
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default App;
