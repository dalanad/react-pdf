
import createInstance from '../node/createInstance';

/**
 *  maps footnote elements to a view node 
 * 
 * @param {*} footnotes 
 * @returns a view node
 */
function mapFootNotesToView(footnotes) {
  let processed = [
    createInstance({
      type: 'SVG',
      props: {
        style: {
          height: 5,
        },
        children: [],
      },
    }),
  ];

  let line = createInstance({
    type: 'LINE',
    props: {
      x1: 0,
      x2: 1000,
      y1: 0,
      y2: 0,
      strokeWidth: 1,
      stroke: '#000000',
    },
  });

  processed[0].children = [line];

  let j = 0;

  for (const note of footnotes) {
    let txt = createInstance(note.el.props.footNote(j + 1));
    processed.push(txt);
    j++;
  }

  let it = createInstance({
    type: 'VIEW',
    props: {
      style: {
        paddingTop: 10,
      },
      children: [],
    },
  });

  it.children = processed;
  return it;
}

export default mapFootNotesToView;
