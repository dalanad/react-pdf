import React from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from '@paladin-analytics/rpdf-renderer';

const styles = StyleSheet.create({
  superscript: {
    fontVariant: 'superscript',
  },
  body: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  chapter: {
    margin: 12,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Times-Roman',
  },
});
let footnoteNumber = 0;

const Footnote = () => {
  footnoteNumber = footnoteNumber + 1;
  let x = footnoteNumber;
  return (
    <Text
      footnote={() => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <View>
            <Text style={{ fontSize: 10 }}>{x} . </Text>
          </View>
          <View style={{ fontSize: 10 }}>
            <Text style={{ fontSize: 10 }} hyphenationCallback={e => [e]}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
              amet, consectetur adipisicing elit consectetur adipisicing elit
            </Text>
          </View>
        </View>
      )}
      style={styles.superscript}
    >
      {x}
    </Text>
  );
};
export default () => (
  <Document>
    <Page size="A5" debug={false}>
      <View style={{ ...styles.text, ...styles.body }}>
        <View style={{ position: 'relative' }}>
          <Text>
            Large Number of footnotes in a single page&nbsp; & edge case
            containing reference shifting scenario. sit amet, consectetur
            adipisicing elit. Quaerat adipisci
            <Footnote /> facere alias <Footnote />
            saepe aliquam
            <Footnote /> quia amet, <Footnote />
            expedita aperiam dicta
            <Footnote /> earum accusantium! <Footnote />
            <Footnote /> Dicta sit facere hic <Footnote />
            itaque dolores
            <Footnote /> officia blanditiis
            <Footnote /> vel? Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci <Footnote /> facere
            <Footnote /> <Footnote /> <Footnote /> alias
            <Footnote /> saepe aliquam
            <Footnote /> quia amet, expedita aperiam dicta earum accusantium!
            Dicta sit facere hic itaque dolores officia blanditiis vel?Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci
            facere
            <Footnote /> alias <Footnote />
            saepe aliquam <Footnote />
            quia amet, expedita aperiam dicta earum accusantium! Dicta sit{' '}
            <Footnote />
            facere hic itaque dolores officia blanditiis vel?Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Quaerat adipisci facere
            alias saepe aliquam quia amet, expedita aperiam dicta earum
            accusantium! Dicta sit facere hic itaque dolores officia blanditiis
            vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat adipisci facere alias saepe aliquam quia amet, expedita
            aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
            officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
            amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat adipisci facere alias saepe
            aliquam quia amet, expedita aperiam dicta earum accusantium! Dicta
            sit facere hic itaque dolores officia blanditiis vel?Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quaerat adipisci
            facere alias saepe aliquam quia amet, expedita aperiam dicta earum
            accusantium! Dicta sit facere hic itaque dolores officia blanditiis
            vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat adipisci facere alias saepe aliquam quia amet, expedita
            aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
            officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
            amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat adipisci facere alias saepe
            aliquam quia amet, expedita aperiam dicta earum accusantium! Dicta
            sit facere hic itaque dolores officia blanditiis vel?Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quaerat adipisci
            facere alias saepe aliquam quia amet, expedita aperiam dicta earum
            accusantium! Dicta sit facere hic itaque dolores officia blanditiis
            vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat adipisci facere alias saepe aliquam quia amet, expedita
            aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
            officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
            amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?
          </Text>
          <View
            fixed
            style={{
              position: 'absolute',
              top: '100%',
              width: '100%',
            }}
            renderFootnotes
          />
        </View>
      </View>
    </Page>
    <Page size="A5" debug={false}>
      <View style={{ ...styles.text, ...styles.body }}>
        <View style={{ position: 'relative' }}>
          <Text>
            Footnote&nbsp;
            <Footnote />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
            adipisci facere alias saepe aliquam quia amet, expedita aperiam
            dicta earum accusantium! Dicta sit facere hic itaque dolores officia
            blanditiis vel? Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Quaerat adipisci facere alias saepe aliquam quia amet,
            expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat adipisci facere alias saepe
            aliquam quia amet, expedita aperiam dicta earum accusantium! Dicta
            sit facere hic itaque dolores officia blanditiis vel?Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quaerat adipisci
            facere alias saepe aliquam quia amet, expedita aperiam dicta earum
            accusantium! Dicta sit facere hic itaque dolores officia blanditiis
            vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat adipisci facere alias saepe aliquam quia amet, expedita
            aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
            officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
            amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat adipisci facere alias saepe
            aliquam quia amet, expedita aperiam dicta earum accusantium! Dicta
            sit facere hic itaque dolores officia blanditiis vel?Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quaerat adipisci
            facere alias saepe aliquam quia amet, expedita aperiam dicta earum
            accusantium! Dicta sit facere hic itaque dolores officia blanditiis
            vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat adipisci facere alias saepe aliquam quia amet, expedita
            aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
            officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
            amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quaerat adipisci facere alias saepe
            aliquam quia amet, expedita aperiam dicta earum accusantium! Dicta
            sit facere hic itaque dolores officia blanditiis vel?Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Quaerat adipisci
            facere alias saepe aliquam quia amet, expedita aperiam dicta earum
            accusantium! Dicta sit facere hic itaque dolores officia blanditiis
            vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quaerat adipisci facere alias saepe aliquam quia amet, expedita
            aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
            officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
            amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
            itaque dolores officia blanditiis vel?
          </Text>
          <View
            fixed
            style={{
              position: 'absolute',
              top: '100%',
              width: '100%',
            }}
            renderFootnotes
          />
        </View>
      </View>
    </Page>
    <Page size="A5" debug={false} wrap>
      <View style={{ ...styles.text, ...styles.body }}>
        <View style={{ position: 'relative' }}>
          <Text>Footnote outside Text : </Text>
          <Footnote />
          <Text>
            ipsum dolor sit amet, consectetur adipisicing elit. Velit quibusdam
            animi vero incidunt doloribus, suscipit aperiam, nostrum nulla rem
            tenetur, exercitationem voluptatem laudantium illqwdwdum! Dicta
            quaerat a ipsum dolor sit amet, consectetur adipisicing elit. Velit
            quibusdam animi vero incidunt doloribus, suscipit aperiam, nostrum
            nulla rem tenetur, exercitationem voluptatem laudantium illqwdwdum!
            Dicta quaerat a ipsum dolor sit amet, consectetur adipisicing elit.
            Velit quibusdam animi vero incidunt doloribus, suscipit aperiam,
            nostrum nulla rem tenetur, exercitationem voluptatem laudantium
            illqwdwdum! Dicta quaerat a ipsum dolor sit amet, consectetur
            adipisicing elit. Velit quibusdam animi vero incidunt doloribus,
            suscipit aperiam, nostrum nulla rem tenetur, exercitationem
            voluptatem laudantium illqwdwdum! Dicta quaerat a ipsum dolor sit
            amet, consectetur adipisicing elit. Velit quibusdam animi vero
            incidunt doloribus, suscipit aperiam, nostrum nulla rem tenetur,
            exercitationem voluptatem laudantium illqwdwdum! Dicta quaerat a
            ipsum dolor sit amet, consectetur adipisicing elit. Velit quibusdam
            animi vero incidunt doloribus, suscipit aperiam, nostrum nulla rem
            tenetur, exercitationem voluptatem laudantium illqwdwdum! Dicta
            quaerat a
          </Text>
          {Array.from(Array(10).keys()).map(e => {
            return (
              <View
                style={{
                  textAlign: 'justify',
                }}
                debug={false}
                key={e}
              >
                <Text key={e}>
                  #{e}
                  ipsum dolor sit amet, consectetur adipisicing elit. Velit
                  quibusdam animi vero incidunt doloribus, suscipit aperiam,
                  nostrum nulla rem tenetur, exercitationem voluptatem
                  laudantium illqwdwdum! Dicta quaerat a
                  <Footnote />. Nobis, saepe. dqwdqwdqwd asdhkqwhjqhwd jqwd
                  qwjdqwd qwdqwdj qwdqwd dqwdqwdqwd asdhkqwhjqhwd jqwd qwjdqwd
                  qwdqwdj qwdqwd qwdqwddqwqwdqwdqwd dqw qwd qdwqdwdqw dqwdqw qwd
                  dwq dwq dw dwq dw qw wwdq dwq Hello Worlds dw qw wwdq dwq
                  Hello Worlds dw qw wwdq dwq Hello Worlds
                </Text>
              </View>
            );
          })}
          <Text break>Force break</Text>
          <Text break>Force break</Text>
          {Array.from(Array(10).keys()).map(e => {
            return (
              <View
                style={{
                  textAlign: 'justify',
                  fontSize: 14,
                }}
                key={e}
              >
                <Text key={e}>
                  #{e}
                  ipsum dolor sit amet, consectetur adipisicing elit. Velit
                  quibusdam animi vero incidunt doloribus, suscipit aperiam,
                  nostrum nulla rem tenetur, exercitationem voluptatem
                  laudantium illqwdwdum! Dicta quaerat a
                  <Footnote />. Nobis, saepe. dqwdqwdqwd asdhkqwhjqhwd jqwd
                  qwjdqwd qwdqwdj qwdqwd dqwdqwdqwd asdhkqwhjqhwd jqwd qwjdqwd
                  qwdqwdj qwdqwd qwdqwddqwqwdqwdqwd dqw qwd qdwqdwdqw dqwdqw qwd
                  dwq dwq dw dwq dw qw wwdq dwq Hello Worlds dw qw wwdq dwq
                  Hello Worlds dw qw wwdq dwq Hello Worlds
                </Text>
              </View>
            );
          })}
          <View
            fixed
            style={{
              position: 'absolute',
              top: '100%',
              width: '100%',
            }}
            renderFootnotes
          />
        </View>
      </View>
    </Page>
  </Document>
);
