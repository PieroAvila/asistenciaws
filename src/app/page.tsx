"use client";
import SelectorPersonal from "@/components/selectorPersonal";
import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AsistenciaPage() {
  const [nombreSeleccionado, setNombreSeleccionado] = useState<string>("");

  const registrarAsistencia = async () => {
    if (!nombreSeleccionado) {
      alert("Selecciona un nombre");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);

    const q = query(
      collection(db, "asistencia"),
      where("nombre", "==", nombreSeleccionado),
      where("fecha", ">=", Timestamp.fromDate(hoy)),
      where("fecha", "<", Timestamp.fromDate(mañana))
    );

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      alert("Este personal ya registró asistencia hoy.");
      return;
    }

    await addDoc(collection(db, "asistencia"), {
      nombre: nombreSeleccionado,
      asistio: true,
      fecha: Timestamp.now(),
    });

    alert("Asistencia registrada correctamente.");
    setNombreSeleccionado("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">REGISTRAR ASISTENCIA</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <label className="block mb-2 font-semibold">Nombre</label>
          <SelectorPersonal onSelect={(nombre) => setNombreSeleccionado(nombre)} />

          <button
            type="button"
            onClick={registrarAsistencia}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrar asistencia
          </button>
        </form>
      </div>
    </main>
  );
}
