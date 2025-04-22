"use client";

import { useState } from 'react';
import CertCard from './CertCard';
import AgregarCertCard from './AgregarCertCard';

export default function CertPanelClient({ initialCerts }) {
    const [certs, setCerts] = useState(initialCerts);

    const handleAgregarCert = (nuevo) => {
        setCerts(prev => [...prev, { ...nuevo, id: Date.now() }]);
    };

    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {certs.map(c => (
                    <CertCard key={c.id} {...c} />
                ))}
                <AgregarCertCard onAddCerts={handleAgregarCert} />
            </div>
        </div>
    );
}