import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CAMPUS } from '@/constants/colors';

type IconName = keyof typeof Ionicons.glyphMap;
type DrawerItem = { label: string; route: string; icon: IconName; roles?: ('teacher' | 'admin')[] };
const ITEMS: DrawerItem[] = [
  { label: 'Home', route: '/(tabs)', icon: 'home-outline' },
  { label: 'Scan QR', route: '/(tabs)/scan', icon: 'qr-code-outline' },
  { label: 'Attendance History', route: '/(tabs)/history', icon: 'time-outline' },
  { label: 'Insights & Reminders', route: '/(tabs)/insights', icon: 'analytics-outline' },
  { label: 'Live Monitor', route: '/(tabs)/live-monitor', icon: 'pulse-outline', roles: ['teacher', 'admin'] },
  { label: 'Profile', route: '/(tabs)/profile', icon: 'person-outline' },
  { label: 'Teacher', route: '/(tabs)/teacher', icon: 'school-outline', roles: ['teacher', 'admin'] },
  { label: 'Admin', route: '/(tabs)/admin', icon: 'shield-checkmark-outline', roles: ['admin'] },
];

export default function AppDrawer({ role }: { role: 'student' | 'teacher' | 'admin' | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(Dimensions.get('window').height);
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const sheetHeight = Math.min(height * 0.84, 740);
  const translateY = useRef(new Animated.Value(0)).current;
  const backdropOpacity = translateY.interpolate({ inputRange: [0, sheetHeight], outputRange: [1, 0], extrapolate: 'clamp' });
  const openRef = useRef(false);
  const draggingFrom = useRef(0);
  const visibleItems = useMemo(() => ITEMS.filter(item => !item.roles || (!!role && item.roles.includes(role as 'teacher' | 'admin'))), [role]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => { setHeight(window.height); setWidth(window.width); });
    return () => subscription.remove();
  }, []);

  const springTo = (value: number, done?: () => void) => {
    translateY.stopAnimation();
    Animated.spring(translateY, { toValue: value, useNativeDriver: true, damping: 28, stiffness: 260, mass: 0.85, overshootClamping: true }).start(({ finished }) => {
      if (finished && value === sheetHeight) { openRef.current = false; setOpen(false); done?.(); }
    });
  };
  const show = () => {
    if (openRef.current) return;
    translateY.stopAnimation();
    translateY.setValue(sheetHeight);
    openRef.current = true;
    setOpen(true);
    requestAnimationFrame(() => springTo(0));
  };
  const hide = (done?: () => void) => springTo(sheetHeight, done);

  // The header is a dedicated gesture target so scrolling menu items remains unhindered.
  const sheetPan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dy) > 5 && Math.abs(g.dy) > Math.abs(g.dx) * 1.2,
    onPanResponderGrant: () => { translateY.stopAnimation(v => { draggingFrom.current = v; }); },
    onPanResponderMove: (_e, g) => translateY.setValue(Math.max(0, Math.min(sheetHeight, draggingFrom.current + g.dy))),
    onPanResponderRelease: (_e, g) => { if (g.dy > sheetHeight * 0.24 || g.vy > 0.65) hide(); else springTo(0); },
    onPanResponderTerminate: () => springTo(0),
  })).current;
  const openerPan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_e, g) => g.dy < -8 && Math.abs(g.dy) > Math.abs(g.dx),
    onPanResponderGrant: () => { translateY.stopAnimation(); translateY.setValue(sheetHeight); openRef.current = true; setOpen(true); },
    onPanResponderMove: (_e, g) => translateY.setValue(Math.max(0, Math.min(sheetHeight, sheetHeight + g.dy))),
    onPanResponderRelease: (_e, g) => { if (g.dy < -55 || g.vy < -0.5) springTo(0); else hide(); },
    onPanResponderTerminate: () => hide(),
  })).current;

  return <>
    {!open && <View style={[styles.openerWrap, { bottom: Math.max(insets.bottom, 10) + 6 }]} {...openerPan.panHandlers}>
      <Pressable onPress={show} accessibilityRole="button" accessibilityLabel="Open navigation menu" style={({ pressed }) => [styles.opener, pressed && { opacity: 0.85 }]}>
        <View style={styles.openerIcon}><Ionicons name="apps" size={18} color={CAMPUS.bgDeep}/></View>
        <View style={styles.openerCopy}><Text style={styles.openerTitle}>Explore QR-ATT</Text><Text style={styles.openerCaption}>Swipe up for navigation</Text></View>
        <Ionicons name="chevron-up" size={19} color={CAMPUS.accent} />
      </Pressable>
    </View>}
    {open && <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View pointerEvents="none" style={[styles.backdrop, { opacity: backdropOpacity }]} />
      <Pressable accessibilityLabel="Close navigation menu" accessibilityRole="button" onPress={() => hide()} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.sheet, { height: sheetHeight, paddingBottom: Math.max(insets.bottom, 18), transform: [{ translateY }] }]}>
        <View style={styles.dragRegion} {...sheetPan.panHandlers}>
          <View style={styles.grabber}/>
          <View style={styles.sheetHeading}>
            <View style={styles.sheetBrand}><Ionicons name="scan" size={23} color={CAMPUS.accent}/></View>
            <View style={{ flex: 1 }}><Text style={styles.eyebrow}>YOUR WORKSPACE</Text><Text style={styles.sheetTitle}>Navigate your campus</Text></View>
            <Pressable onPress={() => hide()} accessibilityRole="button" accessibilityLabel="Close menu" style={styles.xButton}><Ionicons name="close" size={19} color={CAMPUS.textMuted}/></Pressable>
          </View>
          <Text style={styles.subheading}>Everything you need, one tap away.</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={styles.grid} bounces={false}>
          {visibleItems.map(item => {
            const active = pathname === item.route || (item.route === '/(tabs)' && (pathname === '/' || pathname === '/(tabs)'));
            return <Pressable key={item.route} accessibilityRole="button" accessibilityLabel={item.label} accessibilityState={{ selected: active }} onPress={() => hide(() => router.push(item.route as any))} style={({ pressed }) => [styles.item, { width: width >= 600 ? '23%' : '47%' }, active && styles.itemActive, pressed && styles.pressed]}>
              <View style={[styles.iconBox, active && styles.iconBoxActive]}><Ionicons name={item.icon} size={23} color={active ? CAMPUS.bgDeep : CAMPUS.accent} /></View>
              <Text style={[styles.itemLabel, active && styles.itemLabelActive]} numberOfLines={2}>{item.label}</Text>
              <Ionicons name="arrow-up-forward" size={14} color={active ? CAMPUS.accent : CAMPUS.textFaint} style={styles.cornerArrow}/>
            </Pressable>;
          })}
        </ScrollView>
        <View style={styles.footer}><View style={styles.footerDot}/><Text style={styles.footerText}>QR-ATT  /  CAMPUS CONNECTED</Text><Ionicons name="shield-checkmark-outline" size={15} color={CAMPUS.mint}/></View>
      </Animated.View>
    </View>}
  </>;
}

