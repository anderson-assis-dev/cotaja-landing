export const APPLE_APP_URL='https://apps.apple.com/br/app/cotaja/id6753153412';
export const GOOGLE_PLAY_URL='https://play.google.com/store/apps/details?id=com.cotaja_rn';
export const getAppUrl=()=>{
  if(typeof navigator==='undefined')return APPLE_APP_URL;
  const ua=String(navigator.userAgent||'');
  if(/android/i.test(ua))return GOOGLE_PLAY_URL;
  if(/iphone|ipad|ipod/i.test(ua))return APPLE_APP_URL;
  return APPLE_APP_URL;
};
