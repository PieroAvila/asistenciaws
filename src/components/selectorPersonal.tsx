"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface SelectorPersonalProps {
  onSelect: (nombre: string) => void;
}

interface Personal {
  id: string;
  nombre: string;
}

export default function SelectorPersonal({ onSelect }: SelectorPersonalProps) {
  const [personal, setPersonal] = useState<Personal[]>([]);
  const [seleccionado, setSeleccionado] = useState<string>("");

  useEffect(() => {
    const cargarPersonal = async () => {
      const snapshot = await getDocs(collection(db, "personal"));
      const lista: Personal[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setPersonal(lista);
    };
    cargarPersonal();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setSeleccionado(valor);
    onSelect(valor);
  };

  return (
    <select
      className="w-full p-2 border mb-4 rounded"
      value={seleccionado}
      onChange={handleChange}
    >
      <option value="">-- Selecciona un nombre --</option>
      {personal.map((p) => (
        <option key={p.id} value={p.nombre}>
          {p.nombre}
        </option>
      ))}
    </select>
  );
}
