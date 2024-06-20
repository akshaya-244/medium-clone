// src/RichTextEditor.js
import  { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

export const RichText = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
    //@ts-ignore
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  return (
    <div>
      <button onClick={onBoldClick}>Bold</button>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '400px' }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

