
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./FormularioSilos.css";

function FormularioSilos() {
  // Fecha y hora actuales por defecto
  const now = new Date();
  const defaultFecha = now.toISOString().slice(0, 10);
  const defaultHora = now.toTimeString().slice(0, 5);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // Datos del operador
      operador: "",
      fecha: defaultFecha,
      hora: defaultHora,

      // Silos de materias primas (8 silos en total)
      silos: {
        c1_matriz: { tipo: "", medicion: "" },
        b1_matriz: { tipo: "", medicion: "" },
        a1_matriz: { tipo: "", medicion: "" },
        c2_matriz: { tipo: "", medicion: "" },
        b2_nitrato: { tipo: "", medicion: "" },
        a1_nitrato: { tipo: "", medicion: "" },
        c3_nitrato: { tipo: "", medicion: "" },
        a3_nitrato: { tipo: "", medicion: "" },
      },

      // Camiones fábrica (hasta 14)
      camionesFabrica: [],

      // Recepción de camiones
      recepcionCamiones: [],

      // Unificación ARL + Stock en 3x3
      // Estructura:
      // - Petróleo: stock, recepcion, paraMezcla
      // - Mezcla: stock, (porcentajes calculados), fabricada (calculada)
      // - Aceite: stock, recepcion, paraMezcla
      gridARLStock: {
        petroleo_stock: "",
        petroleo_recepcion: "",
        petroleo_paraMezcla: "",
        mezcla_stock: "",
        aceite_stock: "",
        aceite_recepcion: "",
        aceite_paraMezcla: "",
      },
    },
  });

  // Arrays dinámicos
  const {
    fields: camionesFabricaFields,
    append: appendCamionFabrica,
    remove: removeCamionFabrica,
  } = useFieldArray({
    control,
    name: "camionesFabrica",
  });

  const {
    fields: recepcionCamionesFields,
    append: appendRecepcionCamion,
    remove: removeRecepcionCamion,
  } = useFieldArray({
    control,
    name: "recepcionCamiones",
  });

  const onSubmit = (data) => {
    // Cálculos derivados para la grilla 3x3
    const p = parseFloat(data.gridARLStock.petroleo_paraMezcla || 0);
    const a = parseFloat(data.gridARLStock.aceite_paraMezcla || 0);
    const totalMezcla = p + a;
    const pctPetroleo = totalMezcla > 0 ? (p / totalMezcla) * 100 : 0;
    const pctAceite = totalMezcla > 0 ? (a / totalMezcla) * 100 : 0;

    const enriched = {
      ...data,
      calculos: {
        mezcla_fabricada: totalMezcla,
        mezcla_porcentajes: {
          petroleo: Number(pctPetroleo.toFixed(2)),
          aceite: Number(pctAceite.toFixed(2)),
        },
      },
    };

    console.log("Datos del formulario:", enriched);
    alert("Formulario enviado. Revisa la consola para ver los datos y cálculos.");
  };

  // Watch para cálculos en vivo en la UI
  const petroleoPara = parseFloat(
    watch("gridARLStock.petroleo_paraMezcla") || 0
  );
  const aceitePara = parseFloat(watch("gridARLStock.aceite_paraMezcla") || 0);
  const mezclaFabricada = petroleoPara + aceitePara;
  const pctPetroleo =
    mezclaFabricada > 0 ? (petroleoPara / mezclaFabricada) * 100 : 0;
  const pctAceite =
    mezclaFabricada > 0 ? (aceitePara / mezclaFabricada) * 100 : 0;

  // Helpers UI
  const agregarCamionFabrica = () => {
    if (camionesFabricaFields.length < 14) {
      appendCamionFabrica({
        idCamion: "",
        tipoNitrato: "",
        kilosNitrato: "",
        tipoMatriz: "",
        kilosMatriz: "",
      });
    }
  };

  const agregarRecepcionCamion = () => {
    appendRecepcionCamion({
      idCamion: "",
      material: "",
      kilos: "",
    });
  };

  return (
    <div className="formulario-container">
      <h1>Control de Silos y Materiales</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* SECCIÓN 1: DATOS DEL OPERADOR */}
        <section className="seccion">
          <h2>1. Datos del Operador</h2>
          <div className="grid-operador">
            <div className="campo">
              <label>Operador:</label>
              <input
                {...register("operador", { required: "El operador es obligatorio" })}
                type="text"
              />
              {errors.operador && (
                <span className="error">{errors.operador.message}</span>
              )}
            </div>

            <div className="campo">
              <label>Fecha:</label>
              <input
                {...register("fecha", { required: "La fecha es obligatoria" })}
                type="date"
              />
              {errors.fecha && (
                <span className="error">{errors.fecha.message}</span>
              )}
            </div>

            <div className="campo">
              <label>Hora:</label>
              <input
                {...register("hora", { required: "La hora es obligatoria" })}
                type="time"
              />
              {errors.hora && <span className="error">{errors.hora.message}</span>}
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: SILOS DE MATERIAS PRIMAS */}
        <section className="seccion">
          <h2>2. Silos de Materias Primas</h2>
          <div className="grid-silos">
            {/* Fila 1 */}
            <div className="fila-silos">
              <div className="silo-card matriz">
                <h4 className="silo-header">C1 Matriz</h4>
                <label>Tipo de Matriz:</label>
                <select {...register("silos.c1_matriz.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="matriz_a">Matriz A</option>
                  <option value="matriz_b">Matriz B</option>
                  <option value="matriz_c">Matriz C</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.c1_matriz.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="silo-card matriz">
                <h4 className="silo-header">B1 Matriz</h4>
                <label>Tipo de Matriz:</label>
                <select {...register("silos.b1_matriz.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="matriz_a">Matriz A</option>
                  <option value="matriz_b">Matriz B</option>
                  <option value="matriz_c">Matriz C</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.b1_matriz.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="silo-card matriz">
                <h4 className="silo-header">A1 Matriz</h4>
                <label>Tipo de Matriz:</label>
                <select {...register("silos.a1_matriz.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="matriz_a">Matriz A</option>
                  <option value="matriz_b">Matriz B</option>
                  <option value="matriz_c">Matriz C</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.a1_matriz.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>
            </div>

            {/* Fila 2 */}
            <div className="fila-silos">
              <div className="silo-card matriz">
                <h4 className="silo-header">C2 Matriz</h4>
                <label>Tipo de Matriz:</label>
                <select {...register("silos.c2_matriz.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="matriz_a">Matriz A</option>
                  <option value="matriz_b">Matriz B</option>
                  <option value="matriz_c">Matriz C</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.c2_matriz.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="silo-card nitrato">
                <h4 className="silo-header">B2 Nitrato</h4>
                <label>Tipo de Nitrato:</label>
                <select {...register("silos.b2_nitrato.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="nitrato_amonio">Nitrato de Amonio</option>
                  <option value="nitrato_calcio">Nitrato de Calcio</option>
                  <option value="nitrato_potasio">Nitrato de Potasio</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.b2_nitrato.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="silo-card nitrato">
                <h4 className="silo-header">A1 Nitrato</h4>
                <label>Tipo de Nitrato:</label>
                <select {...register("silos.a1_nitrato.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="nitrato_amonio">Nitrato de Amonio</option>
                  <option value="nitrato_calcio">Nitrato de Calcio</option>
                  <option value="nitrato_potasio">Nitrato de Potasio</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.a1_nitrato.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>
            </div>

            {/* Fila 3 */}
            <div className="fila-silos">
              <div className="silo-card nitrato">
                <h4 className="silo-header">C3 Nitrato</h4>
                <label>Tipo de Nitrato:</label>
                <select {...register("silos.c3_nitrato.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="nitrato_amonio">Nitrato de Amonio</option>
                  <option value="nitrato_calcio">Nitrato de Calcio</option>
                  <option value="nitrato_potasio">Nitrato de Potasio</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.c3_nitrato.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>

              <div className="silo-vacio">
                <h4>Sin Silo</h4>
                <p>Espacio vacío</p>
              </div>

              <div className="silo-card nitrato">
                <h4 className="silo-header">A3 Nitrato</h4>
                <label>Tipo de Nitrato:</label>
                <select {...register("silos.a3_nitrato.tipo")}>
                  <option value="">Seleccionar...</option>
                  <option value="nitrato_amonio">Nitrato de Amonio</option>
                  <option value="nitrato_calcio">Nitrato de Calcio</option>
                  <option value="nitrato_potasio">Nitrato de Potasio</option>
                </select>
                <label>Medición (mts):</label>
                <input
                  {...register("silos.a3_nitrato.medicion")}
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: CAMIONES FÁBRICA */}
        <section className="seccion">
          <h2>3. Camiones Fábrica</h2>
          <button
            type="button"
            onClick={agregarCamionFabrica}
            className="btn-agregar"
            disabled={camionesFabricaFields.length >= 14}
          >
            Agregar Camión ({camionesFabricaFields.length}/14)
          </button>

          <div className="camiones-grid">
            {camionesFabricaFields.map((field, index) => (
              <div key={field.id} className="camion-card">
                <h4>Camión {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeCamionFabrica(index)}
                  className="btn-eliminar"
                >
                  ✕
                </button>

                <label>ID Camión:</label>
                <input {...register(`camionesFabrica.${index}.idCamion`)} />

                <label>Tipo Nitrato:</label>
                <select {...register(`camionesFabrica.${index}.tipoNitrato`)}>
                  <option value="">Seleccionar...</option>
                  <option value="nitrato_amonio">Nitrato de Amonio</option>
                  <option value="nitrato_calcio">Nitrato de Calcio</option>
                  <option value="nitrato_potasio">Nitrato de Potasio</option>
                </select>

                <label>Kilos Nitrato:</label>
                <input
                  {...register(`camionesFabrica.${index}.kilosNitrato`)}
                  type="number"
                />

                <label>Tipo Matriz:</label>
                <select {...register(`camionesFabrica.${index}.tipoMatriz`)}>
                  <option value="">Seleccionar...</option>
                  <option value="matriz_a">Matriz A</option>
                  <option value="matriz_b">Matriz B</option>
                  <option value="matriz_c">Matriz C</option>
                </select>

                <label>Kilos Matriz:</label>
                <input
                  {...register(`camionesFabrica.${index}.kilosMatriz`)}
                  type="number"
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 4: RECEPCIÓN DE CAMIONES */}
        <section className="seccion">
          <h2>4. Recepción de Camiones</h2>
          <button
            type="button"
            onClick={agregarRecepcionCamion}
            className="btn-agregar"
          >
            Agregar Camión de Recepción
          </button>

          <div className="camiones-grid">
            {recepcionCamionesFields.map((field, index) => (
              <div key={field.id} className="camion-card">
                <h4>Recepción {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeRecepcionCamion(index)}
                  className="btn-eliminar"
                >
                  ✕
                </button>

                <label>ID Camión:</label>
                <input {...register(`recepcionCamiones.${index}.idCamion`)} />

                <label>Material:</label>
                <select {...register(`recepcionCamiones.${index}.material`)}>
                  <option value="">Seleccionar...</option>
                  <option value="nitrato_amonio">Nitrato de Amonio</option>
                  <option value="nitrato_calcio">Nitrato de Calcio</option>
                  <option value="matriz_a">Matriz A</option>
                  <option value="matriz_b">Matriz B</option>
                  <option value="petroleo">Petróleo</option>
                  <option value="aceite">Aceite</option>
                </select>

                <label>Kilos:</label>
                <input
                  {...register(`recepcionCamiones.${index}.kilos`)}
                  type="number"
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 5-6: ARL + STOCK (Grilla 3x3) */}
        <section className="seccion">
          <h2>5-6. Planta ARL + Stock (Grilla 3x3)</h2>

          <div className="grid-3x3">
            {/* FILA 1 */}
            <div className="grid-card amarillo">
              <h4>Petróleo Stock</h4>
              <input
                {...register("gridARLStock.petroleo_stock")}
                type="number"
                step="0.01"
                placeholder="m³ o L (según criterio)"
              />
            </div>

            <div className="grid-card amarillo">
              <h4>Petróleo Recepción</h4>
              <input
                {...register("gridARLStock.petroleo_recepcion")}
                type="number"
                step="0.01"
                placeholder="Cantidad recibida"
              />
            </div>

            <div className="grid-card amarillo">
              <h4>Petróleo para Mezcla</h4>
              <input
                {...register("gridARLStock.petroleo_paraMezcla")}
                type="number"
                step="0.01"
                placeholder="Cantidad destinada a mezcla"
              />
            </div>

            {/* FILA 2 */}
            <div className="grid-card azul">
              <h4>Mezcla Stock</h4>
              <input
                {...register("gridARLStock.mezcla_stock")}
                type="number"
                step="0.01"
                placeholder="Stock actual"
              />
            </div>

            <div className="grid-card azul">
              <h4>Mezcla (Porcentajes)</h4>
              <div className="porcentajes">
                <div>Petroleo: {pctPetroleo.toFixed(2)}%</div>
                <div>Aceite: {pctAceite.toFixed(2)}%</div>
              </div>
              <small>
                Calculado según “Petróleo para Mezcla” y “Aceite para Mezcla”
              </small>
            </div>

            <div className="grid-card azul">
              <h4>Mezcla fabricada</h4>
              <input
                type="number"
                value={Number.isFinite(mezclaFabricada) ? mezclaFabricada : 0}
                readOnly
              />
              <small>Suma de Petróleo + Aceite utilizados</small>
            </div>

            {/* FILA 3 */}
            <div className="grid-card verde">
              <h4>Aceite Stock</h4>
              <input
                {...register("gridARLStock.aceite_stock")}
                type="number"
                step="0.01"
                placeholder="m³ o L (según criterio)"
              />
            </div>

            <div className="grid-card verde">
              <h4>Aceite Recepción</h4>
              <input
                {...register("gridARLStock.aceite_recepcion")}
                type="number"
                step="0.01"
                placeholder="Cantidad recibida"
              />
            </div>

            <div className="grid-card verde">
              <h4>Aceite para Mezcla</h4>
              <input
                {...register("gridARLStock.aceite_paraMezcla")}
                type="number"
                step="0.01"
                placeholder="Cantidad destinada a mezcla"
              />
            </div>
          </div>
        </section>

        {/* BOTÓN DE ENVÍO */}
        <div className="submit-section">
          <button type="submit" className="btn-submit">
            Enviar Formulario
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioSilos;