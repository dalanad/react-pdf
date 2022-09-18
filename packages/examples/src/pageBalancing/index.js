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
    paddingTop: 25,
    paddingHorizontal: 35,
  },
});

export default () => (
  <Document>
    <Page size="A5" debug={false} style={{ ...styles.body }}>
      <View>
        <Text style={{ fontSize: 14 }}>Time Traval</Text>
        <Text style={{ fontSize: 11, marginBottom: 10 }}>
          From Wikipedia, the free encyclopedia
        </Text>
        <Text>
          Time travel is the concept of movement between certain points in time,
          analogous to movement between different points in space by an object
          or a person, typically with the use of a hypothetical device known as
          a time machine. Time travel is a widely recognized concept in
          philosophy and fiction, particularly science fiction. The idea of a
          time machine was popularized by H. G. Wells' 1895 novel The Time
          Machine.[1] It is uncertain if time travel to the past is physically
          possible, and such travel, if at all feasible, may give rise to
          questions of causality. Forward time travel, outside the usual sense
          of the perception of time, is an extensively observed phenomenon and
          well-understood within the framework of special relativity and general
          relativity. However, making one body advance or delay more than a few
          milliseconds compared to another body is not feasible with current
          technology. As for backward time travel, it is possible to find
          solutions in general relativity that allow for it, such as a rotating
          black hole. Traveling to an arbitrary point in spacetime has very
          limited support in theoretical physics, and is usually connected only
          with quantum mechanics or wormholes.
        </Text>
      </View>
    </Page>
  </Document>
);
