import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function Contact() {
    const contactUrl = `https://wa.me/50683649226?text=Hola%2C%20me%20gustaría%20saber%20más%20información`;

    return (
        <>
            <div className="mx-auto w-[90%] xl:w-[70%] px-4 py-8 sm:px-6 lg:px-8 mt-16 md:mt-32">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="md:py-4 h-3/4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Contáctanos</h2>

                            <p className="mt-4 text-pretty text-gray-700">
                            Queremos conocer tu proyecto, entender qué necesitás y ver cómo podemos ayudarte a crecer con una estrategia digital que realmente funcione.
                            </p>
                        </div>

                        <dl className="mb-6 space-y-3">
                            <div>
                                <dt className="sr-only">Phone number</dt>

                                <dd className="grid grid-cols-[24px_1fr] items-center gap-2 text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"></path>
                                    </svg>

                                    <span><a href="tel:+50683649226" className="text-md md:text-lg lg:text-xl text-[#5B5B5B] hover:text-[#212121] transition-colors">+506 8364 9226</a></span>
                                </dd>
                            </div>

                            <div>
                                <dt className="sr-only">Email</dt>

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

                    <form action="https://formsubmit.co/info@estudiodmcr.onmicrosoft.com" method="POST" className="space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="name">Nombre</label>

                            <input className="mt-1 w-full rounded-lg p-4 border-gray-300 focus:border-indigo-500 focus:outline-none" id="name" name="name" type="text" placeholder="Tu nombre" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="phone-number">Número telefónico</label>

                            <input className="mt-1 w-full rounded-lg p-4 border-gray-300 focus:border-indigo-500 focus:outline-none" id="phone-number" name="phone-number" type="number" placeholder="Tu número telefónico" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="email">Email</label>

                            <input className="mt-1 w-full rounded-lg p-4 border-gray-300 focus:border-indigo-500 focus:outline-none" id="email" name="email" type="email" placeholder="Tu email" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900" htmlFor="message">Mensaje</label>

                            <textarea className="mt-1 w-full p-4 resize-none rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id="message" name="message" rows="4" placeholder="Tu mensaje" required></textarea>
                        </div>

                        <button className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600" type="submit">
                            Enviar mensaje
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}