import CertPanelClient from './CertPanelClient';

const CertListServer = async() => {
    const res = await fetch('http://localhost:3000/certs.json');
    const data = await res.json();

    const certs = data.certs || [];
    return <CertPanelClient initialCerts={certs} />;
};

export default CertListServer;