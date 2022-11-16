import React from 'react';
import {
  Document,
  Page,
  Text,
  Font,
  StyleSheet,
  View,
} from '@paladin-analytics/rpdf-renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 35,
  },
  text: {
    marginBottom: 12,
    fontFamily: 'Oswald',
    textAlign: 'left',
    fontSize: 12,
    lineHeight: 1.5,
    dynamicLetterSpacing: true,
  },
  ornamental: {
    fontSize: 36,
    margin: '10px 10px 40px 10px',
  },
  bold: {
    fontWeight: 400,
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

export default () => (
  <Document>
    <Page size={{ width: '12.7cm', height: '20.32cm' }} style={styles.page}>
      <View style={{ position: 'relative' }}>
        <Text style={styles.text} debug>
          The atmosphere near the surface of Jupiter is about 88 to 92%
          hydrogen, 8 to 12% helium, and 1% other gases. The lower atmosphere is
          so heated and the pressure so high that helium changes to liquid. It
          rains down onto the planet.[26] Based on spectroscopy, Jupiter seems
          to be made of the same gases as Saturn. It is different from Neptune
          or Uranus. Those two planets have much less hydrogen and helium
          gas.[27] The very high temperatures and pressures in Jupiter&apos;s
          core mean scientists cannot tell what materials are there. This cannot
          be found out, because it is not possible to create the same amount of
          pressure on Earth. Above the unknown inner core is an outer core. The
          outer core of Jupiter is thick, liquid hydrogen.[28] The pressure is
          high enough to make the hydrogen solid, but then it melts because of
          the heat. The planet Jupiter is sometimes called a failed star because
          it is made of the same elements (hydrogen and helium) as is the Sun,
          but it is not large enough to have the internal pressure and
          temperature necessary to cause hydrogen to fuse to helium, the energy
          source that powers the sun and most other stars. The planet Jupiter is
          sometimes called a failed star because it is made of the same elements
          (hydrogen and helium) as is the Sun, but it is not large enough.
        </Text>

        <Text style={styles.text} debug>
          Jupiter is twice as massive as all the other planets in the Solar
          System put together.[17] It gives off more heat than it gets from the
          sun.[30] Jupiter is 11 times the width of Earth and 318 times as
          massive. The volume of Jupiter is 1,317 times the volume of Earth. In
          other words, 1,317 Earth-sized objects could fit inside it.[31]
        </Text>
        <View
          fixed
          debug
          style={{
            position: 'absolute',
            top: '100%',
            width: '100%',
          }}
          renderFootnotes
        />
      </View>
    </Page>
  </Document>
);