const styles = StyleSheet.create({
  openerWrap: { position: 'absolute', alignSelf: 'center', zIndex: 20, width: 'auto', maxWidth: '95%' },
  opener: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#202447', paddingVertical: 10, paddingLeft: 10, paddingRight: 18, borderWidth: 1, borderColor: '#414675', borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
  openerIcon: { backgroundColor: CAMPUS.accent, width: 38, height: 38, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  openerCopy: { minWidth: 145 }, openerTitle: { color: CAMPUS.text, fontSize: 13, fontWeight: '800' }, openerCaption: { color: CAMPUS.textMuted, fontSize: 10, marginTop: 2 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: '#070912', opacity: 0.7 },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: CAMPUS.bgDeep, borderTopLeftRadius: 32, borderTopRightRadius: 32, borderWidth: 1, borderColor: '#37385E', overflow: 'hidden', paddingHorizontal: 20, paddingTop: 10, shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 30, elevation: 25 },
  dragRegion: { paddingBottom: 17 }, grabber: { alignSelf: 'center', width: 42, height: 5, borderRadius: 100, backgroundColor: '#8485B2', marginBottom: 23 },
  sheetHeading: { flexDirection: 'row', alignItems: 'center', gap: 13 }, sheetBrand: { width: 49, height: 49, borderRadius: 16, backgroundColor: '#292B56', borderWidth: 1, borderColor: '#4A4780', alignItems: 'center', justifyContent: 'center' },
  eyebrow: { color: CAMPUS.accent, fontWeight: '800', letterSpacing: 2, fontSize: 9 }, sheetTitle: { color: CAMPUS.text, fontWeight: '800', fontSize: 22, marginTop: 3, letterSpacing: -0.5 },
  xButton: { backgroundColor: CAMPUS.surfaceStrong, borderRadius: 18, width: 37, height: 37, alignItems: 'center', justifyContent: 'center' }, subheading: { color: CAMPUS.textMuted, fontSize: 13, marginTop: 13 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 11, paddingBottom: 15 },
  item: { minHeight: 114, backgroundColor: CAMPUS.surface, borderRadius: 24, borderWidth: 1, borderColor: CAMPUS.border, padding: 15, justifyContent: 'space-between', gap: 8 },
  itemActive: { backgroundColor: '#342A69', borderColor: '#7568D9' }, pressed: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  iconBox: { backgroundColor: '#2D2B56', width: 43, height: 43, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, iconBoxActive: { backgroundColor: CAMPUS.accent },
  itemLabel: { fontSize: 13, fontWeight: '700', color: CAMPUS.text, maxWidth: '90%' }, itemLabelActive: { color: '#F7F4FF' }, cornerArrow: { position: 'absolute', right: 15, top: 17 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 14, borderTopWidth: 1, borderTopColor: CAMPUS.border }, footerDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: CAMPUS.mint }, footerText: { color: CAMPUS.textFaint, flex: 1, letterSpacing: 1, fontSize: 9, fontWeight: '800' },
});
