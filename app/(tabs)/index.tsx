import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CampusBackground from '@/components/CampusBackground';
import CampusButton from '@/components/CampusButton';
import ScanLogo from '@/components/ScanLogo';
import { CAMPUS } from '@/constants/colors';

export default function Index() {
  return <SafeAreaView style={styles.container}>
    <CampusBackground />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <View style={styles.brand}><View style={styles.brandIcon}><Ionicons name="scan" size={19} color={CAMPUS.accent}/></View><View><Text style={styles.brandName}>QR-ATT</Text><Text style={styles.brandSub}>CAMPUS ATTENDANCE</Text></View></View>
        <View style={styles.livePill}><View style={styles.liveDot}/><Text style={styles.liveText}>CONNECTED</Text></View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroGlow}/>
        <View style={styles.heroBadge}><Ionicons name="sparkles-outline" size={13} color={CAMPUS.accent}/><Text style={styles.heroBadgeText}>THE SMARTER CAMPUS EXPERIENCE</Text></View>
        <Text style={styles.heroEyebrow}>YOUR DAY, BEAUTIFULLY ORGANIZED</Text>
        <Text style={styles.heroTitle}>Your campus.{ '\n' }Reimagined <Text style={styles.heroAccent}>daily.</Text></Text>
        <Text style={styles.heroSubtitle}>Seamless check-ins, powerful insights, and everything you need to stay connected on campus.</Text>
        <View style={styles.heroDivider}/>
        <View style={styles.heroFoot}><Ionicons name="shield-checkmark" size={17} color={CAMPUS.mint}/><Text style={styles.heroFootText}>Secure • Instant • Reliable</Text></View>
      </View>

      <View style={styles.sectionLine}><View><Text style={styles.sectionEyebrow}>GET STARTED</Text><Text style={styles.sectionTitle}>What would you like to do?</Text></View><Ionicons name="arrow-down" size={20} color={CAMPUS.textFaint}/></View>
      <View style={styles.actionArea}>
        <CampusButton variant="primary" title="Scan QR Code" icon="qr-code-outline" onPress={() => router.push('/scan')}/>
        <CampusButton title="Attendance History" icon="time-outline" onPress={() => router.push('/history')}/>
        <CampusButton title="My Profile" icon="person-outline" onPress={() => router.push('/profile')}/>
      </View>
      <View style={styles.tip}><View style={styles.tipIcon}><Ionicons name="bulb-outline" size={20} color={CAMPUS.accent}/></View><View style={{ flex: 1 }}><Text style={styles.tipTitle}>QUICK TIP</Text><Text style={styles.tipText}>Swipe up from the bottom for all your campus tools.</Text></View><Ionicons name="chevron-up" size={18} color={CAMPUS.accent}/></View>
      <View style={styles.developerCard}>
        <View style={styles.developerIcon}><Ionicons name="code-slash" size={20} color={CAMPUS.accent}/></View>
        <View style={styles.developerInfo}>
          <Text style={styles.developerLabel}>CRAFTED WITH PASSION BY</Text>
          <Text style={styles.developerName}>Mark Arvi S. Carmelotes</Text>
          <Text style={styles.developerRole}>Developer • QR Attendance System</Text>
        </View>
        <View style={styles.developerBadge}><Ionicons name="sparkles" size={15} color={CAMPUS.mint}/></View>
      </View>
    </ScrollView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: CAMPUS.bg },
  content: { width: '100%', maxWidth: 590, alignSelf: 'center', paddingHorizontal: 22, paddingTop: 18, paddingBottom: 114 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 }, brandIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: '#302958', borderWidth: 1, borderColor: '#57518E', alignItems: 'center', justifyContent: 'center' },
  brandName: { color: CAMPUS.text, fontSize: 17, fontWeight: '900', letterSpacing: 1.2 }, brandSub: { color: CAMPUS.textFaint, fontSize: 9, letterSpacing: 1.4, marginTop: 2, fontWeight: '700' },
  livePill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 50, borderWidth: 1, borderColor: '#326B68', paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#173B42' }, liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: CAMPUS.mint }, liveText: { fontSize: 9, fontWeight: '900', color: CAMPUS.mint, letterSpacing: 0.7 },
  hero: { borderRadius: 32, backgroundColor: '#211E46', borderWidth: 1, borderColor: '#414476', padding: 25, overflow: 'hidden', marginBottom: 32 },
  heroGlow: { position: 'absolute', width: 210, height: 210, borderRadius: 110, backgroundColor: '#56439C', top: -105, right: -85, opacity: 0.65 },
  heroBadge: { flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', gap: 7, backgroundColor: '#2B3059', borderColor: '#4F5390', borderWidth: 1, borderRadius: 99, paddingVertical: 7, paddingHorizontal: 11, marginBottom: 30 }, heroBadgeText: { color: CAMPUS.accent, fontWeight: '800', fontSize: 9, letterSpacing: 1.2 },
  heroEyebrow: { color: '#C4B7FF', fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 11 }, heroTitle: { color: CAMPUS.text, fontWeight: '900', fontSize: 38, lineHeight: 47, letterSpacing: -1.2 }, heroAccent: { color: CAMPUS.accent }, heroSubtitle: { color: CAMPUS.textMuted, fontSize: 14, lineHeight: 22, marginTop: 15, maxWidth: 340 },
  heroDivider: { height: 1, backgroundColor: '#3B3F69', marginTop: 27, marginBottom: 17 }, heroFoot: { flexDirection: 'row', alignItems: 'center', gap: 8 }, heroFootText: { color: '#C3C5E8', fontSize: 12, fontWeight: '600' },
  sectionLine: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }, sectionEyebrow: { fontSize: 10, letterSpacing: 2, color: CAMPUS.accent, fontWeight: '900', marginBottom: 7 }, sectionTitle: { fontSize: 21, color: CAMPUS.text, fontWeight: '800', letterSpacing: -0.6 },
  actionArea: { gap: 11 }, tip: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#1B2141', borderWidth: 1, borderColor: '#383C6E', borderRadius: 19, padding: 14, marginTop: 22 }, tipIcon: { height: 40, width: 40, backgroundColor: '#292E57', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, tipTitle: { color: CAMPUS.accent, fontSize: 9, fontWeight: '900', letterSpacing: 1.3 }, tipText: { color: CAMPUS.textMuted, fontSize: 12, lineHeight: 18, marginTop: 4 }, developerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C2144', borderWidth: 1, borderColor: '#434579', borderRadius: 22, padding: 17, marginTop: 30, gap: 13 },
  developerIcon: { width: 46, height: 46, borderRadius: 15, backgroundColor: '#302A5C', borderWidth: 1, borderColor: '#5B4C9C', alignItems: 'center', justifyContent: 'center' },
  developerInfo: { flex: 1, minWidth: 0 },
  developerLabel: { color: CAMPUS.accent, fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginBottom: 5 },
  developerName: { color: CAMPUS.text, fontSize: 14, fontWeight: '900' },
  developerRole: { color: CAMPUS.textMuted, fontSize: 10, marginTop: 5 },
  developerBadge: { width: 30, height: 30, borderRadius: 10, backgroundColor: '#234B50', alignItems: 'center', justifyContent: 'center' },
});
