'use client'
import { useEffect, useState } from "react"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Pruebamp = () => {
    const [preferenceId, setPreferenceId] = useState<string|null>(null)

    useEffect(() => {
        initMercadoPago('TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc', { locale: 'es-AR' })
    }, [])

    const createPreference = async () => {
        try {
            const res = await fetch('http://localhost:3001/mercadopago', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: [{
                        id: 'cd3122b6-215e-452d-b62f-6603bff264dc',
                        service: 'Cambio de Aceite',
                        price: 50
                    }]
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            }

            const data = await res.json()
            return data
        } catch (error: any) {
            console.error('Error creating preference:', error.message)
            throw error
        }
    }

    const handleClick = async () => {
        try {
            const preference = await createPreference()
            setPreferenceId(preference.preferenceId)
        } catch (error:any) {
            console.error('Error handling click:', error.message)
        }
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1 className="text-white">Pruebamp</h1>
            <br />
            <button
                onClick={handleClick}
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
                Comprar
            </button>
            {preferenceId && <Wallet initialization={{preferenceId}} />}
        </div>
    )
}

export default Pruebamp