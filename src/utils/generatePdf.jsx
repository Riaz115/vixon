import React from "react"
import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

Font.register({
  family: 'Borna',
  fonts: [
    { src: '/fonts/borna-bolditalic-webfont.ttf', fontWeight: 700, fontStyle: 'italic' },
    { src: '/fonts/borna-bold-webfont.ttf', fontWeight: 700 }, 
    { src: '/fonts/borna-mediumitalic-webfont.ttf', fontWeight: 500, fontStyle: 'italic' }, 
    { src: '/fonts/borna-medium-webfont.ttf', fontWeight: 500 }, 
    { src: '/fonts/borna-regularitalic-webfont.ttf', fontWeight: 400, fontStyle: 'italic' }, 
    { src: '/fonts/borna-regular-webfont.ttf', fontWeight: 100 }, 
    { src: '/fonts/borna-semibolditalic-webfont.ttf', fontWeight: 600, fontStyle: 'italic' }, 
    { src: '/fonts/borna-semibold-webfont.ttf', fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 12,
    position:"relative",
    fontFamily :"Borna",
  },
  title: {
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 6,
    fontFamily :"Borna",
    fontWeight: "semibold",
    // wordBreak: 'break-word',
    wrap: true,
  },
  subtitle: {
    fontFamily :"Borna",
    fontSize: 32,
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: 15,
    // wordBreak: 'break-word',
    wrap: true,
  },
  HeadingText: {
    marginTop: 45,
    fontFamily :"Borna",
    // wordBreak: 'break-word', // Ensures long words break properly if needed
    wrap: true, // Prevents automatic word wrapping

  },
  subtitleHeading: {
    fontFamily :"Borna",
    fontWeight: 100,
    fontSize: 32,
    textAlign: 'center',
  },
  // qrContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // marginVertical: 20,
  //   // marginBottom: 30,
  //   marginTop: 50
  // },
  // qrContainer2: { 
  //       border:"1px solid green"
  // },
  // qrContainer2: { 
  //    padding: 12,
  //   backgroundColor: "black",
  //   borderRadius: 24, 
  //   border:"1px solid green"
  // },

  // qrCode: {
  //   width: 250,
  //   height: 250,
  //   backgroundColor: "black"
  // },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    position: 'relative',
    borderRadius: 25,
    paddingBottom: 50,
  },
  qrContainer2: {
    borderRadius: 21,
    width: 270,
    height: 270,
    backgroundColor:"black",

  },
  qrCode: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  qrCodeCenter: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    padding: 7,
    zIndex:4000,
     },
  walletImage: {
    transform: 'scale(0.65)'
  },
  list: {
    textAlign: 'center',
 },
  listItem: {
    fontSize: 32,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',


  },


  listItemText: {
    fontFamily :"Borna",
    fontWeight:200
   },
  paymentOptions: {
    fontFamily :"Borna",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
       marginBottom: 100,

  },

  descriptiontext: {
    marginTop: 30,
    marginBottom: 20,
    // wordBreak: 'break-word', // Ensures long words break properly if needed
    wrap: true, // Prevents automatic word wrapping
  },
  listContainer: {
    marginTop: 40,
    marginBottom: 40,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',

  },
  
  walletText: {
    display: "flex",
    alignItems: 'left',
    gap: 4,
    textAlign: "left",
    width: 100,
    // wordBreak: 'break-word', // Ensures long words break properly if needed
    wrap: true, // Prevents automatic word wrapping
  },
  footerContainer: {
    position: 'absolute', // Makes sure the second image is overlaid
    bottom: 0,
    right: 0,
  },
  footer: {
    padding:10,
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    alignItems: 'center', 
    marginTop: 10,

  },
  poweredBy: {
    width: 100,
    height: 'auto',
  },

});

function biggestTier(mytiers) {

  return mytiers.reduce((max, tier) => {
    return tier.percentage > max ? tier.percentage : max;
  }, 0)
}

export const calculateFontSize = (text, baseSize = 64, maxLength = 10) => {
  if (!text) return baseSize;
  const length = text.length;

  if (length <= maxLength) return baseSize;
  // For example, reduce 2 points for every extra character beyond maxLength.
  const extraCharacters = length - maxLength;
  const newSize = baseSize - extraCharacters * 2;
  // Set a minimum size to avoid too small fonts
  return newSize < 40 ? 40 : newSize;
};

