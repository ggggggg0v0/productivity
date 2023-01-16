// src/App.tsx
import { IconButton, Flex, Text, Box } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import "./App.css"

import { sendNotification } from "@tauri-apps/api/notification";
import { ask } from "@tauri-apps/api/dialog";

import Setting from "./components/drawer"


import { appWindow } from '@tauri-apps/api/window';

import { ChevronRightIcon, RepeatClockIcon } from '@chakra-ui/icons'





// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'





function App() {
  const initTime = 3
  const initResetTime = 15
  const [time, setTime] = useState(initTime);
  const [timerStart, setTimerStart] = useState(false);

  const buttons = [
    {
      value: 900,
      display: "15 minutes",
    },
    {
      value: 1800,
      display: "30 minutes",
    },
    {
      value: 3600,
      display: "60 minutes",
    },
  ];

  const toggleTimer = () => {
    setTimerStart(!timerStart);
    invoke('my_custom_command',{ invokeMessage: 'asdfsdf!' }).then((message) => console.log("heyhet", message))

  };

  const triggerResetDialog =  () => {
    setTime(initResetTime);
    setTimerStart(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          // sendNotification({
          //     title: `Time's up!`,
          //     body: `Congrats on completing a session!🎉`,
          // });
          appWindow.setFullscreen(true);
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStart, time]);

  return (
    <ChakraProvider>
    <div className="App" style={{ height: "100%" }}>

      <Flex
        background="#242627"
        alignItems="end"
        flexDirection="column"
      >
        <Box>
          <Setting />
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
            onClick={!timerStart ? toggleTimer : triggerResetDialog }
            icon={!timerStart ? <ChevronRightIcon boxSize={10}  /> : <RepeatClockIcon boxSize={6} />}
            color={!timerStart ? '#2A7864' : 'white' }
            colorScheme='none'
            border='none'
            boxShadow='none'
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