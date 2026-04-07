import {
  FileText,
  Stethoscope,
} from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaFileMedical,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import ANS from "../assets/ANS.svg";
import GODADDY from "../assets/GODADDY.png";

function Footer() {
  return (
    <footer>
      {/* Parte principal */}
      <div className="bg-[#1c9770ff] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-12">
          {/* Cards do topo */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <a
              href="#"
              className="flex items-center gap-4 rounded-3xl bg-white px-6 py-6 text-[#1f2d3d] transition hover:scale-[1.02]"
            >
              <FaFileMedical size={22} className="text-[#7AD180]" />
              <span className="text-[18px] font-medium">Resultado de Exames</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 rounded-3xl bg-white px-6 py-6 text-[#1f2d3d] transition hover:scale-[1.02]"
            >
              <FileText size={22} className="text-[#7AD180]" />
              <span className="text-[18px] font-medium">Convênios Médicos</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 rounded-3xl bg-white px-6 py-6 text-[#1f2d3d] transition hover:scale-[1.02]"
            >
              <Stethoscope size={22} className="text-[#7AD180]" />
              <span className="text-[18px] font-medium">Encontre um Médico</span>
            </a>
          </div>

          {/* Linha divisória */}
          <div className="my-10 h-px w-full bg-[#93CB52]" />

          {/* Links principais */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-5 text-[20px] font-bold">Sobre a CarePlus</h3>
              <ul className="space-y-3 text-[16px]">
                <li><a href="#" className="transition hover:underline">A empresa</a></li>
                <li><a href="#" className="transition hover:underline">Diferenciais</a></li>
                <li><a href="#" className="transition hover:underline">Rede Plus</a></li>
                <li><a href="#" className="transition hover:underline">Gestão De Saúde</a></li>
                <li><a href="#" className="transition hover:underline">O Lado Plus Da Saúde</a></li>
                <li><a href="#" className="transition hover:underline">Responsabilidade Social</a></li>
                <li><a href="#" className="transition hover:underline">Perguntas Frequentes</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-[20px] font-bold">Planos e Produtos</h3>
              <ul className="space-y-3 text-[16px]">
                <li><a href="#" className="transition hover:underline">Planos Individuais</a></li>
                <li><a href="#" className="transition hover:underline">Coberturas</a></li>
                <li><a href="#" className="transition hover:underline">Tabela de Preços</a></li>
                <li><a href="#" className="transition hover:underline">Planos Empresariais</a></li>
                <li><a href="#" className="transition hover:underline">Benefícios</a></li>
                <li><a href="#" className="transition hover:underline">Comparar Planos</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-[20px] font-bold">
                Carreira
              </h3>
              <ul className="space-y-3 text-[16px]">
                <li><a href="#" className="transition hover:underline">Carreiras</a></li>
                <li><a href="#" className="transition hover:underline">Vagas</a></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 text-[20px] font-bold">Fale Conosco</h3>
              <ul className="space-y-3 text-[16px]">
                <li><a href="#" className="transition hover:underline">Solicite Uma Proposta</a></li>
                <li><a href="#" className="transition hover:underline">Contato</a></li>
                <li><a href="#" className="transition hover:underline">Canal de Denúncias</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Faixa azul inferior */}
      <div className="bg-[#7AD180] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-10">
          {/* Parte de cima */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <h4 className="mb-4 text-[22px] font-medium">Certificações</h4>
              <img src={GODADDY} alt="Certificações" />
            </div>

            <div>
              <h4 className="mb-4 text-[22px] font-medium">Baixe o app Care Plus</h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.careplus.mobile&hl=pt_BR"
                  className="flex items-center gap-2 rounded-md bg-[#93CB52] shadow-black px-4 py-3 text-sm transition hover:opacity-90"
                >
                  <FaGooglePlay size={20} />
                  <span>Google Play</span>
                </a>

                <a
                  href="https://apps.apple.com/br/app/care-plus/id899562421"
                  className="flex items-center gap-2 rounded-md bg-[#93CB52] shadow-black px-4 py-3 text-sm transition hover:opacity-90"
                >
                  <FaApple size={20} />
                  <span>App Store</span>
                </a>
              </div>
            </div>

            <div>
            <h4 className="mb-4 text-[22px] font-medium">ANS</h4>

            <div className="space-y-3">
                <img
                src={ANS}
                alt="Logo ANS"
                className="h-auto w-[140px] object-contain"
                />

                <div className="inline-block border bg-gray-500 border-white/60 px-4 py-1 text-sm">
                ANS Nº 37995-6
                </div>
            </div>
            </div>

            <div>
              <h4 className="mb-4 text-[22px] font-medium">Redes Sociais</h4>
              <div className="flex items-center gap-6 text-[20px]">
                <a href="#" className="transition hover:scale-110">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="transition hover:scale-110">
                  <FaInstagram />
                </a>
                <a href="#" className="transition hover:scale-110">
                  <FaFacebookF />
                </a>
                <a href="#" className="transition hover:scale-110">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Linha */}
          <div className="my-8 h-px w-full bg-white/40" />

          {/* Parte final */}
          <div className="flex flex-col gap-6 text-[12px] text-white/90 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[520px] leading-5">
              © 2026 - Care Plus Medicina Assistencial LTDA | Todos os direitos reservados <br /> CNPJ: 00.000.000/0001-00
              Endereço: Alameda Exemplo, 687 - 12º andar <br /> Alphaville - Barueri - SP - CEP: 06454-040
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px]">
              <a href="#" className="hover:underline">Acessibilidade</a>
              <a href="#" className="hover:underline">Aviso de Privacidade</a>
              <a href="#" className="hover:underline">Termos & Condições</a>
              <a href="#" className="hover:underline">Contato</a>
              <a href="#" className="hover:underline">Mapa do site</a>
              <a href="#" className="hover:underline">Transparência Salarial</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;