// Create the PDF component
export const MyDocument = ({ qrCodeBase64, data, }) => (


  <Document>
    <Page size="A3" style={{
    padding: 0,
    fontSize: 12,
    backgroundColor:data?.bgColor ||"white",
    color:data?.textColor ||"black"
  }}>
      <View style={styles.HeadingText}>
        <Text
          style={{ ...styles.title, fontSize: calculateFontSize(data?.cardType === "Coupon" ? data?.rewardForTheFirstVisit.toUpperCase() : "", 64, 10) }}
          hyphenationCallback={(word) => [word]}
        >
  {data?.cardType === "Stamp" &&
    `NAZBIERAJTE ${data?.selectedNumber || 0} PEČIATOK NA ZÍSKANIE ODMENY!`
  }
  {data?.cardType === "Reward" &&
    `ZBIERAJTE BODY A ZÍSKAJTE SKVELÉ ODMENY!`
  }
  {data?.cardType === "Discount" &&
    `UŠETRITE AŽ ${biggestTier(data?.tiers) || 0}% S NAŠOU ZĽAVOVOU KARTOU!`
  }
  {data?.cardType === "Coupon" &&
    `VYUŽITE  ${data?.rewardForTheFirstVisit.toUpperCase()} ZADARMO PRI VAŠEJ PRVEJ NÁVŠTEVE!`
  }
</Text>

      </View>

      <View style={styles.descriptiontext}>
        <Text style={{...styles.subtitle , color:data?.textColor|| '#313131'}}>
          Pridajte si vernostnú kartu do</Text>
        <Text style={styles.subtitleHeading}>
          Apple Wallet alebo Google Pay!</Text>
      </View>

      <View style={styles.qrContainer}>
        <View style={styles.qrContainer2}>
         
          <Image
            src={qrCodeBase64}
            style={styles.qrCodeCenter}
          />
        </View>
      </View>

      
      <View style={styles.listContainer}>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={{...styles.listItemNumber,color:data?.textColor|| '#313131'}}>1. </Text>
            <Text style={styles.listItemText}>
              {data?.cardType === "Stamp" &&
                `Naskenujte tento QR kód`
              }
              {data?.cardType === "Reward" &&
                `Naskenujte tento QR kód`
              }
              {data?.cardType === "Discount" &&
                `Naskenujte tento QR kód`
              }
              {data?.cardType === "Coupon" &&
                `Naskenujte tento QR kód`
              }
            </Text>

          </View>
          <View style={styles.listItem}>
            <Text style={{...styles.listItemNumber,color:data?.textColor|| '#313131'}}>2. </Text>
            <Text style={styles.listItemText}>

              {data?.cardType === "Stamp" &&
                `Vyplňte krátky formulár`
              }
              {data?.cardType === "Reward" &&
                `Vyplňte krátky formulár`
              }
              {data?.cardType === "Discount" &&
                `Vyplňte krátky formulár`
              }
              {data?.cardType === "Coupon" &&
                `Vyplňte krátky formulár`
              }
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={{...styles.listItemNumber,color:data?.textColor|| '#313131'}}>3. </Text>
            <Text style={styles.listItemText}>
              {data?.cardType === "Stamp" &&
                `Začnite zbierať pečiatky`
              }
              {data?.cardType === "Reward" &&
                `Zbierajte body pri každom nákupe`
              }
              {data?.cardType === "Discount" &&
                `Uplatnite zľavu pri platení`
              }
              {data?.cardType === "Coupon" &&
                `Získajte svoj kupón`
              }

            </Text>
          </View>

        </View>
      </View>

      {/* Payment Options Section */}
      <View style={styles.paymentOptions}>
        <Image src="/assets/Add_To_Apple_+_Goolge_Wallet.png" style={styles.walletImage} />

      </View>


      {/* Footer Section */}
      <View style={styles.footerContainer}>
      <View style={styles.footer}>
        <Text>Powered by</Text>
        <Image src="/assets/VEXiON Logo.png" style={styles.poweredBy} />
      </View>
      </View>
    </Page>
  </Document>
);

