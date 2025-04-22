import AgregarCertCard from "./AgregarCertCard";
import CertCard from "./CertCard";
import CertListServer from "./CertListServer";

export default function Page() {
  
  return (
    <main className="min-h-screen text-white">
          {/* Contenido de la página */}
          <div className="p-5">
            <h1 className="text-3xl font-bold mb-8">Certificados</h1>

            <div className="relative z-10 w-full max-h-[34rem] overflow-y-scroll no-scrollbar md:max-h-[41rem] md:swcrollbar">
              <CertListServer />
            </div>
          </div>
    </main>
  );
}
