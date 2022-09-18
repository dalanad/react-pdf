import React from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from '@paladin-analytics/rpdf-renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
});

export default () => (
  <Document>
    <Page size="A5" debug={false} style={{ ...styles.body }}>
      <View style={{ ...styles.text }} debug>
        <Text>
          dicta earum accusantium! Dicta sit facere hic itaque dolores officia
          blanditiis vel?Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Quaerat adipisci facere alias saepe aliquam quia amet, expedita
          aperiam dicta earum accusantium! Dicta sit facere hic itaque dolores
          officia blanditiis vel?Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Quaerat adipisci facere alias saepe aliquam quia
          amet, expedita aperiam dicta earum accusantium! Dicta sit facere hic
          itaque dolores officia blanditiis vel?Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Quaerat adipisci facere alias saepe
          aliquam quia amet, expedita aperiam dicta earum accusantium! Dicta sit
          facere hic itaque dolores officia blanditiis vel?Lorem ipsum dolor sit
          amet, consectetur adipisicing elit. Quaerat adipisci facere alias
          saepe aliquam quia amet, expedita aperiam dicta earum accusantium!
          Dicta sit facere hic itaque dolores officia blanditiis vel?Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Quaerat adipisci facere
          alias saepe aliquam quia amet, expedita aperiam dicta earum
          accusantium! Dicta sit facere hic itaque dolores officia blanditiis
          vel?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
          adipisci facere alias saepe
        </Text>
      </View>
    </Page>
  </Document>
);
