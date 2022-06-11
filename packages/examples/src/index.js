import './index.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, Font } from '@paladin-analytics/rpdf-renderer';

import Svg from './svg';
import GoTo from './goTo';
import Text from './text';
import Knobs from './knobs';
import Resume from './resume';
import Fractals from './fractals';
import PageWrap from './pageWrap';
import DynamicMargins from './dynamicMargins';
import TextWrap from './textWrap';
import TextEnhancements from './text-enhancements';
import editorFonts from './text-enhancements/fonts';
import DynamicPageBreaks from './dynamicPageBreaks';

editorFonts.forEach(el => {
  Font.register(el);
});

const MOUNT_ELEMENT = document.getElementById('root');

const EXAMPLES = {
  svg: Svg,
  goTo: GoTo,
  text: Text,
  knobs: Knobs,
  resume: Resume,
  pageWrap: PageWrap,
  fractals: Fractals,
  dynamicMargins: DynamicMargins,
  textEnhancements: TextEnhancements,
  textWrap: TextWrap,
  dynamicPageBreaks: DynamicPageBreaks,
};

const Viewer = () => {
  const [example, setExample] = useState('dynamicPageBreaks');
  const [fontFamily, setFontFamily] = useState('Poppins');
  const fontList = editorFonts.map(f => f.family);

  console.log(example);

  const handleExampleChange = e => {
    setExample(e.target.dataset.name);
  };

  const Document = EXAMPLES[example];

  return (
    <div className="wrapper">
      <ul>
        {Object.keys(EXAMPLES).map(value => (
          <li
            key={value}
            data-name={value}
            role="presentation"
            onClick={handleExampleChange}
          >
            {value}
          </li>
        ))}
      </ul>

      <div style={{ padding: 10 }}>
        <select
          value={fontFamily}
          onChange={event => setFontFamily(event.currentTarget.value)}
        >
          {fontList.map(ff => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={Math.random() * 1000}>{ff}</option>
          ))}
        </select>
      </div>

      <PDFViewer style={{ flex: 1 }}>
        <Document fontFamily={fontFamily} />
      </PDFViewer>
    </div>
  );
};

ReactDOM.render(<Viewer />, MOUNT_ELEMENT);
