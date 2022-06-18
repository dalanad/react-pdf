import React from 'react';
import {
  Document,
  Font,
  Page,
  Text,
  Image,
  StyleSheet,
  Svg,
  Line,
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
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    marginBottom: 10,
  },
});

export default () => (
  <Document>
    <Page size="A5" style={styles.body} debug={false}>
      <View style={styles.text}>
        <Text>
          Footnote{' '}
          <Text
            footNote={r => (
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
                    {`ipsum dolor sit amet, consectetur adipisicing elit`}
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
    <Page size="A5" style={styles.body} debug={false}>
      <View style={styles.text}>
        <View>
          <Text>Footnote outside Text : </Text>
          <Text
            footNote={r => (
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
                    {`ipsum dolor sit amet, consectetur adipisicing elit`}
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
                  #{e} ipsum dolor sit amet, consectetur adipisicing elit. Velit
                  quibusdam animi vero incidunt doloribus, suscipit aperiam,
                  nostrum nulla rem tenetur, exercitationem voluptatem
                  laudantium illqwdwdum! Dicta quaerat a
                  <Text
                    footNote={r => (
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
                            {`ipsum dolor sit amet, consectetur adipisicing elit` +
                              'qweqweqwe '.repeat(
                                Math.round(Math.random() * 10),
                              )}
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
          <Text break={true}>Force break</Text>
          <Text break={true}>Force break</Text>
          {Array.from(Array(10).keys()).map(e => {
            return (
              <View
                style={{
                  textAlign: 'justify',
                  fontSize: 14,
                }}
                debug={false}
                key={e}
              >
                <Text key={e}>
                  #{e} ipsum dolor sit amet, consectetur adipisicing elit. Velit
                  quibusdam animi vero incidunt doloribus, suscipit aperiam,
                  nostrum nulla rem tenetur, exercitationem voluptatem
                  laudantium illqwdwdum! Dicta quaerat a
                  <Text
                    footNote={r => (
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
                            {`ipsum dolor sit amet, consectetur adipisicing elit` +
                              'qweqweqwe '.repeat(
                                Math.round(Math.random() * 10),
                              )}
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
        </View>
      </View>
    </Page>
  </Document>
);
