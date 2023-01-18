
import { IconButton, Flex, Text, Box, Button, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { sendNotification } from "@tauri-apps/api/notification";
import { ask } from "@tauri-apps/api/dialog";

import Setting from "../components/drawer"

// When using the Tauri API npm package:
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from '@tauri-apps/api/window';

import { ChevronRightIcon, RepeatClockIcon } from '@chakra-ui/icons'

// const buttons = [
//   {
//     value: 1500,
//     display: "25",
//   },
//   {
//     value: 1800,
//     display: "30",
//   },
//   {
//     value: 3600,
//     display: "60",
//   },
// ];

function Flow() {
    const initTime = 1500
    const initResetTime = 300
    const [time, setTime] = useState(initTime);
    const [timerStart, setTimerStart] = useState(false);
  
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
          </Flex>
          {/* <Flex marginTop={10}>
          {buttons.map(({ value, display }) => (
            <Button
              key={value}
              size='sm'
              marginX={4}
              background="green.700"
              onClick={() => {
                setTimerStart(false);
                setTime(value);
              }}
            >
              {display}
            </Button>
          ))}
        </Flex> */}
        </Flex>
      </div>
      </ChakraProvider>
    );
  }

  export default Flow