import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from 'react';
import {
  Box,
  Center,
  IconButton, Icon, HStack, VStack
} from '@chakra-ui/react';
import { FaHome, FaSave } from 'react-icons/fa';
import { useHistory } from 'react-router';

const EqEditor = () => {

  const history = useHistory();

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const jsonState = convertToRaw(contentState);
    console.log(jsonState);
  }

  const handleHome = () => {
    handleSave();
    history.push("/");
  }
  return (
      <VStack>
        <HStack>
          <IconButton icon={<Icon as={FaHome}
            onClick = {handleHome}
          />}/>
          <IconButton icon={<Icon as={FaSave}/>}
            onClick={handleSave}
          />
        </HStack>
        <Box minW="80%" maxW="80%" minH="100px" border="2px"
        >
          <Editor editorState={editorState} onChange={setEditorState} />
        </Box>
      </VStack>
  );
}
export default EqEditor;