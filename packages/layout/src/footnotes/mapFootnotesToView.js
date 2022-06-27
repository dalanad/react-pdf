import createInstance from '../node/createInstance';

/**
 *  maps footnote elements to a view node
 *
 * @param {*} footnotes
 * @returns a view node
 */
function mapFootnotesToView(footnotes, width) {
  const line = createInstance({
    type: 'LINE',
    props: {
      x1: 0,
      x2: width,
      y1: 0,
      y2: 0,
      strokeWidth: 1,
      stroke: '#000000',
    },
  });

  const processed = [
    createInstance({
      type: 'SVG',
      props: {
        style: {
          height: 5,
        },
        children: [line],
      },
    }),
  ];

  let j = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const note of footnotes) {
    const txt = createInstance(note.el.props.footnote(j + 1));
    processed.push(txt);
    j += 1;
  }

  const it = createInstance({
    type: 'VIEW',
    props: {
      style: {
        paddingTop: 10,
      },
      children: [processed],
    },
  });

  return it;
}

export default mapFootnotesToView;
