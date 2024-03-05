"use client"

import SweetAlert from '@/app/components/sweetAlert';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const downloadPdf = async () => {
    try {
        const response: any = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/export-product`,
            {
                responseType: "blob",
                headers: {
                    Accept: "application/pdf",
                },
            }
        );

        return response
    } catch (error: any) {
        return error
    }
}

const ExportProduct = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);

    const router = useRouter()

    const handleDownloadPdf = async () => {

        const response = await downloadPdf();
        setStatus(response.status)
        if (response.status == 200) {
            const blob = await response.data;
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Produk Titipan`); // or any other extension
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            setIsLoading(false);
            setMessage("Download data berhasil");
        } else {
            setIsLoading(false);
            setMessage('Download data gagal');
        }
    }

    const resetState = () => {
        setStatus(false)
        location.reload()
    }
    

    return (
        <div>
            <button className="btn capitalize btn-primary btn-sm mb-5" onClick={handleDownloadPdf}>
                {isLoading ? 'Mendownload...' : 'Export Pdf'}
            </button>

            {status && <SweetAlert status={status} message={message} resetState={resetState} />}
        </div>
    )
}

export default ExportProduct