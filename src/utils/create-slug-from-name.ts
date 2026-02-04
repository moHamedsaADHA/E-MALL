function createSlugFromName(name:string) {
  return name
    .toString()               // تأكد إنه string
    .toLowerCase()            // حروف صغيرة
    .trim()                   // إزالة مسافات البداية والنهاية
    .replace(/\s+/g, '-')     // المسافات → -
    .replace(/[^a-z0-9-]/g, '') // احتفظ بحروف إنجليزية + أرقام + -
    .replace(/-+/g, '-')      // --- → -
    .replace(/^-+|-+$/g, ''); // إزالة - من البداية والنهاية
}
export default createSlugFromName