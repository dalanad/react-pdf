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

export default () => (
  <Document>
    <Page size="A5" debug={false}>
      <View style={{ ...styles.text, ...styles.body }}>
        <Text>
          Footnote&nbsp;
          <Text
            footnote={() => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <View>
                  <Text style={{ fontSize: 10 }}>{`101. `}</Text>
                </View>
                <View style={{ fontSize: 10 }}>
                  <Text style={{ fontSize: 10 }}>
                    ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                </View>
              </View>
            )}
            style={styles.superscript}
          >
            101
          </Text>
        </Text>
      </View>
    </Page>
    <Page size="A5" debug={false} wrap>
      <View style={{ ...styles.text, ...styles.body }}>
        <View style={{ position: 'relative' }} debug>
          <Text>Footnote outside Text : </Text>
          <Text
            footnote={() => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <View>
                  <Text style={{ fontSize: 10 }}>{`100. `}</Text>
                </View>
                <View style={{ fontSize: 10 }}>
                  <Text style={{ fontSize: 10 }}>
                    ipsum dolor sit amet, consectetur adipisicing elit
                  </Text>
                </View>
              </View>
            )}
            style={styles.superscript}
          >
            100
          </Text>
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
                  #
                  {e}
                  ipsum dolor sit amet, consectetur adipisicing elit. Velit
                  quibusdam animi vero incidunt doloribus, suscipit aperiam,
                  nostrum nulla rem tenetur, exercitationem voluptatem
                  laudantium illqwdwdum! Dicta quaerat a
                  <Text
                    footnote={() => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 10 }}>{`${e + 1}. `}</Text>
                        </View>
                        <View style={{ fontSize: 10 }}>
                          <Text style={{ fontSize: 10 }}>
                            {`ipsum dolor sit amet, consectetur adipisicing elit${ 
                              'qweqweqwe '.repeat(
                                Math.round(Math.random() * 10),
                              )}`}
                          </Text>
                        </View>
                      </View>
                    )}
                    style={styles.superscript}
                  >
                    {e + 1}
                  </Text>
                  . Nobis, saepe. dqwdqwdqwd asdhkqwhjqhwd jqwd qwjdqwd qwdqwdj
                  qwdqwd dqwdqwdqwd asdhkqwhjqhwd jqwd qwjdqwd qwdqwdj qwdqwd
                  qwdqwddqwqwdqwdqwd dqw qwd qdwqdwdqw dqwdqw qwd dwq dwq dw dwq
                  dw qw wwdq dwq Hello Worlds dw qw wwdq dwq Hello Worlds dw qw
                  wwdq dwq Hello Worlds
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
                debug
                key={e}
              >
                <Text key={e}>
                  #
                  {e}
                  ipsum dolor sit amet, consectetur adipisicing elit. Velit
                  quibusdam animi vero incidunt doloribus, suscipit aperiam,
                  nostrum nulla rem tenetur, exercitationem voluptatem
                  laudantium illqwdwdum! Dicta quaerat a
                  <Text
                    footnote={() => (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 10 }}>{`${e + 1}. `}</Text>
                        </View>
                        <View style={{ fontSize: 10 }}>
                          <Text
                            style={{ fontSize: 10 }}
                            hyphenationCallback={cb => [cb]}
                          >
                            {`ipsum dolor sit amet, consectetur adipisicing elit${ 
                              'qweqweqwe '.repeat(
                                Math.round(Math.random() * 10),
                              )}`}
                          </Text>
                        </View>
                      </View>
                    )}
                    style={styles.superscript}
                  >
                    {e + 1}
                  </Text>
                  . Nobis, saepe. dqwdqwdqwd asdhkqwhjqhwd jqwd qwjdqwd qwdqwdj
                  qwdqwd dqwdqwdqwd asdhkqwhjqhwd jqwd qwjdqwd qwdqwdj qwdqwd
                  qwdqwddqwqwdqwdqwd dqw qwd qdwqdwdqw dqwdqw qwd dwq dwq dw dwq
                  dw qw wwdq dwq Hello Worlds dw qw wwdq dwq Hello Worlds dw qw
                  wwdq dwq Hello Worlds
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
