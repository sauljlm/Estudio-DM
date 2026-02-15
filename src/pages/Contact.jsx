import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useLanguage } from "../i18n/LanguageContext";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function Contact() {
    const { lang, translation } = useLanguage();
    const contactUrl = translation.navbar.whatsappMsg;

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        number: "",
        message: ""
    })
    const [errors, setErrors] = useState({});

    const addError = (formErrors) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...formErrors,
        }));
    }

    const validateName = (name) => {
        let formErrors = {};
        const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']{1,50}$/;

        if (!regex.test(name)) {
            formErrors.name = lang === "en" ? "Invalid name" : "Nombre invalido";
        }
        if (!name.trim()) {
            formErrors.name = lang === "en" ? "Name can't be empty" : "Nombre no puede estar vacío";
        }
        if (Object.keys(formErrors).length === 0) {
            formErrors.name = '';
        }
        
        addError(formErrors);
        return formErrors;
    };

    const validateNumber = (number) => {
        let formErrors = {};
        const regex = /^(\+506\s?)?\d{4}[-\s]?\d{4}$/;

        if (!regex.test(number)) {
            formErrors.number = lang === "en" ? "Invalid phone number" : "Numero telefónico invalido";
        }
        if (Object.keys(formErrors).length === 0) {
            formErrors.number = '';
        }
        
        addError(formErrors);
        return formErrors;
    };

    const validateEmail = async (email) => {
        let formErrors = {};
        const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (!regex.test(email)) {
            formErrors.email = lang === "en" ? "Invalid email" :  "Correo electrónico inválido";
        }
        if (!email.trim()) {
            formErrors.email = lang === "en" ? "Email can't be empty" : "El correo electrónico no puede estar vacío.";
        }
        if (Object.keys(formErrors).length === 0) {
            formErrors.email = '';
        }

        addError(formErrors);
        return formErrors;
    };

    const validateMessage = (message) => {
        let formErrors = {};

        if (!message.trim()) {
            formErrors.message = lang === "en" ? "Message can't be empty" : "Mensaje no puede estar vacío";
        }
        if (Object.keys(formErrors).length === 0) {
            formErrors.message = '';
        }
        
        addError(formErrors);
        return formErrors;
    };

    const validateForm = async () => {
        let accumulatedErrors = {};
    
        const validations = [
            await validateName(userData.name),
            await validateNumber(userData.number),
            await validateEmail(userData.email),
            await validateMessage(userData.message),
        ];
    
        validations.forEach(errorObj => {
            Object.entries(errorObj).forEach(([key, value]) => {
                if (value) {
                    accumulatedErrors[key] = value;
                }
            });
        });
    
        return Object.keys(accumulatedErrors).length === 0;
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const saveData = async () => {
        const formData = new FormData();
    
        Object.keys(userData).forEach(key => {
            formData.append(key, userData[key]);
        });
    
        formData.append("_captcha", "false");
    
        try {
            const response = await fetch(
                "https://formsubmit.co/info@estudiodmcr.onmicrosoft.com",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );
    
            const result = await response.json();
    
            if (result.success === "true" || response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'El mensaje se envió con éxito'
                });
    
                setUserData({
                    name: "",
                    email: "",
                    number: "",
                    message: ""
                });
            }
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la conexión'
            });
        }
    };

    return (
        <>
            <div className="mx-auto w-[90%] xl:w-[70%] px-4 py-8 sm:px-6 lg:px-8 mt-16 md:mt-32">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="md:py-4 h-3/4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{lang === "en" ? "Contact us" : "Contáctanos"}</h2>

                            <p className="mt-4 text-pretty text-gray-700">
                            {lang === "en" ? "We want to learn about your project, understand your needs and see how we can help you grow with a digital strategy that truly works." : "Queremos conocer tu proyecto, entender qué necesitás y ver cómo podemos ayudarte a crecer con una estrategia digital que realmente funcione."}
                            </p>
                        </div>

                        <dl className="mb-6 space-y-3">
                            <div>
                                <dt className="sr-only">{lang === "en" ? "Phone number" : "Número telefónico"}</dt>

                                <dd className="grid grid-cols-[24px_1fr] items-center gap-2 text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path>
                                    </svg>

                                    <span><a href="tel:+50683649226" className="text-md md:text-lg lg:text-xl text-[#5B5B5B] hover:text-[#212121] transition-colors">+506 8364 9226</a></span>
                                </dd>
                            </div>

                            <div>
                                <dt className="sr-only">{lang === "en" ? "Email" : "Correo electrónico"}</dt>

                                <dd className="grid grid-cols-[24px_1fr] items-center gap-2 text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"></path>
                                    </svg>

                                    <span><a href="mailto:info@estudiodmcr.onmicrosoft.com" className="text-md md:text-lg lg:text-xl text-[#5B5B5B] hover:text-[#212121] transition-colors">info@estudiodmcr.onmicrosoft.com</a></span>
                                </dd>
                            </div>
                        </dl>
                        <div>
                            <Button variant="primary">
                                <a href={contactUrl} target="_blank" aria-label="Contactar por whatsApp">WhatsApp</a>
                            </Button>
                        </div>
                    </div>

                    <form className="space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="name">{lang === "en" ? "Name" : "Nombre"}</label>
                            <input className={`${errors.name ? 'form__item--error' : ''} mt-1 w-full rounded-lg p-4 border-gray-300 focus:border-indigo-500 focus:outline-none`} id="name" name="name" type="text" placeholder={lang === "en" ? "Your name" : "Tú nombre"}  onChange={handleChange} />
                            <div>{errors.name ? <div className="block mb-[-1rem] text-red-800 text-xs">{errors.name}</div> : " "}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="number">{lang === "en" ? "Your phone number" : "Tu número telefónico"}</label>
                            <input className={`${errors.number ? 'form__item--error' : ''} mt-1 w-full rounded-lg p-4 border-gray-300 focus:border-indigo-500 focus:outline-none`} id="number" name="number" type="tel" inputMode="numeric" placeholder={lang === "en" ? "Your phone number" : "Tu número telefónico"} onChange={handleChange} />
                            <div>{errors.number ? <div className="block mb-[-1rem] text-red-800 text-xs">{errors.number}</div> : " "}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="email">{lang === "en" ? "Email" : "Correo electrónico"}</label>
                            <input className={`${errors.email ? 'form__item--error' : ''} mt-1 w-full rounded-lg p-4 border-gray-300 focus:border-indigo-500 focus:outline-none`} id="email" name="email" type="email" placeholder={lang === "en" ? "Your email" : "Tú correo electrónico"} onChange={handleChange} />
                            <div>{errors.email ? <div className="block mb-[-1rem] text-red-800 text-xs">{errors.email}</div> : " "}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="message">{lang === "en" ? "Message" : "Mensaje"}</label>
                            <textarea className={`${errors.message ? 'form__item--error' : ''} mt-1 w-full p-4 resize-none rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none`} id="message" name="message" rows="4" placeholder={lang === "en" ? "Your Message" : "Tú mensaje"} onChange={handleChange} required></textarea>
                            <div>{errors.message ? <div className="block mb-[-1rem] text-red-800 text-xs">{errors.message}</div> : " "}</div>
                        </div>

                        <button className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600" type="submit"
                            onClick={async () => {
                                const isValid = await validateForm();
                                if (isValid) {
                                    saveData();
                                }
                            }}
                        >
                            {lang === "en" ? "Send message" : "Enviar mensaje"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}