import React, {useState, useEffect} from "react";
import axios from "axios";

interface DatosInterface {
    restauranteId:string;
}
const ModificarImagenesRestaurante: React.FC<DatosInterface> = ({restauranteId}) => {
    const [imagenPrincipalBase64, setImagenPrincipalBase64] = useState("");
    const [imagenesBase64, setImagenesBase64] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRestaurante = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/restaurantes/${restauranteId}`);
                const {imagenPrincipal, imagenes} = response.data;
                setImagenPrincipalBase64(imagenPrincipal || "");
                setImagenesBase64(imagenes || []);
            } catch (error) {
                console.error("Error al cargar las imágenes del restaurante:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRestaurante();
    }, [restauranteId]);

    const handleImagenPrincipal = (event: any) => {
        const archivo = event.target.files[0];
        if (archivo) {
            const reader = new FileReader();
            //reader.onloadend = () => setImagenPrincipalBase64(reader.result);
            reader.onerror = (error) =>
                console.error("Error al cargar la imagen principal:", error);
            reader.readAsDataURL(archivo);
        }
    };

    const handleImagenesGaleria = async (event: any) => {
        const archivos = event.target.files;
        const promesas = Array.from(archivos).map((archivo) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                //reader.readAsDataURL(archivo);
            });
        });

        try {
            const resultados = await Promise.all(promesas);
            //setImagenesBase64([...imagenesBase64, ...resultados]);
        } catch (error) {
            console.error("Error al convertir las imágenes de la galería:", error);
        }
    };

    const handleEliminarImagenGaleria = (index: number) => {
        const nuevasImagenes = [...imagenesBase64];
        nuevasImagenes.splice(index, 1);
        setImagenesBase64(nuevasImagenes);
    };

    const handleGuardarCambios = async () => {
        const payload = {
            imagenPrincipal: imagenPrincipalBase64,
            imagenes: imagenesBase64,
        };

        try {
            setIsLoading(true);
            const response = await axios.put(
                `/api/restaurantes/${restauranteId}/imagenes`,
                payload
            );
            console.log("Imágenes actualizadas:", response.data);
            alert("Imágenes actualizadas correctamente.");
        } catch (error) {
            console.error("Error al actualizar las imágenes:", error);
            alert("Error al actualizar las imágenes.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <p>Cargando...</p>;

    return (
        <div className="container mt-4">
            <h1 className="text-2xl font-bold mb-4">Modificar Imágenes</h1>

            <div className="mb-4">
                <label className="block font-bold">Imagen Principal</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImagenPrincipal}
                    className="form-control"
                />
                {imagenPrincipalBase64 && (
                    <img
                        src={imagenPrincipalBase64}
                        alt="Imagen Principal"
                        className="mt-2 w-32 h-32 object-cover border"
                    />
                )}
            </div>

            <div className="mb-4">
                <label className="block font-bold">Galería de Imágenes</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImagenesGaleria}
                    className="form-control"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                    {imagenesBase64.map((imagen, index) => (
                        <div key={index} className="relative">
                            <img
                                src={imagen}
                                alt={`Imagen ${index + 1}`}
                                className="w-32 h-32 object-cover border"
                            />
                            <button
                                type="button"
                                onClick={() => handleEliminarImagenGaleria(index)}
                                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={handleGuardarCambios}
                className="btn btn-primary"
                disabled={isLoading}
            >
                Guardar Cambios
            </button>
        </div>
    );
};

export default ModificarImagenesRestaurante;
