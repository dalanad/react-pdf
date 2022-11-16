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
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    fontSize: 10,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  page: {
    padding: 80,
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
            flex: 1,
          }}
        >
          <View>
            <Text>{x}.</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
              amet, consectetur adipisicing elit consectetur adipisicing elit
              Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
              amet, consectetur adipisicing elit consectetur adipisicing elit
              naoehu line aosenuths aontehu sanoteh usatnoheu snatoheu snaoth
              eusnthao sunth aosentuh oasnetuh saheusnthaoe sutnhaoesnuth
              oasntehu snatohe unsthoa usnthaosenuth aosnethu
              saonteuhsaontehusoane
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
    {/* <Page size="A5" debug={false} style={{ ...styles.body }}>
      <View style={{ ...styles.text }}>
        <View style={{ position: 'relative' }}>
          <Text debug>
            Large Number of footnotes in a single pag sathoeu sntaho eusntha
            <Footnote />
            <Footnote />
            <Footnote />
            oseunth aosentuh saonteuh saontheu snoatheu sntaho
            eusthoasunthaosnuth saontheu some more
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
      </View>
    </Page> */}
    <Page style={styles.page}>
      <View>
        <View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            naoehu line aosenuths aontehu sanoteh usatnoheu snatoheu snaoth
            eusnthao sunth aosentuh oasnetuh saheusnthaoe sutnhaoesnuth oasntehu
            snatohe unsthoa usnthaosenuth aosnethu saonteuhsaontehusoane
          </Text>
        </View>
        <View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            naoehu line aosenuths aontehu sanoteh usatnoheu snatoheu snaoth
            eusnthao sunth aosentuh oasnetuh saheusnthaoe sutnhaoesnuth oasntehu
            snatohe unsthoa usnthaosenuth aosnethu saonteuhsaontehusoane
          </Text>
        </View>
        <View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            naoehu line aosenuths aontehu sanoteh usatnoheu snatoheu snaoth
            eusnthao sunth aosentuh oasnetuh saheusnthaoe sutnhaoesnuth oasntehu
            snatohe unsthoa usnthaosenuth aosnethu saonteuhsaontehusoane
          </Text>
        </View>
        <View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            Lorem ipsum dolor sit amet, consectetur adipisicing elit dolor sit
            amet, consectetur adipisicing elit consectetur adipisicing elit
            naoehu line aosenuths aontehu sanoteh usatnoheu snatoheu snaoth
            eusnthao sunth aosentuh oasnetuh saheusnthaoe sutnhaoesnuth oasntehu
            snatohe unsthoa usnthaosenuth aosnethu saonteuhsaontehusoane
          </Text>
        </View>
        <View>
          <Text debug>
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            abcd efgh ijkl mnop qrst uvwx yz, abcd efgh ijkl mnop qrst uvwx yz,
            <Footnote />
            <Footnote />
            <Footnote />
            <Footnote />
            {/* <Footnote /> */}
            {/* <Footnote />
            <Footnote />
            <Footnote /> */}
            {/* <Footnote />
            <Footnote />
            <Footnote /> */}
            saonteuhsaontehusoane
          </Text>
        </View>
        <View
          debug
          fixed
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