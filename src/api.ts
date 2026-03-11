import type {
  // VanResponse,
  // VanDetailResponse,
  // HostvanDetail,
  // HostVansResponse,
  // Van,
  loginFormDatatype,
} from "./type";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore/lite";
import type { Van } from "./type";

/// USING LITE VERSION BECAUSE WE JUST WANT TO READ AND WRITE WE DON'T WANT TO USE OTHER FEATURES LIKE UPDATING REAL TIME DATA AND SO ON.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

////////////FIREBASE
export async function getVans() {
  //// querySnapshot does not return array of data it just contains a meta data about the apps that comes back when we take the snapshot.
  const querySnapshout = await getDocs(vansCollectionRef);
  const dataArr = querySnapshout.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id: string) {
  const docRef = doc(db, "vans", id);
  const vanSnapshot = await getDoc(docRef);

  ///Explicitly type the data
  const data = vanSnapshot.data() as Omit<Van, "id">;
  return {
    ...data,
    id: vanSnapshot.id,
  };
}

export async function getHostVans() {
  const searchQuery = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(searchQuery);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return dataArr;
}

/////////MIRAGE.JS API
// export async function getVans(): Promise<Van[]> {
//   const res = await fetch("/api/vans");

//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }

//   const data: VanResponse = await res.json();
//   return data.vans;
// } #For mirage.js

// export async function getVanDetail(id: number): Promise<Van> {
//   const res = await fetch(`/api/vans/${id}`);

//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch van",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }

//   const data: VanDetailResponse = await res.json();
//   return data.van;
// }

// export async function getHostVanDetail(id: string): Promise<Van> {
//   const res = await fetch(`/api/host/vans/${id}`);
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch van",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }

//   const data: HostvanDetail = await res.json();
//   return data.vans;
// }

// export async function getHostVans(): Promise<Van[]> {
//   const res = await fetch("/api/host/vans");
//   if (!res.ok) {
//     throw {
//       message: "Failed to fetch van",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }

//   const data: HostVansResponse = await res.json();
//   return data.vans;
// }

export async function loginUser(creds: loginFormDatatype) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(creds),
  });
  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
