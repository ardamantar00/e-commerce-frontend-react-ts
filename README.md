# 🛒 E-Commerce Frontend (React + TypeScript)

Bu proje, **React + TypeScript** kullanılarak geliştirilmiş bir **e-ticaret frontend** uygulamasıdır. Modern frontend araçları ve state management yapıları kullanılarak ölçeklenebilir bir mimari hedeflenmiştir.

---

## 🚀 Kullanılan Teknolojiler

* ⚛️ **React**
* 🟦 **TypeScript**
* ⚡ **Vite**
* 🧰 **Redux Toolkit**
* 🎨 **MUI (Material UI)**
* 🔔 **React Toastify**
* 🧪 **ESLint**
* 🗄 **JSON Server** (Mock API)

---

## 📦 Proje Scriptleri

```bash
npm run dev       # Development ortamını başlatır
npm run build     # TypeScript build + Vite production build
npm run preview   # Production build önizleme
npm run lint      # ESLint kontrolü
npm run server    # JSON Server (Mock API) çalıştırır
```

---

## 🗂 JSON Server

Proje, backend ihtiyacını karşılamak için **json-server** kullanmaktadır.

* 📁 Konum: `src/jsonserver/db.json`
* 🌐 Port: `http://localhost:3001`

Server’ı çalıştırmak için:

```bash
npm run server
```

---

## 🛍️ Özellikler

* 🔍 Ürün listeleme
* 🧺 Sepete ürün ekleme / çıkarma
* 💰 Toplam tutar hesaplama
* 🛒 Satın alma simülasyonu
* 📂 Kategori bazlı filtreleme
* ⚡ Redux ile global state yönetimi

---

## 📁 Proje Yapısı (Özet)

```
src/
 ├─ components/
 ├─ pages/
 ├─ redux/
 │   ├─ basketSlice.ts
 │   ├─ appSlice.ts
 ├─ services/
 ├─ jsonserver/
 │   └─ db.json
 └─ types/
```

---

## ▶️ Kurulum

```bash
git clone https://github.com/ardamantar00/e-commerce-frontend-react-ts.git
cd e-commerce-frontend-react-ts
npm install
```

Ardından iki terminal açman önerilir:

```bash
npm run dev
npm run server
```

---

## 🎯 Amaç

Bu proje; **React, TypeScript, Redux Toolkit** bilgilerini pekiştirmek ve gerçek bir e-ticaret uygulamasının frontend mimarisini deneyimlemek amacıyla geliştirilmiştir.

