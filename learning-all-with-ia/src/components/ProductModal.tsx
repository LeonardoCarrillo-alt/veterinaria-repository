import React, { useState } from "react";

export default function ProductModal({ onClose, onProductCreated }: any) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      alert("Completa los campos obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:5004/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: Number(form.price),
          stock: Number(form.stock),
          imageUrl: form.imageUrl
        })
      });

      if (!res.ok) throw new Error();

      onProductCreated();
      onClose();

    } catch (error) {
      alert("Error al crear producto");
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "350px",
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "5px 10px",
            cursor: "pointer"
          }}
        >
          X
        </button>

        <h2>Crear Producto</h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            name="name"
            placeholder="Nombre"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Descripción"
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Precio"
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            onChange={handleChange}
          />

          <input
            name="imageUrl"
            placeholder="URL Imagen (opcional)"
            onChange={handleChange}
          />

          <button type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}