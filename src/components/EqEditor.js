import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from 'react';
import {
  Box,
  Center
} from '@chakra-ui/react';
const EqEditor = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );

  const editorChangeHandler = (eState) => {
    const contentState = eState.getCurrentContent();
    console.log(convertToRaw(contentState));
    setEditorState(eState);
  }

  return (
    <Center>
      <Box minW="80%" maxW="80%" minH="100px" border="2px"
      >
        <Editor editorState={editorState} onChange={editorChangeHandler} />
      </Box>
    </Center>
  );
}
export default EqEditor;