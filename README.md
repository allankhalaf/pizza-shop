# 🍕 بيتزا إيطاليا - لوحة تحكم المدير (Admin Dashboard)

## نظرة عامة

تم إنشاء لوحة تحكم احترافية كاملة لمشروع مطعم بيتزا إيطاليا، مستقلة تماماً عن صفحات الموقع الأصلية دون أي تعديل على الملفات الموجودة.

## 📁 الملفات المُنشأة

### صفحات HTML (داخل مجلد `admin/`)

| الملف | الوصف |
|-------|--------|
| `dashboard.html` | لوحة التحكم الرئيسية مع الإحصائيات والرسوم البيانية |
| `products.html` | إدارة المنتجات مع جدول وفلاتر ونافذة إضافة منتج |
| `orders.html` | إدارة الطلبات مع حالات الطلب وتفاصيل كاملة |
| `customers.html` | إدارة العملاء مع إحصائيات وقائمة العملاء |
| `reviews.html` | إدارة التقييمات مع نظام النجوم وتوزيع التقييمات |
| `settings.html` | إعدادات المطعم الكاملة (معلومات، أوقات، توصيل، دفع، تواصل) |

### ملفات CSS/SCSS

| الملف | المسار | الوصف |
|-------|--------|-------|
| `admin-dashboard.scss` | `src/sass/admin-dashboard.scss` | جميع أنماط لوحة التحكم |
| `admin-dashboard.css` | `admin/css/admin-dashboard.css` | الملف المُترجم (يجب تجميعه) |

### ملفات JavaScript

| الملف | المسار | الوصف |
|-------|--------|-------|
| `admin-dashboard.js` | `src/js/admin-dashboard.js` | جميع وظائف لوحة التحكم |
| `admin-dashboard.js` | `admin/js/admin-dashboard.js` | الملف المُترجم (يجب نسخه) |

## 🏗️ هيكل المجلدات

```
📦 pizza-restaurant/
├── 📁 src/
│   ├── 📁 js/
│   │   ├── main.js (موجود)
│   │   └── admin-dashboard.js (جديد)
│   └── 📁 sass/
│       ├── main.scss (موجود)
│       └── admin-dashboard.scss (جديد)
├── 📁 admin/
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   ├── customers.html
│   ├── reviews.html
│   ├── settings.html
│   ├── 📁 css/
│   │   └── admin-dashboard.css (يجب تجميعه)
│   └── 📁 js/
│       └── admin-dashboard.js (يجب نسخه)
├── 📁 pages/ (موجود)
├── 📁 dist/ (موجود)
├── index.html (موجود)
├── webpack.config.js (موجود - لم يُعدل)
└── package.json (موجود - لم يُعدل)
```

## 🚀 خطوات التشغيل

### 1. تجميع ملف SCSS إلى CSS

```bash
# باستخدام Sass CLI
npx sass src/sass/admin-dashboard.scss admin/css/admin-dashboard.css --watch

# أو باستخدام Webpack (إذا أردت إضافة entry جديد)
```

### 2. نسخ ملف JavaScript

```bash
# نسخ الملف إلى مجلد admin/js/
cp src/js/admin-dashboard.js admin/js/admin-dashboard.js
```

### 3. فتح الصفحات

افتح أي ملف HTML من مجلد `admin/` في المتصفح:
```
admin/dashboard.html
admin/products.html
admin/orders.html
...
```

## 🎨 الميزات

### التصميم
- ✅ تصميم RTL كامل للغة العربية
- ✅ Sidebar قابل للطي/التوسيع
- ✅ تصميم متجاوب (Responsive) لجميع الشاشات
- ✅ ألوان متناسقة مع هوية المطعم
- ✅ رسوم بيانية تفاعلية (Chart.js)

### الوظائف
- ✅ نظام سلة مشتريات متكامل
- ✅ جداول بيانات مع فلاتر وبحث
- ✅ نافذة منبثقة لإضافة/تعديل المنتجات
- ✅ تحديث حالات الطلبات
- ✅ نظام تقييمات مع النجوم
- ✅ إشعارات Toast
- ✅ حفظ حالة Sidebar في localStorage

### الصفحات
| الصفحة | المميزات |
|--------|----------|
| **Dashboard** | إحصائيات، رسوم بيانية، آخر الطلبات، أفضل العملاء |
| **Products** | جدول منتجات، فلاتر، مخزون، إضافة منتج |
| **Orders** | حالات الطلب، تفاصيل الطلب، طرق الدفع |
| **Customers** | إحصائيات العملاء، نشاط، مشتريات |
| **Reviews** | توزيع النجوم، تقييمات، ردود |
| **Settings** | معلومات المطعم، أوقات العمل، توصيل، دفع، تواصل |

## 🔧 ملاحظات هامة

1. **لم يُعدل أي ملف موجود** - جميع الملفات الجديدة مستقلة تماماً
2. **webpack.config.js** - لم يُعدل، يمكنك إضافة entry جديد إذا أردت
3. **package.json** - لم يُعدل، لا حاجة لتثبيت حزم جديدة
4. **الخط Cairo** - مستخدم في جميع الصفحات
5. **Bootstrap 5 RTL** - مستخدم من CDN
6. **Font Awesome 6** - مستخدم من CDN
7. **Chart.js** - مستخدم من CDN (للرسوم البيانية فقط)

## 📞 للدعم

إذا واجهت أي مشكلة في تشغيل لوحة التحكم، تأكد من:
1. تجميع ملف SCSS إلى CSS
2. نسخ ملف JS إلى المجلد الصحيح
3. فتح الملفات من مجلد `admin/`
