// RegisterModal.tsx
import React, {useState} from 'react';
import {useAuth} from '@context/authContext';
import {Modal} from 'react-bootstrap'; // Asegúrate de tener react-bootstrap instalado

interface RegisterModalProps {
    show: boolean;
    onHide: () => void;
}

const RegistroUsuario: React.FC<RegisterModalProps> = ({show, onHide}) => {
    const {registrar, cargando} = useAuth();

    const [formData, setFormData] = useState({
        usuario: '',
        clave: '',
        rol: 'usuario',
        nombre: '',
        celular: '',
        correo: ''
    });

    const [errors, setErrors] = useState({
        usuario: '',
        clave: '',
        nombre: '',
        celular: '',
        correo: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            usuario: '',
            clave: '',
            nombre: '',
            celular: '',
            correo: ''
        };

        if (!formData.usuario) {
            newErrors.usuario = 'El usuario es requerido';
            isValid = false;
        } else if (formData.usuario.length < 4) {
            newErrors.usuario = 'El usuario debe tener al menos 4 caracteres';
            isValid = false;
        }

        if (!formData.clave) {
            newErrors.clave = 'La contraseña es requerida';
            isValid = false;
        } else if (formData.clave.length < 6) {
            newErrors.clave = 'La contraseña debe tener al menos 6 caracteres';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.correo) {
            newErrors.correo = 'El correo es requerido';
            isValid = false;
        } else if (!emailRegex.test(formData.correo)) {
            newErrors.correo = 'Ingresa un correo válido';
            isValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!formData.celular) {
            newErrors.celular = 'El celular es requerido';
            isValid = false;
        } else if (!phoneRegex.test(formData.celular)) {
            newErrors.celular = 'Ingresa un número de celular válido (10 dígitos)';
            isValid = false;
        }

        if (!formData.nombre) {
            newErrors.nombre = 'El nombre es requerido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("registrar");
        if (!validateForm()) {
            return;
        }

        const result = await registrar(formData);
        if (result) {
            // Limpiar el formulario
            setFormData({
                usuario: '',
                clave: '',
                rol: 'usuario',
                nombre: '',
                celular: '',
                correo: ''
            });
            // Cerrar el modal
            onHide();
        }
        return;
    };

    const handleClose = () => {
        // Limpiar errores y formulario al cerrar
        setErrors({
            usuario: '',
            clave: '',
            nombre: '',
            celular: '',
            correo: ''
        });
        setFormData({
            usuario: '',
            clave: '',
            rol: 'usuario',
            nombre: '',
            celular: '',
            correo: ''
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="usuario" className="form-label">Usuario</label>
                        <input
                            type="text"
                            className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                            id="usuario"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            placeholder="Ingrese usuario"
                        />
                        {errors.usuario && <div className="invalid-feedback">{errors.usuario}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="clave" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${errors.clave ? 'is-invalid' : ''}`}
                            id="clave"
                            name="clave"
                            value={formData.clave}
                            onChange={handleChange}
                            placeholder="Ingrese contraseña"
                        />
                        {errors.clave && <div className="invalid-feedback">{errors.clave}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingrese nombre completo"
                        />
                        {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="celular" className="form-label">Celular</label>
                        <input
                            type="tel"
                            className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                            id="celular"
                            name="celular"
                            value={formData.celular}
                            onChange={handleChange}
                            placeholder="Ingrese número de celular"
                        />
                        {errors.celular && <div className="invalid-feedback">{errors.celular}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                            id="correo"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="Ingrese correo electrónico"
                        />
                        {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-secondary"
                    onClick={handleClose}
                >
                    Cancelar
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={cargando}
                >
                    {cargando ? 'Registrando...' : 'Registrar Usuario'}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default RegistroUsuario;