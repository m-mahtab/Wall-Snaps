import React from 'react';
import { FaBold, FaItalic, FaUnderline, FaLink, FaStrikethrough, FaListOl, FaListUl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaFont, FaHighlighter } from 'react-icons/fa';

const EditBar = ({ formatText }) => {
  return (
    <div className="flex items-center  bg-white">
      <select className="mr-2 font-semibold" onChange={(e) => formatText(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('bold')}>
        <FaBold />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('italic')}>
        <FaItalic />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('underline')}>
        <FaUnderline />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('link')}>
        <FaLink />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('strikethrough')}>
        <FaStrikethrough />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('orderedList')}>
        <FaListOl />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('unorderedList')}>
        <FaListUl />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('left')}>
        <FaAlignLeft />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('center')}>
        <FaAlignCenter />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('right')}>
        <FaAlignRight />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('font')}>
        <FaFont />
      </button>
      <button className="mr-2 p-2 hover:bg-gray-200 rounded" onClick={() => formatText('highlight')}>
        <FaHighlighter />
      </button>
    </div>
  );
};

export default EditBar;
